import React from "react";
import { Link } from "react-router-dom";

function User({ user }) {
  // defensive: user may be undefined while data is loading
  const { _id, name, gmail, age, address } = user || {};
  return (
    <div>
      <h1>ID : {_id}</h1>
      <h1>Name : {name}</h1>
      <h1>Gmail : {gmail}</h1>
      <h1>Age : {age}</h1>
      <h1>Address : {address}</h1>
      <Link to={`/update/${_id}`}>
        <button disabled={!_id}>Update</button>
      </Link>
      <button disabled={!_id}>Delete</button>
    </div>
  );
}

export default User;
