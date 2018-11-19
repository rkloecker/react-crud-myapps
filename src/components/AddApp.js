import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class AddApp extends Component {
  addApp(newApp) {
    axios
      .request({
        method: "post",
        url: `${process.env.REACT_APP_URL_LOCAL}api/apps`,
        data: newApp
      })
      .then(response => {
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  }

  onSubmit(e) {
    const newApp = {
      title: this.refs.title.value,
      description_long: this.refs.description_long.value,
      description_short: this.refs.description_short.value,
      url: this.refs.url.value,
      repo_url: this.refs.repo_url.value
    };
    this.addApp(newApp);
    e.preventDefault();
  }

  render() {
    // console.log("called render");
    return (
      <div>
        <br />
        <Link className="btn grey" to="/">
          Back
        </Link>
        <h1>Add App</h1>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="input-field">
            <input type="text" name="title" ref="title" />
            <label htmlFor="title">Title</label>
          </div>
          <div className="input-field">
            <input type="text" name="description_long" ref="description_long" />
            <label htmlFor="description_long">Long Description</label>
          </div>
          <div className="input-field">
            <input
              type="text"
              name="description_short"
              ref="description_short"
            />
            <label htmlFor="description_short">Short Description</label>
          </div>
          <div className="input-field">
            <input type="text" name="url" ref="url" />
            <label htmlFor="url">URL</label>
          </div>
          <div className="input-field">
            <input type="text" name="repo_url" ref="repo_url" />
            <label htmlFor="repo_url">Repo URL</label>
          </div>
          <input type="submit" value="Save" className="btn" />
        </form>
      </div>
    );
  }
}

export default AddApp;
