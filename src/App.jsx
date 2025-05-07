import AdminPanel from './AdminPanel';
import './App.css';
import ReligiousPortal from './ReligionPortal';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from "../src/utils/ProtectedRoute";
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
          {/* <Route
        path="/admin"
        element={
          
            <AdminPanel />
         
        }
      /> */}
    </Routes>
    

  );
}

export default App;
