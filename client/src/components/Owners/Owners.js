import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from 'reactstrap'
import { Link } from 'react-router-dom'
import './Owners.scss'

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
    <div className="Owners">
      <Container>
        <h3 className="Owners-title">Owners</h3>
        <ul className="Owners-list">
          {owners.map(owner => {
            return (
              <li className="Owners-owner" key={owner._id}>
                <img className="avatar" src={owner.photo} alt={owner.name} />
                <Link to={`/profile/${owner._id}`} className="Owners-name"> {owner.name}</Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </div>
  );
}

export default Owners;
