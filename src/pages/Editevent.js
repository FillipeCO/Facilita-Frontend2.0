import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Editevent.css";
import Footer from "./Footer";

const Editevent = () => {
  <p>Editevent</p>;

  const [event, setEvent] = useState([]);
    const [editedEvent, setEditedEvent] = useState({});

    const { id } = useParams();

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        axios.get(`http://localhost:3333/event/${id}`)
            .then(response => {
                setEvent(response.data);
                setEditedEvent(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);


    const handleInputChange = (event) => {
        setEditedEvent({ ...editedEvent, [event.target.name]: event.target.value });
    };

    const handleSaveChanges = () => {
        axios.put(`http://localhost:3333/event/${id}`, editedEvent)
            .then(response => {
                setEvent(response.data);
                alert('Alterações salvas com sucesso!');
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div>
            <h3>Editar evento:</h3>
            <ul className="eventCard">
                <li className="editEventForm" key={event._id}>
                    <h3>Nome do evento</h3>
                    <input type="text" name="event_name" value={editedEvent.event_name} onChange={handleInputChange} />
                    <h3>Numero de participantes</h3>
                    <input type="text" name="number_of_participants" value={editedEvent.number_of_participants} onChange={handleInputChange} />
                    <h3>Empresa organizadora</h3>
                    <input type="text" name="company_name" value={editedEvent.company_name} onChange={handleInputChange} />
                    <h3>Descrição do evento</h3>
                    <input type="text" name="event_details" value={editedEvent.event_details} onChange={handleInputChange} />
                    <button className="editEventButton" onClick={handleSaveChanges}>Salvar alterações</button>
                </li>
            </ul>
            <Footer />
        </div>
    );
};

export default Editevent;