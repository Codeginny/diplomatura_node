import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "../api/axios";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

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
    setPasswordError(false);

    try {
      const response = await axios.post("/auth/login", data);
      login(response.data.token);
      toast.success("Inicio de sesión exitoso");
      navigate("/home");
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Error al iniciar sesión";

      // Mostrar mensaje específico si la contraseña es incorrecta
      if (errorMessage.toLowerCase().includes("contraseña incorrecta")) {
        setPasswordError(true);
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
            {passwordError && (
              <p className="text-red-400 text-sm mt-1">Contraseña incorrecta</p>
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
