import React from "react";
import "./Footer.css";
import homepage from "../assets/footer/homepage.png";
import homepage2 from "../assets/footer/homepage2.png";
import profile from "../assets/footer/profile.png";
import profile2 from "../assets/footer/profile2.png";
import checklist from "../assets/footer/checklist.png";
import checklist2 from "../assets/footer/checklist2.png";
import { useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToHomepage = () => {
    navigate("/home");
  };

  const goToEventos = () => {
    navigate("/eventos");
  };

  const goToProfile = () => {
    navigate("/perfil");
  };

  const iconeProfile1 = profile;
  const iconeProfile2 = profile2;
  const iconeHomepage1 = homepage;
  const iconeHomepage2 = homepage2;
  const iconeChecklist1 = checklist;
  const iconeChecklistt2 = checklist2;

  const changeIconHomeBasedOnLocation = (location) => {
    switch (location.pathname) {
      case "/home":
        return iconeHomepage2;
      default:
        return iconeHomepage1;
    }
  };

  const changeIconChecklistBasedOnLocation = (location) => {
    switch (location.pathname) {
      case "/eventos":
        return iconeChecklistt2;
      default:
        return iconeChecklist1;
    }
  };

  const changeIconProfileBasedOnLocation = (location) => {
    switch (location.pathname) {
      case "/perfil":
        return iconeProfile2;
      default:
        return iconeProfile1;
    }
  };


  return (
    <div className="FooterCard">
      <div className="Item1">
  <div className="HomepageIcon" style={{ backgroundImage: `url(${changeIconHomeBasedOnLocation(location)})` }} onClick={goToHomepage} />Home
</div>
<div className="Item2">
  <div className="ShoppingCartIcon" style={{ backgroundImage: `url(${changeIconChecklistBasedOnLocation(location)})` }} onClick={goToEventos} />Eventos
</div>
<div className="Item3">
  <div className="AvatarIcon" style={{ backgroundImage: `url(${changeIconProfileBasedOnLocation(location)})` }} onClick={goToProfile} />Perfil
</div>

    </div>
  );
};

export default Footer;