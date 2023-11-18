import React, { useEffect, useState } from "react";
import { getAPIUrl, getLocalStorage, setLocalStorage } from "../../lib/useLocalStorage";
import AuctionCategory from "./Auctions/AuctionCategory";

export default function ListView({
  category,
  clickEvent,
  clickedNo,
  stepCountHandler,
}: any) {
  const mainApiUrl = getAPIUrl() || process.env.API_URL;
  const [categoryByCategories, setCategoryByCategories] = useState(null);
  const [categoryBySubCategories, setCategoryBySubCategories] = useState(null);
  const [categoryBySubSubCategories, setCategoryBySubSubCategories] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState({
    first_sub: "",
    second_sub: "",
    third_sub: "",
  });

  const fetchCategoriesBy = async (category_id: any) => {
    setIsClicked(true);
    if (clickEvent) clickEvent(category_id);
    setLocalStorage("main_category", category_id);
    try {
      const res = await fetch(mainApiUrl + "category?parent=" + category_id);
      const categories = await res.json();
      if (res.ok) {
        if (categories.status == "1") {
          setCategoryByCategories(categories.categories);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchCategoriesBySubCat = async (lavelName: any, category_id: any) => {
    try {
      if (category_id != '') {
        const res = await fetch(mainApiUrl + "category?parent=" + category_id);
        const categories = await res.json();
        if (res.ok) {
          if (categories.status == "1") {
            if (lavelName == 'first_sub') {
              setCategoryBySubCategories(categories.categories);
              setCategoryBySubSubCategories(null);
            }
            if (lavelName == 'second_sub') {
              setCategoryBySubSubCategories(categories.categories);
            }
          }
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const subClickedNo = (eventNo: any) => {
    console.log(eventNo);
  };
  const finalClicked = () => {
    stepCountHandler(2);
  };
  const fetchCategoriesBySub = (lavelName: any, category_id: any) => {
    setSelectedCategories({ ...selectedCategories, [lavelName]: category_id });
    fetchCategoriesBySubCat(lavelName, category_id);
    setTimeout(() => {
      setLocalStorage("sub_category", JSON.stringify(selectedCategories));
    }, 1500);
  };

  useEffect(() => {
    if (getLocalStorage('main_category')) {
      const main_category = getLocalStorage('main_category');
      if (main_category == category._id) {
        fetchCategoriesBy(main_category);
      }
    }
    if (getLocalStorage('sub_category')) {
      const sub_category = JSON.parse(getLocalStorage('sub_category'));
      setSelectedCategories(sub_category);
      Object.entries(sub_category).map(([key, value]) => {
        fetchCategoriesBySubCat(key, value);
      });
    }
  }, [])

  return (
    <>
      <div
        onClick={() => fetchCategoriesBy(category._id)}
        className={`${clickedNo == category._id ? "bg-gray-100" : ""} select-none cursor-pointer hover:bg-gray-100 flex flex-1 items-center p-2`}
      >
        <div className="flex flex-col w-10 h-10 justify-center items-center mr-4">
          <a href="#" className="block relative">
            <img
              className="mx-auto object-cover rounded-full h-10 w-10"
              src={`/images/` + category.image}
              alt={category.title}
            />
          </a>
        </div>
        <div className="flex-1 pl-1">
          <div className="font-medium dark:text-white">{category.title}</div>
          <div className="text-gray-600 dark:text-gray-200 text-sm">
            {category.title}
          </div>
        </div>
        <div className="flex flex-row justify-center">
          <button className="w-10 text-right flex justify-end">
            <svg
              width="20"
              fill="currentColor"
              height="20"
              className={`${clickedNo === category._id ? "rotate-90-important" : ""
                } hover:text-gray-800 dark:hover:text-white dark:text-gray-200 text-gray-500`}
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
            </svg>
          </button>
        </div>
      </div>
      {clickedNo === category._id && isClicked && (
        <div className="border-top">
          <div className="grid grid-cols-3">
            <div>
              <AuctionCategory
                lavelName="first_sub"
                clickedNo={selectedCategories.first_sub}
                categories={categoryByCategories}
                fetchCategoriesBy={fetchCategoriesBySub}
              ></AuctionCategory>
            </div>
            <div>
              <AuctionCategory
                lavelName="second_sub"
                clickedNo={selectedCategories.second_sub}
                categories={categoryBySubCategories}
                fetchCategoriesBy={fetchCategoriesBySub}
              ></AuctionCategory>
            </div>
            <div>
              <AuctionCategory
                lavelName="third_sub"
                clickedNo={selectedCategories.third_sub}
                categories={categoryBySubSubCategories}
                fetchCategoriesBy={fetchCategoriesBySub}
              ></AuctionCategory>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
