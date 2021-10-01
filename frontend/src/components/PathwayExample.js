import React from "react";
import "./PathwayStyle/Pathway.css";

class PathwayExample extends React.Component {
  state = {
    pathway: [
      { id: 1, content: "1 string now", children: [2, 4] },
      { id: 2, content: 2, children: [3] },
      { id: 3, content: 3, children: [] },
      { id: 4, content: 45, children: [5, 6] },
      { id: 5, content: 5, children: [] },
      { id: 6, content: 6, children: [] },
      { id: 7, content: 7, children: [] },
    ],
  };

  constructor() {
    super();
    this.handleRenderOption = this.handleRenderOption.bind(this);
  }

  handleRenderOption(option, firstOption = false) {
    var pathway = this.state.pathway;

    // verifying first option is the first option
    if (firstOption) {
      for (var c = 0; c < pathway.length; c++) {
        if (pathway[c].children.indexOf(option.id) !== -1) {
          console.log(
            "first option given is a child of another option so it cannot be the first option."
          );
          return;
        }
      }
    }

    return (
      <div className="parent">
        <div className="option" id={option.content.id}>
          {option.content}
        </div>
        <div className="children">
          {option.children.map((child) => {
            child = pathway.find((opt) => opt.id === child);
            return (
              <div className="child" key={child.id}>
                {this.handleRenderOption(child)}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  render() {
    return this.handleRenderOption(this.state.pathway[0], true);
  }
}

export default PathwayExample;
