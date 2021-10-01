import React, { Component } from "react";
import "./PathwayStyle/Pathway.css";
import { Link, withRouter } from "react-router-dom";

class Pathway extends Component {
  state = {
    isLoading: true,
    pathwayData: {
      id: -1,
      name: "Pathway Name",
      description: "Pathway Description",
      pathway: {},
    },
  };

  constructor() {
    super();
    this.handleRenderOption = this.handleRenderOption.bind(this);
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

  handleRenderOption(option) {
    var children = option.children;
    var option = option.option;

    return (
      <div className="parent">
        <div
          className="option"
          id={"option-" + option.id}
          onMouseEnter={(evt) => {
            document
              .querySelector("#option-" + option.id + " .pathway-option")
              .classList.add("active");
          }}
          onMouseLeave={(evt) => {
            document
              .querySelector("#option-" + option.id + " .pathway-option")
              .classList.remove("active");
          }}
        >
          <div className="pathway-arrow">
            <p>-&gt;</p>
          </div>
          <div className="pathway-option-preview">
            <p>{option.name}</p>
            <p>{option.provider}</p>
          </div>
          <div className="pathway-option">
            <p>financial costs:</p>
            <p>FINANCIAL COSTS GO HERE</p>
            <p>academic requirements:</p>
            <p>ACADEMIC REQUIREMENTS GO HERE</p>
            <p>description:</p>
            <p>{option.description}</p>
          </div>
        </div>
        <div className="children">
          {children.map((child) => {
            return (
              <div className="child" key={child.option.id}>
                {this.handleRenderOption(child)}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="pathway-page-outer">
        <Link to="/" className="back-btn">
          <p>Go back to study options</p>
        </Link>
        {!this.state.isLoading && (
          <div className="pathway-page">
            {/* <div className="img-container pathway-image">
            <img src={this.state.image} alt="" />
          </div> */}
            <div className="container">
              <h1 className="pathway-name">{this.state.pathwayData.name}</h1>
              <div className="pathway-container">
                <div className="pathway">
                  {this.state.pathwayData.pathway.option &&
                    this.handleRenderOption(this.state.pathwayData.pathway)}
                </div>
                <div className="warning-message">
                  <h4>Warning</h4>
                  <p>
                    This is not a fixed process. Different opportunities and
                    distractions will also present themselves in abundance.
                  </p>
                </div>
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
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Pathway);
