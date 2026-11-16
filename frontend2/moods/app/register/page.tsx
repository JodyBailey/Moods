import Form from "next/form";
import Link from "next/link";
import { Box, Typography, FormControl, Input, Button } from "@mui/material";

import RegisterForm from "@/components/RegisterForm";
import { getBackendUrl, snakifyObject } from "@/helpers/general";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/tokens";

export default function Register() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <Typography variant="h2" className="authenticate-title text-center m-4">
        Register
      </Typography>
      <RegisterForm />
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        <Link href="/login">Login here</Link>
        &nbsp;If you already have an account
      </Typography>
    </Box>
  );
}
