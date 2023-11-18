import { NextPage } from 'next';
import Link from 'next/link';
import { Footer } from '../../Components/Layout/Footer/Footer';
import { Header } from '../../Components/Layout/Header/Header';
import CategoryMenu from '../../Components/Reusable/CategoryMenu';

const BecomeSellerInfo: NextPage = () => {
    const headerProps = { pageTitle: 'Hi Bidder : Category details page', pageDescription: 'hi Bidder Category details page' };
    return (
        <div>
            <main>
                <Header headerProps={headerProps}></Header>
                <CategoryMenu />
                <div>
                    <Link href={'/account/become-a-seller'}>
                        Go ahead with Terms and Condition
                    </Link>
                </div>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default BecomeSellerInfo;