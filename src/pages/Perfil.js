import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./Footer";

const Perfil = () => {
  const [user, setUser] = useState({});
  const [editedUser, setEditedUser] = useState({});

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`http://localhost:3333/user/${userId}`)
      .then((response) => {
        setUser(response.data);
        setEditedUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleInputChange = (event) => {
    setEditedUser({ ...editedUser, [event.target.name]: event.target.value });
  };

  const handleSaveChanges = () => {
    axios
      .put(`http://localhost:3333/user/${userId}`, editedUser)
      .then((response) => {
        setUser(response.data);
        alert("Alterações salvas com sucesso!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="perfilContainer">
      <h3>Olá, {user.name}!</h3>
      <h3>Meus dados:</h3>
      <ul className="eventCard">
        <li className="perfilForm" key={user._id}>
          <h3>Nome</h3>
          <input className="perfilFormInput"
            type="text"
            name="name"
            value={editedUser.name}
            onChange={handleInputChange}
          />
          <h3>Email</h3>
          <input className="perfilFormInput"
            type="text"
            name="email"
            value={editedUser.email}
            onChange={handleInputChange}
          />
          <h3>Telefone</h3>
          <input className="perfilFormInput"
            type="text"
            name="cellphone"
            value={editedUser.cellphone}
            onChange={handleInputChange}
          />
          <h3>CPF/CNPJ</h3>
          <input className="perfilFormInput"
            type="text"
            name="cpf_cnpj"
            value={editedUser.cpf_cnpj}
            onChange={handleInputChange}
          />
          <button className="perfilFormButton" onClick={handleSaveChanges}>Salvar alterações</button>
        </li>
      </ul>
      <Footer />
    </div>
  );
};

export default Perfil;
