import React, { Component } from "react";
import AccountContainer from "./AccountContainer";
import "../stylesheets/App.css";

const APIURL = "http://localhost:6001/transactions"

class App extends Component {
  constructor(){
    super()
    this.state = {
      transactions: [],
      displayTransactions: [],
      isLoad: false
    }
  }

  componentDidMount(){
    fetch(APIURL)
    .then(res => res.json())
    .then(transactions => this.setState({transactions, displayTransactions: transactions, isLoad: true}))
  }

  addTransactions = (e) => {
    e.preventDefault()

    let newTransaction = {
      date: e.target[0].value,
      description: e.target[1].value,
      category: e.target[2].value,
      amount: e.target[3].value
    } 
    
    let obj = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTransaction)
    }

    fetch(APIURL,obj)
    .then(res => res.json())
    .then(newTrans => this.setState({transactions: [...this.state.transactions,newTrans],displayTransactions: [...this.state.displayTransactions,newTrans]}))
    e.target.reset()
  }

  searchTransaction = (value) => {
    let regx = new RegExp("^"+value,"i")
    let displayTransactions = this.state.transactions.filter(transaction => transaction.description.match(regx) )
    this.setState({displayTransactions})
  }

  removeTransaction = (transaction) => {
    fetch(`${APIURL}/${transaction.id}`,{method: "DELETE"})
    .then(res => res.json())
    .then(deleteTransaction => {
      let displayTransactions = this.state.displayTransactions.filter(trans => trans !== transaction)
      let transactions = this.state.transactions.filter(trans => trans !== transaction)
      this.setState({transactions, displayTransactions})
    })
  }

  render() {
    return (
      <div className="ui raised segment">
        <div className="ui segment violet inverted">
          <h2>The Royal Bank of Flatiron</h2>
        </div>
        {this.state.isLoad 
          ? <AccountContainer
              transactions = {this.state.displayTransactions} 
              addTransactions = {this.addTransactions}
              searchTransaction = {this.searchTransaction}
              removeTransaction = {this.removeTransaction}
            />
          : "Loading..."
        }
      </div>
    );
  }
}

export default App;
