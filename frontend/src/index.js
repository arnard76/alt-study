import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.css";
import FilterPage from "./components/FilterPage";
import Pathway from "./components/Pathway";
import Option from "./components/Option";

const exampleCategories = ["web development", ""];

const routes = (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={FilterPage} />
      <Route path="/pathway/:pathwayId" component={Pathway} />
      <Route path="/option/:optionType/:optionId" component={Option} />
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById("root"));
