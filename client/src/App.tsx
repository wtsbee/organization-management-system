import { Route, Routes } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Header from "@/components/header/Header";
import SideMenu from "@/components/sideMenu/SideMenu";
import DepartmentManagement from "@/pages/DepartmentManagement";
import ApiTest from "@/pages/ApiTest";
import VersionManagement from "@/pages/VersionManagement";
import NewVersion from "@/pages/NewVersion";
import OrganizationChart from "./pages/OrganizationChart";
import EmployeeManagement from "./pages/EmployeeManagement";
import EditVersion from "./pages/EditVersion";
import NewEmployee from "./pages/NewEmployee";
import EditEmployee from "./pages/EditEmployee";

const client = new ApolloClient({
  uri: `${import.meta.env.VITE_BACKEND_URL}/query`,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Header />
      <SideMenu />
      <div className="main px-10 py-5">
        <Routes>
          <Route path="/" element={<VersionManagement />} />
          <Route path="/version/:id" element={<EditVersion />} />
          <Route path="/version/new" element={<NewVersion />} />
          <Route path="/department" element={<DepartmentManagement />} />
          <Route path="/employee" element={<EmployeeManagement />} />
          <Route path="/employee/:id" element={<EditEmployee />} />
          <Route path="/employee/new" element={<NewEmployee />} />
          <Route path="/orgchart" element={<OrganizationChart />} />
          <Route path="/test" element={<ApiTest />} />
        </Routes>
      </div>
    </ApolloProvider>
  );
}

export default App;
