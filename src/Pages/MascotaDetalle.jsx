import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import "../componentes/css/MascotasDetalle.css";

function MascotasDetalle() {
  const { id } = useParams();

  const [mascota, setMascota] = useState(null);

  const [autor, setAutor] = useState("");
  const [contenido, setContenido] = useState("");
  const [error, setError] = useState("");

  const obtenerMascota = async () => {
    try {
      const respuesta = await api.get(`/mascotas/${id}/`);
      setMascota(respuesta.data);
    } catch (error) {
      console.log(error.response?.status);
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    obtenerMascota();
  }, []);

  const agregarComentario = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await api.post(`/mascotas/${id}/comentar/`, {
        autor,
        contenido,
      });

      switch (respuesta.status) {
        case 201:
          alert("Comentario agregado con éxito.");
          setAutor("");
          setContenido("");
          setError("");
          obtenerMascota();
          break;

        default:
          alert("Respuesta inesperada.");
          break;
      }
    } catch (error) {
      switch (error.response?.status) {
        case 400:
          setError(Object.values(error.response?.data)[0][0]);
          break;

        case 404:
          setError("Mascota no encontrada.");
          break;

        case 500:
          setError("Error interno del servidor.");
          break;

        default:
          setError("Ocurrió un error.");
          break;
      }

      console.log(error.response?.status);
      console.log(error.response?.data);
    }
  };

  const eliminarComentario = async (comentarioId) => {
    try {
      const respuesta = await api.delete(`/comentarios/${comentarioId}/`);

      switch (respuesta.status) {
        case 204:
          alert("Comentario eliminado.");
          obtenerMascota();
          break;

        default:
          alert("Respuesta inesperada.");
          break;
      }
    } catch (error) {
      switch (error.response?.status) {
        case 404:
          alert("Comentario no encontrado.");
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

  if (!mascota) {
    return <h2 className="text-center mt-5">Cargando...</h2>;
  }

  return (
    <div className="container mt-4">
      <h2>{mascota.nombre}</h2>

      <img
        src={mascota.imagen}
        alt={mascota.nombre}
        className="imagen-mascota mb-3"
      />

      <p>
        <strong>Descripción:</strong> {mascota.descripcion}
      </p>

      <p>
        <strong>Estado:</strong> {mascota.estado}
      </p>

      <p>
        <strong>Tipo:</strong> {mascota.tipo_animal}
      </p>

      <p>
        <strong>Edad:</strong> {mascota.edad}
      </p>

      <p>
        <strong>Raza:</strong> {mascota.raza}
      </p>

      <p>
        <strong>Sexo:</strong> {mascota.sexo}
      </p>

      <p>
        <strong>Tamaño:</strong> {mascota.tamano}
      </p>

      <hr />

      <h3>Agregar comentario</h3>

      <form onSubmit={agregarComentario}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Autor"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        />

        <textarea
          className="form-control mb-3"
          placeholder="Comentario"
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
        />

        <button className="btn btn-success mb-3">Agregar comentario</button>

        <p className="text-danger">{error}</p>
      </form>

      <hr />

      <h3>Comentarios</h3>

      {mascota.comentarios.length === 0 ? (
        <p>No hay comentarios.</p>
      ) : (
        mascota.comentarios.map((comentario) => (
          <div key={comentario.id} className="card mb-3">
            <div className="card-body">
              <h5>{comentario.autor}</h5>

              <p>{comentario.contenido}</p>

              <button
                className="btn btn-danger"
                onClick={() => eliminarComentario(comentario.id)}
              >
                Eliminar comentario
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MascotasDetalle;
