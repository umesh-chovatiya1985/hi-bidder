export default function AuctionSidebar({ clickEvent, currentIndex }: any) {
  const stepCountHandler = (number: any) => {
    if (currentIndex > number) {
      clickEvent(number);
    }
  };

  return (
    <div className="w-1/4 bg-[#F1F3FF] rounded-l-lg p-[30px] border-r-2">
      <div className="sticky top-4">
        <h2 className="text-[28px] text-gray-700 font-semibold mb-6">
          Put Object on auction
        </h2>
        <div className="mt-[20px] relative border-for-view">
          <div className="pb-3" onClick={() => stepCountHandler(1)}>
            <div className="flex items-center">
              {currentIndex > 1 && (
                <div>
                  <img
                    src="/assets/green-tick.png"
                    className="w-7 h-7 bg-white rounded-full"
                    alt="bid-image"
                  />
                </div>
              )}
              {currentIndex <= 1 && (
                <div
                  className={`w-7 h-7 items-center relative bg-white ${currentIndex == 1
                    ? "text-white  box-outline-circle"
                    : "bg-white border-gray-3"
                    } rounded-full`}
                ></div>
              )}
              <span
                className={`cursor-pointer text-[20px] ${currentIndex >= 1 ? "text-primary-color" : "text-[#3A3A3A]"
                  } font-normal pl-[20px]`}
              >
                Category
              </span>
            </div>
          </div>
          <div className="py-3" onClick={() => stepCountHandler(2)}>
            <div className="flex items-center">
              {currentIndex > 2 && (
                <div>
                  <img
                    src="/assets/green-tick.png"
                    className="w-7 h-7 bg-white rounded-full"
                    alt="bid-image"
                  />
                </div>
              )}
              {currentIndex <= 2 && (
                <div
                  className={`w-7 h-7 items-center relative bg-white ${currentIndex == 2
                    ? "text-white box-outline-circle"
                    : "bg-white border-gray-3"
                    } rounded-full`}
                ></div>
              )}
              <span
                className={`cursor-pointer text-[20px] ${currentIndex >= 2 ? "text-primary-color" : "text-[#3A3A3A]"
                  } font-normal pl-[20px]`}
              >
                Details
              </span>
            </div>
          </div>
          <div className="py-3" onClick={() => stepCountHandler(3)}>
            <div className="flex items-center">
              {currentIndex > 3 && (
                <div>
                  <img
                    src="/assets/green-tick.png"
                    className="w-7 h-7 bg-white rounded-full"
                    alt="bid-image"
                  />
                </div>
              )}
              {currentIndex <= 3 && (
                <div
                  className={`w-7 h-7 items-center relative bg-white ${currentIndex == 3
                    ? "text-white box-outline-circle"
                    : "bg-white border-gray-3"
                    } rounded-full`}
                ></div>
              )}
              <span
                className={`cursor-pointer text-[20px] ${currentIndex >= 3 ? "text-primary-color" : "text-[#3A3A3A]"
                  } font-normal pl-[20px]`}
              >
                Photos
              </span>
            </div>
          </div>
          <div className="py-3" onClick={() => stepCountHandler(4)}>
            <div className="flex items-center">
              {currentIndex > 4 && (
                <div>
                  <img
                    src="/assets/green-tick.png"
                    className="w-7 h-7 bg-white rounded-full"
                    alt="bid-image"
                  />
                </div>
              )}
              {currentIndex <= 4 && (
                <div
                  className={`w-7 h-7 items-center relative bg-white ${currentIndex == 4
                    ? "text-white box-outline-circle"
                    : "bg-white border-gray-3"
                    } rounded-full`}
                ></div>
              )}
              <span
                className={`cursor-pointer text-[20px] ${currentIndex >= 4 ? "text-primary-color" : "text-[#3A3A3A]"
                  } font-normal pl-[20px]`}
              >
                Estimated value
              </span>
            </div>
          </div>
          <div className="pt-3" onClick={() => stepCountHandler(5)}>
            <div className="flex items-center">
              {currentIndex > 5 && (
                <div>
                  <img
                    src="/assets/green-tick.png"
                    className="w-7 h-7 bg-white rounded-full"
                    alt="bid-image"
                  />
                </div>
              )}
              {currentIndex <= 5 && (
                <div
                  className={`w-7 h-7 items-center relative bg-white ${currentIndex == 5
                    ? "text-white box-outline-circle"
                    : "bg-white border-gray-3"
                    } rounded-full`}
                ></div>
              )}
              <span
                className={`cursor-pointer text-[20px] ${currentIndex >= 5 ? "text-primary-color" : "text-[#3A3A3A]"
                  } font-normal pl-[20px]`}
              >
                Shipping
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
