import { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const Home = () => {
  <p>Home</p>;

  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [eventName, setEventName] = useState("");
  const [eventNumberOfParticipants, setEventNumberOfParticipants] =
    useState("");
  const [companyName, setCompanyName] = useState("");
  const [eventDetails, setEventDetails] = useState("");
  const userId = localStorage.getItem("userId");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  function handleEventNameChange(event) {
    setEventName(event.target.value);
  }

    function handleEventNumberOfParticipantsChange(event) {
    setEventNumberOfParticipants(event.target.value);
    }

    function handleCompanyNameChange(event) {
    setCompanyName(event.target.value);
    }

    function handleEventDetailsChange(event) {
    setEventDetails(event.target.value);
    }

    const handleSubmit = (event) => {
    event.preventDefault();
    axios
        .post("http://localhost:3333/event", {
            event_name: eventName,
            number_of_participants: eventNumberOfParticipants,
            company_name: companyName,
            event_details: eventDetails,
            event_organizer: userId,
        })
        .then(function (response) {
            console.log(response);
            alert("Evento cadastrado com sucesso!");
            window.location.href = "/eventos";
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    

  useEffect(() => {
    axios
      .get(`http://localhost:3333/user/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://localhost:3333/events`)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {user && user.isOrganizer ? (
        <div className="container">
          <h3>Cadastrar novo evento</h3>
            <form class="formRegisterEvent" onSubmit={handleSubmit}>
                <div className="input-control">
                <input
                    className="event_name"
                    name="event_name"
                    type="text"
                    placeholder="Nome do evento"
                    value={eventName}
                    onChange={handleEventNameChange}
                />
                </div>
                <div className="input-control">
                <input
                    className="number_of_participants"
                    name="number_of_participants"
                    type="text"
                    placeholder="Número de participantes"
                    value={eventNumberOfParticipants}
                    onChange={handleEventNumberOfParticipantsChange}
                />
                </div>
                <div className="input-control">
                <input
                    className="company_name"
                    name="company_name"
                    type="text"
                    placeholder="Nome da empresa"
                    value={companyName}
                    onChange={handleCompanyNameChange}
                />
                </div>
                <div className="input-control">
                <input
                    className="event_details"
                    name="event_details"
                    type="text"
                    placeholder="Detalhes do evento"
                    value={eventDetails}
                    onChange={handleEventDetailsChange}
                />
                </div>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
      ) : (
        <div className="homeAllEventsContainer">
          <h3>Todos os eventos</h3>
          <input className="searchBarInput"
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
                <li className="eventCardList">
                  <h3>{event.event_name}</h3>
                  <button className="eventDetailsButton">
                    <Link to={`/eventdetails/${event._id}`}>Ver detalhes</Link>
                  </button>
                </li>
              </ul>
            ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Home;
