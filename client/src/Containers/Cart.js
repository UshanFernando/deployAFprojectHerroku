import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import Auth from '../Authentication/Auth';


class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: "",
            redirrect:false,
            name: "",
            message: "",
            total: 0,
            district: 0,
            ship:0,
            shipping:0,
            subtotal: 0.0,
            serverAdd: "http://localhost:5000/",
            cartProducts: []
        };

        this.loadCartProducts = this.loadCartProducts.bind(this);
        this.singleTotal = this.singleTotal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.deleteCart = this.deleteCart.bind(this);
        this.updateCart = this.updateCart.bind(this);

    }
    async componentDidMount() {
        this.loadCartProducts();
    }
    async loadCartProducts() {
        if(Auth.isAuthenticated()){
        try {
            
            const res = await fetch("http://localhost:5000/cart/cartz/" + Auth.getUserId());
            const data = await res.json();
            let sub=0;
            data.map((item) => {
                item.total =  item.quantity * (item.product.price * (100 - item.product.discount) / 100)
                sub = sub + item.total 
            });
            
            //updateing state with lastest data
            this.setState({
                cartProducts: data,
                subtotal:sub
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
    async deleteCart(id) {
        
        try {
          const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json","token":Auth.getToken() },
            
          };
          await fetch("http://localhost:5000/cart/carts/"+id, requestOptions);
          
          this.loadCartProducts();
        } catch (e) {
          console.log(e);
        }
      }
      async updateCart(id) {
        try {
          const items = this.state.cartProducts;
          let Cart=items.filter(item => item._id==id).map(item => {
            return item;
          })
          
          
          const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json","token":Auth.getToken() },
            
            body: JSON.stringify({
              id: Cart[0]._id,
              quantity: Cart[0].quantity
            }),
          };
          await fetch("http://localhost:5000/cart/carts", requestOptions);
          alert("Updated");
        
        } catch (e) {
          console.log(e);
        }
      }
    
    handleChange(event) {
        
        const target = event.target;
        const value =  target.value
        const name= target.name;
        
       
        this.setState({
            [name]:value,  
        });
        
        this.setState({
            
            shipping:  parseInt(this.state.district) + parseInt(this.state.ship)
        
        });
    
    }
    singleTotal(id) {
            
        let items = this.state.cartProducts;
        let sub=0;
        items.map(item => {
            if (item._id === id) {
                item.total = item.quantity * (item.product.price * (100 - item.product.discount) / 100)

            }
            sub=sub+item.total
        })

        this.setState({
            cartProducts: items,
            subtotal: sub
        })

    }

    qtyIncrement(id) {

        const items = this.state.cartProducts;
        items.map(item => {
            if (item._id === id) {
                item.quantity = item.quantity + 1;

            }
        })
        this.setState({
            cartProducts: items
        })
        this.updateCart(id)
        this.singleTotal(id);
    }
    qtyDecrement(id) {
        const items = this.state.cartProducts;
        items.map(item => {
            if (item._id === id && item.quantity > 0) {
                item.quantity = item.quantity - 1;

            }

        })
        this.setState({
            cartProducts: items
        })
        this.updateCart(id)
        this.singleTotal(id);
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to="/login" />;
          }

        let cartList;
        if (this.state.cartProducts != null) {
            cartList = this.state.cartProducts.map((item, index) => {

                return (<tr>
                    <td>
                        <div className="media">
                            <div className="my-4 mr-3">
                                <button id="" type="button" className="page-link"onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteCart(item._id) } }><i className="fas fa-trash-alt" ></i>
                                </button>
                            </div>
                            <a href={'/sp/'+item.product._id}>
                            <div className="d-flex" height="100px">
                                <img width="150px" src={this.state.serverAdd + item.product.productImage} alt={this.state.serverAdd + item.product.productImage} />
                            </div></a>
                            
                            <div className="media-body">
                            <a href={'/sp/'+item.product._id}> <p>{item.product.productname}</p></a>
                            </div>
                            
                        </div>
                    </td>
                    <td>
                        <h5>Rs.{item.product.price}</h5>
                    </td>
                    <td >
                        <div className="product_count">

                            <input type="text" name="qty" id="" title="Quantity:"
                                className="input-text qty" value={item.quantity}  />

                            <button id="up"
                                className="increase " type="button" onClick={() => this.qtyIncrement(item._id)}><i className="fas fa-angle-up"></i></button>
                            <button id="down"
                                className="reduced " type="button"><i className="fas fa-angle-down" onClick={() => this.qtyDecrement(item._id)}></i></button>
                        </div>
                    </td>
                    <td >
                        <h5>Rs.{item.total}</h5>
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
                                <h1>Shopping Cart</h1>
                                <nav aria-label="breadcrumb" className="banner-breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Shopping Cart</li>
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
                                                    <th scope="col">Quantity</th>
                                                    <th scope="col">Total</th>

                                                </tr>
                                            </thead>
                                            <tbody >


                                                {cartList}

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
                        <section className="checkout_area section-margin--small mt-0">
                            <div className="container">

                                <div className="billing_details">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <h3>Shipping Details</h3>
                                            <form className="row contact_form" action="" method="post" id="shipping-form" >



                                                <div className="col-md-12 ">
                                                    <span className="placeholder mb-2" data-placeholder="Town/City"><strong>Method</strong></span>
                                                    <ul className="list ">
                                                        <li className=" ml-3"><label className="float-left">Domex<span></span></label><input className="pixel-radio float-right " type="radio" value="500" name="ship" onClick={(e)=>this.handleChange(e)}/></li>
                                                    </ul>
                                                </div>
                                                <div className="col-md-12 ">

                                                    <ul className="list ">

                                                        <li className="ml-3  "><span className="float-left">Local Post</span><input className="pixel-radio float-right " type="radio" value="100" name="ship" onClick={(e)=>this.handleChange(e)} /></li>

                                                    </ul>
                                                </div>

                                                <div className="col-md-12 form-group p_star">
                                                    <span className="placeholder mb-2" data-placeholder="Town/City"><strong>Shipping Location</strong></span>
                                                    <select className="country_select ml-2" id="district" name="district" onChange={(e)=>this.handleChange(e)}>
                                                        <option value="0">Select a District</option>
                                                        <option value="150">Colombo</option>
                                                        <option value="250">Other</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-12 form-group p_star">
                                                    <span className="placeholder mb-2" data-placeholder="Town/City"><strong>Zip Code</strong></span>
                                                    <input type="text" className="form-control ml-2" id="city" placeholder="600##" name="zip" />

                                                </div>

                                            </form>
                                        </div>

                                        <div className="col-lg-5 ml-5">
                                            <div className="order_box">
                                                <h2>Your Order</h2>

                                                <ul className="list list_2">
                                                    <li><a href="#">Subtotal <span id="subt">{this.state.subtotal}</span><span>Rs.</span></a></li>
                                                    <li><a href="#">Shipping <span id="shippingPrice" >{this.state.shipping}</span><span>Rs.</span></a></li>
                                                    <li><a href="#">Total <strong ><span id="tot">{this.state.subtotal + this.state.shipping}</span><span>Rs.</span></strong></a></li>
                                                </ul>

                                                <div className="text-center">
                                                    <button className="button button-paypal" id="shippingSubmit">Proceed to Checkout</button>
                                                </div>
                                            </div>
                                        </div>
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

export default Cart