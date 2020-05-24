import React from "react";
import Category from "../../Components/Category/Category";

const CategoriesList = (props) => {
  let categoryRender = null;
  if (props.categories != null) {
    categoryRender = props.categories.map((category, index) => {
      return (
        <Category
          id={index + 1}
          name={category.name}
          key={category._id}
          onDelete={() => props.onDelete(category._id)}
          onUpdate={() => props.onUpdate(category)}
        />
      );
    });
  }
  return (
    <table className="table overflow-auto">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th colSpan="3" scope="col">
            Name
          </th>
        </tr>
      </thead>
      <tbody>{categoryRender}</tbody>
    </table>
  );
};

export default CategoriesList;
