import { jwtDecode } from 'jwt-decode';

const API_URL: string = 'http://localhost:9000';

interface MyJwtPayload {
    sub: string;
    loginName: string;
    name: string;
    iat: number;
    emp_id: string;
}

export async function login(loginName: string, password: string) {
    const response = await fetch(API_URL + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loginName, password }),
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
            emp_id: data.emp_id,
            loginName: data.loginName,
        };
    }

    return null;
}
