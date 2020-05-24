import React from "react";
import Wrapepr from "../../Hoc/Wrapper";

const Banner = (props) => {
  const adminNav = (
    <Wrapepr>
      <button onClick={props.scrollAdminCategories} className="button button-login mt-4 ">
        {" "}
        Manage categories
      </button>
      <button onClick={props.scrollAdminManagers} className="button button-login m-4 ">
        Manage Store Managers
      </button>
    </Wrapepr>
  );

  return (
    <section className="blog-banner-area" id="category">
      <div className="container h-100">
        <div className="blog-banner">
          <div className="text-center">
            <h1>{props.name}</h1>
            <nav aria-label="breadcrumb" className="banner-breadcrumb">
              {props.description}
            </nav>
            <br />
            {props.admin ? adminNav : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
