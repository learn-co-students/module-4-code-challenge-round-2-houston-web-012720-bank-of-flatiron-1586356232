import React from "react";

const Transaction = (props) => {
  let trans = props.transaction
  return (
    <tr>
      <td>{trans.date}</td>
      <td>{trans.description}</td>
      <td>{trans.category}</td>
      <td>{trans.amount}</td>
      <td>
        <button onClick={() => props.removeTransaction(trans)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Transaction;
