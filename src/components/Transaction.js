import React from "react";

const Transaction = (props) => {
  return (
    <tr>
      <td>{props.tran.date}</td>
      <td>{props.tran.description}</td>
      <td>{props.tran.category}</td>
      <td>{props.tran.amount}</td>
      <td><button onClick = {()=>props.handledelete(props.tran)}>Delete</button></td>
      
    </tr>
  );
};

export default Transaction;
