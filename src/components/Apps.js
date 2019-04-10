import React, { Component } from "react";
import axios from "axios";
import AppItem from "./AppItem";

class Apps extends Component {
  constructor() {
    super();
    this.state = {
      Apps: [],
      loading: true
    };
  }

  componentDidMount() {
    this.getApps();
    // console.log(process.env);
  }

  getApps() {
    axios
      .get(`${process.env.REACT_APP_URL_LOCAL}api/apps`)
      .then(response => {
        this.setState({ Apps: response.data, loading: false }, () => {
          // console.log(this.state);
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const loading_msg = <p>app is loading</p>;
    const AppItems = this.state.Apps.map((App, i) => {
      return <AppItem key={App._id} item={App} />;
    });
    if (this.state.loading) {
      return loading_msg;
    }
    return (
      <div>
        <h1>Apps</h1>
        <ul className="collection">{AppItems}</ul>
      </div>
    );
  }
}

export default Apps;
