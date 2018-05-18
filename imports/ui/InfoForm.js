import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { withStyles, Button, TextField, Grid, Typography } from 'material-ui';
import PackingForm from './PackingForm';

const EXCLUDED_FIELDS = [ 'name', '_id', 'pdfName', 'packingList', 'processing' ];

class InfoForm extends Component {

  state = { ...InfoForm.getInitialState() };

  static getInitialState() {
    return {
      _id: null,
      name: '',
      pdfName: null,
      shipperName: 'Valero Marketing and Supply Company',
      shipperAddress: 'One Valero Wat San Antonio, TX 000000--0000',
      date: 'February 4, 2018',
      booking: '0000000',
      contactNumber: '0000000',
      countryOfOrigin: 'Linden, In',
      portOfExport: 'Savannah, GA',
      destinationPort: 'Ho Chi Ming City, Vietnam',
      vessel: 'OOCL France 0008W',
      consigneeName: 'VIMAG Commodities CO., LTD 15 D1, DAI',
      consigneeAddress: 'KIM NEW URBAN AREA, HOANG MAI DIST HA NOI, VIETNAM +844.0000000',
      descriptionOfGoods: 'Distillers Dried with Solubles (DDGS)',
      tons: 364.223,
      packingList: [
        {
          container: 'HM000000001',
          seal: '023211',
          netLb: 57.9,
          netKg: 26.071,
        }
      ],
      signatureName: 'Brandy Dunlap',
      signatureTitle: 'Scheduler Renewables Logistics'
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
      this.setState({ ...InfoForm.getInitialState() });
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
      [ name ]: event.target.value,
    });
  };

  handlePackingChange(container, packing) {
    this.setState({
      packingList: this.state.packingList.map(p => {
        if (p.container !== container) return p;
        return packing;
      })
    });
  }

  handlePackingRemove(container) {
    this.setState({
      packingList: this.state.packingList.filter(p => p.container !== container)
    });
  }

  handleAddPacking(packing) {
    this.setState({
      packingList: [...this.state.packingList, packing],
    })
  }

  renderPackingList() {
    if (!this.state.packingList || this.state.packingList.length === 0){
      return (
        <Typography variant="body1" color="error">
          Packing list is empty
        </Typography>
      );
    }
    return this.state.packingList.map(packing => (
      <Grid item key={packing.container}>
        <PackingForm
          packing={packing}
          onPackingChange={(newPacking) => this.handlePackingChange(packing.container, newPacking)}
          onRemove={() => this.handlePackingRemove(packing.container)}
        />
      </Grid>
    ));
  }

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
                    value={this.state[ k ]}
                    onChange={this.handleChange(k)}
                  />
                ))
            }
          </Grid>
          <Grid item>
            <Grid container direction="column">
              <Typography variant="title" color="inherit">
                Packing List
              </Typography>
              {this.renderPackingList()}
              <Grid item >
                <Typography variant="title" color="inherit">
                  New Packing
                </Typography>
                <PackingForm
                  onAdd={(packing) => this.handleAddPacking(packing)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>


        <div>
          <Button variant="raised" color="primary" className={classes.button} onClick={this.handleSubmit}>
            Save Data
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

export default withStyles(styles)(InfoForm);
