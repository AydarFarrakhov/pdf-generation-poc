import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { withStyles, Button, TextField, Grid } from 'material-ui';

const EXCLUDED_FIELDS = ['name', '_id', 'pdfName'];

class BillForm extends Component {

  state = { ...BillForm.getInitialState() };

  static getInitialState() {
    return {
      _id: null,
      pdfName: null,
      name: '',
      year: 1990,
      make: 'make',
      model: 'model',
      licensePlateRegistrationNumber: 1211,
      VINHIN: 121321,
      dateOfSale: '20.01.12',
      salePrice: '1000$',
      sellerNames: 'Mr. Smith',
      sellerAddress: 'Main St.',
      city: 'Washington',
      state: 'WA',
      zip: '999999',
      buyerNames: 'Mr. Smart',
      buyerAddress: 'Secondary St.',
      buyerCity: 'Kansas',
      buyerState: '',
      buyerZip: '',
    };
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    if (props.selected) {
      this.state = {
        ...props.selected,
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.selected) {
      this.setState({ ...BillForm.getInitialState() });
    } else {
      this.setState({ ...nextProps.selected })
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.save(this.state);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  renderForm() {
    const { classes } = this.props;
    const { name } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className={classes.root}>
        <Grid container direction="column">
          <Grid item>
            <TextField
              id="name"
              label="Name (required)"
              className={classes.input}
              value={name}
              onChange={this.handleChange('name')}
            />
          </Grid>
          <Grid item>
            {
              Object.keys(this.state)
                .filter(k => EXCLUDED_FIELDS.find((f) => f === k) === undefined)
                .map(k => (
                  <TextField
                    key={k}
                    id={k}
                    label={k}
                    className={classes.input}
                    value={this.state[k]}
                    onChange={this.handleChange(k)}
                  />
                ))
            }
          </Grid>
        </Grid>


        <div>
          <Button variant="raised" color="primary" className={classes.button} onClick={this.handleSubmit}>
            Submit
          </Button>
        </div>
      </form>
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

export default withStyles(styles)(BillForm);
