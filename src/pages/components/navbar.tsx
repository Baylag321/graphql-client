import { Link } from 'react-router-dom';

export default function Navbar({ loggedUser }) {
  const isLoggedIn = Boolean(loggedUser);
  return (
    <nav className="navbar">
      <div className="navbar-start">
        <Link to="/" className="navbar-item">
          Зарууд
        </Link>
      </div>
      (isLoggedIn ? (
      <>
        <span className="navbar-item has-text-gray">{loggedUser.email}</span>
        <Link className="navbar-item" to="/jobs/new">
          Зар нэмэх
        </Link>
        <a href="" className="navbar-item">
          Гарах
        </a>
      </>
      ): (
      <>
        <Link className="navbar-item" to="/login">
          Нэвтрэх
        </Link>
      </>
      ))
    </nav>
  );
}
