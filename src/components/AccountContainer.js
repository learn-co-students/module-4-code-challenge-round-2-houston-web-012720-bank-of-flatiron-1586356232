import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

class AccountContainer extends Component {

  constructor(){
    super()
    this.state ={
      transactions: [],
      search: ''
    }
  }

  fetchTransactions =() =>{
    fetch('http://localhost:6001/transactions')
    .then(res => res.json())
    .then(transactions => {
      this.setState({
        transactions,
        display: []
      })
    })
  }

  componentDidMount(){
    this.fetchTransactions()
  }

  addTransaction = (event) => {

    const params ={
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        date: event.target[0].value,
        description: event.target[1].value,
        category: event.target[2].value,
        amount: event.target[3].value
      })
    }

    event.preventDefault()
    // console.log(event.target[1].value)
    let current = this.state.transactions
    fetch('http://localhost:6001/transactions',params)
    .then(res => res.json())
    .then(transaction => this.setState({transactions: [...current, transaction]}))
  }

  search = (e) => {
    console.log(e.target.value)
    let current = this.state.transactions
    let newList = current.filter(transaction => transaction.description ===e.target.value)

    this.setState({transactions: newList})

  }


  render() {


    console.log(this.state.transactions)
    return (
      <div>
        <Search search={this.search} />
        <AddTransactionForm addTransaction={this.addTransaction}/>
        <TransactionsList transactions={this.state.transactions} />
      </div>
    );
  }
}

export default AccountContainer;
