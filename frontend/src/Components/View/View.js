import React, { useEffect } from "react";
import Nav from "../Nav/Nav";
import axios from "axios";
import User from "../User/User";
const URL = "http://localhost:5000/users";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data.users || res.data);
};
function View() {
  const [users, setUsers] = React.useState([]);
  // remove a user locally after successful delete to avoid full page reload
  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => (u._id || u.id) !== id));
  };
  useEffect(() => {
    fetchHandler().then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <Nav />
      <h1>View Users</h1>
      <div>
        {users &&
          users.map((user) => (
            <div key={user._id || user.id}>
              <User user={user} onDelete={handleDelete} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default View;
