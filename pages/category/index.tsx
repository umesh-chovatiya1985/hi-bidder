import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Footer } from "../../Components/Layout/Footer/Footer";
import { Header } from "../../Components/Layout/Header/Header";
import ItemShopCard from "../../Components/Reusable/ItemShopCard";
import CardSlider from "../../Components/LoginSlider/CardSlider";
import Link from "next/link";
import CategoryCard from "../../Components/Reusable/CategoryCard";
import { getAPIUrl } from "../../lib/useLocalStorage";

const category: NextPage = () => {
  const headerProps = {
    pageTitle: "Hi Bidder : Category details page",
    pageDescription: "hi Bidder Category details page",
  };
  const [categories, setCategories] = useState(null);
  const mainApiUrl = getAPIUrl() || process.env.API_URL;
  const itemSliderProps = {
    spaceBetween: 20,
    slidesPerView: 5,
    autoplay: false,
    navigation: true,
  };
  const fetchCategories = async () => {
    try {
      const res = await fetch(mainApiUrl + "category?limit=8");
      const categoryJson = await res.json();
      if (res.ok) {
        if (categoryJson.status == "1") {
          setCategories(categoryJson.categories);
        }
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div>
      <main>
        <Header headerProps={headerProps}></Header>
        <div className="container-fluid mt-2">
          <div className="py-3">
            <h1 className="text-center text-3xl font-semibold text-blue-900">
              Categories
            </h1>
          </div>
          <div className="border-bottom mt-2 mb-2"></div>
          <div className="row">
            <div className="col-md-2">
              <div>
                <h3 className="text-2xl text-gray-500 font-bold">Filter</h3>
              </div>
            </div>
            <div className="col-md-10">
              <div className="popular-category">
                <div className="row">
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
            </div>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default category;
