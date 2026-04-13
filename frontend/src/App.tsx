import { useState, useEffect, type ChangeEvent, type SubmitEvent } from "react";
import "./App.css";

interface FormState {
  email: string;
  password: string;
}

interface DecisionForm {
  outcome: null | number;
  confidence: number;
  importance: number;
  title: string;
}

function App() {
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
  });
  const [decisionForm, setDecisionForm] = useState<DecisionForm>({
    outcome: null,
    confidence: 0,
    importance: 0,
    title: "",
  });

 useEffect(() => {
  const getCategories = async () => {
    const res = await fetch('http://localhost:5000/category')
    if (!res.ok) {
      console.error(res.status);
      return;
    }
    const list = await res.json()
    console.log(list);
    
  }
    getCategories()
  }, [])

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

  const handleSubmitD = async (
    e: SubmitEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    const body = JSON.stringify({
      outcome: decisionForm.outcome,
      confidence: decisionForm.confidence,
      importance: decisionForm.importance,
      title: decisionForm.title,
    });

    fetch("http://localhost:5000/decision/create", {
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

  const handleChangeD = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;

    setDecisionForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" id="email" onChange={handleChange} />
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
        />
        <button type="submit">login</button>
      </form>
      <h1>Decision</h1>
      <form onSubmit={handleSubmitD}>
        <input
          type="text"
          name="outcome"
          id="outcome"
          placeholder="outcome"
          onChange={handleChangeD}
        />
        <input
          type="text"
          name="confidence"
          id="confidence"
          placeholder="confidence"
          onChange={handleChangeD}
        />
        <input
          type="text"
          name="importance"
          id="importance"
          placeholder="importance"
          onChange={handleChangeD}
        />
        <input
          type="text"
          name="title"
          id="title"
          placeholder="title"
          onChange={handleChangeD}
        />
        <button type="submit">Envoyer</button>
      </form>
    </>
  );
}

export default App;
