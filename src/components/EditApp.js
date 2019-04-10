import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class EditApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      title: "",
      description_long: "",
      description_short: "",
      url: "",
      repo_url: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    this.getAppDetails();
  }

  componentDidMount() {}

  getAppDetails() {
    let AppId = this.props.match.params._id;
    axios
      .get(`${process.env.REACT_APP_URL_LOCAL}api/apps/${AppId}`)
      .then(response => {
        // console.log("resp: ", response);
        // console.log("resp: ", response.data.error);
        if (response.data.error) {
          return this.props.history.push("/");
        }
        this.setState(
          {
            _id: response.data._id,
            title: response.data.title,
            description_long: response.data.description_long,
            description_short: response.data.description_short,
            url: response.data.url,
            repo_url: response.data.repo_url
          },
          () => {
            // console.log(this.state);
          }
        );
      })
      .catch(err => console.log(err));
  }

  editApp(newApp) {
    axios
      .request({
        method: "put",
        url: `${process.env.REACT_APP_URL_LOCAL}api/apps/${this.state._id}`,
        data: newApp
      })
      .then(response => {
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  }

  onSubmit(e) {
    e.preventDefault();
    const newApp = {
      title: this.refs.title.value,
      description_long: this.refs.description_long.value,
      description_short: this.refs.description_short.value,
      url: this.refs.url.value,
      repo_url: this.refs.repo_url.value
    };
    // console.log("newapp", newApp);
    this.editApp(newApp);
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    console.log("rerendered!!");
    return (
      <div>
        <br />
        <Link className="btn grey" to="/">
          Back
        </Link>
        <h1 className="edit-header">Update App</h1>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="input-field">
            <input
              type="text"
              name="title"
              ref="title"
              value={this.state.title}
              onChange={this.handleInputChange}
            />
            <label className="active" htmlFor="title">
              App Title
            </label>
          </div>
          <div className="input-field">
            <input
              type="text"
              name="description_long"
              ref="description_long"
              value={this.state.description_long}
              onChange={this.handleInputChange}
            />
            <label className="active" htmlFor="description_long">
              App Description
            </label>
          </div>
          <div className="input-field">
            <input
              type="text"
              name="description_short"
              ref="description_short"
              value={this.state.description_short}
              onChange={this.handleInputChange}
            />
            <label className="active" htmlFor="description_short">
              Used Technologies
            </label>
          </div>
          <div className="input-field">
            <input
              type="text"
              name="url"
              ref="url"
              value={this.state.url}
              onChange={this.handleInputChange}
            />
            <label className="active" htmlFor="url">
              Deploy URL
            </label>
          </div>
          <div className="input-field">
            <input
              type="text"
              name="repo_url"
              ref="repo_url"
              value={this.state.repo_url}
              onChange={this.handleInputChange}
            />
            <label className="active" htmlFor="repo_url">
              Git Repo URL
            </label>
          </div>
          <input type="submit" value="Save" className="btn" />
        </form>
      </div>
    );
  }
}

export default EditApp;
