import { useState } from 'react';
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
  role: Yup.string().required('Por favor, selecciona un rol') // Validación del campo rol
});

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    try {
      // Aquí estamos pasando el rol junto con los demás campos
      await api.post('/auth/register', {
        email: data.email,
        password: data.password,
        name: data.name,
        role: data.role  // Asegúrate de pasar el rol
      });
      Swal.fire({
        icon: 'success',
        title: 'Cuenta creada con éxito',
        text: 'Presiona Aceptar para comenzar',
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-3xl text-center text-red-600 font-bold mb-6">Crear cuenta</h2>

        <div className="mb-4">
          <label htmlFor="email" className="text-lg font-medium">Email</label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className="w-full p-3 mt-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="text-lg font-medium">Nombre completo</label>
          <input
            type="text"
            id="name"
            {...register('name')}
            className="w-full p-3 mt-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div className="mb-4 relative">
          <label htmlFor="password" className="text-lg font-medium">Contraseña</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              {...register('password')}
              className="w-full p-3 pr-12 mt-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
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


        <button
          type="submit"
          className="w-full p-3 mt-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
        >
          Crear cuenta
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm">
            ¿Ya tienes cuenta?{' '}
            <a href="/login" className="text-red-500 hover:underline">
              Inicia sesión
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
