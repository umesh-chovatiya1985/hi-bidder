import React, { useState } from "react";
import CategoryListView from "../CategoryListView";

export default function AuctionCategory({
  lavelName,
  clickedNo,
  categories,
  fetchCategoriesBy,
}: any) {
  return (
    <div
      className={`flex flex-col w-full items-center justify-center bg-white dark:bg-gray-800 rounded-lg`}
    >
      <ul className="flex flex-col divide-y w-full">
        {categories &&
          categories.map((category: any) => (
            <li key={category._id} className="flex flex-row">
              <CategoryListView
                lavelName={lavelName}
                category={category}
                clickedNo={clickedNo}
                fetchCategoriesBy={fetchCategoriesBy}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}
