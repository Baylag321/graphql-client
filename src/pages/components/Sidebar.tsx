import { ChevronFirst, ChevronLast, MoreVertical } from 'lucide-react';
import logo from '../../assets/agent/images/MIATLogo.jpg';
import profile from '../../assets/agent/images/MIAT Circle Logo PNG.png';
import { createContext, useContext, useState, ReactNode } from 'react';
import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

// Define the type for the context value
interface SidebarContextValue {
    expanded: boolean;
}

// Provide a default value for the context
const SidebarContext = createContext<SidebarContextValue>({ expanded: true });

interface User {
    companyId: string;
    email: string;
}

interface SidebarProps {
    children?: ReactNode;
    loggedUser?: User | null;
    setLoggedUser?: (user: User | null) => void;
}

export default function Sidebar({ children, setLoggedUser }: SidebarProps) {
    const navigate = useNavigate();

    const handleLogout = () => {
        if (setLoggedUser) {
            setLoggedUser(null);
        }
        navigate('/login');
        localStorage.removeItem('token');
    };

    const [expanded, setExpanded] = useState(true);

    return (
        <aside className="h-screen">
            <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <img
                        alt="logo"
                        src={logo}
                        className={`overflow-hidden transition-all ${expanded ? 'w-32' : 'w-0'}`}
                    />
                    <button
                        onClick={() => setExpanded((curr) => !curr)}
                        className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                    >
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>
                </div>

                <SidebarContext.Provider value={{ expanded }}>
                    <ul className="flex-1 px-3">{children}</ul>
                </SidebarContext.Provider>

                <div
                    className={`flex justify-center items-center overflow-hidden transition-all ${expanded ? 'w-52 ml-3' : 'w-0'}`}
                >
                    <Button
                        onClick={handleLogout}
                        type="primary"
                        shape="round"
                        className="w-[120px] mb-4"
                        icon={<LogoutOutlined />}
                    >
                        Гарах
                    </Button>
                </div>
                <div className="border-t flex p-3">
                    <img
                        alt="profile"
                        src={profile}
                        className="w-10 h-10 rounded-md"
                    />

                    <div
                        className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? 'w-52 ml-3' : 'w-0'}`}
                    >
                        <div className="leading-4">
                            <h4 className="font-semibold">MIAT</h4>
                            <span className="text-xs text-gray-600">
                                miat.com
                            </span>
                        </div>
                        <MoreVertical size={20} />
                    </div>
                </div>
            </nav>
        </aside>
    );
}

interface SidebarItemProps {
    icon: ReactNode;
    text: string;
    active?: boolean;
    alert?: boolean;
}

export function SidebarItem({ icon, text, active, alert }: SidebarItemProps) {
    const { expanded } = useContext(SidebarContext);
    return (
        <li
            className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
                active
                    ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800'
                    : 'hover:bg-indigo-50 text-gray-600'
            }`}
        >
            {icon}
            <span
                className={`overflow-hidden transition-all ${expanded ? 'w-52 ml-3' : 'w-0'}`}
            >
                {text}
            </span>
            {alert && (
                <div
                    className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? '' : 'top-2'}`}
                ></div>
            )}

            {!expanded && (
                <div
                    className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
                >
                    {text}
                </div>
            )}
        </li>
    );
}
