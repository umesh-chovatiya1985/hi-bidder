import { NextPage } from 'next';
import { Footer } from '../../Components/Layout/Footer/Footer';
import { Header } from '../../Components/Layout/Header/Header';
import CategoryMenu from '../../Components/Reusable/CategoryMenu';
import { getAPIUrl } from '../../lib/useLocalStorage';
import { useState, useEffect } from 'react';
import LoadingSckeleton from '../../Components/Reusable/LoadingSkeleton';
import CategoryCard from '../../Components/Reusable/CategoryCard';

const CategoriesPage: NextPage = () => {
    const headerProps = { pageTitle: 'Hi Bidder : Category details page', pageDescription: 'hi Bidder Category details page' };
    const [categories, setCategories] = useState(null);
    const mainApiUrl = getAPIUrl() || process.env.API_URL;

    const fetchCategories = async () => {
        try {
            const res = await fetch(mainApiUrl + "category?limit=20");
            const categories = await res.json();
            if (res.ok) {
                if (categories.status == "1") {
                    setCategories(categories.categories);
                }
            }
        } catch (error: any) {
            console.log(error.message);
        }
    };

    const skeletonCategory = 8;

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div>
            <main>
                <Header headerProps={headerProps}></Header>
                <CategoryMenu />
                <section className="popular-category">
                    <div className="container-fluid">
                        <h1 className='py-1 pl-4 ml-2 text-3xl font-semibold'>
                            All Categories
                        </h1>
                        <div className="row m-2">
                            {!categories &&
                                [...Array(skeletonCategory)].map((e: any, i: any) => (
                                    <div
                                        className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 my-2"
                                        key={i}
                                    >
                                        <LoadingSckeleton
                                            count={1}
                                            height="150px"
                                            width="100%"
                                            baseColor="#cecece"
                                            highlightColor="#999999"
                                        ></LoadingSckeleton>
                                    </div>
                                ))}
                            {categories &&
                                categories.map((category: any) => (
                                    <div
                                        className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3"
                                        key={category._id}
                                    >
                                        <CategoryCard category={category}></CategoryCard>
                                    </div>
                                ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default CategoriesPage;