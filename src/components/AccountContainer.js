import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

// const base_url = "http://localhost:6001"
const get_url = "http://localhost:6001/transactions"
const delete_url = "http://localhost:6001/transactions/:id"

class AccountContainer extends Component {

  constructor() {
    super()
    this.state = {
      transactions: null,
      displayTransactions: null,
      filter: null
    }
  }

  componentDidMount() {
    this.getTransactions()
  }

  getTransactions = () => {
    fetch(get_url)
      .then(response => response.json())
      .then(transactions => {
        this.setState({
          transactions,
          displayTransactions: transactions
        })
      })
  }

  filterTransactions = (filter) => {
    this.setState({
      displayTransactions: this.state.transactions.filter(transaction => { return transaction.description.includes(filter) })
    })
  }

  // This is where I left off
  // addTransaction = (data) => {
  //   fetch(get_url, {
  //     method: POST,
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(


  //     )
  //   })
  // }


  render() {

    return (
      <div>
        <Search filterTransactions={this.filterTransactions} />
        <AddTransactionForm />
        {
          this.state.displayTransactions
            ? <TransactionsList displayTransactions={this.state.displayTransactions} />
            : "Loading...."
        }
      </div >
    );
  }
}

export default AccountContainer;
