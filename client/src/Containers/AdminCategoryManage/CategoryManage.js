import React, { Component } from "react";
import Wrapper from "../../Hoc/Wrapper";
import CategoryList from "../../Layouts/CategoriesList/CategoriesList";
import Auth from "../../Authentication/Auth";
import Alert from "../../Components/Alert/Alert"

export class CategoryManage extends Component {
  constructor(props) {
    super(props);
    this.loadCategories = this.loadCategories.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.state = {
      categoryName: "",
      categories: null,
      cUpdateEn: false,
      cUpdateId: null,
      searchQuery: "",
      filteredCategory: null,
      catAlert: false,
      catAlertMsg: "",
      catAlertTheme: "",
    };
  }

  async componentDidMount() {
    this.loadCategories();
  }

  render() {
    return (
      <Wrapper>
        <div className="row">
          <div className="col-sm ">
            <h4 className="pt-4 ">Product Categories</h4>
            <div className="listScrollable">
              <CategoryList
                categories={this.state.filteredCategory}
                onDelete={this.deleteCategory}
                onUpdate={this.handleCategoryUpdate}
              />
            </div>
          </div>
          <div className="pt-4 col-sm">
            <h4> Search Category</h4>
            <div className="input-group ">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa fa-search"></i>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon1"
                value={this.state.searchQuery}
                onChange={this.searchChange}
              />
            </div>
            <h4 className="pt-4 ">Add New Categories</h4>
            <input
              type="text"
              className="form-control"
              placeholder="Category Name"
              value={this.state.categoryName}
              onChange={this.categoryNameInputChange}
            />
            <br />
            <button
              onClick={
                this.state.cUpdateEn ? this.updateCategory : this.addCategory
              }
              className="button mb-4"
            >
              {this.state.cUpdateEn ? "Update" : "Add"}
            </button>
           
            <Alert
              show={this.state.catAlert}
              theme={this.state.catAlertTheme}
              msg={this.state.catAlertMsg}
              hideAlert={this.hideAlert}
            />
          </div>
        </div>
        <br />
        <hr className="mt-4 mb-4" />
      </Wrapper>
    );
  }

  categoryNameInputChange = (e) => {
    this.setState({ categoryName: e.target.value });
  };

  searchChange = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    this.setState({ searchQuery }, () => this.filterList());
  };

  handleCategoryUpdate = (category) => {
    this.setState({
      cUpdateEn: true,
      cUpdateId: category._id,
      categoryName: category.name,
    });
  };

  hideAlert = () => {
    this.setState({
      catAlert: false,
    });
  };

  filterList() {
    let categories = this.state.categories;
    let q = this.state.searchQuery;

    categories = categories.filter(function (item) {
      return item.name.toLowerCase().indexOf(q) != -1; // returns true or false
    });
    this.setState({ filteredCategory: categories });
  }

  async addCategory() {
    if (this.state.categoryName.trim() !== "") {
      try {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: Auth.getToken(),
          },
          body: JSON.stringify({ name: this.state.categoryName }),
        };
        await fetch("http://localhost:5000/admin/category", requestOptions);
        this.loadCategories();
        this.setState({
          categoryName: "",
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      this.setState({
        catAlert: true,
        catAlertMsg: "Category Name can't be Empty!",
        catAlertTheme: "danger",
      });
    }
  }

  async loadCategories() {
    try {
      const res = await fetch("http://localhost:5000/admin/category");
      const data = await res.json();
      //updateing state with lastest data
      this.setState({
        categories: data,
        filteredCategory: data,
        searchQuery: "",
      });
    } catch (e) {
      //if failed to communicate with api this code block will run
      console.log(e);
    }
  }

  async deleteCategory(id) {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json", token: Auth.getToken() },
        body: JSON.stringify({ id: id }),
      };
      await fetch("http://localhost:5000/admin/category", requestOptions);
      this.loadCategories();
    } catch (e) {
      console.log(e);
    }
  }

  async updateCategory() {
    if (this.state.categoryName.trim() !== "") {
      try {
        const requestOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: Auth.getToken(),
          },
          body: JSON.stringify({
            id: this.state.cUpdateId,
            name: this.state.categoryName,
          }),
        };
        await fetch("http://localhost:5000/admin/category", requestOptions);
        this.loadCategories();
        this.setState({
          categoryName: "",
          cUpdateEn: false,
          cUpdateId: null,
        });
      } catch (e) {
        console.log(e);
      }
    }else {
      this.setState({
        catAlert: true,
        catAlertMsg: "Category Name can't be Empty!",
        catAlertTheme: "danger",
      });
    }
  }
}
export default CategoryManage;
