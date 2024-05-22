import { jwtDecode } from 'jwt-decode';

const API_URL: string = 'http://localhost:9000';

interface MyJwtPayload {
    sub: string;
    email: string;
    name: string;
    iat: number;
    companyId: string;
}

export async function login(email: string, password: string) {
    const response = await fetch(API_URL + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    const { token } = await response.json();

    localStorage.setItem('token', token);
    return getLoggedUserFromToken();
}

export function getLoggedUserFromToken() {
    const token = localStorage.getItem('token');
    if (token) {

        const data = jwtDecode<MyJwtPayload>(token);

        return {
            id: data.sub,
            email: data.email,
            companyId: data.companyId,
        };
    }

    return null;
}
