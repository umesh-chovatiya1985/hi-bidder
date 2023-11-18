import { env } from "process";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AlertModal from "../../../Components/Common/AlertModal";
import { getAPIUrl, getLocalStorage } from "../../../lib/useLocalStorage";
import { getAllPhotos } from "../../../Reducer/reducer";
import CustomLoader from "../CustomLoader";
import PhotoFrame from "../PhotoFrame";

export default function AddPhoto({ clickEvent }: any) {

  const imageArr = [2, 3, 4, 5, 6, 7, 8];
  const [isAlert, setIsAlert] = useState(false);
  const [isProcess, setIsProcess] = useState(false);
  const [clearAllImage, setClearAllImage] = useState(false);
  const { auctionPhotos } = useSelector((state: any) => state.auctionphoto);
  const dispatch = useDispatch();
  const [totalPhoto, setTotalPhoto] = useState(0);
  const [auctionId, setAuctionId] = useState(null);
  const mainApiUrl = getAPIUrl() || process.env.API_URL;

  const saveImages = async (stepNo: any) => {
    const data = {
      "auctionId": auctionId,
      "photos": auctionPhotos
    }
    setIsProcess(true);
    const imageRespo = await fetch(mainApiUrl + "auction/photo-upload/save-photos", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });
    const jsonRespo = await imageRespo.json();
    if (imageRespo.ok) {
      if (jsonRespo.status == 1) {
        clickEvent(stepNo);
      };
    }
    setIsProcess(false);
  }
  const stepCountHandler = async () => {
    await saveImages("4");
  };
  const backStepCounter = () => {
    clickEvent(2);
  }
  const handleFileChange = async (index: any, auctionPhotos: any) => {
    // console.log(index);
    // console.log(auctionPhotos);
  };

  const closeModal = () => {
    setIsAlert(!isAlert);
  };
  const confirmEvent = () => {
    setIsAlert(!isAlert);
    setClearAllImage(true);
  };
  const getUploadedPhotos = async (auctionId: any) => {
    setIsProcess(true);
    const imageRespo = await fetch(mainApiUrl + "auction/photo-upload/save-photos?auctionId="+auctionId);
    const jsonRespo = await imageRespo.json();
    if (imageRespo.ok) {
      console.log(jsonRespo);
      if (jsonRespo.status == 1) {
      };
    }
    setIsProcess(false);
  }
  useEffect(() => {
    dispatch(getAllPhotos());
    if (auctionPhotos) {
      setTotalPhoto(auctionPhotos.length);
      console.log(auctionPhotos.length);
    }
    if (getLocalStorage('auction_id')) {
      const auction_id = getLocalStorage('auction_id');
      if (auction_id && auction_id !== 'null' && auction_id !== 'undefined') {
        setAuctionId(auction_id);
        getUploadedPhotos(auction_id);
      }
    }
  }, [auctionPhotos]);

  return (
    <div>
      {isAlert && (
        <AlertModal
          closeModal={closeModal}
          isConfirm={true}
          confirmEvent={confirmEvent}
        ></AlertModal>
      )}
      {isProcess && <CustomLoader></CustomLoader>}
      <div className="grid grid-cols-2 py-2">
        <h2 className="text-3xl font-semibold text-gray-600">Photos</h2>
        <div className="text-right pr-2">
          <span className="mr-6">
            <i className="fa text-lg fa-question-circle mr-2"></i>
            See our photo tips
          </span>
          <span className="cursor-pointer" onClick={() => setIsAlert(true)}>
            <i className="fa fa-trash mr-2"></i>
            Delete all Photos
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="row-span-2 mt-2">
          <h3 className="mb-2">
            1. Image <strong>(Default First Image)</strong>
          </h3>
          <div className="border-3 content-enter items-center grid rounded border-dashed h-[570px] relative">
            <PhotoFrame
              indexKey={1}
              onSelectHandler={handleFileChange}
              clearAllImage={clearAllImage}
            ></PhotoFrame>
          </div>
        </div>
        {imageArr &&
          imageArr.map((img: any) => (
            <div className="mt-2" key={img}>
              <h3 className="mb-2">{img}. Image</h3>
              <div className="border-3 rounded border-dashed content-center items-center grid  h-[250px] relative">
                <PhotoFrame
                  indexKey={img}
                  onSelectHandler={handleFileChange}
                  clearAllImage={clearAllImage}
                ></PhotoFrame>
              </div>
            </div>
          ))}
      </div>
      <div className="button-s text-right mt-20">
        <a
          onClick={backStepCounter}
          className="cursor-pointer text-[#1E2A78] pr-[30px] font-semibold"
        >
          BACK
        </a>
        <button
          type="submit"
          disabled={totalPhoto < 5 ? true : false}
          onClick={stepCountHandler}
          className="cursor-pointer disabled:bg-gray-500 hover:bg-primary-color hover:text-white text-[#FFFFFF] bg-[#1E2A78] rounded-[6px] px-[46px] py-[10px] font-normal"
        >
          Upload & Continue
          {/* {!primaryId && <>Submit Now</>}
          {primaryId && <>Update Now</>} */}
        </button>
      </div>
    </div>
  );
}
