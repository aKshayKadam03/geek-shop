import { Switch, Route } from "react-router-dom";
import Shop from "../Pages/Shop/Shop";
import React from "react";

function Router() {
  return (
    <Switch>
      <Route exact path="/">
        <h1>Home Page</h1>
      </Route>
      <Route path="/shop">
        <Shop />
      </Route>
      <Route path="/shop/:categoryParam">
        <Shop />
      </Route>
    </Switch>
  );
}

export default Router;
