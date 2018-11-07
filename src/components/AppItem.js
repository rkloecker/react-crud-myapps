import React, { Component } from "react";
import { Link } from "react-router-dom";

class AppItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item
    };
  }

  render() {
    return (
      <li className="collection-item">
        <Link to={`/apps/${this.state.item._id}`}>{this.state.item.title}</Link>
      </li>
    );
  }
}

export default AppItem;
