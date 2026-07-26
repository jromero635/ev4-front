import { useEffect, useState } from "react";
import api from "../api/api";

function ComentariosList() {
  const [comentarios, setComentarios] = useState([]);

  const obtenerComentarios = async () => {
    try {
      const respuesta = await api.get("/comentarios/");
      setComentarios(respuesta.data);
    } catch (error) {
      console.log(error.response?.status);
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    obtenerComentarios();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Comentarios</h1>

      <div className="row">
        {comentarios.map((comentario) => (
          <div className="col-md-6 mb-3" key={comentario.id}>
            <div className="card shadow h-100">
              <div className="card-body">
                <h5 className="card-title">{comentario.autor}</h5>

                <p className="card-text">
                  <strong>Comentario:</strong> {comentario.contenido}
                </p>

                <p className="card-text">
                  <strong>Mascota:</strong> {comentario.mascota}
                </p>

                <p className="card-text">
                  <strong>Fecha:</strong> {comentario.fecha}
                </p>

                <button className="btn btn-danger">Eliminar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComentariosList;
