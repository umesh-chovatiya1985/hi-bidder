import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Footer } from "../../Components/Layout/Footer/Footer";
import { Header } from "../../Components/Layout/Header/Header";
import CategoryMenu from "../../Components/Reusable/CategoryMenu";
import LoadingSckeleton from "../../Components/Reusable/LoadingSkeleton";
import { getAPIUrl } from "../../lib/useLocalStorage";

const PolicyPage: NextPage = ({ pageContent }: any) => {
  //   const router = useRouter();
  //   const mainApiUrl = getAPIUrl() || process.env.API_URL;
  //   const [pageContent, setPageContent] = useState(null);

  const router = useRouter();
  const { policy_slug } = router.query;
  const [headTitle, setHeadTitle] = useState("Page title");

  const metaContent = {
    pageTitle: pageContent.meta_title ?? pageContent.pageTitle,
    pageDescription: pageContent.meta_description ?? pageContent.description,
  };
  //   const { policy_slug } = router.query;
  //   const fetchPage = async () => {
  //     try {
  //       const contentData = await fetch(
  //         mainApiUrl + "content-page/content-slug/" + policy_slug
  //       );
  //       const contentJson = await contentData.json();
  //       if (contentData.ok) {
  //         if (contentJson.status == "1") {
  //           const pageResponse = contentJson.response;
  //           setPageContent(pageResponse);
  //           if (pageResponse) {
  //             setMetaContent({
  //               pageTitle: pageResponse.meta_title,
  //               pageDescription: pageResponse.meta_description,
  //             });
  //           }
  //           return;
  //         }
  //         setPageContent({
  //           pageTitle: "No content found!",
  //           description: "<h1>Opps! Page dont exist. Try after sometime</h1>",
  //         });
  //       }
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };
  //   useEffect(() => {
  //     if (policy_slug) {
  //       fetchPage();
  //     }
  //   }, [policy_slug]);

  useEffect(() => {
    setHeadTitle(policy_slug.toString().replace(/-/g, " "));
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
              <div className="mx-4 pt-4"
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

export default PolicyPage;

export const getServerSideProps: GetServerSideProps<any> = async (
  context: GetServerSidePropsContext
) => {
  const { policy_slug } = context.query;
  const mainApiUrl = getAPIUrl() || process.env.API_URL;
  const contentData = await fetch(
    mainApiUrl + "content-page/content-slug/" + policy_slug
  );
  const errorRespo = {
    pageTitle: "No content found!",
    description: "<h1>Opps! Page dont exist. Try after sometime</h1>",
  };
  try {
    const contentJson = await contentData.json();
    if (contentData.ok) {
      if (contentJson.status == "1") {
        const pageResponse = contentJson.response;
        return { props: { pageContent: pageResponse } };
      }
    }
    return { props: { pageContent: errorRespo } };
  } catch (error: any) {
    return { props: { pageContent: errorRespo } };
  }
};
