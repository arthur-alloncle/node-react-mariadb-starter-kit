import ListDecisions from "./ListDecisions";
import CreateDecision from "./CreateDecision";

function DecisionsDashboard() {
  return (
    <div className="grid">
      <div className="col-3">
        <h1>Créer une décision</h1>
        <CreateDecision></CreateDecision>
      </div>
      <div className="col-1"></div>
      <div className="col-8">
        <h1>Liste des décisions</h1>
        <ListDecisions></ListDecisions>
      </div>
    </div>

  );
}

export default DecisionsDashboard;
