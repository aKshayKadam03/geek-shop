import { Switch, Route } from "react-router-dom";
import Shop from "../Pages/Shop/Shop";
import React from "react";
import Solo from "../Pages/SoloProduct/Solo";

function Router() {
  return (
    <Switch>
      <Route exact path="/">
        <h1>Home Page</h1>
      </Route>
      <Route exact path="/shop">
        <Shop />
      </Route>
      <Route path="/shop/:id">
        <Solo></Solo>
      </Route>
    </Switch>
  );
}

export default Router;
