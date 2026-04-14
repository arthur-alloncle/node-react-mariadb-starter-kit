import { useState, useEffect, type ChangeEvent, type SubmitEvent } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown, type DropdownChangeEvent } from "primereact/dropdown";

interface DecisionForm {
  outcome: null | number;
  confidence: number;
  importance: number;
  title: string;
}

interface Category {
  id: string;
  name: string;
  display_name: string;
}

function CreateDecision() {
  const [categories, setCategories] = useState<Category[]>();
  const [decisionForm, setDecisionForm] = useState<DecisionForm>({
    outcome: null,
    confidence: 0,
    importance: 0,
    title: "",
  });
  const [category, setCategory] = useState<string>();

  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch("http://localhost:5000/category");
      if (!res.ok) {
        console.error(res.status);
        return;
      }
      const list = await res.json();
      setCategories(list);
    };
    getCategories();
    console.log(categories);
  }, []);

  const handleSubmit = async (
    e: SubmitEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    const body = JSON.stringify({
      outcome: decisionForm.outcome,
      confidence: decisionForm.confidence,
      importance: decisionForm.importance,
      title: decisionForm.title,
      category_id: category,
    });

    console.log(body);

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

    setDecisionForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (e: DropdownChangeEvent): void => {
    setCategory(e.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-column gap-2 mt-3">
          <label htmlFor="title">Titre</label>
          <InputText
            type="text"
            name="title"
            id="title"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-column gap-2 mt-3">
          <label htmlFor="category">Catégorie</label>
          <Dropdown
            value={category}
            onChange={handleSelectChange}
            options={categories}
            optionLabel="display_name"
            optionValue="id"
            placeholder="Sélectionnez une option"
          />
        </div>
        <div className="flex flex-column gap-2 mt-3">
          <label htmlFor="confidence">Niveau de confiance</label>
          <InputText
            type="text"
            name="confidence"
            id="confidence"
            onChange={handleChange}
          />
          <small>Entre 1 et 10</small>
        </div>
        <div className="flex flex-column gap-2 mt-3">
          <label htmlFor="importance">Impact de la décision</label>
          <InputText
            type="text"
            name="importance"
            id="importance"
            onChange={handleChange}
          />
          <small>Entre 1 et 4</small>
        </div>

        <div className="mt-3">
          <Button type="submit">Envoyer</Button>
        </div>
      </form>
    </>
  );
}

export default CreateDecision;
