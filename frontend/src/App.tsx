import { Route, Routes } from "react-router-dom"
import Login from "./Pages/Login/Login"
import CreateDecision from "./Pages/Decisions/CreateDecision"
import 'primeflex/primeflex.css'; // flex
import 'primereact/resources/primereact.min.css'; //core css
import 'primereact/resources/themes/md-light-deeppurple/theme.css'; //theme

// import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme

import ListDecisions from "./Pages/Decisions/ListDecisions";
import DecisionsDashboard from "./Pages/Decisions/Decisions";
export function App() {
  return (
    <>
      <Routes>
        <Route element={<Login />} path="/login" />

        <Route element={<DecisionsDashboard />} path="/decisions" />
      </Routes>
    </>
  )
}

export default App