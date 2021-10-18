import React, { Component } from "react";
import "./PathwayStyle/Pathway.css";
import { Link, withRouter } from "react-router-dom";
import OptionPreview from "./OptionPreview";
import ActiveOption from "./ActiveOption";

class Pathway extends Component {
  state = {
    isLoading: true,
    pathwayData: {
      id: -1,
      name: "Pathway Name",
      description: "Pathway Description",
      pathway: {},
    },
    optionData: {},
  };

  constructor() {
    super();
    this.handleRenderPathway = this.handleRenderPathway.bind(this);
  }

  async componentDidMount() {
    const pathwayId = this.props.match.params.pathwayId;
    const url =
      "../../backend/get-pathways/?format=json&pathway_id=" + pathwayId;
    const response = await fetch(url);
    const data = await response.json();
    if (data.length == 1) {
      data[0].pathway = JSON.parse(data[0].pathway);
      this.setState({ pathwayData: data[0], isLoading: false });
    }
  }

  handleRenderPathway(option) {
    var children = option.children;
    var option = option.option;

    return (
      <div className="parent">
        <div className="pathway-arrow">
          <p>-&gt;</p>
        </div>
        <OptionPreview
          name={option.name}
          provider={option.provider}
          handleActivateOption={() => {
            this.setState(
              {
                optionData: option,
              },
              () => {
                console.log(option);
              }
            );
          }}
        />
        <div className="children">
          {children.map((child) => {
            return (
              <div className="child" key={child.option.option_id}>
                {this.handleRenderPathway(child)}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <div className="pathway-page">
          <h1 className="pathway-name">{this.state.pathwayData.name}</h1>

          <div className="pathway">
            {this.state.pathwayData.pathway.option &&
              this.handleRenderPathway(this.state.pathwayData.pathway)}
            {Object.entries(this.state.optionData).length && (
              <ActiveOption optionData={this.state.optionData} />
            )}
          </div>
          <div className="warning-message">
            <h4>Warning</h4>
            <p>
              This is not a fixed process. Different opportunities and
              distractions will also present themselves in abundance.
            </p>
          </div>

          {/* <div className="pathway-information">
            {this.state.pathwayData.details.map((section) => {
              return (
                <section className="pathway-section" key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.content}
                </section>
              );
            })}
            </div> */}
        </div>
      );
    } else {
      return <p>Page could not load!</p>;
    }
  }
}

export default withRouter(Pathway);
