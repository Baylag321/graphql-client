import HomePage from './pages/home-page';
import { Routes, Route } from 'react-router-dom';
import JobPage from './pages/job-page';
import CompanyPage from './pages/company-pages';
import { useState } from 'react';
import Navbar from './pages/components/navbar';
import CreateJobPage from './pages/create-job-page';
import LoginPage from './pages/login-page';

function App() {
    const [loggedUser, setLoggedUser] = useState(null);

    return (
        <>
            <Navbar loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
            <main className="section">
                <Routes>
                    <Route index path="/" element={<HomePage />} />
                    <Route index path="/jobs/new" element={<CreateJobPage />} />
                    <Route path="/jobs/:jobId" element={<JobPage />} />
                    <Route
                        path="/company/:companyId"
                        element={<CompanyPage />}
                    />
                    <Route
                        path="/login"
                        element={<LoginPage setLoggedUser={setLoggedUser} />}
                    />
                </Routes>
            </main>
        </>
    );
}

export default App;
