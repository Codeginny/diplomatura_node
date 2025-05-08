import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../auth/useAuth";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState(null);

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

  // Función para iniciar sesión
  const onSubmit = async (data) => {
    setAuthError(null);

    try {
      await login(data.email, data.password);
      toast.success("Inicio de sesión exitoso");
    } catch (error) {
      console.error("Error en el login:", error);
      setAuthError("Correo o contraseña incorrectos.");
      toast.error("Correo o contraseña incorrectos.");
    }
  };

  // Función para usar credenciales de administrador
  const handleAdminClick = () => {
    setValue("email", "administrador1@admin.com");
    setValue("password", "administrador1");
    handleSubmit(onSubmit)(); // Enviar el formulario con las credenciales predefinidas
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
            {authError && <p className="text-red-400 text-sm mt-1">{authError}</p>}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-md transition-all duration-300"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
