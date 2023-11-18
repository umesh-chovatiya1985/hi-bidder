import { useEffect, useState } from "react";
import { getAPIUrl } from "../../../lib/useLocalStorage";
import ListView from "../ListView";

export default function SelCategory({ clickEvent }: any) {
  const [categories, setCategories] = useState(null);
  const [clickedNo, setClickedNo] = useState("");
  const mainApiUrl = getAPIUrl() || process.env.API_URL;
  const stepCountHandler = (number: any) => {
    // console.log(formControls);
    // clickEvent(number);
  };
  const headerProps = {
    pageTitle: "Hi Bidder : Category details page",
    pageDescription: "hi Bidder Category details page",
  };
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
  const clickCategoryEvent = (response: any) => {
    if (clickedNo !== response) {
      setClickedNo(response);
    } else {
      setClickedNo("");
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div>
      {categories &&
        categories.map((category: any) => (
          <div key={category._id} className="border rounded mb-3">
            <ListView
              category={category}
              clickedNo={clickedNo}
              clickEvent={clickCategoryEvent}
              stepCountHandler={stepCountHandler}
            ></ListView>
          </div>
        ))}
    </div>
  );
}
