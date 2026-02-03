import 'server-only';

import { type SessionPayload } from './formSchema';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const sessionSecretKey = process.env.JWT_SECRET;
const sessionKey = new TextEncoder().encode(sessionSecretKey);

export async function encryptSession(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(sessionKey);
}

export async function decryptSession(session: string | undefined = ''): Promise<SessionPayload | null> {
    try {
        const { payload } = await jwtVerify<SessionPayload>(session, sessionKey, {
            algorithms: ['HS256']
        });

        return payload;
    } catch {
        return null;
    }
}

export async function createSession(userId: string, role: 'admin' | 'staff') {
    const sessionExpiresAt = new Date(Date.now() + 60 * 60 * 1000);
    const session = await encryptSession({ userId, role, expiresAt: sessionExpiresAt });

    const cookieStore = await cookies();
    cookieStore.set('session', session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: sessionExpiresAt,
        sameSite: 'lax',
        path: '/'
    });
}

export async function verifySession(): Promise<{ isAuth: true, userId: string, role: 'admin' | 'staff' }> {
    const cookieStore = await cookies();
    const cookie = cookieStore.get('session')?.value;
    const session = await decryptSession(cookie);

    if (!session?.userId) {
        redirect('/');
    }

    return { isAuth: true, userId: session.userId, role: session.role };
}

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete('session');
    redirect('/');
}