import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

class AccountContainer extends Component {

  constructor() {
    super()
    this.state = {
      transactions: [],
      query: ""
    }
  }

  getTransactions = () => {
    fetch("http://localhost:6001/transactions")
      .then(res => res.json())
      .then(transactions => {
        this.setState({transactions})
      })
  }

  createTransaction = (e) => {
    e.preventDefault()
    fetch("http://localhost:6001/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date:        e.target[0].value,
        description: e.target[1].value,
        category:    e.target[2].value,
        amount:      e.target[3].value
      })
    })
      .then(res => res.json())
      .then(transaction => {
        console.log("created transaction!")
        this.setState({transactions: [...this.state.transactions, transaction]})
      })
  }

  onSearch = (e) => {
    this.setState({query: e.target.value})
  }

  componentDidMount() {
    this.getTransactions()
  }

  render() {
    return (
      <div>
        <Search handleSearch={this.onSearch}/>
        <AddTransactionForm handleCreate={this.createTransaction}/>
        <TransactionsList query={this.state.query} transactions={this.state.transactions}/>
      </div>
    );
  }
}

export default AccountContainer;
