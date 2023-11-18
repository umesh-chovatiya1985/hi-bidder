import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
// const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')!));
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')!));

export const userAuthService = {
    user: userSubject.asObservable(),
    get userData() { return userSubject.value },
    login,
    logout,
    // getAll
};

function login(username: any, password: any) {
    // return fetchWrapper.post(`${baseUrl}/authenticate`, { username, password })
    //     .then((user: any) => {
    //         // publish user with basic auth credentials to subscribers and store in 
    //         // local storage to stay logged in between page refreshes
    //         user.authdata = window.btoa(username + ':' + password);
    //         userSubject.next(user);
    //         localStorage.setItem('user', JSON.stringify(user));
    //         return user;
    //     });
    console.log(baseUrl);
    return "User";
}

function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/login');
}

// function getAll() {
//     return fetchWrapper.get(baseUrl);
// }