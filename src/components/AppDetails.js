import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class AppDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: ""
    };
  }

  componentDidMount() {
    // console.log("did mount");
    this.getApp();
  }

  getApp() {
    let AppId = this.props.match.params._id;
    // console.log("the appID", AppId);
    axios
      .get(`${process.env.REACT_APP_URL_LOCAL}api/apps/${AppId}`)
      .then(response => {
        this.setState({ details: response.data }, () => {
          // console.log(this.state);
          if (this.state.details.error) {
            console.log(`error from detail page, no object with ${AppId}`);
            return this.props.history.push("/");
          }
        });
      })
      .catch(err => console.log(err));
  }

  onDelete() {
    let AppId = this.state.details._id;
    axios
      .delete(`${process.env.REACT_APP_URL_LOCAL}api/apps/${AppId}`)
      .then(response => {
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  }

  render() {
    // console.log("rendered");
    return (
      <div>
        <br />
        <Link className="btn grey" to="/">
          Back
        </Link>
        <h2>{this.state.details.title}</h2>
        <ul className="collection">
          <li className="collection-item">
            <span className="desc">App Description: </span>
            {this.state.details.description_long}
          </li>
          <li className="collection-item">
            <span className="desc">Used Technologies: </span>
            {this.state.details.description_short}
          </li>
          <li className="collection-item">
            <span className="desc">Deploy URL: </span>
            <a href={this.state.details.url}>{this.state.details.url}</a>
          </li>
          <li className="collection-item">
            <span className="desc">Git Repo URL: </span>
            <a href={this.state.details.repo_url}>
              {this.state.details.repo_url}
            </a>
          </li>
        </ul>
        <Link className="btn" to={`/apps/edit/${this.state.details._id}`}>
          {" "}
          Edit
        </Link>

        <button onClick={this.onDelete.bind(this)} className="btn red right">
          Delete
        </button>
      </div>
    );
  }
}

export default AppDetails;
