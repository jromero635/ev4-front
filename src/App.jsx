import HomePages from "./Pages/HomePages";
import { NavLink, Routes, Route } from "react-router-dom";
import MascotasPages from "./Pages/MascotasPages";
import MascotasForm from "./componentes/MascotasForm";
import MascotaDetalle from "./Pages/MascotaDetalle";
function App() {
  return (
    <>
      <header>
        <nav
          className="navbar bg-dark border-bottom border-body"
          data-bs-theme="dark"
        >
          <NavLink to="/">Inicio</NavLink>
        </nav>

        <nav className="navbar bg-primary" data-bs-theme="dark">
          <NavLink to="/mascotas">Mascotas</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePages />} />
          <Route path="/mascotas" element={<MascotasPages />} />
          <Route path="/mascotas/formulario" element={<MascotasForm />} />
          <Route path="/mascotas/formulario/:id" element={<MascotasForm />} />
          <Route path="/mascotas/:id" element={<MascotaDetalle />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
