import { useState, useEffect, type ChangeEvent, type SubmitEvent } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

interface FormState {
  email: string;
  password: string;
}

function Login() {
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
  });

  const handleSubmit = async (
    e: SubmitEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    const body = JSON.stringify({
      email: form.email,
      password: form.password,
    });

    fetch("http://localhost:5000/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <>
      <div className="text-center">
        <h1>Login</h1>
      </div>
      <div className="flex justify-content-center">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-column gap-2">
            <label htmlFor="email">Adresse email</label>
            <InputText
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-column gap-2 mt-3">
            <label htmlFor="password">Mot de passe</label>
            <InputText
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
            />
          </div>
          <div className="mt-3">
            <Button type="submit">login</Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
