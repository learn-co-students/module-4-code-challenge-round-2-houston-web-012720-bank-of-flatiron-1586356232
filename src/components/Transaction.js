import React from "react";

  // {
  //   "id": 1,
  //   "date": "2019-12-01",
  //   "description": "Paycheck from Bob's Burgers",
  //   "category": "Income",
  //   "amount": 1000
  // }

const Transaction = (props) => {
  return (
    <tr>
      <td>{props.transaction.date}</td>
      <td>{props.transaction.description}</td>
      <td>{props.transaction.category}</td>
      <td>{props.transaction.amount}</td>
      <td><button onClick={() => props.deleteTransaction(props.transaction)} className="ui button" style={{backgroundColor: 'red', color: 'white'}}>Delete</button></td>
    </tr>
  );
};

export default Transaction;
