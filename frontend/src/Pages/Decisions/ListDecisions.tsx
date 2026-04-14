import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

interface Decision {
  id: string;
  title: string;
  outcome: number | string;
  importance: number;
  confidence: number;
  user_id: string;
  category_id: string;
}

function ListDecisions() {
  const [decisions, setDecisions] = useState<Decision[]>();
  useEffect(() => {
    const getDecisions = async () => {
      const res = await fetch("http://localhost:5000/decision/list", {
        credentials: "include",
      });
      if (!res.ok) {
        return;
      }
      const list = await res.json();
      let formated: Decision[] = [];

      list.map((decision: Decision) => {
        formated.push({
          ...decision,
          outcome:
            decision.outcome === 0
              ? "echec"
              : decision.outcome === null
                ? "en cours"
                : "succes",
        });
      });
      setDecisions(formated);
    };
    getDecisions();
  }, []);
  return (
    <>
      <DataTable value={decisions}>
        <Column field="title" header="Décision prise"></Column>
        <Column field="confidence" header="Confiance"></Column>
        <Column field="importance" header="Impact"></Column>
        <Column field="outcome" header="Résultat">
          aaa
        </Column>
      </DataTable>
    </>
  );
}

export default ListDecisions;
