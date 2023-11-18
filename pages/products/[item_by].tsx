import { NextPage } from 'next';
import { Footer } from '../../Components/Layout/Footer/Footer';
import { Header } from '../../Components/Layout/Header/Header';
import CategoryMenu from '../../Components/Reusable/CategoryMenu';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getAPIUrl } from '../../lib/useLocalStorage';
import CardSlider from '../../Components/LoginSlider/CardSlider';
import ItemShopCard from '../../Components/Reusable/ItemShopCard';
import ItemShopCardList from '../../Components/Reusable/ItemShopCardList';
import ItemCard from '../../Components/Reusable/ItemCard';

const ProductsBy: NextPage = () => {
   const headerProps = {pageTitle: 'Hi Bidder : Category details page',pageDescription: 'hi Bidder Category details page'};
   
   const [fetchProduct, setFetchProduct] = useState(false);
   const [products, setProducts] = useState(null);
   const mainApiUrl = getAPIUrl() || process.env.API_URL;

   const router = useRouter();
   const { item_by } = router.query;
   console.log(item_by);
   const itemSliderProps = {
        spaceBetween: 20,
        slidesPerView: 5,
        autoplay: false,
        navigation: true,
    };
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

   const homeProducts = async () => {
    setFetchProduct(true);
    try {
      const resHome = await fetch(mainApiUrl + "products/all/"+item_by);
      if(resHome.ok){
        const homeItems = await resHome.json();
        setProducts(homeItems.record);
        console.log(products);
        console.log(homeItems);

      }
    } catch (error: any) {
      console.log(error.message);
    }
    setFetchProduct(false);
  };
  useEffect(() => {
    if(item_by){
        homeProducts();
    }
  }, [item_by]);

   return (
    <div>
    <main>
      <Header headerProps={headerProps}></Header>
        <div className="container-fluid mt-2">
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
                    sliderFor="ItemCard"
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
                        <ItemCard cardItem={product}></ItemCard>
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
}

export default ProductsBy;