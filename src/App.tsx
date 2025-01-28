import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomeView } from "./components/screenview/homeView";
import { ProcessView } from "./components/screenview/registerView";
import { FinanceView } from "./components/screenview/financeView";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/process" element={<ProcessView />} />
      <Route path= "finance" element= {<FinanceView/>}></Route>
    </Routes>
  );
};

export default App;
