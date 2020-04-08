import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";


class AccountContainer extends Component {
  
  
  state = {
    transactions: [],
    displayTransactions: [],
    searchTerm: null
  }
  
  componentDidMount(){
    this.fetchData()
  }

  

  fetchData = () => {
    fetch("http://localhost:6001/transactions")
      .then(resp => resp.json())
      .then(trans => {
        this.setState({
          transactions: trans,
          displayTransactions: trans,
        })
      })
  }

  addTransaction = (event) =>{
    // debugger
    fetch("http://localhost:6001/transactions"),{
        method: 'POST',
        headers: {
            Accept: 'application/json',
                    'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state)
      }.then(response => {
            console.log(response)
        })
        'qpwoieht r[  qp2ih4tg ['p  q3ihg 3';PLOGHIKNQWAETRH'PAOIJ9
    let transaction = {
      date: event.target[0].value,
      description: event.target[0].value,
      category: event.target[0].value,
      amount: event.target[0].value
    }
    this.setState({ 
      displayTransactions: [...this.state.displayTransactions, transaction]
    })
  }

  render() {
    
    // console.log(this.state.transactions)
    return (
      <div>
        <Search />
        <AddTransactionForm addTransaction={this.addTransaction}/>
        <TransactionsList transactions={this.state.displayTransactions}/>
      </div>
    );
  }
}

export default AccountContainer;
