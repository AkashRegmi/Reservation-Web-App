import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

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
      const response = await axios.post(
        "http://localhost:5001/api/auth/signup",
        data
      );
      toast.success(response.data.message);
      setTimeout(() => navigate("/signin"), 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#e0f7fa", // Light blue background
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          width: "380px",
          textAlign: "center",
        }}
      >
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
          <button
            type="submit"
            style={{
              marginTop: "10px",
              padding: "10px",
              width: "100%",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
