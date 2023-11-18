import Link from "next/link";
import React, { useState, useEffect, memo } from "react";
import { getAPIUrl } from "../../lib/useLocalStorage";
import LoadingSckeleton from "./LoadingSkeleton";

const CategoryMenu = ({ categoriesData }: any) => {
  const [categories, setCategories] = useState(null);
  const mainApiUrl = getAPIUrl() || process.env.API_URL;
  // let listItems = [];
  // if(categoriesData){
  //     listItems = categoriesData.map((category: any) =>
  //         <li key={category.slug}>
  //             <Link href={`/category/${encodeURIComponent(category.slug)}`}>
  //                 <a>{category.title}</a>
  //             </Link>
  //         </li>
  //     );
  // }

  const fetchCategories = async () => {
    try {
      const res = await fetch(mainApiUrl + "category?parent=0");
      const categories = await res.json();
      if (res.ok) {
        if (categories.status == "1") {
          setCategories(categories.categories);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const countLi = 8;

  return (
    <section className="category">
      <nav className="navbar">
        <div className="container-fluid">
          <div className="row">
            <ul>
              <li>
                <Link href={"/categories"}>
                  <a>
                    All Category <i className="fa fa-chevron-down"></i>
                  </a>
                </Link>
                <span>|</span>
              </li>
              {!categories &&
                [...Array(countLi)].map((e: any, i: any) => (
                  <li key={i}>
                    <LoadingSckeleton
                      baseColor="#AAAAAA"
                      highlightColor="#FFFFFF"
                      count={1}
                      height="20px"
                      width="80px"
                    />
                  </li>
                ))}
              {categories &&
                categories.map((category: any) => (
                  <li key={category.slug}>
                    <Link
                      href={`/category/${encodeURIComponent(category.slug)}`}
                    >
                      <a>{category.title}</a>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default memo(CategoryMenu);
