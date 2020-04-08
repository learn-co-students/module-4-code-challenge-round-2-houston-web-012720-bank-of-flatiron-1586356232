import React from "react";

const Transaction = (props) => {
  console.log(props)
  return (
    <tr>
      <td>{props.trans.date}</td>
      <td>{props.trans.description}</td>
      <td>{props.trans.category}</td>
      <td>{props.trans.amount}</td>
      <td>
        <button onClick={ (e) => props.handleDelete(e, props.trans)}>Delete</button>
      </td>

    </tr>
  );
};

export default Transaction;
