import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

class AccountContainer extends Component {
  constructor(){
    super()
      this.state ={
        transactions: [],
        displayTransactions: [],
        // form: 
        filter: ''
      }
    
  }

  componentDidMount(){
    fetch('http://localhost:6001/transactions')
    .then(res => res.json())
    .then(transactions => {
      this.setState({
        transactions: transactions,
        displayTransactions: transactions
      })
    })
  }

  newTransaction = (e) =>{
    
    e.preventDefault()
    let addedTransaction ={
      date: e.target[0].value,
      description: e.target[1].value,
      category: e.target[2].value,
      amount: e.target[3].value
      }
      // console.log(addedTransaction)
    this.setState({
      displayTransactions: [...this.state.transactions, addedTransaction],

    })
  }

  // filterTransactions(){
    




  render() {
    return (
      <div>
        <Search />
        <AddTransactionForm newTransaction={this.newTransaction}/>
        <TransactionsList transactions={this.state.displayTransactions}  />
      </div>
    );
  }
}

export default AccountContainer;
