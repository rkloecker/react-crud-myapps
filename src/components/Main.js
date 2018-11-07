import React from "react";
import { Switch, Route } from "react-router-dom";
import Apps from "./Apps";
import About from "./About";
import AppDetails from "./AppDetails";
import AddApp from "./AddApp";
import EditApp from "./EditApp";

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Apps} />
      <Route exact path="/about" component={About} />
      <Route exact path="/apps/add" component={AddApp} />
      <Route exact path="/apps/edit/:_id" component={EditApp} />
      <Route exact path="/apps/:_id" component={AppDetails} />
    </Switch>
  </main>
);

export default Main;
