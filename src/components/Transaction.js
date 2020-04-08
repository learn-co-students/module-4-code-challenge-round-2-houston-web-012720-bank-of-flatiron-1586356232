import React from "react";

const Transaction = () => {
  return (
    <tr>
      <td>{"this.props.trns.date"}</td>
      <td>{"this.props.trns.description"}</td>
      <td>{"this.props.trns.category"}</td>
      <td>{"this.props.trns.amount"}</td>
    </tr>
  );
};

export default Transaction;
