import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(/[#@$!%*?&]/, "Password must contain at least one special character")
    .required("Password is required"),
});

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5001/api/auth/signup", data);
      alert("Signup successful!");
      console.log(response.data);
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name:</label>
          <input type="text" {...register("name")} />
          <p>{errors.name?.message}</p>
        </div>

        <div>
          <label>Email:</label>
          <input type="email" {...register("email")} />
          <p>{errors.email?.message}</p>
        </div>

        <div>
          <label>Password:</label>
          <input type="password" {...register("password")} />
          <p>{errors.password?.message}</p>
        </div>

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
