import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
}

interface LoginpageProps {
  setLoggedUser: (user: User | null) => void;
}

export default function Loginpage({ setLoggedUser }: LoginpageProps) {
  const [email, setEmail] = useState('baya@gmail.com');
  const [password, setPassword] = useState('1234');
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // const user = await login(email, password);
    const user = { id: '1122233', email: 'baya@gmail.com' };

    if (user) {
      setError(false);
      setLoggedUser(user);
      navigate('/');
    } else {
      setError(true);
      console.log('Login failed');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <div className="label">Имэйл</div>
          <div className="control">
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              type="emial"
              required
              value={email}
            />
          </div>
        </div>

        <div className="field">
          <div className="label">Нууц үг</div>
          <div className="control">
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              type="password"
              required
              value={password}
            />
          </div>
        </div>

        {error && (
          <div className="has-text-danger">Имэйл эсвэл нууц үг буруу байна</div>
        )}

        <div className="field">
          <div className="control">
            <button className="button is-link" type="submit">
              Нэвтрэх
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
