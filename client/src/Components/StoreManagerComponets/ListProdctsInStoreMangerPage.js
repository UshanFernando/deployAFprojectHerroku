import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Containers/StoreManagerPage/StoreManager.css";
import { Button } from 'react-bootstrap';
import ProductItem from "../../Components/StoreManagerComponets/ProductItem";
class ListProdctsInStoreMangerPage extends Component {


   
    render() {
        const list=this.props.Products;
        const show=list.length ? (
            list.map(item=>{

                return <ProductItem productname={item.productname}
                                    key={item._id}
                                    productImage={item.productImage}
                                    Price={item.price}
                                    discount={item.discount}
                                    DeleteProductsHandler={() => this.props.DeleteProductsHandler(item._id)}
                                    updateProductsHandler={() => this.props.updateProductsHandler(item._id)}
  />
 })
  ):<tr><td><div className="alert alert-danger text-center mt-4 text-center">No Any products left</div></td></tr>;                    

       

        

        

        //             return <ProductItem
        //                              key={item._id}
        //                              productname={item.productname}
        //                              category={item.category}
        //                              price={item.price}
        //                              discount={item.discount}
        //                              description={item.description}
        //                              productImage={item.productImage}


        //             />
        //         })


        //     ):<p className="alert alert-danger text-center mt-2">No Any Items </p>

        //     }

        return (
            <div>

                <div className="storemain my-4 p-4 display-3">

                    <span className="badge badge-info py-1 mx-2 p-3">Filter By Category</span>
                    <div className="storeSelectwrapper">
                        <select className="selectcategstore form-control"

                            required
                           
                            value={this.props.TableCategoryFilter}
                            onChange={this.props.TableCategoryFilterChangeHandler}>
                            {
                                this.props.categories.map(function (single) {
                                    return <option
                                        key={single._id}
                                        value={single.name} >{single.name}

                                    </option>;
                                })

                            }
                        </select>


                    </div>

                </div>
                <div className="productinnertble">
                    <div className="productresponsive">
                        <table className="table storemnboot">
                            <thead>
                                <tr>
                                    <th scope="col storetableheading">Product</th>
                                    <th scope="col storetableheading">Update</th>
                                     <th scope="col storetableheading">Delete</th>
                                    <th scope="col storetableheading">Price</th>
                                    <th scope="col storetableheading">Discount</th>

                                </tr>
                            </thead>
                            <tbody>
                           {show}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        );
    }
}

export default ListProdctsInStoreMangerPage;





