import React from "react";

const Search = (props) => {
  return (
    <div>
      <div className="ui large fluid icon input">
        <input
          type="text"
          placeholder={"Search your Recent Transactions"}
          onChange={props.handleSearch}
        />
        <i className="circular search link icon"></i>
      </div>
      <div>
        <label>Sort Alphabetically By: </label>
        <select onChange={props.handleSort} id="sort" className="ui large fluid icon input">
          <option value="desc">Description</option>
          <option value="category">Category</option>
        </select>
      </div>
    </div>
  );
};

export default Search;
