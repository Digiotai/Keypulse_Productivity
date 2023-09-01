import './App.css';
import { AdminLayout } from './layout';
import { Login } from './pages/Auth/login';
import { Register } from './pages/Auth/register';
import { KProcess } from './pages/KProcess';
import { ResourceManagement } from './pages/ResourceManagement';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Sustainability } from './pages/Sustainability';
import { Resilience } from './pages/Resilience';
import { InnerProductivity } from './pages/InnerProductivity';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          {/* <Route path="/" element={<ResourceManagement />} /> */}
          <Route path="/" element={<KProcess />} />
          <Route path='/sustainability' element={<Sustainability/>} />
          <Route path='/resilience' element={<Resilience/>} />
          <Route path='/productivity' element={<InnerProductivity/>} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
