import { NextPage } from 'next';
import { useRouter } from 'next/router'
import React from 'react'
import { Footer } from '../../Components/Layout/Footer/Footer';
import { Header } from '../../Components/Layout/Header/Header';
import CategoryMenu from '../../Components/Reusable/CategoryMenu';

const ContentPage: NextPage = () => {
    const router = useRouter()
    const { content_page_id } = router.query;
    const headerProps = {pageTitle: 'Content Page : ' + content_page_id,pageDescription: 'hi Bidder '+content_page_id+' Contents'};
    return (
        <div>
            <main>
                <Header headerProps={headerProps} headerTitle="Testing titles" anotherTitle="Another Titles"></Header>
                <CategoryMenu />
                <div>{content_page_id}</div>
            </main>
            <Footer></Footer>
        </div>
    )
}

export default ContentPage
