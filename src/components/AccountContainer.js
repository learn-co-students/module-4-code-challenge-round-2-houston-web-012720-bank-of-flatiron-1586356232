import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

class AccountContainer extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.handleSort}>Sort</button>
        <Search handleSearch ={this.props.handleSearch}/>
        <AddTransactionForm handleForm={this.props.handleForm}/>
        <TransactionsList transactions ={this.props.transactions}  handledelete={this.props.handledelete}/>
      </div>
    );
  }
}

export default AccountContainer;
