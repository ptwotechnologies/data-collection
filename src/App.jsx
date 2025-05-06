import AdminPanel from './AdminPanel';
import './App.css';
import ReligiousPortal from './ReligionPortal';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ReligiousPortal />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  );
}

export default App;
