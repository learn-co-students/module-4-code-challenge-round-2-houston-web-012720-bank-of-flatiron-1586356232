import React, { Component } from "react";
import AccountContainer from "./AccountContainer";
import "../stylesheets/App.css";

class App extends Component {
  constructor(){
    super()
    this.state = {
      transactions: [],
      originalTransactions: []
    }
  }


  componentDidMount(){
    fetch ("http://localhost:6001/transactions")
    .then(res => res.json())
    .then(transactions => this.setState({
      transactions:transactions,
      originalTransactions: [...transactions]
    }))
  }

  handleForm = (event) =>{
    // debugger
    event.preventDefault()
    let tran = {
      date: event.target[0].value,
      description: event.target[1].value,
      category: event.target[2].value,
      amount: event.target[3].value
    }

    // this.setState({
    //   transactions: [...this.state.transactions , tran],
    //   // originalTransactions: [...this.state.originalTransactions , tran]

    // })

    fetch("http://localhost:6001/transactions",{
      method: "POST",
      headers: {"Content-Type": "application/json",  Accept: "application/json"},
      body:JSON.stringify(
        tran )
    }).then(res => res.json())
    .then(tran => this.setState({
      transactions: [...this.state.transactions , tran],
      // originalTransactions: [...this.state.originalTransactions , tran]

    }))


  }

  handleSearch = (tran) => {
    // debugger
   let filtriedarray =  this.state.originalTransactions.filter(trana => trana.description == tran || tran == "")
   this.setState({
     transactions: filtriedarray
   })

  }

  handleSort = () => {
    debugger
    let sortedtransactions = this.state.transactions.sort((a,b)=> a.category> b.category? -1:1)
    this.setState({
      transactions: sortedtransactions
    })
  }
  handledelete = (tran) => {
    // debugger
   let newarraya = this.state.originalTransactions.filter(trana => trana.id !== tran.id )
   let newarrayb = this.state.transactions.filter(trana => trana.id !== tran.id )

    // this.setState({
    //   transactions: newarrayb,
    //   originalTransactions : newarraya
    // })

    fetch(`http://localhost:6001/transactions/${tran.id}`,{
      method:"DELETE"
    }).then(res => res.json())
    .then (tran => this.setState({
      transactions: newarrayb,
      originalTransactions : newarraya
    }))
  }
  render() {
    return (
      <div className="ui raised segment">
        <div className="ui segment violet inverted">
          <h2>The Royal Bank of Flatiron</h2>
        </div>
        <AccountContainer transactions={this.state.transactions} handleForm={this.handleForm} handleSearch={this.handleSearch} handleSort={this.handleSort} handledelete={this.handledelete}/>
      </div>
    );
  }
}

export default App;
