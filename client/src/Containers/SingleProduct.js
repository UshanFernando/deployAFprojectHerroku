import React, { useState, Component } from "react";
import { render } from "@testing-library/react";


import CommentForm from "../Components/SingleProduct/CommentForm";
import CommentView from "../Components/SingleProduct/CommentView";
import ProductView from "../Components/SingleProduct/ProductView";
import NavBar from "../Components/NavBar/NavBar"
class SingleProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pid:this.props.match.params.id ,
      comments: null,
    };
  }

  refreshComments = () => {
    this.refs.accessCommentView.loadComments();
  };

  render() {
    
    return (
		<div>
			<NavBar/>
        <section className="blog-banner-area" id="blog">
          <div className="container h-100">
            <div className="blog-banner">
              <div className="text-center">
                <h1>Shop Single</h1>

                <nav aria-label="breadcrumb" className="banner-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>

                    <li className="breadcrumb-item active" aria-current="page">
                      Shop Single
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>

        <div className="product_image_area" id="cartToast">
          <ProductView pId={this.state.pid} />
        </div>

        <section className="product_description_area">
          <div className="container">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item ">
                <a
                  className="nav-link "
                  id="review-tab"
                  data-toggle="tab"
                  href
                  role="tab"
                  aria-controls="review"
                  aria-selected="false"
                >
                  Reviews
                </a>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="review"
                role="tabpanel"
                aria-labelledby="review-tab"
              >
                <div className="row">
                  <CommentView pId={this.state.pid} ref="accessCommentView" />
                  <CommentForm pId={this.state.pid} refComments={this.refreshComments}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default SingleProduct;
