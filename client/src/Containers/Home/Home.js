import React, { Component } from "react";
import Auth from '../../Authentication/Auth';
import axios from "axios";
import Section1 from "../../Components/HomePage/Section1";
import { Redirect } from 'react-router-dom';
import Alert from "../../Components/Alert/Alert";


class Home extends Component {
  constructor(props) {
    super(props);

    let usrID = null;
    if (Auth.isAuthenticated()) {
      usrID = Auth.getUserId();
    }

    this.state = {
      redirect:false,
      user: "",
      serverAdd: "http://localhost:5000/",
      products: [],
      qty: 0,
      itemClicked: false,
      selectedProduct: null
    };
    this.loadComments = this.loadComments.bind(this);
  }

  async componentDidMount() {
    this.loadComments();
  }
  async loadComments() {
    try {
      const res = await fetch("http://localhost:5000/storemanger/products/");
      const data = await res.json();
      //updateing state with lastest data
      this.setState({
        products: data,
      });
    } catch (e) {
      //if failed to communicate with api this code block will run
      console.log(e);
    }
  }
  async handleWishlistSubmit(id) {

    if(Auth.isAuthenticated()){
      let userId=Auth.getUserId() ;
    const res1 = await fetch("http://localhost:5000/wishList/count/" + userId + "/" + id);
    const data1 = await res1.json();
    if (data1 == 0) {

      if (this.state.products != null) {
        try {
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json", "token": Auth.getToken() },
            body: JSON.stringify({
              user: userId,
              product: id,
              quantity: this.state.qty
            }),
          };
          await fetch(
            "http://localhost:5000/wishList/newWishList",
            requestOptions
          );
          this.setState({
            qty: 1
          });
        } catch (e) {
          console.log(e);
        }
        alert("One item added to the Wish List");
      }
    } else {
      alert("You have already added this item to the Wish List");
    }
    }else{
      this.setState({
        redirect:true
      })
      
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }
    let productlist;
    if (this.state.products != null) {

      // return (<Redirect to={{
      //   pathname: '/sp/:'+this.state.selectedProduct,

      // }} />)
      productlist = this.state.products.map((product, index) => {
        if (index < 8) {
          return (
            <div className="col-md-6 col-lg-4 col-xl-3" key={index} >

              <div className="card text-center card-product">
                <div className="card-product__img">
                  <img
                    id="prdImage"
                    src={this.state.serverAdd + product.productImage}
                  />
                  <ul className="card-product__imgOverlay">
                    <a href={'sp/' + product._id}><li>
                      <button>
                        <i className="ti-search"></i>
                      </button>
                    </li></a>
                    <li>

                    </li>

                    <li onClick={() => this.handleWishlistSubmit(product._id)}><button><i class="ti-heart"></i></button></li>

                  </ul>
                </div>
                <div className="card-body">
                  <p>{product.category}</p>
                  <h4 className="card-product__title">
                    <a href={'/sp/' + product._id}>{product.productname}</a>
                  </h4>
                  <p className="card-product__price">Rs.{product.price}</p>
                  <p className="card-product__price">{product.discount}% Off</p>
                </div>
              </div>
            </div>
          );
        }
      });
    }


    return (
      <div>
        <section className="hero-banner">
          <div className="container">
            <div className="row no-gutters align-items-center pt-60px">
              <div className="col-5 d-none d-sm-block">
                <div className="hero-banner__img">
                  <img src={require("../../Components/img/hero-banner.png")} />
                </div>
              </div>
              <div className="col-sm-7 col-lg-6 offset-lg-1 pl-4 pl-md-5 pl-lg-0">
                <div className="hero-banner__content">
                  <h4>Shop is fun</h4>
                  <h1>Browse Our Premium Product</h1>
                  <p>
                    Us which over of signs divide dominion deep fill bring
                    they're meat beho upon own earth without morning over third.
                    Their male dry. They are great appear whose land fly grass.
                  </p>
                  <a className="button button-hero" href="/shop">
                    Browse Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* start */}

        <section className="section-margin mt-0">
          <div className="owl-carousel owl-theme hero-carousel">
            {/* {firstsection} */}
          </div>
        </section>

        {/* end */}

        <section className="section-margin calc-60px">
          <div className="container">
            <div className="section-intro pb-60px">
              <p>Popular Item in the market</p>
              <h2>
                Trending <span className="section-intro__style">Product</span>
              </h2>
            </div>
            <div className="row">{productlist}</div>
          </div>
        </section>

        <section
          className="offer"
          id="parallax-1"
          data-anchor-target="#parallax-1"
          data-300-top="background-position: 20px 30px"
          data-top-bottom="background-position: 0 20px"
        >
          <div className="container">
            <div className="row">
              <div className="col-xl-5">
                <div className="offer__content text-center">
                  <h3>Up To 50% Off</h3>
                  <h4>Winter Sale</h4>
                  <p>Him she'd let them sixth saw light</p>
                  <a className="button button--active mt-3 mt-xl-4" href="/shop">
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>


      </div>
    );
  }

  handleProductClick = (prop) => {
    this.setState({
      itemClicked: true,
      selectedProduct: prop._id
    })
  }
  // singleProductView = () => {
  //   if (this.state.itemClicked)
  //      return <Redirect to='/sp'  />
  //  }
}

export default Home;
