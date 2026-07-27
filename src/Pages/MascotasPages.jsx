import { useEffect, useState } from "react";
import api from "../api/api";
import MascotasList from "../componentes/MascotasList";
import { useNavigate } from "react-router-dom";

function MascotasPages() {
  const navigate = useNavigate();
  const [mascotas, setMascotas] = useState([]);

  const obtenerMascotas = async () => {
    try {
      const respuesta = await api.get("/mascotas/");
      setMascotas(respuesta.data);
    } catch (error) {
      console.log(error.response?.status);
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    obtenerMascotas();
  }, []);

  return (
    <div className="container mt-4">
      <h1>Mascotas</h1>

      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate("/mascotas/formulario")}
      >
        Agregar Mascota
      </button>

      <MascotasList lista={mascotas} />
    </div>
  );
}

export default MascotasPages;
