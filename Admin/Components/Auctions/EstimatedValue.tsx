import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DynaFormControl from "../../../Components/Reusable/Forms/DynaFormControl";
import { getAPIUrl, getLocalStorage } from "../../../lib/useLocalStorage";
import CustomLoader from "../CustomLoader";

interface estimatedvalue {
  product_id: string,
  auction_duration: string,
  quantity: string,
  starting_bid: string,
  reserved_price: string
}

export default function EstimatedValue({ clickEvent }: any) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<estimatedvalue>();
  const [auctionId, setAuctionId] = useState(null);
  const [isProcess, setIsProcess] = useState(false);
  const mainApiUrl = getAPIUrl() || process.env.API_URL;

  const onSubmit = async (data: any) => {
    data.product_id = auctionId;
    setIsProcess(true);
    const respoData = await fetch(mainApiUrl + "auction/pricing", {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });
    const respoJson = await respoData.json();
    if (respoData.ok) {
      if (respoJson.status == 1) {
        clickEvent(5);
      }
    }
    setIsProcess(false);
  };

  useEffect(() => {
    if (getLocalStorage('auction_id')) {
      const auction_id = getLocalStorage('auction_id');
      if (auction_id && auction_id !== 'null' && auction_id !== 'undefined') {
        setAuctionId(auction_id);
      }
    }
  }, []);

  return (
    <div>
      {isProcess && <CustomLoader></CustomLoader>}
      <h2 className="mb-3 text-3xl text-gray-600">Pricing</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-8 col-12">
            <div className="row">
              <div className="col-6 my-3">
                <DynaFormControl
                  register={register}
                  errors={errors}
                  type="select"
                  formName="auction_duration"
                  formLabel="Auction Duration"
                  validation={{ required: "Auction Duration is required field." }}
                  Options={"1 Week,15 Days,1 Month,2 Months,3 Months"}
                ></DynaFormControl>
              </div>
              <div className="col-6 my-3">
                <DynaFormControl
                  register={register}
                  errors={errors}
                  type="text"
                  formName="quantity"
                  formLabel="Quantity"
                  validation={{ required: "Quantity is required field." }}
                ></DynaFormControl>
              </div>
              <div className="col-6 my-3">
                <DynaFormControl
                  register={register}
                  errors={errors}
                  type="text"
                  formName="starting_bid"
                  formLabel="Starting Bid"
                  validation={{ required: "Starting Bid is required field." }}
                  isBadge="left"
                ></DynaFormControl>
              </div>
              <div className="col-6 my-3">
                <DynaFormControl
                  register={register}
                  errors={errors}
                  type="text"
                  formName="reserved_price"
                  formLabel="Reserved Price"
                  validation={{ required: "Reserved Price is required field." }}
                  isBadge="left"
                ></DynaFormControl>
              </div>
            </div>
            <div className="button-s text-right mt-10">
              <a onClickCapture={() => clickEvent(3)} className="cursor-pointer text-[#1E2A78] pr-[30px] font-semibold">
                Back
              </a>
              <button
                type="submit"
                className="cursor-pointer hover:bg-primary-color hover:text-white text-[#FFFFFF] bg-[#1E2A78] rounded-[6px] px-[46px] py-[10px] font-normal"
              >
                Save & Continue
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
