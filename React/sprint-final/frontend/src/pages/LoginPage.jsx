import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { api } from "../api/axios"; 
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState(null);  // Estado para almacenar el error de autenticación

  const schema = Yup.object({
    email: Yup.string().email("Email inválido").required("Email es obligatorio"),
    password: Yup.string().min(6, "Mínimo 6 caracteres").required("Contraseña obligatoria"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setAuthError(null);  // Resetear error de autenticación al intentar iniciar sesión

    try {
      const response = await api.post("/auth/login", data);
      login(response.data.user, response.data.token);
      toast.success("Inicio de sesión exitoso");
      navigate("/rolepage");
    } catch (error) {
      // Verificar si el error es de autenticación
      const errorMessage = error?.response?.data?.message || "Error al iniciar sesión";
      
      if (errorMessage.toLowerCase().includes("correo o contraseña incorrectos")) {
        setAuthError("Correo o contraseña incorrectos");  // Actualizar el estado con un mensaje claro
      } else {
        setAuthError("Hubo un error al intentar iniciar sesión. Intenta nuevamente.");
      }

      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md bg-[#111] p-8 rounded-2xl shadow-2xl border border-gray-800">
        <h2 className="text-3xl font-bold text-red-600 text-center mb-6">Iniciar Sesión</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            <>
              {/* Mostrar el error de autenticación si existe */}
              <p className="text-red-400 text-sm mt-1">{authError}</p>
            </>
          )}

          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-md transition-all duration-300"
          >
            Iniciar sesión
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          ¿No tienes una cuenta?{" "}
          <a href="/register" className="text-red-500 hover:underline">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
