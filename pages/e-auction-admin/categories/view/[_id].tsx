import { NextPage } from 'next';
import Head from 'next/head';
import AdminLayout from '../../../../Admin/Layout/AdminLayout';

const ViewCategory: NextPage = () => {
   const headerProps = {pageTitle: process.env.COMPANY_NAME! + ' | View Category',pageDescription: process.env.COMPANY_NAME! + ' - View Category'};
   return (
       <>
           <Head>
               <title>{headerProps.pageTitle}</title>
               <meta name='description' content={headerProps.pageDescription} />
           </Head>
           <AdminLayout>

           </AdminLayout>
       </>
   );
}

export default ViewCategory;