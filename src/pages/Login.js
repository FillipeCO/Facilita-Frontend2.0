import {useState, useEffect} from 'react';
import axios from 'axios';
import './Login.css';
import facilitalogo from '../assets/facilitalogo.png';

const Login = () => {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    
    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handleSenhaChange(event) {
        setSenha(event.target.value);
    }
    
    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:3333/user/login', {
        email: email,
        password: senha
        })
        .then(function (response) {
        localStorage.setItem('userId', response.data._id);
        console.log(response);
        window.location.href = '/home';
        })
        .catch(function (error) {
        console.log(error);
        alert ('Email ou senha incorretos!');
        })
    }

    useEffect(() => {
        localStorage.clear();
    }, []);

    
    return (
        <div class="container">
        <img src={facilitalogo} alt="Facilita" />
        <form class="form" onSubmit={handleSubmit}>
            <h1>Seja bem vindo(a)!</h1>
            <div className="input-control">
            <input class="email" name="email" type="email" placeholder="Email" onChange={handleEmailChange}></input>
            <input class="senha" name="senha" type="password" placeholder="Senha" onChange={handleSenhaChange}></input>
                <div className="error"></div>
            </div>
            <button type="submit">Continuar</button>
            <h3 style={{ color: '#B6423B' }}>Não tem uma conta? <a href="/cadastro" style={{ color: '#B6423B' }}>Inscreva-se aqui</a></h3>
        </form>
    </div>
    );
    }

export default Login;