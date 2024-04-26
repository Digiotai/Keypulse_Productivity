import './App.css';
import { AdminLayout } from './layout';
import { Login } from './pages/Auth/login';
import { Register } from './pages/Auth/register';
import { KProcess } from './pages/KProcess';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Sustainability } from './pages/Sustainability';
import { Resilience } from './pages/Resilience';
import { InnerProductivity } from './pages/InnerProductivity';
import { DigitalTwin } from './pages/DigitalTwin';
import { BusinessIntelligence } from './pages/BusinessIntelligence';
import Reports from './pages/Reports';
import DisplayData from './pages/BusinessIntelligence/components/components/DisplayData'
import { HtmlReport } from './pages/Reports/generateHTMLfile';
import "./pages/BusinessIntelligence/components/styles/uploadData.scss"
import "./pages/BusinessIntelligence/components/styles/app.scss"
import "./pages/BusinessIntelligence/components/styles/navbar.scss"
import "./pages/BusinessIntelligence/components/styles/endpopup.scss"
import { DataSource } from './pages/BusinessIntelligence/components/components/DataSource';
import { Datasets } from './pages/BusinessIntelligence/components/datasets';
import PredictData from './pages/BusinessIntelligence/components/components/PredictData';
import DeploymentData from './pages/BusinessIntelligence/components/deployments';
import { AdminLayout2 } from './layout/layout2';
import { GeneralTeam } from './pages/BusinessIntelligence/components/settings/components/team/general';
import { GeneralOrganization } from './pages/BusinessIntelligence/components/settings/components/organization/general';
import { GeneralAccount } from './pages/BusinessIntelligence/components/settings/components/account/general';
import { MembersTeam } from './pages/BusinessIntelligence/components/settings/components/team/members';
import { ApiKeys } from './pages/BusinessIntelligence/components/settings/components/team/api-keys';
import { Notification } from './pages/BusinessIntelligence/components/settings/components/account/notification';
import { Legal } from './pages/BusinessIntelligence/components/settings/components/account/legal';
import { MembersOrganization } from './pages/BusinessIntelligence/components/settings/components/organization/members';
import { WhiteLabeling } from './pages/BusinessIntelligence/components/settings/components/organization/white-labeling';
import { Billing } from './pages/BusinessIntelligence/components/settings/components/organization/billing';
import { Usage } from './pages/BusinessIntelligence/components/settings/components/organization/usage';
import { ZenBiLayout } from './layout/zenBiLayout';
import { TermsConst } from './pages/BusinessIntelligence/components/settings/components/account/legal/terms';
import { LegalConst } from './pages/BusinessIntelligence/components/settings/components/account/legal/legal';
import { ReportsGenBI } from './pages/BusinessIntelligence/components/reports';
import { DashboardReports } from './pages/BusinessIntelligence/components/reports/dashboard';
import { KPILayout } from './layout/kpiLayout';
import Connect from './pages/BusinessIntelligence/components/components/connect';
import MiddleContent from './pages/entryPage';
import NewDeploymentData from './pages/BusinessIntelligence/components/deployments/newDeployment';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/new-deployment" element={<NewDeploymentData />} />
        <Route path="/" element={<AdminLayout />}>
          {/* <Route path="/dashboard" element={<KProcess />} />
          <Route path='/sustainability' element={<Sustainability />} />
          <Route path='/resilience' element={<Resilience />} />
          <Route path='/productivity' element={<InnerProductivity />} /> */}
          {/* <Route path='/reports' element={<Reports />} /> */}
          <Route path='/welcome' Component={MiddleContent} />
          <Route path='/gen-dashboard' Component={DashboardReports} />
          <Route path='/review-report' element={<HtmlReport />} />
          <Route path='/digital-twin' element={<DigitalTwin />} />
          <Route path="/process" element={<KProcess />} />
          <Route path='/sustainability' element={<Sustainability />} />
          <Route path='/resilience' element={<Resilience />} />
          <Route path='/productivity' element={<InnerProductivity />} />
          <Route path='/connect' Component={Connect} />
          <Route path='/discover' Component={DisplayData} />
          <Route path='/predict' Component={PredictData} />
          <Route path='/deployment' Component={DeploymentData} />
          <Route path='/reports' Component={ReportsGenBI} />
          <Route path='/data-source' element={<DataSource />} />
          <Route path='/business-intelligence' element={<BusinessIntelligence />} />
          <Route path='/datasets' element={<Datasets />} />
        </Route>

        <Route path="/" element={<AdminLayout2 />}>
          <Route path='/settings/team/general' element={<GeneralTeam />} />
          <Route path='/settings/team/members' element={<MembersTeam />} />
          <Route path='/settings/team/api-keys' element={<ApiKeys />} />
          <Route path='/settings/organization/general' element={<GeneralOrganization />} />
          <Route path='/settings/organization/members' element={<MembersOrganization />} />
          <Route path='/settings/organization/usage' element={<Usage />} />
          <Route path='/settings/organization/billing' element={<Billing />} />
          <Route path='/settings/organization/whitelabeling' element={<WhiteLabeling />} />
          <Route path='/settings/account/notification' element={<Notification />} />
          <Route path='/settings/account/legal' element={<Legal />} />
          <Route path='/settings/account/general' element={<GeneralAccount />} />
        </Route>
        {/* <Route path="/" element={<ZenBiLayout />}>
          <Route path='/connect' Component={Connect} />
          <Route path='/discover' Component={DisplayData} />
          <Route path='/predict' Component={PredictData} />
          <Route path='/deployment' Component={DeploymentData} />
          <Route path='/reports' Component={ReportsGenBI} />
          <Route path='/data-source' element={<DataSource />} />
          <Route path='/business-intelligence' element={<BusinessIntelligence />} />
          <Route path='/datasets' element={<Datasets />} />
        </Route> */}
        <Route path="/terms" element={<TermsConst />} />
        <Route path="/legal" element={<LegalConst />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
