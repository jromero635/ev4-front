import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import "./css/MascotasForm.css";

function MascotasForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [estado, setEstado] = useState("");
  const [tipoAnimal, setTipoAnimal] = useState("");
  const [edad, setEdad] = useState(0);
  const [raza, setRaza] = useState("");
  const [sexo, setSexo] = useState("");
  const [tamano, setTamano] = useState("");
  const [error, setError] = useState("");

  const obtenerMascota = async () => {
    try {
      const respuesta = await api.get(`/mascotas/${id}/`);

      setNombre(respuesta.data.nombre);
      setDescripcion(respuesta.data.descripcion);
      setEstado(respuesta.data.estado);
      setTipoAnimal(respuesta.data.tipo_animal);
      setEdad(respuesta.data.edad);
      setRaza(respuesta.data.raza);
      setSexo(respuesta.data.sexo);
      setTamano(respuesta.data.tamano);
    } catch (error) {
      console.log(error.response?.status);
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    if (id) {
      obtenerMascota();
    }
  }, [id]);

  const guardarMascota = async (e) => {
    e.preventDefault();

    if (nombre.trim() === "") {
      setError("Nombre no puede estar vacía");
      return;
    }

    if (descripcion.trim() === "") {
      setError("Descripción no puede estar vacía");
      return;
    }

    if (estado === "") {
      setError("Seleccione un estado.");
      return;
    }

    if (tipoAnimal === "") {
      setError("Seleccione un tipo de animal.");
      return;
    }

    if (edad < 0) {
      setError("La edad debe ser mayor o igual a 0.");
      return;
    }

    if (sexo === "") {
      setError("Seleccione el sexo del animal.");
      return;
    }

    if (tamano === "") {
      setError("Seleccione el tamaño del animal.");
      return;
    }

    if (!id && imagen === null) {
      setError("Ingrese una imagen.");
      return;
    }

    setError("");

    const formData = new FormData();

    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);

    if (imagen) {
      formData.append("imagen", imagen);
    }

    formData.append("estado", estado);
    formData.append("tipo_animal", tipoAnimal);
    formData.append("edad", edad);
    formData.append("raza", raza);
    formData.append("sexo", sexo);
    formData.append("tamano", tamano);

    try {
      let respuesta;

      if (id) {
        respuesta = await api.patch(`/mascotas/${id}/`, formData);

        if (respuesta.status === 200) {
          alert("Mascota actualizada con éxito.");
        }
      } else {
        respuesta = await api.post("/mascotas/", formData);

        if (respuesta.status === 201) {
          alert("Mascota agregada con éxito.");
        }
      }

      setNombre("");
      setDescripcion("");
      setEstado("");
      setTipoAnimal("");
      setEdad(0);
      setRaza("");
      setSexo("");
      setTamano("");
      setImagen(null);
      setError("");

      navigate("/mascotas");
    } catch (error) {
      switch (error.response?.status) {
        case 400:
          setError(Object.values(error.response?.data)[0][0]);
          break;
        case 401:
          setError("No autorizado.");
          break;

        case 403:
          setError("Acceso denegado.");
          break;

        case 404:
          setError("No se encontró el recurso.");
          break;

        case 500:
          setError("Error interno del servidor.");
          break;

        default:
          setError("Ocurrió un error inesperado.");
          break;
      }

      console.log(error.response?.status);
      console.log(error.response?.data);
    }
  };

  return (
    <form onSubmit={guardarMascota} className="container mb-3">
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <textarea
        className="form-control mb-3"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <select
        className="form-select mb-3"
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
      >
        <option value="">Seleccione un estado</option>
        <option value="adoptada">Adoptado/a</option>
        <option value="en_adopcion">En adopción</option>
        <option value="perdida">Perdida</option>
        <option value="encontrada">Encontrada</option>
      </select>
      <select
        className="form-select mb-3"
        value={tipoAnimal}
        onChange={(e) => setTipoAnimal(e.target.value)}
      >
        <option value="">Seleccione un tipo</option>
        <option value="perro">Perro</option>
        <option value="gato">Gato</option>
        <option value="ave">Ave</option>
        <option value="otro">Otro</option>
      </select>
      <input
        type="number"
        className="form-control mb-3"
        placeholder="Edad"
        value={edad}
        onChange={(e) => setEdad(Number(e.target.value))}
      />
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Raza"
        value={raza}
        onChange={(e) => setRaza(e.target.value)}
      />
      <select
        className="form-select mb-3"
        value={sexo}
        onChange={(e) => setSexo(e.target.value)}
      >
        <option value="">Seleccione un sexo</option>
        <option value="macho">Macho</option>
        <option value="hembra">Hembra</option>
        <option value="desconocido">Desconocido</option>
      </select>
      <select
        className="form-select mb-3"
        value={tamano}
        onChange={(e) => setTamano(e.target.value)}
      >
        <option value="">Seleccione un tamaño</option>
        <option value="grande">Grande</option>
        <option value="mediano">Mediano</option>
        <option value="pequeno">Pequeño</option>
        <option value="desconocido">Desconocido</option>
      </select>
      <input
        type="file"
        className="form-control mb-3"
        onChange={(e) => setImagen(e.target.files[0])}
      />{" "}
      <button className="btn btn-success">
        {id ? "Actualizar Mascota" : "Guardar Mascota"}
      </button>
      <p className="text-danger mt-2">{error}</p>
    </form>
  );
}

export default MascotasForm;
