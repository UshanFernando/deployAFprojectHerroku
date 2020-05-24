import React from "react";
import StoreManager from "../../Components/StoreManager/StoreManager";

const CategoriesList = (props) => {
  let renderdList = null;
  if (props.storeManagersList != null) {
    renderdList = props.storeManagersList.map((item, index) => {
      return (
        <StoreManager
          key={item._id}
          id={index + 1}
          name={item.fname + " " + item.lname}
          email={item.email}
          onDelete={() => props.onDelete(item._id)}
        />
      );
    });
  }
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th colSpan="2" scope="col">
            Email
          </th>
        </tr>
      </thead>
      <tbody>{renderdList}</tbody>
    </table>
  );
};

export default CategoriesList;
