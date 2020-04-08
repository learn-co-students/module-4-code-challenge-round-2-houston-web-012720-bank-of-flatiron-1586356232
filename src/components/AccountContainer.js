import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

class AccountContainer extends Component {

  constructor() {
    super()
    this.state = {
      transactions: [],
      query: "",
      sortBy: "desc"
    }
  }

  getTransactions = () => {
    fetch("http://localhost:6001/transactions")
      .then(res => res.json())
      .then(transactions => {
        this.setState({transactions}, () => {
          this.sortTransactions(this.state.sortBy)
        })
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
        this.setState({transactions: [...this.state.transactions, transaction]}, () => {
          this.sortTransactions(this.state.sortBy)
        })
      })
  }

  onSearch = (e) => {
    this.setState({query: e.target.value})
  }

  onDelete = (transaction) => {
    fetch("http://localhost:6001/transactions/" + transaction.id, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(deleted => {
        console.log("Transaction deleted!")
        this.setState({transactions: [...this.state.transactions.filter(t => t.id !== transaction.id)]})
      })
  }

  onSort = (e) => {
    this.setState({
      sortBy: e.target.value
    }, () => {this.sortTransactions(this.state.sortBy)})
  }

  sortTransactions = (sortby) => {
    console.log(sortby)
    if (sortby == "desc") {
      this.setState({transactions: [...this.state.transactions.sort((a, b) => a.description.localeCompare(b.description))]})
    } else if (sortby == "category") {
      this.setState({transactions: [...this.state.transactions.sort((a, b) => a.category.localeCompare(b.category))]})
    }
  }

  componentDidMount() {
    this.getTransactions()
  }

  render() {
    return (
      <div>
        <Search handleSort={this.onSort} handleSearch={this.onSearch}/>
        <AddTransactionForm handleCreate={this.createTransaction}/>
        <TransactionsList sortBy={this.state.sortBy} query={this.state.query} transactions={this.state.transactions} handleDelete={this.onDelete}/>
      </div>
    );
  }
}

export default AccountContainer;
