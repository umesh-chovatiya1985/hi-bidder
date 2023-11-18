import { NextPage } from 'next';
import Head from 'next/head';
import AdminLayout from '../../../../Admin/Layout/AdminLayout';

const ViewContentPage: NextPage = () => {
   const headerProps = {pageTitle: process.env.COMPANY_NAME! + ' | View Content Page by Id',pageDescription: process.env.COMPANY_NAME! + ' - View Content Page by Id'};
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

export default ViewContentPage;