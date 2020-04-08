import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

class AccountContainer extends Component {
  render() {
    return (
      <div>
        <Search searchTransaction = {this.props.searchTransaction}/>
        <AddTransactionForm addTransactions = {this.props.addTransactions}/>
        <TransactionsList transactions = {this.props.transactions} removeTransaction = {this.props.removeTransaction}/>
      </div>
    );
  }
}

export default AccountContainer;
