"use client";

import Form from "next/form";
import { redirect } from "next/navigation";
import { useActionState, useEffect } from "react";
import { FormControl, Input, Button } from "@mui/material";
import { toast } from "react-toastify";

import registerUser, { RegisterState } from "@/lib/register";

const initialState: RegisterState = {
  status: "idle",
};

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState(registerUser, initialState);

  useEffect(() => {
    if (state.status === "success") {
      toast.success("Registered!");

      redirect("/");
    } else if (state.status === "error") {
      toast.error("Error registering user. Please try again later.");
    }
  }, [state]);

  return (
    <Form className="authenticate-form  d-flex flex-column" action={formAction}>
      <FormControl className="mb-3">
        <Input autoFocus type="text" required placeholder="Username" autoComplete="off" name="username" />
      </FormControl>
      <FormControl className="mb-3">
        <Input type="email" required placeholder="Email" name="email" autoComplete="off" />
      </FormControl>
      <FormControl className="mb-3">
        <Input autoComplete="off" required type="password" placeholder="Password" name="password" />
      </FormControl>
      <FormControl className="mb-3">
        <Input autoComplete="off" required type="password" placeholder="Confirm Password" name="confirmedPassword" />
      </FormControl>
      <Button sx={{ textTransform: "none" }} className="submit-btn" variant="contained" type="submit">
        {pending ? "Registering..." : "Register"}
      </Button>
    </Form>
  );
}
