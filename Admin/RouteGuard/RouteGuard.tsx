import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { authenticateService } from '../Services/AuthService';

export { RouteGuard };

function RouteGuard({ children }: any) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
    useEffect(() => { 
        authCheck(router.asPath);  
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);
        router.events.on('routeChangeComplete', authCheck);
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }
    }, []);
    function authCheck(url: any) { 
        const publicPaths = ['/e-auction-admin/admin-login'];
        const path = url.split('?')[0];
        if (!authenticateService.userValue && !publicPaths.includes(path)) {
            setAuthorized(false);
            router.push({
                pathname: '/e-auction-admin/admin-login',
                query: { returnUrl: router.asPath }
            });
        } else {
            setAuthorized(true);
        }
    }
    return (authorized && children);
}