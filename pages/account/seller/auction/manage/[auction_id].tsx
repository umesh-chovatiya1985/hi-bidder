import { NextPage } from 'next';
import { Footer } from '../../../../../Components/Layout/Footer/Footer';
import { Header } from '../../../../../Components/Layout/Header/Header';
import CategoryMenu from '../../../../../Components/Reusable/CategoryMenu';

const ManageAuction: NextPage = () => {
   const headerProps = {pageTitle: 'Hi Bidder : Category details page',pageDescription: 'hi Bidder Category details page'};
   return (
       <div>
           <main>
               <Header headerProps={headerProps}></Header>
               <CategoryMenu />
               <div></div>
           </main>
           <Footer></Footer>
       </div>
   );
}

export default ManageAuction;