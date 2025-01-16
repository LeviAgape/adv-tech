import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomeView } from "./components/screenview/homeView";
import { ProcessView } from "./components/screenview/processView";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/process" element={<ProcessView />} />
    </Routes>
  );
};

export default App;
