import React from "react";

const Search = (props) => {
  return (
    <div>
      <div className="ui large fluid icon input">
        <input
          type="text"
          placeholder={"Search your Recent Transactions"}
          onChange={props.handleFilter}
        />
        <i className="circular search link icon"></i>
      </div>
      <div>
        <label>Sort Alphabetically By: </label>
        <select onChange={props.handleSort}>
          <option value="None"> None </option>
          <option value="Description"> Description </option>
          <option value="Category"> Category </option>
        </select> 
      </div>
    </div>


  );
};

export default Search;
