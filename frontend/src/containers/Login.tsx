import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Box, Typography, FormControl, Input, Button } from "@mui/material";

import axiosClient from "../helpers/axiosClient";
import { useAuthorisedContext } from "../hooks/useAuthorisedContext";
import { getBackendUrl } from "../helpers/general";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/tokens";
import type { AxiosResponse } from "axios";

type LoginFormData = {
  username: string;
  password: string;
};

type LoginResponse = {
  access: string;
  refresh: string;
};

const Login = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });
  const { setIsAuthorised } = useAuthorisedContext();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data: LoginFormData): Promise<AxiosResponse<LoginResponse>> =>
      await axiosClient.post(getBackendUrl("login"), data),
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

    mutation.mutate(formData, {
      onSuccess: (data) => {
        localStorage.setItem(ACCESS_TOKEN, data.data.access);
        localStorage.setItem(REFRESH_TOKEN, data.data.refresh);

        setIsAuthorised(true);
        navigate("/entries");

        toast("Logged in!", {
          type: "success",
        });
      },
      onError: () => {
        toast("Invalid username or password", { type: "error", position: "top-center" });
      },
    });
  };

  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
      <Typography variant="h2" className="authenticate-title text-center m-4">
        Login
      </Typography>
      <form className="authenticate-form  d-flex flex-column" onSubmit={handleSubmit}>
        <FormControl className="mb-3">
          <Input
            required
            autoFocus
            autoComplete="off"
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleOnChange}
          />
        </FormControl>
        <FormControl className="mb-3">
          <Input
            required
            autoFocus
            autoComplete="off"
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleOnChange}
          />
        </FormControl>
        <Button
          sx={{ textTransform: "none" }}
          className="submit-btn"
          variant="contained"
          type="submit"
        >
          Login
        </Button>
      </form>
      <Typography variant="body1" textAlign={"center"}>
        Register for an account <Link to="/register">here</Link>
      </Typography>
    </Box>
  );
};

export default Login;
