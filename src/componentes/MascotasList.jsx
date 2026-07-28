import api from "../api/api";
import "./css/MascotasList.css";
import { useNavigate } from "react-router-dom";

function MascotasList({ lista, obtenerMascotas }) {
  const navigate = useNavigate();
  const eliminarMascota = async (id) => {
    try {
      const respuesta = await api.delete(`/mascotas/${id}/`);

      switch (respuesta.status) {
        case 204:
          alert("Mascota eliminada con éxito.");
          obtenerMascotas();
          break;

        default:
          alert("Respuesta inesperada.");
          break;
      }
    } catch (error) {
      switch (error.response?.status) {
        case 404:
          alert("La mascota no existe.");
          break;

        case 500:
          alert("Error interno del servidor.");
          break;

        default:
          alert("Ocurrió un error.");
          break;
      }

      console.log(error.response?.status);
      console.log(error.response?.data);
    }
  };

  return (
    <div className="row">
      {lista.map((mascota) => (
        <div className="col-md-4 mb-4" key={mascota.id}>
          <div className="card h-100 shadow">
            <img
              src={mascota.imagen}
              className="card-img-top imagen-mascota"
              alt={mascota.nombre}
            />

            <div className="card-body">
              <h5 className="card-title">{mascota.nombre}</h5>

              <p className="card-text">
                <strong>Descripción:</strong> {mascota.descripcion}
              </p>

              <p className="card-text">
                <strong>Estado:</strong> {mascota.estado}
              </p>

              <p className="card-text">
                <strong>Tipo:</strong> {mascota.tipo_animal}
              </p>

              <p className="card-text">
                <strong>Edad:</strong> {mascota.edad}
              </p>

              <p className="card-text">
                <strong>Raza:</strong> {mascota.raza}
              </p>

              <p className="card-text">
                <strong>Sexo:</strong> {mascota.sexo}
              </p>

              <p className="card-text">
                <strong>Tamaño:</strong> {mascota.tamano}
              </p>

              <button
                className="btn btn-info w-100 mb-2"
                onClick={() => navigate(`/mascotas/${mascota.id}`)}
              >
                Ver detalle
              </button>

              <button
                className="btn btn-warning w-100 mb-2"
                onClick={() => navigate(`/mascotas/formulario/${mascota.id}`)}
              >
                Editar Mascota
              </button>

              <button
                className="btn btn-danger w-100"
                onClick={() => eliminarMascota(mascota.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MascotasList;
