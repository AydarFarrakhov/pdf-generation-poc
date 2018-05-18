import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Data } from '../api/data.js';
import {
  CssBaseline,
  List,
  ListItemText,
  ListItem,
  withStyles,
  AppBar,
  Drawer,
  Toolbar,
  Typography,
  Divider,
  Grid,
  Button,
} from 'material-ui';
import InfoForm from './InfoForm';

class App extends Component {

  state = {
    selected: null,
  };

  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.setSelected = this.setSelected.bind(this);
  }

  save(data) {
    Meteor.call('data.insert', data, (err, res) => {
      console.log(res);
      if (err) {
        alert(err.message);
      }
      this.setSelected(res);
    });
  }

  renderAppBar(classes) {
    return (
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <Typography variant="title" color="inherit" noWrap>
            Vehicle/Vessel Bill of Sale
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }

  renderMenuItem(name, onClick) {
    return (
      <Fragment key={name}>
          <ListItem button onClick={onClick}>
            <ListItemText primary={name}/>
          </ListItem>
          <Divider/>
      </Fragment>
    )
  }

  setSelected(selected) {
    this.setState({ selected });
  }

  renderDrawer(classes) {
    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar}/>
        <List component="nav">
          {this.props.data.map(d => this.renderMenuItem(d.name, () => this.setSelected(d), d._id))}
          {this.renderMenuItem("New", () => this.setSelected(null))}
        </List>
      </Drawer>
    )
  }

  showPDF(selected) {
    if (!selected || !selected.pdfName) {
      return (
        <Typography variant="title" color="error" noWrap>
          Select saved form to see PDF.
        </Typography>
      );
    }
    const pdfUrl = `/pdf/${selected.pdfName}`;
    return (
      <Fragment>
        <object data={pdfUrl} type="application/pdf" width="100%" height="100%">
          <p>Your web browser doesn't have a PDF plugin.
            Instead you can <a href={pdfUrl}>click here to
              download the PDF file.</a></p>
        </object>
        <Button color="primary" component={(props) => <a href={pdfUrl} {...props}/>}>
          Download
        </Button>
      </Fragment>
    )
  }

  renderContent() {
    const { selected } = this.state;
    return (
      <Grid container>
        <Grid xs={12} sm={7} item>
          <InfoForm save={this.save} selected={selected}/>
        </Grid>
        <Grid xs={12} sm={5} item>
          {this.showPDF(selected)}
        </Grid>
      </Grid>
    )
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <CssBaseline/>
        <div className={classes.root}>
          {this.renderAppBar(classes)}
          {this.renderDrawer(classes)}
          <main className={classes.content}>
            <div className={classes.toolbar}/>
            {this.renderContent(classes)}
          </main>
        </div>
      </Fragment>
    );
  }
}

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
});

const Styled = withStyles(styles)(App);

export default withTracker(() => {
  Meteor.subscribe('data');
  return {
    data: Data.find({}).fetch(),
  };
})(Styled);
