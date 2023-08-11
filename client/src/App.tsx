import { Route, Routes } from "react-router-dom";
import Header from "@/components/header/Header";
import SideMenu from "@/components/sideMenu/SideMenu";
import DepartmentManagement from "@/pages/DepartmentManagement";
import ApiTest from "@/pages/ApiTest";
import VersionManagement from "@/pages/VersionManagement";
import OrganizationChart from "./pages/OrganizationChart";
import EmployeeManagement from "./pages/EmployeeManagement";

function App() {
  return (
    <>
      <Header />
      <SideMenu />
      <div className="main px-10 py-5">
        <Routes>
          <Route path="/" element={<VersionManagement />} />
          <Route path="/department" element={<DepartmentManagement />} />
          <Route path="/employee" element={<EmployeeManagement />} />
          <Route path="/orgchart" element={<OrganizationChart />} />
          <Route path="/test" element={<ApiTest />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
