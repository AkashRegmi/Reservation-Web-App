// import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

// ✅ Yup Validation Schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(8, "Password must be at least 8 characters long").required("Password is required"),
});

const Signin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // ✅ Handle Sign In
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5001/api/auth/signin", data);
      console.log(response);
      const token = response.data.token;
      
      if (token) {
        localStorage.setItem("authToken", token);
        toast.success("Sign In Successful!");
        // setTimeout(() => navigate("/dashboard"), 1500);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Sign In Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#f3f4f6",
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        width: "350px",
        textAlign: "center",
      }}>
        <h2 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "15px" }}>Sign In</h2>

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {/* Email Input */}
          <div style={{ textAlign: "left" }}>
            <label style={{ fontWeight: "500", color: "#444" }}>Email:</label>
            <input
              type="email"
              {...register("email")}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                fontSize: "14px",
                marginTop: "5px",
              }}
              required
            />
            <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>{errors.email?.message}</p>
          </div>

          {/* Password Input */}
          <div style={{ textAlign: "left" }}>
            <label style={{ fontWeight: "500", color: "#444" }}>Password:</label>
            <input
              type="password"
              {...register("password")}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                fontSize: "14px",
                marginTop: "5px",
              }}
              required
            />
            <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>{errors.password?.message}</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "10px",
              padding: "12px",
              width: "100%",
              backgroundColor: "#4F46E5",
              color: "white",
              fontSize: "16px",
              fontWeight: "500",
              borderRadius: "5px",
              cursor: "pointer",
              border: "none",
              outline: "none",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p style={{ marginTop: "10px", fontSize: "14px", color: "#555" }}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{
              color: "#4F46E5",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Sign Up
          </span>
        </p>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Signin;
