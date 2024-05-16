import { jwtDecode } from 'jwt-decode';

const API_URL = 'http://localhost:9000';

interface MyJwtPayload {
    sub: string;
    email: string;
    name: string;
    iat: number;
}

export async function login(email: string, password: string) {
    const response = await fetch(API_URL + '/api/login', {
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

    //   token =
    //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

    localStorage.setItem('token', token);
    const data = jwtDecode<MyJwtPayload>(token);

    console.log('====>', data);

    return {
        id: data.sub,
        email: data.email,
    };
}
