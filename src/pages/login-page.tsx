import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './lib/authentication.tsx';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';

type User = {
    companyId: string;
    email: string;
};

interface LoginPageProps {
    setLoggedUser: (user: User | null) => void;
}

export default function LoginPage({ setLoggedUser }: LoginPageProps) {
    const [email, setEmail] = useState('bayalag.t');
    const [password, setPassword] = useState('HyperX23');
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
        <>
            <Input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Нэвтрэх нэр"
                prefix={<UserOutlined />}
                className="mb-4"
            />
            <Input.Password
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Нууц үг"
                prefix={<UnlockOutlined />}
                className="mb-4"
            />

            {error && (
                <div className="has-text-danger">
                    Email or password is incorrect
                </div>
            )}

            <Button type="primary" shape="round" onClick={handleSubmit}>
                Нэвтрэх
            </Button>
        </>
    );
}
