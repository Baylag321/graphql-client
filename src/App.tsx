import HomePage from './pages/home-page';
import { Routes, Route } from 'react-router-dom';
import JobPage from './pages/job-page';
import CompanyPage from './pages/company-pages';
import Loginpage from './pages/login-page';
import { useState } from 'react';
import Navbar from './pages/components/navbar';

function App() {
  const [loggedUser, setLoggedUser] = useState(null);

  return (
    <>
      <Navbar loggedUser={loggedUser} />
      <main className="section">
        <Routes>
          <Route index path="/" element={<HomePage />} />
          <Route path="/jobs/:jobId" element={<JobPage />} />
          <Route path="/company/:companyId" element={<CompanyPage />} />
          <Route
            path="/login"
            element={<Loginpage setLoggedUser={setLoggedUser} />}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
