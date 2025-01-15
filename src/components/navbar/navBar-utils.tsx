import IconProcess from "../../assets/IconProcess.png";

import IconDashboard from "../../assets/IconDashboard.png";

export const navBarData = [
  {
    title: "Dashboard",
    path: "/",
    icon: <img src={IconDashboard} alt="Dashboard" style={{ width: 30, height: 30 }} />,
  },
  {
    title: "Processos",
    path: "/process",
    icon: <img src={IconProcess} alt="Dashboard" style={{ width: 30, height: 30, paddingRight: 2 }} />,
  },
];
