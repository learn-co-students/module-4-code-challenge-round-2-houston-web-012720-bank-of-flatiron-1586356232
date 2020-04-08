import React from "react";

const Search = (props) => {
  return (
    <div className="ui large fluid icon input">
      <button onClick={()=>props.sortByCategory()}>
        Sort By Category
      </button>
      <button onClick={()=>props.sortByDescription()}>
        Sort By Description
      </button>
      <input
        type="text"
        placeholder={"Search your Recent Transactions"}
        onChange={(e) => {
          console.log("Searching...");
          props.searchTransactions(e.target.value)
        }}
      />
      <i className="circular search link icon"></i>
    </div>
  );
};

export default Search;
