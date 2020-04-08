import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

const URL = "http://localhost:6001/transactions"

class AccountContainer extends Component {

  

  constructor(){
    super()
    this.state = {
      transactions: [],
      search: ""
    }
  }

  componentDidMount() {fetch(URL).then(resp => resp.json()).then(transactions => this.setState({transactions}))}

  changeSearch = (search) => this.setState({search})

  filterTransactions = () => this.state.transactions.filter(tr => tr.description.toLowerCase().includes(this.state.search.toLowerCase()))
  
  submitTransaction = (transaction) => {
    let params = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(transaction)
    }
    fetch(URL, params).then(resp => resp.json()).then(tr => this.setState({transactions: [...this.state.transactions, tr]}))
  }

  deleteTransaction = (id) => {
    let params = {method: "DELETE"}
    fetch(`${URL}/${id}`, params).then(this.setState({transactions: this.state.transactions.filter(tr => tr.id !== id)}))
  }


  render() {
    return (
      <div>
        <Search changeSearch = {this.changeSearch}/>
        <AddTransactionForm submitTransaction = {this.submitTransaction}/>
        <div>Double Click to delete transaction</div>
        <TransactionsList transactions = {this.filterTransactions()} deleteTransaction = {this.deleteTransaction} />
      </div>
    );
  }
}

export default AccountContainer;
