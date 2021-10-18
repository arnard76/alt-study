import React, { Component } from "react";
import ActiveOptionStyle from "./ActiveOption.module.css";

class ActiveOption extends React.Component {
  render() {
    return (
      <div className={ActiveOptionStyle.ActiveOption}>
        <p>financial costs:</p>
        <p>FINANCIAL COSTS GO HERE</p>
        <p>academic requirements:</p>
        <p>ACADEMIC REQUIREMENTS GO HERE</p>
        <p>description:</p>
        <p>{this.props.optionData.description}</p>
      </div>
    );
  }
}

export default ActiveOption;
