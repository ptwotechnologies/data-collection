import AdminPanel from './AdminPanel';
import './App.css';
import ReligiousPortal from './ReligionPortal';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './utils/ProtectedRoute';
import GirlForm from './GirlForm';
import BoyForm from './BoyForm';
import DownloadCertificate from './DownloadCertificate';
import RamaniGirlList from './RamaniGirlList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ReligiousPortal />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/ramani-girls"
        element={
          <ProtectedRoute>
            <RamaniGirlList />
          </ProtectedRoute>
        }
      />
      <Route path="girl-form" element={<GirlForm />} />
      <Route path="boy-form" element={<BoyForm />} />
      <Route path="certificate" element={<DownloadCertificate />} />
    </Routes>
  );
}

export default App;
