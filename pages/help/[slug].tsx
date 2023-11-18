import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import { Footer } from "../../Components/Layout/Footer/Footer";
import { Header } from "../../Components/Layout/Header/Header";
import CategoryMenu from "../../Components/Reusable/CategoryMenu";
import LoadingSckeleton from "../../Components/Reusable/LoadingSkeleton";
import { getAPIUrl } from "../../lib/useLocalStorage";
import { useEffect, useState } from 'react'

const HelpContentPage: NextPage = ({ pageContent }: any) => {

  const router = useRouter();
  const { slug } = router.query;
  const [headTitle, setHeadTitle] = useState("Page title");
  const metaContent = {
    pageTitle: pageContent.meta_title ?? pageContent.pageTitle,
    pageDescription: pageContent.meta_description ?? pageContent.description,
  };

  useEffect(() => {
    setHeadTitle(slug.toString().replace(/-/g, " "));
  }, [router]);

  return (
    <div>
      <main>
        <Header headerProps={metaContent}></Header>
        <CategoryMenu />
        <div className="container-fluid mt-2">
          <h1 className='pt-4 pl-4 ml-2 text-3xl font-semibold capitalize'>
            {headTitle}
          </h1>
          {pageContent && (
            <>
              <div
                className="mx-4 pt-4"
                dangerouslySetInnerHTML={{ __html: pageContent.description }}
              ></div>
            </>
          )}
          {!pageContent && (
            <div className="mt-4 px-4">
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
      </main>
      <Footer></Footer>
    </div>
  );
};

export default HelpContentPage;

export const getServerSideProps: GetServerSideProps<any> = async (
  context: GetServerSidePropsContext
) => {
  const { slug } = context.query;
  const apiUrl = getAPIUrl() || process.env.API_URL;
  const errorContent = {
    pageTitle: slug.toString().replace(/-/g, " ") + " page details",
    description: slug.toString().replace(/-/g, " ") + " page content details",
  };
  const fetchContent = await fetch(
    apiUrl + "content-page/content-slug/" + slug
  );
  try {
    const contentJson = await fetchContent.json();
    if (fetchContent.ok) {
      if (contentJson.status == "1") {
        return { props: { pageContent: contentJson.response } };
      }
    }
  } catch (error) {
    console.log(error);
  }
  return { props: { pageContent: errorContent } };
};
