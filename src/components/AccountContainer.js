import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

class AccountContainer extends Component {
  constructor(){
    super()
    this.state ={
      transactions: []

    }
  }
  componentDidMount(){
    fetch("http://localhost:6001/transactions")
    .then(resp=> resp.json())
    .then(data => 
      this.setState({
        transactions: data

    }))
  }
  render() {
    return (
      <div>
        <Search />
        <AddTransactionForm />
        <TransactionsList transaction ={this.state.transactions} />
      </div>
    );
  }
}

export default AccountContainer;
