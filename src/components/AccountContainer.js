import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

class AccountContainer extends Component {

  constructor(){
    super()
    this.state={
      trans: [],
      transDisplay: []
    }
  }

  componentDidMount(){
    fetch("http://localhost:6001/transactions")
    .then(resp => resp.json())
    .then(transData => {
      this.setState({
        trans: transData,
        transDisplay: transData,
        sorted: false
      })
    })
  }

  addTrans = (event) => {
    // form is not a controlled form right now
    event.preventDefault()
    let newTrans = {
      date: event.target[0].value,
      description: event.target[1].value,
      category: event.target[2].value,
      amount: event.target[3].value
    }
    event.target.reset()
    fetch("http://localhost:6001/transactions", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTrans)
    })
    .then(resp => resp.json())
    .then(postedTrans => {
      this.state.trans.push(postedTrans)
      this.setState({
        trans: this.state.trans,
        transDisplay: this.state.trans
      })
    })
  }

  handleFilter = (event) => {
    // I can either keep filter here locally or set as state
    let filter = event.target.value.toLowerCase()
    let filtered
    event.target.value === ""
    ? filtered = this.state.trans
    : filtered = this.state.trans.filter ( trans  => trans.description.toLowerCase().includes(filter))
    this.setState({
      transDisplay: filtered
    })
  }

  handleSort = (event) => {
    let sorted 
    let unsortedList = this.state.transDisplay.slice()
    switch(event.target.value){
      case "Description":
        sorted = unsortedList.sort( (transA, transB) => transA.description.toLowerCase() > transB.description.toLowerCase() ? 1 : -1)
        break 
      case "Category":
        sorted = unsortedList.sort( (transA, transB) => transA.category.toLowerCase() > transB.category.toLowerCase() ? 1 : -1)
        break 
      case "None":
        // this wont have the filter applied. it needs to be transDisplay
        // maybe have a sorted state. if true than pass transSorted instead of transDispay
        sorted = this.state.trans
    }
    this.setState({
      transDisplay: sorted
    })
  }

  handleDelete = (event, trans) => {
    fetch("http://localhost:6001/transactions" + `/${trans.id}`, {
    method: "DELETE", 
    })
    .then(resp => resp.json())
    .then(deletedTrans => {
      let updatedList = this.state.trans.filter( t => t.id !== trans.id )
      this.setState({
        trans: updatedList,
        transDisplay: updatedList
      })
    })
  }


  render() {
    return (
      <div>
        <Search handleFilter={this.handleFilter} handleSort={this.handleSort}/>
        <AddTransactionForm addTrans={this.addTrans}/>
        <TransactionsList trans={this.state.transDisplay} handleDelete={this.handleDelete} />
      </div>
    );
  }
}

export default AccountContainer;
