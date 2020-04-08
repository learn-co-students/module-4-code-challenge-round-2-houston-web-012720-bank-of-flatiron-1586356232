import React, { Component } from "react";

class AddTransactionForm extends Component {

  constructor(){
    super()
    this.state = {}
  }

  changeState = (e) => this.setState({[e.target.name]: e.target.value})

  submitForm = (e) => {
    e.preventDefault()
    return this.checkIfTransactionHasAllKeysAndIfNotShowWarning() ? this.props.submitTransaction(this.state) : false
  }

  checkIfTransactionHasAllKeysAndIfNotShowWarning = () => {
    let s = this.state
    if (s.hasOwnProperty('date')&&s.hasOwnProperty('description')&&s.hasOwnProperty('category')&&s.hasOwnProperty('amount')){
      return true
    }
    else{
      alert("All fields Required")
      return false
    }
  }

  render() {
    return (
      <div className="ui segment">
        <form className="ui form" onSubmit = {this.submitForm}>
          <div className="inline fields">
            <input onChange = {this.changeState} type="date" name="date" />
            <input onChange = {this.changeState} type="text" name="description" placeholder="Description" />
            <input onChange = {this.changeState} type="text" name="category" placeholder="Category" />
            <input
              onChange = {this.changeState}
              type="number"
              name="amount"
              placeholder="Amount"
              step="0.01"
            />
          </div>
          <button className="ui button" type="submit">
            Add Transaction
          </button>
        </form>
      </div>
    );
  }
}

export default AddTransactionForm;
