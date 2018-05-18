import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { withStyles, Button, TextField, Grid } from 'material-ui';

class PackingForm extends Component {

  state = { ...PackingForm.getInitialState() };

  static getInitialState() {
    return {
        container: 'HM000000001',
        seal: '023211',
        netLb: 57.9,
        netKg: 26.071,
    };
  }

  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    if (props.packing) {
      this.state = {
        ...props.packing,
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.packing) {
      this.setState({ ...PackingForm.getInitialState() });
    } else {
      this.setState({ ...nextProps.packing })
    }
  }

  handleAdd(event) {
    event.preventDefault();
    this.props.onAdd(this.state);
  }

  handleRemove(event) {
    event.preventDefault();
    this.props.onRemove();
  }

  handleChange = name => event => {
    const { packing, onPackingChange } = this.props;
    const changes = {
      [name]: event.target.value,
    };
    if (packing) {
      const newPacking = {
        ...packing,
        ...changes
      };
      onPackingChange(newPacking);
    } else {
      this.setState(changes);
    }
  };

  renderAddButton(classes) {
    if (this.props.packing) return null;
    return (
      <Button variant="raised" color="primary" className={classes.button} onClick={this.handleAdd}>
        Add
      </Button>
    )
  }

  renderRemoveButton(classes) {
    if (!this.props.packing) return null;
    return (
      <Button variant="raised" color="primary" className={classes.button} onClick={this.handleRemove}>
        Remove
      </Button>
    )
  }

  renderForm() {
    const { classes } = this.props;
    return (
      <Grid container direction="row">
        <Grid item direction="row" xs={10} wrap="wrap">
            {
              Object.keys(this.state)
                .map(k => (
                  <TextField
                    key={k}
                    id={k}
                    label={k}
                    className={classes.input}
                    value={this.state[k] || (this.props.packing && this.props.packing[k])}
                    onChange={this.handleChange(k)}
                  />
                ))
            }
        </Grid>
        <Grid item xs={2}>
          {
            this.renderRemoveButton(classes)
          }
          {
            this.renderAddButton(classes)
          }
        </Grid>
      </Grid>
    )
  }

  render() {
    return this.renderForm()
  }
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    margin: theme.spacing.unit,
  },
});

export default withStyles(styles)(PackingForm);
