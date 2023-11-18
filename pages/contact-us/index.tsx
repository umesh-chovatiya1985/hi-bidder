import { GetServerSideProps, NextPage } from 'next';
import { Footer } from '../../Components/Layout/Footer/Footer';
import { Header } from '../../Components/Layout/Header/Header';
import CategoryMenu from '../../Components/Reusable/CategoryMenu';
import LoadingSckeleton from '../../Components/Reusable/LoadingSkeleton';
import { getAPIUrl } from '../../lib/useLocalStorage';

const ContactUsPage: NextPage = ({ pageContentData }: any) => {
    const pageContent = pageContentData;
    const metaContent = {
        pageTitle: pageContentData.meta_title ?? pageContentData.pageTitle,
        pageDescription:
            pageContentData.meta_description ?? pageContentData.description,
    };
    return (
        <div>
            <main>
                <Header headerProps={metaContent} headerTitle='Testing titles' anotherTitle='Another Titles'></Header>
                <CategoryMenu />
                <section className="popular-category">
                    <div className="container-fluid">
                        <h1 className='py-1 pl-4 ml-2 text-3xl font-semibold'>
                            About Us
                        </h1>
                        {pageContent && (
                            <>
                                <div
                                    className="mx-3 py-2"
                                    dangerouslySetInnerHTML={{ __html: pageContent.description }}
                                ></div>
                            </>
                        )}
                        {!pageContent && (
                            <div className="mt-4">
                                <LoadingSckeleton
                                    baseColor="#cecece"
                                    highlightColor="#FFFFFF"
                                    count={1}
                                    height="20px"
                                    width="30%"
                                />
                                <LoadingSckeleton
                                    baseColor="#cecece"
                                    highlightColor="#FFFFFF"
                                    count={1}
                                    height="100px"
                                    width="50%"
                                />
                                <LoadingSckeleton
                                    baseColor="#cecece"
                                    highlightColor="#FFFFFF"
                                    count={1}
                                    height="20px"
                                    width="40%"
                                />
                                <LoadingSckeleton
                                    baseColor="#cecece"
                                    highlightColor="#FFFFFF"
                                    count={1}
                                    height="100px"
                                    width="60%"
                                />
                                <LoadingSckeleton
                                    baseColor="#cecece"
                                    highlightColor="#FFFFFF"
                                    count={1}
                                    height="20px"
                                    width="50%"
                                />
                                <LoadingSckeleton
                                    baseColor="#cecece"
                                    highlightColor="#FFFFFF"
                                    count={1}
                                    height="200px"
                                    width="80%"
                                />
                                <LoadingSckeleton
                                    baseColor="#cecece"
                                    highlightColor="#FFFFFF"
                                    count={1}
                                    height="20px"
                                    width="50%"
                                />
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default ContactUsPage;

export const getServerSideProps: GetServerSideProps<any> = async () => {
    const mainApiUrl = getAPIUrl() || process.env.API_URL;
    const contentData = await fetch(
        mainApiUrl + "content-page/content-slug/contact-us"
    );
    const pageContentData = {
        pageTitle: "No content found!",
        description: "<h1>Opps! Page dont exist. Try after sometime</h1>",
    };
    try {
        const contentJson = await contentData.json();
        if (contentData.ok) {
            if (contentJson.status == "1") {
                const pageResponse = contentJson.response;
                return { props: { pageContentData: pageResponse } };
            }
        }
        return { props: { pageContentData } };
    } catch (error: any) {
        return { props: { pageContentData } };
    }
};