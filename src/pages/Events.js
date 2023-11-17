import { useState, useEffect } from "react";
import axios from "axios";
import "./Events.css";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const Events = () => {
  <p>Eventos</p>;

  const [user, setUser] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventsThatUserIsOrganizer, setEventsThatUserIsOrganizer] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const userId = localStorage.getItem("userId");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDeleteEvent = (eventId) => {
    axios
      .delete(`http://localhost:3333/event/${eventId}`)
      .then((response) => {
        console.log(response);
        window.location.reload(false);
        alert("Evento excluído com sucesso!");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleRemoveUser = (eventId, userId) => {
    axios.put(`http://localhost:3333/event/${eventId}/user/${userId}/remove`)
        .then(response => {
            console.log(response);
            window.location.reload(false);
            alert ('Inscrição cancelada com sucesso!');
        })
        .catch(error => {
            console.error(error);
        });
};

  useEffect(() => {
    axios
      .get(`http://localhost:3333/user/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3333/event/user/${userId}`)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

    useEffect(() => {
    axios
      .get(`http://localhost:3333/event/organizer/${userId}`)
      .then((response) => {
        setEventsThatUserIsOrganizer(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }, []);

    return (
        <div>
            {user && user.isOrganizer ? (
                <div>
                    <h3>Eventos que eu organizo</h3>
                    <input
                        type="search"
                        placeholder="Digite para pesquisar..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    {eventsThatUserIsOrganizer
                        .filter((event) =>
                            event.event_name.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((event) => (
                            <ul className="eventCard" key={event._id}>
                                <li>
                                    <h3>{event.event_name}</h3>
                                    <h5>
                                        <Link to={`/eventdetails/${event._id}`}>Ver detalhes</Link>
                                        <button onClick={() => handleDeleteEvent(event._id)}>Excluir evento</button>
                                        <Link to={`/editar/${event._id}`}>Editar evento</Link>
                                    </h5>
                                </li>
                            </ul>
                        ))}
                </div>
            ) : (
                <>
                    <h3>Olá, {user.name}!</h3>
                    <h3>Meus eventos:</h3>
                    <input
                        type="search"
                        placeholder="Digite para pesquisar..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    {events
                        .filter((event) =>
                            event.event_name.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((event) => (
                            <ul className="eventCard" key={event._id}>
                                <li>
                                    <h3>{event.event_name}</h3>
                                    <h5>
                                        <Link to={`/eventdetails/${event._id}`}>Ver detalhes</Link>
                                    </h5>
                                    <button onClick={() => handleRemoveUser(event._id, userId)}>Cancelar inscrição</button>
                                </li>
                            </ul>
                        ))}
                </>
            )}
            <Footer />
        </div>
    );
};
export default Events;
