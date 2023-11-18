import { NextPage } from "next";
import { useRouter } from "next/router";
import AccountLayout from "../AccountLayout";

const OrderDetails: NextPage = () => {
  const router = useRouter();
  const { order_no } = router.query;
  const headerProps = {
    pageTitle: "Hi Bidder : Category details page",
    pageDescription: "hi Bidder Category details page",
  };
  return (
    <AccountLayout headerProps={headerProps}>
      <div className="border-solid shadow rounded-[6px] font-[500] text-[#3A3A3A]">
        <div className="container-fluid px-8 border-b-2 border-[#D7D7D7]">
          <div className="row">
            <div className="flex flex-wrap">
              <div className="w-1/2 h-[70px] text-[30px] text-[600] pt-[10px]">
                <p>Order ID - #OD12020358</p>
              </div>
              <div className="w-1/2 h-[70px] text-right text-[20px] text-[500] text-[#1E2A78] pt-[18px]"></div>
            </div>
          </div>
        </div>
        <div className="my-order">
          <div className="container-fluid p-4">
            <div className="row">
              <div className="flex flex-wrap justify-between border-b-2 border-[#D7D7D7] pb-[28px]">
                <div className="w-1/6">
                  <img src="/img/order1.png" alt="bid-image" />
                </div>
                <div className="w-5/6">
                  <div className="details">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="flex flex-wrap justify-between pb-[10px]">
                          <div>
                            <p>
                              <a
                                href="#"
                                className="text-[20px] text-[600] text-[#3A3A3A]"
                              >
                                London Hills Solid T-shirt Dress
                              </a>
                            </p>
                            <p className="text-[16px] text-[#808089] py-[10px]">
                              Seller : London Hills
                            </p>
                            <p className="text-[16px] text-[#808089] ">
                              Order Total
                            </p>
                            <p className="text-[16px]">Rs. 450</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="process">
                    <div className="row">
                      <div className="flex flex-wrap justify-between">
                        <div className="pro1 w-1/4 text-center">
                          <img
                            src="/img/Group 2653.png"
                            className="m-auto z-10"
                            alt=""
                          />
                          <p className="w-full relative bottom-[18px] left-[50%] m-auto border-dashed border-2 border-[#5de762]"></p>
                          <p className="pt-[10px] text-[18px] text-[#3A3A3A]">
                            Ordered
                          </p>
                          <p className="text-[12px] text-[#808089]">
                            11th Oct 2022, Thu
                          </p>
                        </div>
                        <div className="pro1 w-1/4 text-center">
                          <img
                            src="/img/Group 2653.png"
                            className="m-auto z-10"
                            alt=""
                          />
                          <p className="w-full relative bottom-[18px] left-[50%] m-auto border-dashed border-2 border-[#5de762]"></p>
                          <p className="pt-[10px] text-[18px] text-[#3A3A3A]">
                            Packed
                          </p>
                          <p className="text-[12px] text-[#808089]">
                            13th Oct 2022, Sat
                          </p>
                        </div>
                        <div className="pro1 w-1/4 text-center">
                          <img
                            src="/img/Group 2652.png"
                            className="m-auto z-10"
                            alt=""
                          />
                          <p className="w-full relative bottom-[18px] left-[50%] m-auto border-dashed border-2 border-[#E2E2E2]"></p>
                          <p className="pt-[10px] text-[18px] text-[#3A3A3A]">
                            Shipped
                          </p>
                          <p className="text-[12px] text-[#808089]">
                            15th Oct 2022, Mon
                          </p>
                        </div>
                        <div className="pro1 w-1/4 text-center">
                          <img
                            src="/img/Group 2650.png"
                            className="m-auto z-10"
                            alt=""
                          />
                          <p className="pt-[10px] text-[18px] text-[#3A3A3A]">
                            Delivery
                          </p>
                          <p className="text-[12px] text-[#808089]">
                            17th Oct 2022, Wen
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-b-2 border-[#D7D7D7] py-[28px]">
                <p className="text-[24px] text-[#3A3A3A] pb-[22px]">
                  Delivery Address
                </p>
                <p className="text-[22px] text-[#3A3A3A]">John Doe</p>
                <p className="pt-[10px] text-[16px] text-[#808089]">
                  501, Span Trade Center Paldi, Opp. Kocharab Aashram Ahmedabad
                  - 380007, Gujarat
                </p>
                <p className="text-[22px] text-[#3A3A3A] pt-[22px]">
                  Phone Number
                </p>
                <p className="text-[18px] text-[#808089] pt-[10px]">
                  9595123456
                </p>
              </div>

              <div className="py-[28px] w-full">
                <p className="text-[24px] text-[#3A3A3A] pb-[22px]">
                  Ratings & Reviews
                </p>
                <p className="text-[20px] text-[#3A3A3A]">Rate this product</p>
                <div className="star-icon pt-[10px]">
                  <i className="fa fa-star pr-[8px] text-[20px] text-[#FFC700]"></i>
                  <i className="fa fa-star px-[8px] text-[20px] text-[#FFC700]"></i>
                  <i className="fa fa-star px-[8px] text-[20px] text-[#FFC700]"></i>
                  <i className="fa fa-star px-[8px] text-[20px] text-[#C4C4C4]"></i>
                  <i className="fa fa-star px-[8px] text-[20px] text-[#C4C4C4]"></i>
                </div>
                <p className="text-[20px] text-[#3A3A3A] pt-[25px]  pb-[10px]">
                  Rate this product
                </p>
                <textarea
                  placeholder="Write some comment on product"
                  className="min-h-[150px] w-full border-1 border-[#AEAEAE] rounded-[6px]"
                  name="comment"
                  form="usrform"
                ></textarea>
                <div className="submit pt-[38px]">
                  <a
                    href="confirn-order-id.html"
                    className="text-[18px] text-[#FFFFFF] px-[58px] py-[16px] bg-[#1E2A78] rounded-[6px]"
                  >
                    Submit
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
};

export default OrderDetails;
