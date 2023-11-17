import { useState } from "react";
import axios from "axios";
import "./Signup.css";

const Signup = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf_cnpj, setCpf_cnpj] = useState("");
  const [isOrganizer, setIsOrganizer] = useState(false);

  function handleNomeChange(event) {
    setNome(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handleSenhaChange(event) {
    setSenha(event.target.value);
  }

  function handleTelefoneChange(event) {
    setTelefone(event.target.value);
  }

  function handleCpf_cnpjChange(event) {
    setCpf_cnpj(event.target.value);
  }

  const handleIsOrganizerChange = (event) => {
    setIsOrganizer(event.target.value === "true" ? true : false);
  };

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:3333/user", {
        name: nome,
        email: email,
        cellphone: telefone,
        cpf_cnpj: cpf_cnpj,
        password: senha,
        isOrganizer: isOrganizer,
      })
      .then(function (response) {
        console.log(response);
        alert('Parabéns pelo seu cadastro!');
        window.location.href = "/";
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div class="container">
      <form class="form" onSubmit={handleSubmit}>
        <h1>Faça seu cadastro</h1>
        <div className="checkbox">
        <label>
            <input
              class="isOrganizer"
              type="radio"
              name="isOrganizer"
              value="true"
              checked={isOrganizer === true}
              onChange={handleIsOrganizerChange}
            />
            <b>Promotor de eventos</b>
          </label>

          <label>
            <input
              type="radio"
              name="isNotOrganizer"
              value="false"
              checked={isOrganizer === false}
              onChange={handleIsOrganizerChange}
            />
            <b>Participante</b>
          </label>
        </div>
        <div className="input-control">
          <input
            className="nome"
            name="nome"
            type="text"
            placeholder="Nome"
            onChange={handleNomeChange}
          ></input>
          <input
            class="email"
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleEmailChange}
          ></input>
          <input
            class="telefone"
            name="telefone"
            type="text"
            placeholder="Telefone"
            onChange={handleTelefoneChange}
          ></input>
          <input
            class="senha"
            name="senha"
            type="password"
            placeholder="Senha"
            onChange={handleSenhaChange}
          ></input>

          

          <input
            class="cpf_cnpj"
            name="cpf_cnpj"
            type="text"
            placeholder="CPF/CNPJ"
            onChange={handleCpf_cnpjChange}
          ></input>
          <div className="error"></div>
        </div>
        <button type="submit">Concluir</button>
        <h3>
          <a href="/" style={{ color: "#B6423B" }}>
            Cancelar
          </a>
        </h3>
      </form>
    </div>
  );
};

export default Signup;
