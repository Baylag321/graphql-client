import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './lib/authentication.tsx';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
import { Button, Input, Checkbox } from 'antd';

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
            <div className="flex flex-row bg-red-400">
                <div className="w-1/3 bg-teal-300">Hello World</div>
                <div className="w-1/3 border p-10 rounded-[15px] bg-white">
                    <Input
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Нэвтрэх нэр"
                        prefix={<UserOutlined />}
                        className="mb-4"
                        value={email}
                    />
                    <Input.Password
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Нууц үг"
                        prefix={<UnlockOutlined />}
                        className="mb-4"
                        value={password}
                    />

                    {error && (
                        <div className="has-text-danger mb-4">
                            Нэвтрэх нэр нууц үг буруу байна.
                        </div>
                    )}

                    <div className="flex flex-col">
                        <Checkbox>Нэвтрэх нэр сануулах</Checkbox>

                        <Button
                            type="primary"
                            shape="round"
                            onClick={handleSubmit}
                            className="w-[80px] mt-4 justify-center"
                        >
                            Нэвтрэх
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
