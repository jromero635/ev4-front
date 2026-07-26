import { useNavigate } from "react-router-dom";

function HomePages() {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      <h1> Mascotas</h1>

      <p className="lead">
        Bienvenido a la pagina de adopción y búsqueda de mascotas":)"{" "}
      </p>

      <button
        className="btn btn-primary btn-lg"
        onClick={() => navigate("/mascotas")}
      >
        Ver Mascotas
      </button>
    </div>
  );
}

export default HomePages;
