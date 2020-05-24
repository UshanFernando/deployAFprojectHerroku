import React, { Component } from 'react'
import Auth from '../../Authentication/Auth';
import { Redirect } from 'react-router-dom';
class ProductView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: "",
            redirect:false,
            qty: 1,
            id: props.pId,
            productname: "",
            category: "",
            price: 0,
            discount: 0,
            description: "",
            productImage: "",
            products: [],
            serverAdd: "http://localhost:5000/"

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadProduct = this.loadProduct.bind(this);
        this.handleWishlistSubmit = this.handleWishlistSubmit.bind(this);

    }
    async componentDidMount() {
        this.loadProduct();
    }
    async loadProduct() {

        try {

            const res = await fetch("http://localhost:5000/storemanger/products/" + this.state.id);
            const data = await res.json();

            //updateing state with lastest data
            this.setState({
                products: data,
                productname: data.productname,
                category: data.category,
                price: data.price,
                discount: data.discount,
                description: data.description,
                productImage: data.productImage,
            });
            
        } catch (e) {
            //if failed to communicate with api this code block will run
            console.log(e);
        }

    }
    async handleSubmit(event) {
        event.preventDefault();

        if(Auth.isAuthenticated()){
            let userId=Auth.getUserId();
        const res1 = await fetch("http://localhost:5000/cart/count/" + userId + "/" + this.state.id);
        const data1 = await res1.json();
        
        if (data1 == 0) {
            const res = await fetch("http://localhost:5000/storemanger/products/" + this.state.id);
            const data = await res.json();

            if (this.state.id != null) {
                try {
                    const requestOptions = {
                        method: "POST",
                        headers: { "Content-Type": "application/json", "token": Auth.getToken() },
                        body: JSON.stringify({
                            user: userId,
                            product: this.state.products,
                            quantity: this.state.qty
                        }),
                    };
                    await fetch(
                        "http://localhost:5000/cart/newCart",
                        requestOptions
                    );

                    this.setState({

                        qty: 1
                    });
                } catch (e) {
                    console.log(e);
                }
                alert("One item added to the Cart");
            }
        } else {
            alert("You have already added this product to the cart");
        }
    }else{
        this.setState({
            redirect:true
        })
    }



    }
    async handleWishlistSubmit(event) {
        event.preventDefault();
        if(Auth.isAuthenticated()){
            let userId=Auth.getUserId();
        const res1 = await fetch("http://localhost:5000/wishList/count/" + userId + "/" + this.state.id);
        const data1 = await res1.json();
       
        if (data1 == 0) {

            if (this.state.id != null) {
                try {
                    const requestOptions = {
                        method: "POST",
                        headers: { "Content-Type": "application/json", "token": Auth.getToken() },
                        body: JSON.stringify({
                            user: userId,
                            product: this.state.id,
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
            alert("You have already added this product to the Wish List");
        }
    }else{
        this.setState({
            redirect:true
        })

    }


    }

    qtyIncrement(qty) {

        this.setState({
            qty: ++qty
        });

    }
    qtyDecrement(qty) {
        if (qty > 1) {
            this.setState({
                qty: --qty

            });
        }
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to="/login" />;
          }

        return (
            <div className="container">
                <div className="row s_product_inner">
                    <div className="col-lg-6">
                        <div className="owl-carousel owl-theme s_Product_carousel">
                            <div className="single-prd-item">
                                <img className="img-fluid" src={this.state.serverAdd + this.state.productImage} alt={this.state.serverAdd + this.state.productImage} />
                            </div>

                        </div>
                    </div>
                    <div className="col-lg-5 offset-lg-1">
                        <div className="s_product_text">
                            <h3>{this.state.productname}</h3>
                            <h2>Rs.{this.state.price}</h2>
                            <ul className="list">
                                <li><a className="active" href="#"><span>Category</span> : {this.state.category}</a></li>
                                <li><a href><span>Discount</span> : {this.state.discount}% Off</a></li>
                            </ul>
                            <p >{this.state.description}</p>

                            <div className="product_count">
                                <label >Quantity:</label>
                                <input type="text" name="qty" id="sst" size="2"  value={this.state.qty} title="Quantity:" className="input-text qty " />
                                <button id="up"
                                    className="increase " type="button"><i className="fas fa-angle-up" onClick={() => this.qtyIncrement(this.state.qty)}></i></button>
                                <button id="down"
                                    className="reduced " type="button"><i className="fas fa-angle-down" onClick={() => this.qtyDecrement(this.state.qty)}></i></button>

                            </div>
                            <button type="submit" id="addToCart" className="button primary-btn" onClick={this.handleSubmit}>Add to Cart</button>
                            <div className="card_area d-flex align-items-center">

                                <a className="icon_btn" href onClick={this.handleWishlistSubmit} title="Add to Wish List"><i className="fas fa-heart "></i></a>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        )
    }


}

export default ProductView