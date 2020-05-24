import React, { Component } from 'react';
import Auth from '../Authentication/Auth';
import { Redirect } from 'react-router-dom';
class WishList extends Component {
  constructor(props) {
    super(props);

    this.state = {
        user:"",
        redirrect:false,
        name: "",
        message: "",
        total: 0,
        district: 0,
        ship:0,
        shipping:0,
        subtotal: 0.0,
        serverAdd: "http://localhost:5000/",
        wishProducts: []
    };
}
async componentDidMount() {
  this.loadCartProducts();
}

async loadCartProducts() {
  if(Auth.isAuthenticated()){

  try {

      const res = await fetch("http://localhost:5000/wishList/wishlists/" + Auth.getUserId());
      const data = await res.json();
     
      //updateing state with lastest data
      this.setState({
          wishProducts: data,
      });
  } catch (e) {
      //if failed to communicate with api this code block will run
      console.log(e);
  }
}else{
  this.setState({
    redirect:true
  })
}
}
async deleteWishlist(id) {
        
  try {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json","token":Auth.getToken() },
      
    };
    await fetch("http://localhost:5000/wishList/wishlists/"+id, requestOptions);
    
    this.loadCartProducts();
  } catch (e) {
    console.log(e);
  }
}

  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }

    let wishlist;
    if (this.state.wishProducts != null) {
      wishlist = this.state.wishProducts.map((item, index) => {

        return (<tr>
          <td>
            <div className="media">
              <div className="my-4 mr-3">
                <button id="" type="button" className="page-link" onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteWishlist(item._id) }}><i className="fas fa-trash-alt" ></i>
                </button>
              </div>
              <div className="d-flex" height="100px">
                <img width="150px" src={this.state.serverAdd + item.product.productImage} alt={this.state.serverAdd + item.product.productImage} />
              </div>
              <div className="media-body">
                <p>{item.product.productname}</p>
              </div>
            </div>
          </td>
          <td>
            <h5>Rs.{item.product.price}</h5>
          </td>
          <td></td>
          <td >
            <h5><a href={'/sp/'+item.product._id}><button type="submit" id="addToCart" className="button primary-btn" onClick={this.handleSubmit}>View</button></a></h5>
          </td>
        </tr>
        )

      })
    }
    return (
      <div>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />

        <section className="blog-banner-area" id="category">
          <div className="container h-100">
            <div className="blog-banner">
              <div className="text-center">
                <h1>Wish List</h1>
                <nav aria-label="breadcrumb" className="banner-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Wish List</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>

        {/* <div className="toast m-5 alert alert-success shadow " id="myToast" style="position: fixed; top:0; right: 0;z-index:10000" data-delay="5000">
<div className="toast-header">
<img src="img/bell.png" width="20px" className="rounded mr-2" alt="..."/>
<strong className="mr-auto"> </strong>
<button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
<span aria-hidden="true">&times;</span>
</button>
</div>
<div className="toast-body">
<strong className="" style="font-size:20px;">Please fill the shipping form!</strong>
</div>
</div> */}


        <div id="cartTable">
          <div>
            <section className="cart_area mb-0">
              <div className="container ">
                <div className="cart_inner">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Product</th>
                          <th scope="col">Price</th>
                          <th scope="col"></th>
                          

                        </tr>
                      </thead>
                      <tbody >


                        {wishlist}

                        <tr className="bottom_button ">
                          <td>

                          </td>
                          <td>

                          </td>
                          <td>

                          </td>
                          <td>

                          </td>
                        </tr>





                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          
          </div>


        </div>

      </div>
    )
  }
}

export default WishList