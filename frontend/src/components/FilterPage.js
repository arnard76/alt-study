import React, { Component } from "react";
import "./FilterPage.css";
import { Link } from "react-router-dom";

class FilterPage extends Component {
  state = {
    categoryInput: "",
    categoryResults: [],
    pathwayResults: [
      // {
      //   id: 1,
      //   name: "uoa pathway",
      //   image:
      //     "https://wonderfulengineering.com/wp-content/uploads/2013/12/MIT-campus-wallpaper-1.jpg",
      // },
      // { id: 2, name: "aut pathway", image: "" },
      // { id: 3, name: "internship pathway holo", image: "" },
      // { id: 4, name: "internship pathway 2", image: "" },
    ],
    filterLevel: 0,
  };

  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectCategory = this.handleSelectCategory.bind(this);
    this.fetchCategories = this.fetchCategories.bind(this);
    this.fetchPathways = this.fetchPathways.bind(this);
  }

  async fetchCategories(query) {
    const url = "./backend/get-categories/?format=json&query=" + query;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      categoryResults: data,
    });
  }

  async fetchPathways(catId) {
    const url = "./backend/get-pathways/?format=json&category_id=" + catId;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ pathwayResults: data }, () => {
      console.log(this.state.pathwayResults);
    });
  }

  handleSelectCategory(category) {
    console.log(category);
    this.setState(
      {
        categoryInput: category.name,
      },

      () => {
        this.fetchPathways(category.id);
        document.querySelector(".category-results").classList.remove("active");
        this.state.filterLevel = 1;
      }
    );
  }

  handleInputChange(event) {
    console.log(event.target.value);
    this.setState(
      {
        categoryInput: event.target.value,
      },
      () => {
        if (this.state.categoryInput != "") {
          this.fetchCategories(this.state.categoryInput);
        }
      }
    );
  }

  renderOld() {
    return (
      <>
        <div className="search" style={{ zIndex: 100 }}>
          <h4>I want to learn ...</h4>
          <div>
            <input
              value={this.state.categoryInput}
              onChange={this.handleInputChange}
              type="text"
              placeholder={this.state.searchPlaceholder}
              onClick={() => {
                document
                  .querySelector(".category-results")
                  .classList.add("active");
              }}
            ></input>
            <ul className="category-results">
              {this.state.categoryResults.map((category) => {
                return (
                  <li
                    onClick={() => {
                      this.handleSelectCategory(category);
                    }}
                    key={category.id}
                  >
                    {category.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div
          className="pathways"
          onClick={() => {
            document
              .querySelector(".category-results")
              .classList.remove("active");
          }}
        >
          {this.state.pathwayResults.map((pathway) => {
            return (
              <Link
                to={`/pathway/${pathway.id}`}
                style={{ zIndex: 30, position: "relative" }}
                key={pathway.id}
              >
                <div
                  style={{
                    position: "relative",
                    height: "100%",
                    backgroundColor: "magenta",
                  }}
                >
                  <p style={{ zIndex: 0, position: "relative" }}>
                    {pathway.name}
                  </p>
                  <p style={{ position: "relative" }}>{pathway.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </>
    );
  }

  render() {
    var filterInputEl;

    function convert(integer) {
      var str = Number(integer).toString(16);
      return str;
    }

    function randomBg() {
      var r, g, b;
      r = Number(Math.floor(Math.random() * 56) + 200).toString(16);
      g = Number(Math.floor(Math.random() * 56) + 200).toString(16);
      b = Number(Math.floor(Math.random() * 56) + 200).toString(16);
      console.log(`#${r}${g}${b}`);
      return `#${r}${g}${b}`;
    }

    if (this.state.filterLevel == 0) {
      filterInputEl = (
        <React.Fragment>
          <h4>I want to learn ...</h4>

          <input
            value={this.state.categoryInput}
            onChange={this.handleInputChange}
            type="text"
            onClick={() => {
              document
                .querySelector(".category-results")
                .classList.add("active");
            }}
          ></input>
          <ul className="category-results">
            {this.state.categoryResults.map((category) => {
              return (
                <li
                  key={category.id}
                  onClick={() => {
                    this.handleSelectCategory(category);
                  }}
                >
                  {category.name}
                </li>
              );
            })}
          </ul>
        </React.Fragment>
      );
    } else {
      filterInputEl = (
        <React.Fragment>
          <p>No more filters :(</p>
        </React.Fragment>
      );
    }
    return (
      <div className="filter-page">
        <div className="filter-input">{filterInputEl}</div>
        <ul className="pathway-results">
          {this.state.pathwayResults.map((pathway) => {
            var pathwayColor = randomBg();
            return (
              <li key={pathway.id} style={{ backgroundColor: pathwayColor }}>
                <Link to={`/pathway/${pathway.id}`}>
                  <p>{pathway.name}</p>
                  <div
                    className="pathway-info"
                    style={{ backgroundColor: pathwayColor }}
                  >
                    <p>{pathway.description}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default FilterPage;
