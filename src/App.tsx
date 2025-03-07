import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomeView } from "./components/Screenview/homeView";
import { ProcessView } from "./components/Screenview/registerView";
import { FinanceView } from "./components/Screenview/financeView";
import { UserLogin } from "./components/user/userLogin";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<HomeView />} />
      <Route path="/process" element={<ProcessView />} />
      <Route path="/finance" element={<FinanceView />}></Route>
      <Route path="/" element={<UserLogin />}></Route>
    </Routes>
  );
};

export default App;
