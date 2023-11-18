import { NextPage } from 'next';
import AccountLayout from '../AccountLayout';

const DeleteAccount: NextPage = () => {
    const headerProps = {pageTitle: 'Delete Account',pageDescription: 'Hi, this is a account delete of bidder user'};
    return (
        <AccountLayout headerProps={headerProps}>
            <h2>Account delete</h2>
        </AccountLayout>
   );
}

export default DeleteAccount;