import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Footer } from "../../Components/Layout/Footer/Footer";
import { Header } from "../../Components/Layout/Header/Header";
import CardSlider from "../../Components/LoginSlider/CardSlider";
import CategoryMenu from "../../Components/Reusable/CategoryMenu";
import ItemShopCard from "../../Components/Reusable/ItemShopCard";
import ItemShopCardList from "../../Components/Reusable/ItemShopCardList";
import { getAPIUrl, getLocalStorage, setLocalStorage } from "../../lib/useLocalStorage";
import { useState, useEffect } from 'react';

const CategorySlug: NextPage = ({ categories, subcategories, products }: any) => {
  const router = useRouter();
  const { category_slug } = router.query;
  const itemSliderProps = {
    spaceBetween: 20,
    slidesPerView: 5,
    autoplay: false,
    navigation: true,
  };
  console.log(products);
  // const sessionViewType = getLocalStorage('viewtype') ?? 'grid';
  const sessionViewType = 'grid';
  const [viewType, setViewType] = useState(sessionViewType);
  const breakPoints = {
    576: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    980: {
      slidesPerView: 2,
    },
    1120: {
      slidesPerView: 3,
    }
  };

  const category = categories.filter(
    (category: any) => category.slug == category_slug
  );
  const categoryInfo = category[0] ?? {
    _id: 1,
    title: "No Record",
    slug: "no-record",
    image: "../img/img3.jpg",
    alt: "slider image 1",
    color: "#e4e9be",
  };

  const headerProps = {
    pageTitle: categoryInfo.title + " : Hi Bidder page",
    pageDescription: categoryInfo.title + " : hi Bidder Home Contents",
  };

  const currentUrl = router.asPath.split("/");
  const path = currentUrl[currentUrl.length - 1];

  useEffect(() => {
    setLocalStorage("viewtype", viewType);
  }, [viewType])

  return (
    <div>
      <main>
        <Header headerProps={headerProps}></Header>
        {categories && <CategoryMenu categoriesData={categories} />}
        {/* <div className="category-top-search">
          <div className="lsl">
            <div className="search text-center">
              <form action="">
                <div className="input-group max-w-lg m-auto shadow">
                  <input
                    type="text"
                    id="search"
                    className="form-control"
                    placeholder="Search for items"
                  />
                  <div className="input-group-append">
                    <span className="input-group-text bg-transparent text-primary">
                      <i className="fa fa-search"></i>
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div> */}
        <div className="container-fluid mt-2">
          <div className="py-3">
            <h1 className="text-center text-3xl font-semibold text-blue-900">
              {categoryInfo.title}
            </h1>
          </div>
          <div className="text-center mt-2">
            {subcategories.length > 0 &&
              subcategories.map((category: any) => (
                <Link
                  key={category._id}
                  href={`/category/${encodeURIComponent(category.slug)}`}
                >
                  <a
                    className={`cursor-pointer hover:bg-gray-400 hover:text-white inline-block bg-gray-200 rounded-full px-4 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 ${path == category.slug ? "bg-gray-400 text-white" : ""
                      }`}
                  >
                    {category.title}
                  </a>
                </Link>
              ))}
          </div>
          <div className="border-bottom mt-2 mb-2"></div>
          <div className="row">
            <div className="col-md-2">Filter Criteria</div>
            <div className="col-md-10">
              <div>
                <div className="row">
                  <div className="col-8">
                    <h3 className="text-2xl text-gray-500 font-bold">
                      Suggest for you
                    </h3>
                  </div>
                  <div className="col-4 text-right pr-4">
                    <div className="flex flex-row-reverse items-end justify-items-end h-full mr-4">
                      <div className="mx-2 cursor-pointer" onClick={() => setViewType('list')}>
                        <i className={`${viewType == 'list' ? 'text-primary' : 'text-[#909090]'} fa fa-list text-xl`}></i>
                      </div>
                      <div className="mx-2 cursor-pointer" onClick={() => setViewType('grid')}>
                        <i className={`${viewType == 'grid' ? 'text-primary' : 'text-[#909090]'} fa fa-table text-xl`}></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-bottom mt-3 mb-3"></div>
              {products && (
              <div className="row">
                <div className="col-12">
                  {viewType == 'grid' && <CardSlider
                    viewtype={viewType}
                    sliderProps={itemSliderProps}
                    myClassName="myItemForYou"
                    sliderImages={products}
                    sliderFor="ItemShopCard"
                  />}
                  {viewType == 'list' && <CardSlider
                    breakPoints={breakPoints}
                    viewtype={viewType}
                    sliderProps={itemSliderProps}
                    myClassName="myItemForYou"
                    sliderImages={products}
                    sliderFor="ItemShopCard"
                  />}
                </div>
              </div>)}
              <div className="mt-4">
                <h3 className="text-md text-gray-600 font-semibold">
                  Found <span className="text-blue-900">100</span> item on
                  Search
                </h3>
              </div>
              <div className="border-bottom mt-3 mb-3"></div>
              {products && (
                <div>
                  <div className="row">
                {viewType == 'grid' && products.map((product: any) => (
                  <div className="col-md-3 mb-4" key={product._id}>
                    <ItemShopCard cardItem={product}></ItemShopCard>
                  </div>
                ))}
                {viewType == 'list' && products.map((product: any) => (
                  <div className="col-md-12 mb-3" key={product._id}>
                    <ItemShopCardList cardItem={product}></ItemShopCardList>
                  </div>
                ))}
              </div>
              <div className="border-bottom mt-0 mb-3"></div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing
                    <span className="font-medium px-1">1</span>
                    to
                    <span className="font-medium px-1">10</span>
                    of
                    <span className="font-medium px-1">97</span>
                    results
                  </p>
                </div>
                <div>
                  <nav
                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    <a
                      href="#"
                      className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                    >
                      <span className="sr-only">Previous</span>
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                    <a
                      href="#"
                      aria-current="page"
                      className="relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20"
                    >
                      1
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                    >
                      2
                    </a>
                    <a
                      href="#"
                      className="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex"
                    >
                      3
                    </a>
                    <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
                      ...
                    </span>
                    <a
                      href="#"
                      className="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex"
                    >
                      8
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                    >
                      9
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                    >
                      10
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                    >
                      <span className="sr-only">Next</span>
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </nav>
                </div>
              </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default CategorySlug;

export const getServerSideProps: GetServerSideProps<any> = async (
  context: GetServerSidePropsContext
) => {
  const { category_slug } = context.query;
  const mainApiUrl = getAPIUrl() || process.env.API_URL;
  try {
    const res = await fetch(mainApiUrl + "category/slug/" + category_slug);
    const categories = await res.json();
    let subcategories = [];
    if (categories.status == 1 && categories.record.length > 0) {
      const subCategories = await fetch(mainApiUrl + "category/categories/" + categories.record[0]._id);
      const subCat = await subCategories.json();
      subcategories = subCat.record;
    }
    let products = null;
    const resp = await fetch(mainApiUrl + "category/products/"+category_slug);
    if(resp.ok) {
      const productJson = await resp.json();
      products = productJson.record;
    }
    return { props: { categories: categories.record, subcategories: subcategories, products: products } };
  } catch (error: any) {
    const categories = {
      status: 0,
      content: "Opps! Server side error found. Please, try again letter.",
    };
    return { props: { categories } };
  }
};
