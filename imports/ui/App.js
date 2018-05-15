import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Data } from '../api/data.js';

class App extends Component {

  state = {
    seller: '',
    buyer: '',
    url: '',
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    console.log("Insert data");
    console.log(this.state);
    const { seller, buyer } = this.state;
    Meteor.call('data.insert', { seller, buyer }, (err, res) => {
      console.log(res);
      this.setState({ url: res });
    });
    this.setState({ seller: '', buyer: '' });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [ name ]: value
    });
  }

  renderCurrentData() {
    const { data } = this.props;
    if (!data || data.length === 0) return null;
    const { seller, buyer } = data[ 0 ];

    return (
      <div>
        <div>
          Seller: {seller}
        </div>
        <div>
          Buyer: {buyer}
        </div>
      </div>
    );
  }

  renderForm() {
    const { seller, buyer } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Seller"
            name="seller"
            value={seller}
            onChange={this.handleInputChange}/>
        </div>
        <div>
          <input
            type="text"
            placeholder="Buyer"
            name="buyer"
            value={buyer}
            onChange={this.handleInputChange}/>
        </div>
        <div>
          <button>Save</button>
        </div>
      </form>
    )
  }

  renderLink() {
    const url = this.state.url;
    if (!url) return null;
    return (
      <div>
        <a href={`/pdf/${url}`}>Download PDF</a>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>PDF Form</h1>
        </header>
        <div>
          {this.renderForm()}
        </div>
        {this.renderCurrentData()}
        {this.renderLink()}
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('data');
  return {
    data: Data.find({}).fetch(),
  };
})(App);
