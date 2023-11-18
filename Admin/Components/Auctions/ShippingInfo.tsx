import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DynaFormControl from "../../../Components/Reusable/Forms/DynaFormControl";
import { getAPIUrl, getLocalStorage } from "../../../lib/useLocalStorage";
import CustomLoader from "../CustomLoader";

interface estimatedvalue {
  shipping_cost: string,
  package_weight_kg: string,
  package_weight_gm: string,
  package_weight_width: string,
  package_weight_length: string,
  package_weight_height: string,
  offer_free_shipping: string,
  save_default_setting: string
}

export default function ShippingInfo({ clickEvent }: any) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<estimatedvalue>();

  const [auctionId, setAuctionId] = useState(null);
  const mainApiUrl = getAPIUrl() || process.env.API_URL;
  const [isProcess, setIsProcess] = useState(false);

  const onSubmit = async (data: any) => {
    data.product_id = auctionId;
    setIsProcess(true);
    data.save_default_setting = data.save_default_setting ? true : false;
    data.offer_free_shipping = data.offer_free_shipping ? true : false;
    const respoData = await fetch(mainApiUrl + "auction/shipping", {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });
    const respoJson = await respoData.json();
    if (respoData.ok) {
      if (respoJson.status == 1) {
        console.log("Process done");
        clickEvent(1);
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
      <h2 className="mb-3 text-3xl text-gray-600">Shipping</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-8 col-12">
            <div className="row">
              <div className="col-8 my-3">
                <DynaFormControl
                  register={register}
                  errors={errors}
                  type="select"
                  formName="Shipping_cost"
                  formLabel="Shipping cost"
                  validation={{ required: "Shipping cost is required field." }}
                  Options={"The Buyer, The Seller"}
                ></DynaFormControl>
              </div>
              <div className="col-4 my-3 pt-[24px]">
                <div className="flex h-full items-center">
                  Will pay for Shipping
                </div>
              </div>
              <div className="col-md-5 my-3">
                <label
                  className={`font-semibold`}
                >
                  Package Weight
                </label>
                <div className="row">
                  <div className="col-5">
                    <DynaFormControl
                      register={register}
                      errors={errors}
                      type="text"
                      formName="package_weight_kg"
                      formLabel="Kg"
                      isLabeled="No"
                      isBadge="right"
                      badgeValue="Kg"
                    ></DynaFormControl>
                  </div>
                  {/* <div className="col-2 text-center pt-2">
                    X
                  </div> */}
                  <div className="col-5">
                    <DynaFormControl
                      register={register}
                      errors={errors}
                      type="text"
                      formName="package_weight_gm"
                      formLabel="Gm"
                      isLabeled="No"
                      isBadge="right"
                      badgeValue="Gm"
                    ></DynaFormControl>
                  </div>
                </div>
              </div>
              <div className="col-md-7 my-3">
                <label
                  className={`font-semibold`}
                >
                  Package Dimensions
                </label>
                <div className="row">
                  <div className="col-3 pr-0">
                    <DynaFormControl
                      register={register}
                      errors={errors}
                      type="text"
                      formName="package_weight_length"
                      formLabel="Length"
                      isLabeled="No"
                      isBadge="right"
                      badgeValue="in"
                    ></DynaFormControl>
                  </div>
                  <div className="col-1 text-center pt-2">
                    X
                  </div>
                  <div className="col-3 p-0">
                    <DynaFormControl
                      register={register}
                      errors={errors}
                      type="text"
                      formName="package_weight_width"
                      formLabel="Width"
                      isLabeled="No"
                      isBadge="right"
                      badgeValue="in"
                    ></DynaFormControl>
                  </div>
                  <div className="col-1 text-center pt-2">
                    X
                  </div>
                  <div className="col-3 pl-0">
                    <DynaFormControl
                      register={register}
                      errors={errors}
                      type="text"
                      formName="package_weight_height"
                      formLabel="Height"
                      isLabeled="No"
                      isBadge="right"
                      badgeValue="in"
                    ></DynaFormControl>
                  </div>
                </div>
              </div>
              <div className="col-md-12 my-3">
                <DynaFormControl
                  register={register}
                  errors={errors}
                  type="toggle"
                  formName="offer_free_shipping"
                  formLabel="Offer Free Pickup"
                ></DynaFormControl>
              </div>
              <div className="col-md-12 my-3">
                <DynaFormControl
                  register={register}
                  errors={errors}
                  type="toggle"
                  formName="save_default_setting"
                  formLabel="Save default setting"
                  defaultChecked={true}
                ></DynaFormControl>
              </div>
            </div>
            <div className="button-s text-right mt-10">
              <a onClickCapture={() => clickEvent(4)} className="cursor-pointer text-[#1E2A78] pr-[30px] font-semibold">
                Cancel
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
