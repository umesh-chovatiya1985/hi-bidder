import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { userAuthService } from '../Services/UserAuthService';

export { UserRouterGuard };

function UserRouterGuard({ children }: any) {
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
        const publicPaths = ['/login'];
        const path = url.split('?')[0];
        console.log(userAuthService);
        if (!userAuthService.userData && !publicPaths.includes(path)) {
            setAuthorized(false);
            router.push({
                pathname: '/login',
                query: { returnUrl: router.asPath }
            });
        } else {
            setAuthorized(true);
        }
    }
    return (authorized && children);
}