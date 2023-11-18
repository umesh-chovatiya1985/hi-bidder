import { NextPage } from 'next';
import { useRouter } from 'next/router';
import AdminLayout from '../../../../Admin/Layout/AdminLayout';

const ViewAuctionById: NextPage = () => {
   const headerProps = {pageTitle: 'Hi Bidder : Category details page',pageDescription: 'hi Bidder Category details page'};
   const { _id } = useRouter().query;
   console.log(_id);
   return (
       <AdminLayout>

       </AdminLayout>
   );
}

export default ViewAuctionById;