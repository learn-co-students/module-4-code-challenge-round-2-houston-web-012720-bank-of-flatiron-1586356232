import React, { Component } from "react";
// 
class AddTransactionForm extends Component {
  render() {
    return (
      <div className="ui segment">
        <form className="ui form">
          <div className="inline fields">
            <input type="date" name="date" required />
            <input type="text" name="description" placeholder="Description" required />
            <input type="text" name="category" placeholder="Category" required />
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              step="0.01"
              required
            />
          </div>
          <button className="ui button" type="submit">
            Add Transaction
          </button>
        </form>
      </div>
    );
  }
}

export default AddTransactionForm;
