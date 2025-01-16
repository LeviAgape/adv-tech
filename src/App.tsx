import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomeView } from "./components/Screenview/homeView";
import { ProcessView } from "./components/Screenview/processView";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/process" element={<ProcessView />} />
    </Routes>
  );
};

export default App;
