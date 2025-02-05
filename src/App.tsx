import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomeView } from "./components/Screenview/homeView";
import { ProcessView } from "./components/Screenview/registerView";
import { FinanceView } from "./components/Screenview/financeView";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/process" element={<ProcessView />} />
      <Route path="/finance" element={<FinanceView />}></Route>
    </Routes>
  );
};

export default App;
