import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { login } from "../services/authService";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import Card from "../components/common/Card";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login: loginUserContext } = useAuth();
  const onSubmit = async (data) => {
    try {
      const response = await login(data);
      loginUserContext(response.user, response.token);
      toast.success(response.message);
      
      navigate("/dashboard");
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      toast.error(
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <Card className="w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Login to your DevCollab account
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            register={register}
            name="email"
            required
            error={errors.email}
          />

          <div className="mb-5">

            <label className="block mb-2 font-medium">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                {...register("password", {
                  required: "Password is required",
                })}
                className="w-full border rounded-xl p-3 pr-12 focus:ring-2 focus:ring-indigo-500 outline-none"
              />

              <button
                type="button"
                className="absolute right-4 top-4"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}

          </div>

          <Button type="submit">
            Login
          </Button>

        </form>

        <p className="text-center mt-6">

          Don't have an account?

          <Link
            to="/register"
            className="text-indigo-600 ml-2 font-semibold"
          >
            Register
          </Link>

        </p>

      </Card>

    </div>
  );
}

export default Login;