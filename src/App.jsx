import HomePages from "./Pages/HomePages";
import { NavLink, Routes, Route } from "react-router-dom";
import MascotasPages from "./Pages/MascotasPages";
import ComentariosList from "./componentes/ComentariosList";
import MascotasForm from "./componentes/MascotasForm";

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
        <nav className="navbar" data-bs-theme="light">
          <NavLink to="/comentarios">Comentarios</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePages />} />
          <Route path="/mascotas" element={<MascotasPages />} />
          <Route path="/comentarios" element={<ComentariosList />} />
          <Route path="/mascotas/formulario" element={<MascotasForm />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
