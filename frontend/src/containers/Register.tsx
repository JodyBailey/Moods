import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { Box, Typography, FormControl, Input, Button } from "@mui/material";

import axiosClient from "../helpers/axiosClient";
import { getBackendUrl, snakifyObject } from "../helpers/general";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/tokens";
import { toast } from "react-toastify";
import { useAuthorisedContext } from "../hooks/useAuthorisedContext";
import type { AxiosResponse } from "axios";

type RegisterFormData = {
  username: string;
  email: string;
  password: string;
  confirmedPassword: string;
};

type RegisterPayload = Omit<RegisterFormData, "confirmedPassword"> & {
  confirmed_password: string;
};

type RegisterResponse = {
  access: string;
  refresh: string;
};

const Register = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });
  const { setIsAuthorised } = useAuthorisedContext();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: RegisterPayload): Promise<AxiosResponse<RegisterResponse>> =>
      axiosClient.post(getBackendUrl("register"), data),
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      const inputName = e.target.name;

      return {
        ...prev,
        [inputName]: e.target.value,
      };
    });
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.clear();

    if (formData.password !== formData.confirmedPassword) {
      return toast("Passwords must match", { type: "error", position: "top-center" });
    }

    mutation.mutate(snakifyObject(formData) as RegisterPayload, {
      onSuccess: async () => {
        const response = await axiosClient.post(
          getBackendUrl("login"),
          snakifyObject({
            username: formData.username,
            password: formData.password,
          }),
        );

        if (response.status === 200) {
          localStorage.setItem(ACCESS_TOKEN, response.data.access);
          localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
          setIsAuthorised(true);
          navigate("/");
          toast("Registered!", { type: "success" });
        }
      },
      onError: (err) => {
        console.error("Error registering user: ", err.message);

        toast("Error registering user. You can refresh the page or try again later.", { type: "error", position: "top-center" });
      },
    });
  };

  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
      <Typography variant="h2" className="authenticate-title text-center m-4">
        Register
      </Typography>
      <form className="authenticate-form  d-flex flex-column" onSubmit={handleSubmit}>
        <FormControl className="mb-3">
          <Input
            autoFocus
            type="text"
            required
            placeholder="Username"
            autoComplete="off"
            name="username"
            onChange={handleOnChange}
          />
        </FormControl>
        <FormControl className="mb-3">
          <Input type="email" required placeholder="Email" name="email" onChange={handleOnChange} autoComplete="off" />
        </FormControl>
        <FormControl className="mb-3">
          <Input autoComplete="off" required type="password" placeholder="Password" name="password" onChange={handleOnChange} />
        </FormControl>
        <FormControl className="mb-3">
          <Input
            autoComplete="off"
            required
            type="password"
            placeholder="Confirm Password"
            name="confirmedPassword"
            onChange={handleOnChange}
          />
        </FormControl>
        <Button sx={{ textTransform: "none" }} className="submit-btn" variant="contained" type="submit">
          Register
        </Button>
      </form>
      <Typography variant="body1" textAlign={"center"}>
        <Link to="/login">Login here</Link>
        &nbsp;If you already have an account
      </Typography>
    </Box>
  );
};

export default Register;
