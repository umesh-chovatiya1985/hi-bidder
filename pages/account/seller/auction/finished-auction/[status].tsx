import { NextPage } from 'next';
import AccountLayout from '../../../AccountLayout';
import CustomLoader from '../../../../../Admin/Components/CustomLoader';
import { useState } from 'react';

const FinishedActionByStatus: NextPage = () => {
   
   const headerProps = {pageTitle: 'Hi Bidder : Category details page',pageDescription: 'hi Bidder Category details page'};
   const [isLoading, setIsLoading] = useState(false);

   return (
    <AccountLayout headerProps={headerProps}>
        {isLoading && <CustomLoader />}
    </AccountLayout>
   );
}

export default FinishedActionByStatus;