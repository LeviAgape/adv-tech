import IconProcess from "../../assets/IconProcess.png";

import IconDashboard from "../../assets/IconDashboard.png";

import IconFinance from "../../assets/IconFinance.png";

import IconLogout from "../../assets/IconLogout.png";

export const navBarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: (
      <img
        src={IconDashboard}
        alt="Dashboard"
        style={{ width: 20, height: 20, paddingRight: 2 }}
      />
    ),
  },
  {
    title: "Processos",
    path: "/process",
    icon: (
      <img
        src={IconProcess}
        alt="Dashboard"
        style={{ width: 20, height: 20, paddingRight: 2 }}
      />
    ),
  },
  {
    title: "Financeiro",
    path: "/finance",
    icon: (
      <img
        src={IconFinance}
        alt="Dashboard"
        style={{ width: 20, height: 20, paddingRight: 2 }}
      />
    ),
  },
  {
    title: "Logout",
    path: "/",
    icon: (
      <img
        src={IconLogout}
        alt="Logout"
        style={{ width: 20, height: 20, paddingRight: 2 }}
      />
    ),
  },
];
