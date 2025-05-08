import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { api } from '../api/axios';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

// Validación del formulario
const schema = Yup.object({
  email: Yup.string().email('Email inválido').required('Email es obligatorio'),
  password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('Contraseña obligatoria'),
  name: Yup.string().required('Nombre es obligatorio'),
  role: Yup.string().required('Por favor, selecciona un rol')
});

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [roles, setRoles] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get('/auth/roles');
        setRoles(response.data);
      } catch (error) {
        console.error('Error al obtener roles:', error);
        setRoles([]);  // Si hay un error, se asigna un array vacío para evitar fallos
      }
    };
    fetchRoles();
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    try {
      await api.post('/auth/register', data);
      Swal.fire({
        icon: 'success',
        title: 'Cuenta creada con éxito',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
      }).then(() => {
        navigate('/movies');
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error?.response?.data?.message || 'Error al crear la cuenta',
      });
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl text-center text-red-600 font-bold mb-6">Crear cuenta</h2>

        <div className="mb-4">
          <label htmlFor="email" className="text-lg font-medium">Email</label>
          <input type="email" id="email" {...register('email')} className="w-full p-3 mt-2 rounded-md border border-gray-700 bg-gray-800 text-white" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="text-lg font-medium">Nombre completo</label>
          <input type="text" id="name" {...register('name')} className="w-full p-3 mt-2 rounded-md border border-gray-700 bg-gray-800 text-white" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="text-lg font-medium">Contraseña</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              {...register('password')}
              className="w-full p-3 pr-12 mt-2 rounded-md border border-gray-700 bg-gray-800 text-white"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-xl text-gray-400 hover:text-white"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="role" className="text-lg font-medium">Seleccionar Rol</label>
          <select
            id="role"
            {...register('role')}
            className="w-full p-3 mt-2 rounded-md border border-gray-700 bg-gray-800 text-white"
          >
            <option value="">Seleccione un rol</option>
            {roles.length > 0 ? (
              roles.map((role) => (
                <option key={role._id} value={role._id}>{role.name}</option>
              ))
            ) : (
              <option value="">Cargando roles...</option>
            )}
          </select>
          {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
        </div>

        <button type="submit" className="w-full p-3 mt-4 bg-red-600 text-white rounded-md hover:bg-red-700">
          Crear cuenta
        </button>
      </form>
    </div>
  );
};

export default Register;
