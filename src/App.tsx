import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomeView } from "./components/Screenview/homeView";
import { ClientsView } from "./components/Screenview/clientsView";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/clients" element={<ClientsView />} />
    </Routes>
  );
};

export default App;
