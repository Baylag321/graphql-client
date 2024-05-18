import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './lib/authentication.tsx';

interface User {
    id: string;
    email: string;
}

interface LoginPageProps {
    setLoggedUser: (user: User | null) => void;
}

export default function LoginPage({ setLoggedUser }: LoginPageProps) {
    const [email, setEmail] = useState('mask@tesla.com');
    const [password, setPassword] = useState('123');
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const user = await login(email, password);

            if (user) {
                setError(false);
                setLoggedUser(user);
                navigate('/');
            } else {
                setError(true);
                console.log('Login failed');
            }
        } catch (error) {
            setError(true);
            console.error('Login failed', error);
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
                    <div className="has-text-danger">
                        Имэйл эсвэл нууц үг буруу байна
                    </div>
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
