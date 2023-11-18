import type {
  NextPage,
} from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import Homeslider from "../Components/Items/Homeslider";
import DownloadApp from "../Components/Layout/DownloadApp";
import { Footer } from "../Components/Layout/Footer/Footer";
import { Header } from "../Components/Layout/Header/Header";
import CardSlider from "../Components/LoginSlider/CardSlider";
import SliderComponent from "../Components/LoginSlider/SliderComponent";
import CategoryCard from "../Components/Reusable/CategoryCard";
import CategoryMenu from "../Components/Reusable/CategoryMenu";
import LoadingSckeleton from "../Components/Reusable/LoadingSkeleton";
import { getAPIUrl } from "../lib/useLocalStorage";

const Home: NextPage = (props: any) => {
  const headerProps = {
    pageTitle: process.env.COMPANY_NAME! + " - Hi Bidder Home page",
    pageDescription: process.env.COMPANY_NAME! + " hi Bidder Home Contents",
  };

  const [imageSliders, setImageSliders] = useState([]);
  const [homeProductList, setHomeProductList] = useState({
    recentAuction: [],
    auctionForYou: [],
    expiredSoon: []
  });
  const [categories, setCategories] = useState(null);
  const [fetchProduct, setFetchProduct] = useState(false);
  const mainApiUrl = getAPIUrl() || process.env.API_URL;

  const sliderProps = {
    spaceBetween: 20,
    slidesPerView: 1,
    initialSlide: 1,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    navigation: false,
  };

  const itemSliderProps: any = {
    spaceBetween: 20,
    slidesPerView: 5,
    autoplay: false,
    navigation: true,
  };
  const fetchSlider = async () => {
    try {
      const resSlider = await fetch(mainApiUrl + "home-slider/sliders");
      const imageSliders = await resSlider.json();
      setImageSliders(imageSliders.sliders);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const fetchCategories = async () => {
    try {
      const res = await fetch(mainApiUrl + "category?per_page=8");
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
  const homeProducts = async () => {
    setFetchProduct(true);
    try {
      const resHome = await fetch(mainApiUrl + "home/products");
      if(resHome.ok){
        const homeItems = await resHome.json();
        setHomeProductList(homeItems.record);

      }
    } catch (error: any) {
      console.log(error.message);
    }
    setFetchProduct(false);
  };
  useEffect(() => {
    fetchSlider();
    fetchCategories();
    homeProducts();
  }, []);

  const skeletonCategory = 8;
  const skeletonFour = 6;

  return (
    <div>
      <main>
        <Header headerProps={headerProps}></Header>
        {<CategoryMenu categoriesData={categories} />}
        <div className="container-fluid mt-3">
          <div className="p-2">
            <div className="grid grid-cols-10 gap-4">
              <div className="col-span-7 border-radius-8">
                {imageSliders.length > 0 && (
                  <SliderComponent
                    sliderProps={sliderProps}
                    myClassName="mySwapper"
                    sliderImages={imageSliders}
                  />
                )}
                {imageSliders.length == 0 && (
                  <Homeslider image={{ image: "slider-1.webp" }}></Homeslider>
                )}
              </div>
              <div className="col-span-3">
                <div className="mb-4 border-radius-8 h-[45%]">
                  <img
                    className="border-radius-8 h-full w-100 object-cover"
                    src="../img/img2.jpg"
                    alt=""
                  />
                </div>
                <div className="border-radius-8 h-[45%]">
                  <img
                    className="border-radius-8 h-full w-100 object-cover"
                    src="../img/img2.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <section className="popular-category">
            <div className="container-fluid">
              <div className="row head">
                <div className="col text-pc">Popular Category</div>
                <div className="col text-right pt-3">
                  <Link href={`/categories`}>
                    <a>View All</a>
                  </Link>
                </div>
              </div>
              <div className="row m-0">
                {!categories &&
                  [...Array(skeletonCategory)].map((e: any, i: any) => (
                    <div
                      className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3"
                      key={i}
                    >
                      <LoadingSckeleton
                        count={1}
                        height="100%"
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
          <section className="popular-category">
            <div className="container-fluid">
              <div className="row head">
                <div className="col text-pc">Recent Items</div>
                <div className="col text-right">
                  <Link href={'products/recent-items'}>
                    View All
                  </Link>
                </div>
              </div>
              <div className="row head2">
                {fetchProduct &&
                  [...Array(skeletonFour)].map((e: any, i: any) => (
                    <div
                      className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2"
                      key={i}
                    >
                      <LoadingSckeleton
                        count={1}
                        height="300px"
                        width="100%"
                        baseColor="#cecece"
                        highlightColor="#999999"
                      ></LoadingSckeleton>
                    </div>
                  ))}
                {!fetchProduct && homeProductList.recentAuction.length > 0 && (
                  <div className="col-12">
                    <CardSlider
                      sliderProps={itemSliderProps}
                      myClassName="myItemSlider"
                      sliderImages={homeProductList.recentAuction}
                      sliderFor="ItemCard"
                    />
                  </div>
                )}
              </div>
            </div>
          </section>
          <section className="popular-category">
            <div className="container-fluid">
              <div className="row head">
                <div className="col text-pc">Items for you</div>
                <div className="col text-right">
                  <Link href={'products/items-for-you'}>
                    View All
                  </Link>
                </div>
              </div>
              <div className="row head2">
                {fetchProduct &&
                  [...Array(skeletonFour)].map((e: any, i: any) => (
                    <div
                      className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2"
                      key={i}
                    >
                      <LoadingSckeleton
                        count={1}
                        height="300px"
                        width="100%"
                        baseColor="#cecece"
                        highlightColor="#999999"
                      ></LoadingSckeleton>
                    </div>
                  ))}
                {!fetchProduct && homeProductList.auctionForYou.length > 0 && (
                  <div className="col-12">
                    <CardSlider
                      sliderProps={itemSliderProps}
                      myClassName="myItemSlider"
                      sliderImages={homeProductList.auctionForYou}
                      sliderFor="ItemCard"
                    />
                  </div>
                )}
              </div>
            </div>
          </section>
          <section className="popular-category">
            <div className="container-fluid">
              <div className="row head">
                <div className="col text-pc">Auctions ending soon</div>
                <div className="col text-right">
                  <Link href={'products/ending-soon'}>
                    View All
                  </Link>
                </div>
              </div>
              <div className="row head2">
                {fetchProduct &&
                  [...Array(skeletonFour)].map((e: any, i: any) => (
                    <div
                      className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2"
                      key={i}
                    >
                      <LoadingSckeleton
                        count={1}
                        height="300px"
                        width="100%"
                        baseColor="#cecece"
                        highlightColor="#999999"
                      ></LoadingSckeleton>
                    </div>
                  ))}
                {!fetchProduct && homeProductList.expiredSoon.length > 0 && (
                  <div className="col-12">
                    <CardSlider
                      sliderProps={itemSliderProps}
                      myClassName="myItemSlider"
                      sliderImages={homeProductList.expiredSoon}
                      sliderFor="ItemCard"
                    />
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
        <section className="popular-category mt-4 px-3 how-it-work relative">
          <div className="container-fluid">
            <div className="row head justify-content-start">
              <div className="col-12 text-pc text-black">How It Works</div>
              <div className="col-md-4 mt-2 pl-4 ml-3 leading-tight">
                We are a all in one-place platform which caters your ecommerce needs as well as auction holding capabilities.
              </div>
            </div>
            <div className="row head2 justify-content-start mt-4">
              <div className="col-md-6 col-xl-4 col-12 pb-8">
                <div className="row justify-content-start">
                  <div className="col-6 text-center text-xl font-bold text-gray-500 bg-white pb-2 sm:rounded-lg">
                    <span className="text-aeliya-blue border-b-4 border-aeliya-blue pb-2">
                      Hold Auction
                    </span>
                  </div>
                  <div className="col-6 text-center text-xl font-bold text-gray-500 bg-white pb-2 sm:rounded-lg">
                    Buy Product
                  </div>
                </div>
              </div>
              <div className="col-md-9 col-12">
                <div className="row justify-content-start">
                  <div className="col-md-4 col-xl-3">
                    <div className="overflow-hidden bg-white shadow sm:rounded-lg border h-100">
                      <div className="px-2 py-3">
                        <h3 className="text-3xl font-medium leading-6 text-blue-900">
                          01
                        </h3>
                        <p className="mt-3 max-w-2xl text-gray-800 text-xl">
                          Register Yourself
                        </p>
                      </div>
                      <div className="text-sm px-2 pb-3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elitc
                        id.
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-xl-3">
                    <div className="overflow-hidden bg-white shadow sm:rounded-lg border h-100">
                      <div className="px-2 py-3">
                        <h3 className="text-3xl font-medium leading-6 text-blue-900">
                          02
                        </h3>
                        <p className="mt-3 max-w-2xl text-gray-800 text-xl">
                          Place your starting bid
                        </p>
                      </div>
                      <div className="text-sm px-2 pb-3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elitc
                        id.
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-xl-3">
                    <div className="overflow-hidden bg-white shadow sm:rounded-lg border h-100">
                      <div className="px-2 py-3">
                        <h3 className="text-3xl font-medium leading-6 text-blue-900">
                          03
                        </h3>
                        <p className="mt-3 max-w-2xl text-gray-800 text-xl">
                          Hold the auction
                        </p>
                      </div>
                      <div className="text-sm px-2 pb-3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elitc
                        id.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="our-partner py-2">
          <section className="popular-category container-fluid">
            <div className="container-fluid">
              <div className="row head justify-content-start">
                <div className="col-12 text-pc pb-3">Our Partner</div>
                <div className="col-md-4 pl-4 ml-3 leading-tight pb-4">
                  We are a all in one-place platform which caters your ecommerce
                  needs as well as auction holding capabilities.
                </div>
              </div>
              <div className="row head2">
                {!categories &&
                  [...Array(skeletonFour)].map((e: any, i: any) => (
                    <div
                      className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3"
                      key={i}
                    >
                      <LoadingSckeleton
                        count={1}
                        height="100%"
                        width="100%"
                        baseColor="#cecece"
                        highlightColor="#999999"
                      ></LoadingSckeleton>
                    </div>
                  ))}
                {categories && (
                  <div className="col-12">
                    <CardSlider
                      sliderProps={itemSliderProps}
                      myClassName="myItemSlider"
                      sliderImages={categories}
                      sliderFor="ItemCard"
                    />
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
      <DownloadApp></DownloadApp>
      <Footer></Footer>
    </div>
  );
};

// This gets called on every request
// export const getServerSideProps: GetServerSideProps<any> = async (context: GetServerSidePropsContext) => {
//   const res = await fetch(process.env.API_URL+'category');
//   const resSlider = await fetch(process.env.API_URL+'home-slider/sliders');
//   try {
//       const categories = await res.json();
//       const imageSliders = await resSlider.json();
//       return { props: { categories, imageSliders } }
//   }
//   catch(error: any){
//       const errors = {status: 0, content: "Opps! Server side error found. Please, try again letter."};
//       return { props: { errors } }
//   }
// }

export default Home;
