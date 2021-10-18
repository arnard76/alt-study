import React, { Component } from "react";
import OptionPreviewStyles from "./OptionPreview.module.css";

class OptionPreview extends React.Component {
  render() {
    return (
      <div
        className={OptionPreviewStyles.optionPreview}
        onMouseEnter={this.props.handleActivateOption}
      >
        <p>{this.props.name}</p>
        <p>{this.props.provider}</p>
      </div>
    );
  }
}

export default OptionPreview;
