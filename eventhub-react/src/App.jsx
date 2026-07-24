import { useState } from "react";
import Login from "./components/Login";
import RegisterForm from "./components/RegisterForm";

function App() {
  const [view, setView] = useState("login");

  if (view === "login") {
    return <Login onLogin={() => setView("register")} />;
  }

  return <RegisterForm />;
}

export default App;