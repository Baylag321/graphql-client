import { Link, useNavigate } from 'react-router-dom';

interface User {
    companyId: string;
    email: string;
}

interface NavbarProps {
    loggedUser: User | null;
    setLoggedUser: (user: User | null) => void;
}

export default function Navbar({ loggedUser, setLoggedUser }: NavbarProps) {
    const isLoggedIn = loggedUser;
    const navigate = useNavigate();
    const handleLogout = () => {
        setLoggedUser(null);
        navigate('/login');
        localStorage.removeItem('token');
    };

    return (
        <nav className='navbar'>
            <div className='navbar-start'>
                <Link to='/' className='navbar-item'>
                    Зарууд
                </Link>
            </div>
            <div className='navbar-end'>
                {isLoggedIn ? (
                    <>
                        <span className='navbar-item has-text-gray'>
                            {loggedUser?.email}
                        </span>
                        <Link to='/jobs/new' className='navbar-item'>
                            Зар нэмэх
                        </Link>
                        <a onClick={handleLogout} className='navbar-item'>
                            Гарах
                        </a>
                    </>
                ) : (
                    <>
                        <Link to='/login' className='navbar-item'>
                            Нэвтрэх
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}
