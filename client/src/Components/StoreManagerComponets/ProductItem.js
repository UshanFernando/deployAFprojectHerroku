import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

class ProductItem extends Component {
    render() {

        return (
            <tr>
                <td className="storemantabletd">
                    <div className="media">
                        <div className="d-flex storeimagepdding">
                            <img src={`http://localhost:5000/${this.props.productImage}`} alt="" />
                        </div>
                        <div class="media-body">
                            <p>{this.props.productname}</p>
                        </div>
                    </div>
                </td>
                <td className="storemangersecondtd">
                    <button type="button" type="button" class="btn btn-outline-success" onClick={this.props.updateProductsHandler}><h5>Update</h5></button>
                </td>

                <td className="storemangersecondtd">
                    <button type="button" type="button" class="btn btn-outline-danger" onClick={this.props.DeleteProductsHandler}><h5>Delete</h5></button>
                </td>

                <td className="storemangersecondtd">
                    <h5>Rs {this.props.Price}</h5>
                </td>
                <td className="storemangersecondtd">
                    <h5>{this.props.discount} %</h5>
                </td>


            </tr>


        );
    }
}

export default ProductItem;

