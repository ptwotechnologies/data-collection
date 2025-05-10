import AdminPanel from './AdminPanel';
import './App.css';
import ReligiousPortal from './ReligionPortal';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../src/utils/ProtectedRoute';
import GirlForm from './GirlForm';

import BoyForm from './BoyForm';
// import RoleBaseRoute from '../src/utils/RoleBaseRoute'
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
      <Route path="girl-form" element={<GirlForm />} />
      <Route path="boy-form" element={<BoyForm />} />
    </Routes>
  );
}

export default App;
