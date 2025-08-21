import React, { useState } from "react";
import Nav from "../Nav/Nav";
import axios from "axios";

function AddUser() {
  const [inputs, setInputs] = useState({
    name: "",
    gmail: "",
    age: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to save the user
    console.log("User data:", inputs);
    alert("User added successfully!");
    sendRequest();
    // Reset form
    setInputs({
      name: "",
      gmail: "",
      age: "",
      address: "",
    });

    // Navigate back to home or users list if needed
    // history("/");
  };
  const sendRequest = async () => {
    try {
      const res = await axios.post("http://localhost:5000/users", {
        name: String(inputs.name),
        gmail: String(inputs.gmail),
        age: Number(inputs.age),
        address: String(inputs.address),
      });
      return res.data;
    } catch (err) {
      console.error("AddUser sendRequest error:", err);
      throw err; // re-throw so caller can handle
    }
  };
  return (
    <div>
      <Nav />
      <div style={{ maxWidth: "500px", margin: "20px auto", padding: "20px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Add User</h1>

        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "#f9f9f9",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={inputs.name}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Gmail:
            </label>
            <input
              type="email"
              name="gmail"
              value={inputs.gmail}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Age:
            </label>
            <input
              type="number"
              name="age"
              value={inputs.age}
              onChange={handleChange}
              required
              min="1"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Address:
            </label>
            <textarea
              name="address"
              value={inputs.address}
              onChange={handleChange}
              required
              rows="3"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                boxSizing: "border-box",
                resize: "vertical",
              }}
            />
          </div>

          <div style={{ textAlign: "center" }}>
            <button
              type="submit"
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
