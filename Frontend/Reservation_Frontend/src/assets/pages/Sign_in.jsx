import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate for navigation
import "react-toastify/dist/ReactToastify.css";

// ✅ Yup Validation Schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate(); // ✅ Initialize navigation

  // ✅ Handle Sign In
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/signin",
        data
      );
      console.log("Response:", response);
      const token = response.data.token;

      if (token) {
        localStorage.setItem("authToken", token);
        toast.success("Sign In Successful!");
      }

      // navigate("/dashboard");
    } catch (error) {
      console.error("Sign In Error:", error);
      toast.error(error.response?.data?.message || "Sign In Failed");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          Sign In
        </button>
      </form>

      <p style={{ marginTop: "10px" }}>
        Don't have an account?{" "}
        <span
          onClick={() => navigate("/signup")}
          style={{
            color: "blue",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Sign Up
        </span>
      </p>

      <ToastContainer />
    </div>
  );
};

export default Signin;
