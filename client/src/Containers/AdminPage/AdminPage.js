import React, { Component } from "react";
import CategoryManage from "../AdminCategoryManage/CategoryManage";
import StoreManagerManage from "../../Containers/AdminMangeSM/AdminManageSM";
import Banner from "../../Components/Banner/Banner";
import "./AdminPage.css";
import SiteOverviewAdmin from "../../Components/SiteOverviewAdmin/SiteOverviewAdmin";
import Auth from "../../Authentication/Auth";

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.category = React.createRef();
    this.manager = React.createRef();
    this.loadStats = this.loadStats.bind(this);
    this.state = {
      stats: null,
      userRegAlert: false,
      userRegMsg: "",
      userRegTheme: "",
      fname: "",
      lname: "",
      email: "",
    };
  }

  async componentDidMount() {
    this.loadStats();

    if (this.props.match.params.id == ":mc") {
      this.scrollToCategories();
    } else if (this.props.match.params.id == ":msm") {
      this.scrollToManagers();
    }
  }

  render() {
    console.log(this.props.match.params.id);

    return (
      <div>
        <Banner
          name="Administrator"
          description="Manage Categories and Store Managers"
          admin={true}
          scrollAdminCategories={this.scrollToCategories}
          scrollAdminManagers={this.scrollToManagers}
        />
        <br />
        <div className="container pt-4">
          <SiteOverviewAdmin stats={this.state.stats} />
          <br />
          <h2 ref={this.category} className="pt-4 mt-4">
            Manage Categories
          </h2>
          <CategoryManage />
          <h2 ref={this.manager} className="pt-4 mt-4">
            Manage Store Managers
          </h2>
          <StoreManagerManage />
        </div>
      </div>
    );
  }
  parseJwt = (token) => {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  };

  scrollToCategories = () =>
    window.scrollTo(0, this.category.current.offsetTop - 100);
  scrollToManagers = () =>
    window.scrollTo(0, this.manager.current.offsetTop - 100);

  async loadStats() {
    try {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: Auth.getToken(),
        },
      };
      const res = await fetch(
        "http://localhost:5000/admin/stats",
        requestOptions
      );
      const data = await res.json();
      //updateing state with lastest data
      this.setState({
        stats: data,
      });
    } catch (e) {
      //if failed to communicate with api this code block will run
      console.log(e);
    }
  }
}

export default AdminPage;
