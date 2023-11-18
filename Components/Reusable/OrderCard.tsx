import Link from "next/link";

export default function OrderCard() {
  return (
    <div className="row m-0 mb-3">
      <div className="flex flex-wrap justify-between border-1 bg-[#F2F2F2] rounded border-[#e5e5e5] px-0">
        <div className="w-1/6">
          <img src="/img/order1.png" alt="bid-image" />
        </div>
        <div className="w-5/6">
          <div className="details">
            <div className="pt-3 px-3">
              <div className="row">
                <div className="flex flex-wrap justify-between pb-[15px]">
                  <div className="3/4">
                    <p>
                      <a
                        href="#"
                        className="text-[20px] text-[600] text-[#3A3A3A]"
                      >
                        London Hills Solid T-shirt Dress
                      </a>
                    </p>
                    <p className="text-[16px] text-[#808089] py-[5px]">
                      Seller : <a href="#">London Hills</a>
                    </p>
                    <p className="text-[16px] text-[#808089]">Order Total</p>
                    <p className="text-[16px]">Rs. 450</p>
                  </div>
                  <div className="w-1/4 text-right">
                    <p className="text-[19px] text-[#808089]">
                      Order ID -
                      <Link
                        href="/account/my-orders/[order_no]"
                        as="/account/my-orders/od22020358"
                      >
                        <a className="ml-2">#OD12020358</a>
                      </Link>
                    </p>
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
                  <p className="w-full relative bottom-[18px] left-[50%] m-auto border-dashed border-2 border-[#E2E2E2]"></p>
                  <p className="pt-[10px] text-[16px] text-[#3A3A3A]">
                    Ordered
                  </p>
                  <p className="text-[12px] text-[#808089]">
                    11th Oct 2022, Thu
                  </p>
                </div>
                <div className="pro1 w-1/4 text-center">
                  <img
                    src="/img/Group 2652.png"
                    className="m-auto z-10"
                    alt=""
                  />
                  <p className="w-full relative bottom-[18px] left-[50%] m-auto border-dashed border-2 border-[#E2E2E2]"></p>
                  <p className="pt-[10px] text-[16px] text-[#3A3A3A]">Packed</p>
                  <p className="text-[12px] text-[#808089]">
                    Expected by 13th Oct 2022, Sat
                  </p>
                </div>
                <div className="pro1 w-1/4 text-center">
                  <img
                    src="/img/Group 2650.png"
                    className="m-auto z-10"
                    alt=""
                  />
                  <p className="w-[220px] relative bottom-[18px] left-[50%] m-auto border-dashed border-2 border-[#E2E2E2]"></p>
                  <p className="pt-[10px] text-[16px] text-[#3A3A3A]">
                    Shipped
                  </p>
                  <p className="text-[12px] text-[#808089]">
                    Expected by 15th Oct 2022, Mon
                  </p>
                </div>
                <div className="pro1 w-1/4 text-center">
                  <img
                    src="/img/Group 2650.png"
                    className="m-auto z-10"
                    alt=""
                  />
                  <p className="pt-[10px] text-[16px] text-[#3A3A3A]">
                    Delivery
                  </p>
                  <p className="text-[12px] text-[#808089]">
                    Expected by 17th Oct 2022, Wen
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
