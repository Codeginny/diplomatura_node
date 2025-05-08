import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../auth/useAuth";
import { api } from "../api/axios"; // Asegúrate de importar el axios para enviar la solicitud

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const schema = Yup.object({
    email: Yup.string().email("Email inválido").required("Email es obligatorio"),
    password: Yup.string().min(6, "Mínimo 6 caracteres").required("Contraseña obligatoria"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleAdminClick = () => {
    setIsAdminModalOpen(true);
  };

  const onSubmit = async (data) => {
    setAuthError(null);
  
    try {
      // Enviamos la solicitud de login
      const response = await api.post("/auth/login", {
        email: data.email,
        password: data.password,
      });
  
      console.log("Respuesta del login:", response.data);  // Verifica la respuesta completa del servidor
  
      const { token, user } = response.data;
  
      console.log("Token recibido:", token);  // Verifica que el token esté correcto
      console.log("Usuario recibido:", user);  // Verifica que el usuario esté completo (con role incluido)
  
      if (token) {
        console.log("Token recibido:", token);
  
        // Guardar el token en localStorage
        localStorage.setItem("token", token);
        console.log("Token guardado en localStorage:", localStorage.getItem("token"));
  
        // Actualiza el estado de autenticación
        login(user, token);  // Llamamos a login con el usuario y el token
        toast.success("Inicio de sesión exitoso");
  
        // Verifica el rol del usuario y redirige según corresponda
        if (user.role === "admin") {
          console.log("Rol del usuario:", user.role);  // Verifica el rol del usuario
          navigate("/admin");
        } else {
          console.log("Rol del usuario:", user.role);  // Verifica el rol del usuario
          navigate("/movies");
        }
      } else {
        console.log("No se recibió el token.");
      }
    } catch (error) {
      console.error("Error en el login:", error.response?.data || error.message);
      setAuthError("Correo o contraseña incorrectos.");
      toast.error("Correo o contraseña incorrectos.");
    }
  };
  

  return (
    <div className="mt-6 min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md bg-[#111] p-8 rounded-2xl shadow-2xl border border-gray-800">
        <h2 className="text-3xl font-bold text-red-600 text-center mb-6">Iniciar Sesión</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <button
            type="button"
            onClick={handleAdminClick}
            className="w-full bg-gray-700 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition-all duration-300 mb-4"
          >
            Soy Administrador
          </button>

          <div>
            <label className="block text-sm font-medium mb-1">Correo electrónico</label>
            <input
              type="email"
              {...register("email")}
              className="w-full bg-gray-900 text-white border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="tucorreo@ejemplo.com"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="w-full bg-gray-900 text-white border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-2xl"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
            {authError && (
              <p className="text-red-400 text-sm mt-1">{authError}</p>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-md transition-all duration-300"
            >
              Iniciar sesión
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-400">
            <p><strong>Credencial de usuario</strong></p>
            <p>viir.ponce@gmail.com </p>
            <p>Contraseña: 1234567</p>
          </div>

        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          ¿No tienes una cuenta?{' '}
          <a href="/register" className="text-red-500 hover:underline">
            Regístrate
          </a>
        </p>
      </div>

      {isAdminModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#222] p-8 rounded-lg max-w-md w-full">
            <h3 className="text-2xl text-blue-600 mb-4">Administrador</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="mb-4">
                <p className="text-sm text-gray-400">CREDENCIALES DE ADMINISTRADOR:</p>
                <p className="text-sm text-blue-600">administrador1@admin.com</p>
                <p className="text-sm text-blue-600">Contraseña: administrador1</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Correo electrónico</label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full bg-gray-900 text-white border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="tucorreo@ejemplo.com"
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium mb-1">Contraseña</label>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="w-full bg-gray-900 text-white border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-2xl"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="w-full bg-blue-900 hover:bg-blue-600 text-white font-semibold py-3 rounded-md transition-all duration-300"
                >
                  Acceder a los controles
                </button>
              </div>
            </form>
            <button
              onClick={() => setIsAdminModalOpen(false)}
              className="absolute top-2 right-2 text-white text-xl"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
