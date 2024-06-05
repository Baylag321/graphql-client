import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './lib/authentication.tsx';
import loginImage from '../assets/agent/images/login.jpg';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
import { Button, Input, Checkbox } from 'antd';
import dayjs from 'dayjs';

type User = {
    companyId: string;
    email: string;
};

interface LoginPageProps {
    setLoggedUser: (user: User | null) => void;
}

export default function LoginPage({ setLoggedUser }: LoginPageProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        if (rememberedEmail) {
            setEmail(rememberedEmail);
            setRememberMe(true);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const user = await login(email, password);

            if (user) {
                setError(false);
                setLoggedUser(user);
                if (rememberMe) {
                    localStorage.setItem('rememberedEmail', email);
                } else {
                    localStorage.removeItem('rememberedEmail');
                }
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
            <section className="bg-gray-100 min-h-screen flex flex-col justify-between">
                <div className="flex-grow flex items-center justify-center">
                    <div className="bg-gray-200 flex rounded-2xl shadow-lg max-w-3xl p-5">
                        <div className="md:w-1/2 px-16">
                            <h2 className="text-2xl mt-10">Нэвтрэх</h2>
                            <form
                                action=""
                                className="flex flex-col gap-4 items-center justify-center mt-10"
                            >
                                <Input
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Нэвтрэх нэр"
                                    prefix={<UserOutlined />}
                                    className="p-2 mt-4 rounded-xl border"
                                    value={email}
                                />
                                <Input.Password
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Нууц үг"
                                    prefix={<UnlockOutlined />}
                                    className="p-2 mt-4 rounded-xl border"
                                    value={password}
                                />

                                {error && (
                                    <div className="has-text-danger mb-4">
                                        Нэвтрэх нэр нууц үг буруу байна.
                                    </div>
                                )}

                                <Checkbox
                                    checked={rememberMe}
                                    onChange={(e) =>
                                        setRememberMe(e.target.checked)
                                    }
                                >
                                    Нэвтрэх нэр сануулах
                                </Checkbox>

                                <Button
                                    type="primary"
                                    shape="round"
                                    onClick={handleSubmit}
                                    className="w-[120px]"
                                >
                                    Нэвтрэх
                                </Button>
                            </form>
                        </div>
                        <div className="sm:block hidden w-1/2">
                            <img
                                className="rounded-2xl"
                                src={loginImage}
                                alt="login"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
                <div className="mb-2 text-center flex flex-col">
                    <div className="text-[13px]">
                        © {dayjs().format('YYYY')} МИАТ ХК, Мэдээллийн
                        технологи хөгжүүлэлтийн хэлтэс.
                    </div>
                    <div className="text-[13px]">
                        Бүх эрх хуулиар хамгаалагдсан.
                    </div>
                    <div className="text-[12px]">
                        v2.00 <span className="text-[9px]">stable</span>{' '}
                        2024-06-05
                    </div>
                </div>
            </section>
        </>
    );
}
