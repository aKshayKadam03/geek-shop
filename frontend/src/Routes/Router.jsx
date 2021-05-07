import { Switch, Route } from "react-router-dom";
import Shop from "../Pages/Shop/Shop";
import React from "react";
import Solo from "../Pages/SoloProduct/Solo";
import Auth from "../Pages/Auth/Auth";
import { AntiPrivateRoute, PrivateRoute } from "./PrivateRoutes";
import Checkout from "../Pages/Checkout/Checkout";

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
      <PrivateRoute path="/checkout">
        <Checkout></Checkout>
      </PrivateRoute>
      <AntiPrivateRoute path="/auth/:auth">
        <Auth></Auth>
      </AntiPrivateRoute>
    </Switch>
  );
}

export default Router;
