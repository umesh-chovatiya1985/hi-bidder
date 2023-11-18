import { getCsrfToken } from "next-auth/react";

const verifyCSRF = (handler: any) => {
    return async (req: any, res: any) => {
        const cookies = req.cookies;
        const token = await getCsrfToken({ req });
        if(!cookies['next-auth.csrf-token']){
            return res.status(401).send({ message: 'Invalid api request found.' });
        }
        if(!token){
            return res.status(401).send({ message: 'Invalid api request found.' });
        }
        const frontCsrf = cookies['next-auth.csrf-token'].split("|")[0];
        if (token == frontCsrf) {
            return handler(req, res);
        } else {
            return res.status(401).send({ message: 'Invalid api request found.' });
        }
    }
};

export default verifyCSRF;