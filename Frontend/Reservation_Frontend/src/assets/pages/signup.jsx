import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles for toast notifications
import { useNavigate } from "react-router-dom";

// ✅ Define validation schema using Yup
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[#@$!%*?&]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
});

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      console.log("before fetching ")
      const response = await axios.post(
        "http://localhost:5001/api/auth/signup",
        data
      );
      console.log("Response:", response);
      toast.success(response.data.message);
      setTimeout(() => navigate("/signin"), 1500);
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error(error.response?.data?.message || "Signup failed"); // Show error toast
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px",}}>
    <h2>Signup</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          {...register("name")}
          style={{ width: "100%", padding: "8px" }}
        />
        <p style={{ color: "red", fontSize: "12px" }}>
          {errors.name?.message}
        </p>
      </div>

      {/* Email Input */}
      <div>
        <label>Email:</label>
        <input
          type="email"
          {...register("email")}
          style={{ width: "100%", padding: "8px" }}
        />
        <p style={{ color: "red", fontSize: "12px" }}>
          {errors.email?.message}
        </p>
      </div>

      {/* Password Input */}
      <div>
        <label>Password:</label>
        <input
          type="password"
          {...register("password")}
          style={{ width: "100%", padding: "8px" }}
        />
        <p style={{ color: "red", fontSize: "12px" }}>
          {errors.password?.message}
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        style={{ marginTop: "10px", padding: "10px", width: "100%" }}
      >
        Signup
      </button>
    </form>
  </div>
   
  );
};

export default Signup;
