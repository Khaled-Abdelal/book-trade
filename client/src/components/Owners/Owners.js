import React, { useEffect, useState } from "react";
import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;
function Owners() {
  const [owners, setOwners] = useState([]);
  useEffect(() => {
    async function getUsers() {
      try {
        const users = await axios.get(`${baseURL}/api/users?limit=6`);
        setOwners(users.data);
      } catch (err) {
        console.log(err);
      }
    }
    getUsers();
  }, []);
  return (
    <div>
      <ul>
        {owners.map(owner => {
          return (
            <li key={owner._id}>
              <img src={owner.photo} alt={owner.name} />
              {owner.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Owners;
