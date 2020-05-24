import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import Auth from '../Authentication/Auth';


class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user:"",
            redirect:false,
            serverAdd: "http://localhost:5000/",
            categories: [],
            qty:0,
            search:"",
            products: []
        };
        
        this.loadCategories = this.loadCategories.bind(this);
        this.loadProducts = this.loadProducts.bind(this);

    }
    async componentDidMount() {
        if(Auth.isAuthenticated()){
            this.setState({
                user:Auth.getUserId()
            })
           
        }
        this.loadCategories();
        this.loadProducts();
    }
    async loadCategories() {
        try {
            const res = await fetch("http://localhost:5000/category/category");
            const categories = await res.json();

            //updateing state with lastest data
            this.setState({
                categories: categories,
            });

        } catch (e) {
            //if failed to communicate with api this code block will run
            console.log(e);
        }

    }
    async loadProducts(catName) {
        
        try {
        if(catName!=null){
            const res = await fetch("http://localhost:5000/category/category/"+catName);
            const products = await res.json();
           
            //updateing state with lastest data
            this.setState({
                products: products
            });
        }else{
            const res = await fetch("http://localhost:5000/storemanger/products/");
            const products = await res.json();
            //updateing state with lastest data
            this.setState({
                products: products
            });
        }
        } catch (e) {
            //if failed to communicate with api this code block will run
            console.log(e);
        }

    }
    handleChange(event) {
        const val = event.target.value;
       
          this.setState({
            search: val
          })
       
      }
      async handleSubmit(event) {
        event.preventDefault();
        const val = this.state.search;
        const res = await fetch("http://localhost:5000/category/search/"+val);
        const products = await res.json();
          this.setState({
            products: products
          })
          this.loadProducts();
       
      }
      async handleWishlistSubmit(id) {
     
        if(Auth.isAuthenticated()){
        const res1 = await fetch("http://localhost:5000/wishList/count/" + this.state.user + "/" + id);
        const data1 = await res1.json();
        if(data1==0){
        if (this.state.user != null) {
            try {
                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json","token":Auth.getToken() },
                    body: JSON.stringify({
                        user: this.state.user,
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
        }else{
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
        let categoryList;
        let productList;
        if (this.state.categories != null) {
            categoryList = this.state.categories.map((cat, index) => {
                return (
                    <li key={cat._id} className="filter-list"><input onClick={() => this.loadProducts(cat.name)} className="pixel-radio cat" type="radio" id="" name="brand" /><label for="footwear">{cat.name}<span></span></label></li>
                )

            })
        }
        if (this.state.products != null) {
            productList = this.state.products.map((prd, index) => {
                return (
                    <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                        <div >
                            <div className="card text-center card-product  zoom" >
                                
                                <div className="card-product__img">
                                    <img id="prdImage"  prdImage className="card-img" src={this.state.serverAdd+prd.productImage} alt={this.state.serverAdd+prd.productImage} />

                                    <ul className="card-product__imgOverlay">
                                        <a href={'sp/'+prd._id}><li><button ><i className="ti-search"></i></button></li></a>
                                        <li></li>
                                        <li onClick={()=>this.handleWishlistSubmit(prd._id)}><button><i className="ti-heart"></i></button></li>
                                    </ul>
                                </div>

                                <div className="card-body p-0 m-0">
                                   
                                        <h4 className="card-product__title p-0 m-0"><a href={'sp/'+prd._id} >{prd.productname}</a></h4>
                                        <p className="card-product__price p-0 m-0">Rs.{prd.price}</p>
                                        <p className="card-product__price p-0 m-0">{prd.discount}% Off</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            })
        }
        return (
            <div>
                <section className="blog-banner-area" id="category">
                    <div className="container h-100">
                        <div className="blog-banner">
                            <div className="text-center">
                                <h1>Shop Category</h1>
                                <nav aria-label="breadcrumb" className="banner-breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Shop Category</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>




                <section className="section-margin--small mb-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-3 col-lg-3 col-md-5">
                                <div className="sidebar-categories">
                                    <div className="head">Browse Categories</div>
                                    <ul className="main-categories">
                                        <li className="common-filter">
                                            <form action="#">
                                                <ul>
                                                    {categoryList}
                                                </ul>
                                            </form>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                            <div className="col-xl-9 col-lg-8 col-md-7">

                                <div className="filter-bar d-flex flex-wrap align-items-center">
                                    <div className="sorting">
                                        {/* <select className="sortItems">
                                            <option value="1">Popularity</option>
                                            <option value="2">Price low to high</option>
                                            <option value="3">Price high to low</option>
                                        </select> */}
                                    </div>
                                    <div className="sorting mr-auto">
                                        {/* <select className="limitItems">
                                            <option value="12">Show 12</option>
                                            <option value="24">Show 24</option>
                                        </select> */}
                                    </div>
                                    <div>
                                        <form onSubmit={(event) => this.handleSubmit(event)}>
                                        <div className="input-group filter-bar-search">
                                            
                                            <input type="text" placeholder="Search" onChange={(event) => this.handleChange(event)} value={this.state.search} required/>
                                            <div className="input-group-append">
                                                <button type="submit"><i className="ti-search"o></i></button>
                                            </div>
                                            
                                        </div>
                                        </form>
                                    </div>
                                </div>
                                <section className="lattest-product-area pb-40 category-list">

                                <div id="selling_cat">
                                <div className="row" >
                                        {productList}
                                </div>
                                </div>
                                        </section>


                            </div>

                        </div>
                    </div>

                </section>
            </div >

        )
    }






}




export default Category












