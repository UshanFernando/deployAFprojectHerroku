import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Containers/StoreManagerPage/StoreManager.css";
import axios from 'axios';
class StoreManagerAddproductCom extends Component {
    render() {

        return (
            <div className="card   card-body  stockmngerform" >
                <form onSubmit={this.props.SubmitDetailsHandler}>
                    <label>Product Name: </label>
                    <div className="form-group">
                        <input type='text' required className="form-control" placeholder="add a product" onChange={this.props.ProductNameChangedhandler}
                         value={this.props.Productname}
                        />
                 {this.props.hasProductNameError && <p className="alert alert-danger mt-4">Please Type correct Product Name </p>}
                    </div>

                    <div className="form-group">
                        <label>Product Category: </label>
                        <select

                            required
                            className="form-control"
                            value={this.props.Category}
                            onChange={this.props.ProdutCategoryChangedhandler}>
                            {
                                this.props.categories.map(function (single) {
                                    return <option
                                        key={single._id} selected
                                        value={single.name}  >{single.name}
                                      
                                    </option>;
                                })
                               
                            }
                        </select>
                    </div>

                    <label>Product Price: </label>
                    <div className="form-group">
                        <input type="text" pattern="^[0-9]+(\\.[0-9]+)?$" required className="form-control" placeholder="add The Price" onChange={this.props.ProductPriceChangedhandler}
                         value={this.props.Price}
                        />
                 {this.props.hasProductPriceError && <p className="alert alert-danger  mt-4">Please Type correct price </p>}
                    </div>

                    <label>Discount </label>
                    <div className="form-group">
                        <input type='text'pattern="[0-9]*" required className="form-control" placeholder="Discount" onChange={this.props.DiscountChangedhandler}
                         value={this.props.Discount}
                        />
              {this.props.hasProductDiscountError  && <p className="alert alert-danger  mt-4">Please Type correct Product Discount </p>}
                    </div>

                    
                    <div className="storeTextArea form-group">
                        <textarea className="form-control" required placeholder="Add Products Details" rows="5" onChange={this.props.DiscriptionChangedhandler} 
                         value={this.props.Description}
                        />
                      {this.props.hasproductDescriptionError  && <p className="alert alert-danger  mt-4">Please Type correct Product Description </p>}
                    </div>


                    <div className="storeMana_ph">
                        <div className="Produ_photo_show mx-auto ">
                            {this.props.Imageurl && <img src={this.props.Imageurl} alt="Preview" />}
                        </div>
                       

                    </div>
                    <div class="file btn btn-lg btn-primary storeManageFilUpload">
                        Upload Image
                        <input type="file"
                            accept=".jpg,.png,.jpeg"
                            onChange={this.props.imagePickedHandler}
                        />
                        
                    </div>
                    {!this.props.Imageurl && <p className="alert alert-danger  mt-4">Please Select a Image and Image Size Should be Less Than 4MB,Accept only jpg,png,jpeg </p>}


                    <button type="submit" className={
                        this.props. IsUpdate ? "btn btn-block btn-success mt-3"
                            : "btn btn-block btn-primary mt-3"
                    }
                    >
                        {this.props.IsUpdate ? "Update" : "Add Product"}

                    </button>

                </form>

            </div>

            
        );


    }


}

export default StoreManagerAddproductCom;




















