import { Route, Routes } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Header from "@/components/header/Header";
import SideMenu from "@/components/sideMenu/SideMenu";
import DepartmentManagement from "@/pages/DepartmentManagement";
import ApiTest from "@/pages/ApiTest";
import VersionManagement from "@/pages/VersionManagement";
import NewVersionManagement from "@/pages/NewVersionManagement";
import OrganizationChart from "./pages/OrganizationChart";
import EmployeeManagement from "./pages/EmployeeManagement";

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
          <Route path="/version/new" element={<NewVersionManagement />} />
          <Route path="/department" element={<DepartmentManagement />} />
          <Route path="/employee" element={<EmployeeManagement />} />
          <Route path="/orgchart" element={<OrganizationChart />} />
          <Route path="/test" element={<ApiTest />} />
        </Routes>
      </div>
    </ApolloProvider>
  );
}

export default App;
