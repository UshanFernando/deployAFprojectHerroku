import React from "react";
import Wrapper from '../../Hoc/Wrapper'
const SiteOverviewAdmin = (props) => {
  let noUsers = null;
  let noCategories = null;
  let noProducts = null;
  let noStoreManagers = null;

  if (props.stats != null) {
    noUsers = props.stats.users;
    noCategories = props.stats.categories;
    noProducts = props.stats.products;
    noStoreManagers = props.stats.storemanagers;
  }
  return (
    <Wrapper>
      <div className="row centered">
        <div className="card col-sm border-success m-3 analytic">
          <div className="card-body text-success text-center">
            <h4>
              <i className="fa fa-users" aria-hidden="true"></i>
            </h4>
            <h6 className="card-title">No Of Registered Users</h6>
            <h4 className="display-4">{noUsers==null?'N/A':noUsers}</h4>
          </div>
        </div>

        <div className="card col-sm border-info m-3 analytic">
          <div className="card-body text-success text-center">
            <h4>
              <i className="fa fa-shopping-bag" aria-hidden="true"></i>
            </h4>
            <h6 className="card-title">No Of Products</h6>
            <h4 className="display-4">{noProducts==null?'N/A':noProducts}</h4>
          </div>
        </div>
        <div className="card col-sm border-warning m-3 analytic">
          <div className="card-body text-success text-center">
            <h4>
              <i className="fa fa-tags" aria-hidden="true"></i>
            </h4>
            <h6 className="card-title">No Of Categories</h6>
            <h4 className="display-4">{noCategories==null?'N/A':noCategories}</h4>
          </div>
        </div>
        <div className="card col-sm border-danger m-3 analytic">
          <div className="card-body text-success text-center">
            <h4>
              <i className="fa fa-user-plus" aria-hidden="true"></i>
            </h4>
            <h6 className="card-title">No Of Store Managers</h6>
            <h4 className="display-4">{noStoreManagers==null?'N/A':noStoreManagers}</h4>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SiteOverviewAdmin;
