import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "./css/MascotasForm.css";

function MascotasForm() {
  const navigate = useNavigate();

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

  const guardarMascota = async (e) => {
    e.preventDefault();

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

    if (imagen === null) {
      setError("Ingrese una imagen.");
      return;
    }

    setError("");

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("imagen", imagen);
    formData.append("estado", estado);
    formData.append("tipo_animal", tipoAnimal);
    formData.append("edad", edad);
    formData.append("raza", raza);
    formData.append("sexo", sexo);
    formData.append("tamano", tamano);

    try {
      const respuesta = await api.post("/mascotas/", formData);

      if (respuesta.status === 201) {
        alert("Mascota agregada con éxito.");

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
      }
    } catch (error) {
      switch (error.response?.status) {
        case 400:
          setError("Ocurrio un error");
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
        <option value="">Seleccione un Tamaño</option>
        <option value="grande">Grande</option>
        <option value="mediano">Mediano</option>
        <option value="pequeno">Pequeño</option>
        <option value="desconocido">Desconocido</option>
      </select>

      <input
        type="file"
        className="form-control mb-3"
        onChange={(e) => setImagen(e.target.files[0])}
      />

      <button className="btn btn-success">Guardar Mascota</button>
      <p className="text-danger mt-2">{error}</p>
    </form>
  );
}
export default MascotasForm;
