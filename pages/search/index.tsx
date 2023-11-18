import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Footer } from '../../Components/Layout/Footer/Footer';
import { Header } from '../../Components/Layout/Header/Header';
import CategoryMenu from '../../Components/Reusable/CategoryMenu';

const SearchPage: NextPage = () => {
    const router = useRouter();
    const { q } = router.query;
    
    const headerProps = {pageTitle: 'Hi Bidder : Category details page',pageDescription: 'hi Bidder Category details page'};

    const fetchSearch = () => {
        console.log("Going to search items");
    }

    useEffect(() => {
        if(q){
            fetchSearch();
        }
    }, [q]);

   return (
       <div>
           <main>
                <Header headerProps={headerProps} headerTitle='Testing titles' anotherTitle='Another Titles'></Header>
                <CategoryMenu />
                <div>
                    Become a seller details
                </div>
            </main>
           <Footer></Footer>
       </div>
   );
}

export default SearchPage;