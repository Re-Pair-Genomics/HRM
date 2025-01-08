'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const publicRoutes = ['/login', '/signup'];

export default function Guard(props: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
        console.log('localStorage:', localStorage);
        if (
            !localStorage.getItem('JWTToken') &&
            !publicRoutes.includes(pathname)
        ) {
            router.push('/login');
        }
    }, [router, pathname]);
    return props.children;
}
