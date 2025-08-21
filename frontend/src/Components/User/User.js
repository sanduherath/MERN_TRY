import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// removed unused useNavigate import

function User({ user, onDelete }) {
  // defensive: user may be undefined while data is loading
  const { _id, name, gmail, age, address } = user || {};
  const deleteHandler = async () => {
    if (!_id) {
      console.error("deleteHandler: missing user id");
      alert("Cannot delete: missing user id");
      return;
    }
    try {
      const res = await axios.delete(`http://localhost:5000/users/${_id}`);
      console.log("delete response", res.data);
      // inform parent to remove the user from the list
      if (typeof onDelete === "function") onDelete(_id);
    } catch (err) {
      console.error("delete error", err?.response || err.message || err);
      alert("Delete failed: " + (err?.response?.data?.message || err.message));
    }
  };
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
      <button onClick={deleteHandler}>Delete</button>
    </div>
  );
}

export default User;
