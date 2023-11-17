import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Eventdetails.css';
import Footer from './Footer';

const Eventdetails = () => {
    <p>Eventdetails</p>

    const [event, setEvent] = useState([]);
    const [user, setUser] = useState([]);

    const { id } = useParams();

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        axios.get(`http://localhost:3333/event/${id}`)
            .then(response => {
                setEvent(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:3333/user/${userId}`)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    function handleSubscribe(event) {
        event.preventDefault();
        axios
            .put(`http://localhost:3333/event/${id}/user/${userId}`, {
                user_id: userId,
            })
            .then(function (response) {
                console.log(response);
                alert('Inscrição realizada com sucesso!');
                window.location.href = "/eventos";
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div>
            <h3>Olá, {user.name}!</h3>
            <h3>Detalhes do evento:</h3>
            <ul className="eventCard">
                <li key={event._id}>
                    <h3>{event.event_name}</h3>
                    <h5>{event.number_of_participants}</h5>
                    <h3>{event.company_name}</h3>
                    <h5>{event.event_details}</h5>
                    <button onClick={handleSubscribe}>Inscrever-se</button>
                </li>
            </ul>
            <Footer />
        </div>
    );
}

export default Eventdetails;