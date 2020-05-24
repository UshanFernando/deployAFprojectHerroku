import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import StoreManagerBanner from "../../Components/StoreManagerComponets/StoreManagerBanner";
import StoreManagerAddproductCom from "../../Components/StoreManagerComponets/StoreManagerAddproductCom";
import ListProdctsInStoreMangerPage from "../../Components/StoreManagerComponets/ListProdctsInStoreMangerPage";
import axios from 'axios';
class StoreManagerPage extends Component {

    constructor(props) {
        super(props)
        this.myRef = React.createRef()
    }



    state = {
        Products: [],
        Productname: '',
        Category: '',
        Price: 0,
        Discount: 0,
        Description: '',
        Imageurl: '',
        File: '',
        ProductCategories: [],
        productnameinputField: '',
        CategoryinputField: '',
        priceinputField: '',
        discountinputField: '',
        productDetailsinputField: '',
        productinputImageurl: '',
        TableCategoryFilter: '',
        IsUpdate: false, //checking List_update button pressed
        IsImagedbuttonpressed: false,
        updatingproductId: '',
        hasProductNameError: false,
        hasProductPriceError: false,
        hasProductDiscountError: false,
        hasproductDescriptionError: false


    }


    componentDidMount() {

        this.LoadCategories();


    }

    LoadCategories = () => {

        let catagories;
        let catagory;
        axios.get('http://localhost:5000/admin/category')
            .then(response => {
                if (response.data.length > 0) {
                    catagories = response.data;
                    catagory = response.data[0].name;
                }
                else {
                    catagories = ['Mens', 'Women', 'Child'];
                    catagory = catagories[0].name;
                }
                this.setState({
                    ProductCategories: catagories,
                    TableCategoryFilter: catagory,
                    Category: catagory
                });

                this.LoadList(catagory);
            })
            .catch(error => {
                console.log(error);
            });


        console.log("Loader" + this.state.IsImagedbuttonpressed);
    }




    imagePickedHandler = (e) => {
        let url;

        console.log("uploadimage")
        if (e.target.files && e.target.files.length === 1) {
            console.log("files: " + e.target.files.length)
            console.log("filename: " + e.target.files[0])
            this.setState({
                IsImagedbuttonpressed: true

            }, () => {
                console.log("Image changed" + this.state.IsImagedbuttonpressed);
            });

            let fileReader = new FileReader();
            fileReader.onload = () => {
                url = fileReader.result;
                this.setState({
                    Imageurl: url,

                });
            }
            fileReader.readAsDataURL(e.target.files[0]);
            this.setState({
                File: e.target.files[0],

            });



        }

    }
    ProductNameChangedhandler = (e) => {
        if (e.target.value.trim().length > 0) {
            this.setState({
                Productname: e.target.value,
                hasProductNameError: false
            });
            console.log("product valid");
        } else {
            this.setState({
                Productname: '',
                hasProductNameError: true
            });

        }
    }

    ProdutCategoryChangedhandler = (e) => {
        this.setState({
            Category: e.target.value
        });
        console.log(" ProdutCategoryChangedhandler");
    }

    ProductPriceChangedhandler = (e) => {
        if (!isNaN(e.target.value)) {
            console.log("price valid");
            this.setState({
                Price: e.target.value,
                hasProductPriceError: false
            });
        } else {
            this.setState({
                Price: 0,
                hasProductPriceError: true
            });
            console.log("discount invalid");
        }
    }

    DiscountChangedhandler = (e) => {
        if (!isNaN(e.target.value)) {
            console.log("discount valid");
            this.setState({
                Discount: e.target.value,
                hasProductDiscountError: false
            });
        } else {
            this.setState({
                Discount: 0,
                hasProductDiscountError: true
            });
            console.log("discount invalid");
        }
    }
    DiscriptionChangedhandler = (e) => {
        if (e.target.value.trim().length > 0) {
            console.log("Descrition valid");
            this.setState({
                Description: e.target.value,
                hasproductDescriptionError: false
            });
        }
        else {
            this.setState({
                Description: '',
                hasproductDescriptionError: true
            });
            console.log("Descrition Invalid");
        }

    }

    LoadList = (categoryname) => {

        axios.get(`http://localhost:5000/storemanger/products/category/${categoryname}`)
            .then(response => {

                this.setState({
                    Products: response.data,
                    File: '',
                    Imageurl: '',
                    Productname: '',
                    Price: '',
                    Discount: '',
                    Description: '',
                    IsUpdate: false,
                    IsImagedbuttonpressed: false,
                    updatingproductId: '',
                    hasProductNameError: false,
                    hasProductPriceError: false,
                    hasProductDiscountError: false,
                    hasproductDescriptionError: false

                });
            })
            .catch(error => {
                console.log(error);
            });

    }
    TableCategoryFilterChangeHandler = (e) => {

        console.log("TableCategoryFilterChangeHandler");
        this.LoadList(e.target.value);
        this.setState({

            TableCategoryFilter: e.target.value
        });






    }
    updateProductsHandler = (id) => {

        axios.get(`http://localhost:5000/storemanger/products/${id}`).then(res => {

            // console.log((typeof id)=="string");
            this.setState({
                Imageurl: `http://localhost:5000/${res.data.productImage}`,
                Productname: res.data.productname,
                Category: res.data.category,
                Price: res.data.price,
                Discount: res.data.discount,
                Description: res.data.description,
                IsUpdate: true,
                IsImagedbuttonpressed: false,
                updatingproductId: id

            });

            this.scrollToMyRef();
            //console.log(this.state.IsUpdate);

        })
            .catch(error => {
                console.log(error);
            });

    }

    DeleteProductsHandler = (id) => {


        axios.delete(`http://localhost:5000/storemanger/products/${id}`).then(res => {
            console.log(res);
            this.setState({

                TableCategoryFilter: this.state.Category,
                IsImagedbuttonpressed: false
            });

            console.log(this.state.Category);
            this.LoadList(this.state.Category);

        })
            .catch(error => {
                console.log(error);
            });

    }


    SubmitDetailsHandler = (e) => {
        e.preventDefault();

        let upd = this.state.IsUpdate;
        let btpress = this.state.IsImagedbuttonpressed;

        if (upd && btpress) {
            const sinfile = new FormData();
            sinfile.append('productname', this.state.Productname);
            sinfile.append('category', this.state.Category);
            sinfile.append('price', this.state.Price);
            sinfile.append('discount', this.state.Discount);
            sinfile.append('description', this.state.Description);
            sinfile.append('productImage', this.state.File);


            axios.patch(`http://localhost:5000/storemanger/products/${this.state.updatingproductId}`, sinfile).then(res => {
                this.setState({

                    TableCategoryFilter: res.data.category,
                    IsImagedbuttonpressed: false
                });

                console.log(this.state.Category);
                this.LoadList(this.state.Category);

            })
                .catch(error => {
                    console.log(error);
                });

        }
        else if (upd && !(btpress)) {
            const sinfile = new FormData();
            sinfile.append('productname', this.state.Productname);
            sinfile.append('category', this.state.Category);
            sinfile.append('price', this.state.Price);
            sinfile.append('discount', this.state.Discount);
            sinfile.append('description', this.state.Description);



            axios.patch(`http://localhost:5000/storemanger/products/${this.state.updatingproductId}`, sinfile).then(res => {
                this.setState({

                    TableCategoryFilter: this.state.Category,
                    IsImagedbuttonpressed: false
                });

                console.log(this.state.Category);
                this.LoadList(this.state.Category);

            }).catch(error => {
                console.log(error);
            });



        }
        else {

            const sinfile = new FormData();
            sinfile.append('productname', this.state.Productname);
            sinfile.append('category', this.state.Category);
            sinfile.append('price', this.state.Price);
            sinfile.append('discount', this.state.Discount);
            sinfile.append('description', this.state.Description);
            sinfile.append('productImage', this.state.File);


            axios.post('http://localhost:5000/storemanger/products', sinfile).then(res => {
                this.setState({

                    TableCategoryFilter: this.state.Category,
                    IsImagedbuttonpressed: false
                });

                console.log(this.state.Category);
                this.LoadList(this.state.Category);

            })
                .catch(error => {
                    console.log(error);

                });

        }


    }
    scrollToMyRef = () => window.scrollTo(0, this.myRef.current.offsetTop);//scrolling when updating
    render() {
        return (
            <div>
                <StoreManagerBanner />
                <div className="container pt-4">
                    <div className="row ">
                        <div className="col-sm ">
                            <h4 class="pt-4 " ref={this.myRef}>Add New product</h4>

                            <StoreManagerAddproductCom categories={this.state.ProductCategories}
                                imagePickedHandler={this.imagePickedHandler}
                                ProductNameChangedhandler={this.ProductNameChangedhandler}
                                ProdutCategoryChangedhandler={this.ProdutCategoryChangedhandler}
                                ProductPriceChangedhandler={this.ProductPriceChangedhandler}
                                DiscountChangedhandler={this.DiscountChangedhandler}
                                DiscriptionChangedhandler={this.DiscriptionChangedhandler}
                                Imageurl={this.state.Imageurl}
                                SubmitDetailsHandler={this.SubmitDetailsHandler}
                                Category={this.state.Category}
                                Productname={this.state.Productname}
                                Price={this.state.Price}
                                Discount={this.state.Discount}
                                Description={this.state.Description}
                                IsUpdate={this.state.IsUpdate}

                                hasProductNameError={this.state.hasProductNameError}
                                hasProductPriceError={this.state.hasProductPriceError}
                                hasProductDiscountError={this.state.hasProductDiscountError}
                                hasproductDescriptionError={this.state.hasproductDescriptionError}

                            />

                        </div>

                    </div>
                    <div className="row ">
                        <div className="col-sm ">
                            <h4 className="pt-4 m-4 ">Update/Delete A Product</h4>

                            <div className="productmangFiltercatergry">


                                <ListProdctsInStoreMangerPage TableCategoryFilter={this.state.TableCategoryFilter}
                                    TableCategoryFilterChangeHandler={this.TableCategoryFilterChangeHandler}
                                    categories={this.state.ProductCategories}
                                    Products={this.state.Products}
                                    updateProductsHandler={this.updateProductsHandler}
                                    DeleteProductsHandler={this.DeleteProductsHandler}
                                />

                            </div>

                        </div>

                    </div>

                </div>


            </div>
        );


    }


}

export default StoreManagerPage;