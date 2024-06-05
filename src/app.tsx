import HomePage from './pages/home-page';
import { Routes, Route, Navigate } from 'react-router-dom';
import JobPage from './pages/job-page';
import CompanyPage from './pages/company-pages';
import { useState } from 'react';
// import Navbar from './pages/components/navbar';
import CreateJobPage from './pages/create-job-page';
import LoginPage from './pages/login-page';
import EditJobPage from './pages/edit-job-page.tsx';
import { getLoggedUserFromToken } from './pages/lib/authentication';
import { ApolloProvider } from '@apollo/client';
import { clientApollo } from './graphql/query';
import '../src/assets/styles/app.scss';
import PrivateRoute from './pages/components/private-route.tsx';
import Sidebar, { SidebarItem } from './pages/components/Sidebar.tsx';
import {
    LayoutDashboard,
    Home,
    StickyNote,
    Layers,
    Flag,
    Calendar,
    LifeBuoy,
    Settings,
} from 'lucide-react';

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
            {/*{loggedUser && (*/}
            {/*    <Navbar loggedUser={loggedUser} setLoggedUser={setLoggedUser} />*/}
            {/*)}*/}
            <div className="flex">
                <Sidebar children={undefined}>
                    <SidebarItem icon={<Home size={20} />} text="Home" alert />
                    <SidebarItem
                        icon={<LayoutDashboard size={20} />}
                        text="Dashboard"
                        active
                    />
                    <SidebarItem
                        icon={<StickyNote size={20} />}
                        text="Projects"
                        alert
                    />
                    <SidebarItem
                        icon={<Calendar size={20} />}
                        text="Calendar"
                    />
                    <SidebarItem icon={<Layers size={20} />} text="Tasks" />
                    <SidebarItem icon={<Flag size={20} />} text="Reporting" />
                    <hr className="my-3" />
                    <SidebarItem
                        icon={<Settings size={20} />}
                        text="Settings"
                    />
                    <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
                </Sidebar>
            </div>
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
