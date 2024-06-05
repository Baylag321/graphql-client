import HomePage from './pages/home-page';
import { Routes, Route, Navigate } from 'react-router-dom';
import JobPage from './pages/job-page';
import CompanyPage from './pages/company-pages';
import { useState } from 'react';
import Navbar from './pages/components/navbar';
import CreateJobPage from './pages/create-job-page';
import LoginPage from './pages/login-page';
import EditJobPage from './pages/edit-job-page.tsx';
import { getLoggedUserFromToken } from './pages/lib/authentication';
import { ApolloProvider } from '@apollo/client';
import { clientApollo } from './graphql/query';
import '../src/assets/styles/app.scss';
import PrivateRoute from './pages/components/private-route.tsx'; // Import the PrivateRoute component

type User = {
    companyId: string;
    email: string;
};

function App() {
    const [loggedUser, setLoggedUser] = useState<User | null>(
        getLoggedUserFromToken()
    );

    return (
        <ApolloProvider client={clientApollo}>
            {loggedUser && (
                <Navbar loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
            )}
            <main>
                <Routes>
                    <Route
                        path="/login"
                        element={<LoginPage setLoggedUser={setLoggedUser} />}
                    />
                    <Route
                        path="/"
                        element={
                            loggedUser ? <HomePage /> : <Navigate to="/login" />
                        }
                    />
                    <Route
                        path="/jobs/new"
                        element={
                            <PrivateRoute isAuthenticated={!!loggedUser}>
                                <CreateJobPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/jobs/:jobId"
                        element={
                            <PrivateRoute isAuthenticated={!!loggedUser}>
                                <JobPage loggedUser={loggedUser} />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/jobs/edit/:jobId"
                        element={
                            <PrivateRoute isAuthenticated={!!loggedUser}>
                                <EditJobPage loggedUser={loggedUser} />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/company/:companyId"
                        element={<CompanyPage />}
                    />
                </Routes>
            </main>
        </ApolloProvider>
    );
}

export default App;
