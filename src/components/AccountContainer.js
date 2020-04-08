import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

class AccountContainer extends Component {
  state={
    transactions: [],
    displayTransactions: [],
    transactionToSubmit: {
      "date": null,
      "description": null,
      "category": null,
      "amount": null
    }
  }

  // {
  //   "id": 1,
  //   "date": "2019-12-01",
  //   "description": "Paycheck from Bob's Burgers",
  //   "category": "Income",
  //   "amount": 1000
  // }
  
  componentDidMount() {
    this.getTransactions()
  }

  getTransactions = () => {
    fetch('http://localhost:6001/transactions')
    .then(r => r.json())
    .then(transactions => {
      this.setState({
        transactions: transactions,
        displayTransactions: transactions
      })
    })
  }

  addTransaction = (e) => {
    // debugger
    e.preventDefault()
    // add "validations" if you have time
    this.setState({
      transactionToSubmit: {
        "date": e.target[0].value,
        "description": e.target[1].value,
        "category": e.target[2].value,
        "amount": e.target[3].value,
      }
    },
    ()=>{
      fetch('http://localhost:6001/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.transactionToSubmit)
      })
      .then(this.getTransactions())
    })
  }

  deleteTransaction = (transaction) => {
    // debugger
    fetch(`http://localhost:6001/transactions/${transaction.id}`, {
      method: 'DELETE'
    })
    .then(this.getTransactions())
  }

  searchTransactions = (searchTerm) => {
    const matches = this.state.transactions.filter(transaction => transaction.description.toLowerCase().includes(searchTerm.toLowerCase()))
    // console.log(matches)
    this.setState({
      displayTransactions: matches
    })
  }

  sortByCategory = () => {
    // debugger
    const sortedTransactions = [...this.state.displayTransactions].sort((a,b) => a.category.localeCompare(b.category))
    this.setState({
      displayTransactions: sortedTransactions
    })
  }

  sortByDescription = () => {
    // debugger
    const sortedTransactions = [...this.state.displayTransactions].sort((a,b) => a.description.localeCompare(b.description))
    this.setState({
      displayTransactions: sortedTransactions
    })
  }

  render() {
    return (
      <div>
        <Search
          searchTransactions={this.searchTransactions}
          sortByCategory={this.sortByCategory}
          sortByDescription={this.sortByDescription} />
        <AddTransactionForm
          addTransaction={this.addTransaction} />
        <TransactionsList
          transactions={this.state.displayTransactions}
          deleteTransaction={this.deleteTransaction} />
      </div>
    );
  }
}

export default AccountContainer;
