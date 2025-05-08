// UserManagement.jsx
import React, { useState, useEffect } from "react"; // Asegúrate de importar useState y useEffect
import { api } from "../api/axios"; // Asegúrate de que el archivo axios.js está configurado correctamente
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


// Componente principal para la gestión de usuarios
const UserManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]); // Estado para almacenar los usuarios
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const [newUser, setNewUser] = useState({ email: "", name: "", role: "user" }); // Estado para el nuevo usuario

  const decodeToken = (token) => {
    const base64Url = token.split('.')[1]; // La segunda parte del JWT es el payload
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Reemplaza caracteres especiales
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
  };
  
  // Función para obtener los usuarios
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token"); // Recupera el token del localStorage
    
      if (!token) {
        toast.error("No estás autorizado. Por favor, inicia sesión.");
        return;
      }
  
      // Decodifica el token y obtiene el rol del usuario
      const user = decodeToken(token);
      console.log(user.role); // Verifica que sea 'admin'
  
      if (user.role !== 'admin') {
        toast.error("No tienes permisos de administrador.");
        return;
      }
  
      const res = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`, // Agregar el token en la cabecera
        },
      });
    
      setUsers(res.data); // Almacenar los usuarios obtenidos
      setLoading(false); // Terminar el estado de carga
    } catch (error) {
      setError("Error al obtener usuarios.");
      setLoading(false); // Terminar el estado de carga en caso de error
      toast.error("Error al obtener usuarios");
      console.error(error);
    }
  };
  

  useEffect(() => {
    fetchUsers(); // Llamar a la función para obtener usuarios cuando el componente se monte
  }, []); // El arreglo vacío asegura que solo se ejecute una vez al montar el componente

  // Función para crear un usuario
  const createUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Recupera el token del localStorage
      if (!token) {
        toast.error("No estás autorizado. Por favor, inicia sesión.");
        return;
      }

      const res = await api.post("/users", newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Usuario creado exitosamente.");
      setNewUser({ email: "", name: "", role: "user" }); // Limpiar el formulario
      fetchUsers(); // Volver a cargar los usuarios
    } catch (error) {
      toast.error("Error al crear el usuario.");
      console.error(error);
    }
  };

  // Función para eliminar un usuario
  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No estás autorizado. Por favor, inicia sesión.");
        return;
      }

      await api.delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Usuario eliminado exitosamente.");
      fetchUsers(); // Volver a cargar los usuarios
    } catch (error) {
      toast.error("Error al eliminar el usuario.");
      console.error(error);
    }
  };

  // Función para manejar la actualización de usuarios
  const handleUpdateUser = async (id, updatedUser) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No estás autorizado. Por favor, inicia sesión.");
        return;
      }

      await api.put(`/users/${id}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Usuario actualizado exitosamente.");
      fetchUsers(); // Volver a cargar los usuarios
    } catch (error) {
      toast.error("Error al actualizar el usuario.");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
        <p className="text-xl text-gray-400">Cargando usuarios...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Gestión de Usuarios</h2>

      {error && (
        <div className="mb-4 p-4 bg-red-600 text-white rounded-md">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={createUser} className="mb-6 bg-gray-900 p-4 rounded-lg">
        <h3 className="text-xl font-bold text-blue-600 mb-4">Crear Nuevo Usuario</h3>
        <div>
          <input
            type="email"
            placeholder="Correo Electrónico"
            className="w-full mb-2 p-2 rounded-md"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Nombre"
            className="w-full mb-2 p-2 rounded-md"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            required
          />
          <select
            className="w-full mb-2 p-2 rounded-md"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
          >
            Crear Usuario
          </button>
        </div>
      </form>

      <div className="bg-gray-900 p-4 rounded-lg">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Nombre</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">No hay usuarios registrados.</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="border-b border-gray-700">
                  <td>{user._id}</td>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      onClick={() => handleUpdateUser(user._id, { ...user, role: "admin" })}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-md"
                    >
                      Promover a Admin
                    </button>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md ml-2"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
