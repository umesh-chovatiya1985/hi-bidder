export default function CategoryListView({
  lavelName,
  category,
  clickedNo,
  fetchCategoriesBy,
}: any) {
  const fetchCategories = (category_id: any) => {
    fetchCategoriesBy(lavelName, category_id);
  };
  return (
    <div
      onClick={() => fetchCategories(category._id)}
      className={`${clickedNo == category._id ? "bg-gray-100" : ""
        } select-none cursor-pointer hover:bg-gray-100 flex flex-1 items-center p-2`}
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
            className={`hover:text-gray-800 dark:hover:text-white dark:text-gray-200 text-gray-500`}
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
