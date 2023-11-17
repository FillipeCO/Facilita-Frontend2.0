
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Events from './pages/Events';
import Eventdetails from './pages/Eventdetails';
import Perfil from './pages/Perfil';
import Editevent from './pages/Editevent';

import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/eventos" element={<Events />} />
        <Route path="/eventdetails/:id" element={<Eventdetails />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/editar/:id" element={<Editevent />} />

      </Routes>
      <Outlet />
    </BrowserRouter>
  );
}

export default App;