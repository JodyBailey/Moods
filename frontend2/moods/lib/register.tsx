"use server";

import { cookies } from "next/headers";

import { snakifyObject, getBackendUrl } from "@/helpers/general";
import fetchClient from "@/helpers/fetchClient";

type RegisterFormData = {
  username: string;
  email: string;
  password: string;
  confirmedPassword: string;
};

type RegisterPayload = Omit<RegisterFormData, "confirmedPassword"> & {
  confirmed_password: string;
};

type LoginResponse = {
  access: string;
  refresh: string;
};

export type RegisterState = {
  status: "idle" | "success" | "error";
};

export default async function registerUser(_previousState: RegisterState, formData: FormData): Promise<RegisterState> {
  try {
    const registerData = snakifyObject(Object.fromEntries(formData.entries())) as RegisterPayload;

    await fetchClient(getBackendUrl("register"), "POST", registerData);
  } catch (error) {
    console.error("Error registering user: ", error);

    return { status: "error" };
  }

  try {
    const loginData = snakifyObject({
      username: formData.get("username"),
      password: formData.get("password"),
    });

    const loginResponse: LoginResponse = await fetchClient(getBackendUrl("login"), "POST", loginData);
    const cookieStore = await cookies();

    cookieStore.set("access_token", loginResponse.access);
    cookieStore.set("refresh_token", loginResponse.refresh);

    return { status: "success" };
  } catch (error) {
    console.error("Error logging user in from registration: ", error);

    return { status: "error" };
  }
}
