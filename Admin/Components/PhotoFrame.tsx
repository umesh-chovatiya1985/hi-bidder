import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AlertModal from "../../Components/Common/AlertModal";
import { getAPIUrl } from "../../lib/useLocalStorage";
import { addPhotos, getAllPhotos, removePhotos } from "../../Reducer/reducer";

export default function PhotoFrame({
  indexKey,
  onSelectHandler,
  clearAllImage
}: any) {

  const { auctionPhotos } = useSelector((state: any) => state.auctionphoto);
  const dispatch = useDispatch();

  const [selFile, setSelFile] = useState("/assets/Vector.png");
  const [isAlert, setIsAlert] = useState(false);
  const mainApiUrl = getAPIUrl() || process.env.API_URL;
  const handleFileChange = async (e: any) => {
    // onSelectHandler(indexKey, e);
    // setSelFile(URL.createObjectURL(e.target.files[0]));
    // console.log(indexKey);
    // setTimeout(async () => {
    await callSocketApi(e.target.files[0]);
    // }, 1500);
  };
  const callSocketApi = async (sourceFile: any) => {
    try {
      const formData = new FormData();
      const fileName = Date.now().toString() + "_" + sourceFile.name;
      formData.append('file_url', sourceFile, fileName);
      formData.append('data', JSON.stringify({ indexKey: indexKey }));
      const imageResponse = await fetch(mainApiUrl + "auction/photo-upload/photos-socket", {
        method: 'POST',
        body: formData,
        headers: { "Accept": "*/*" }
      });
      const photoRespo = await imageResponse.json();
      if (imageResponse.ok) {
        if (photoRespo.status == 1) {
          setSelFile(photoRespo.record.path);
          dispatch(addPhotos(photoRespo.record));
          onSelectHandler(indexKey, photoRespo.record);
        }
      }
    }
    catch (error: any) {
      console.log(error.message);
    }
  }

  const removeCallSocketApi = async (fileName: any) => {
    try {
      const imageResponse = await fetch(mainApiUrl + "auction/photo-upload/photo-remove-socket?imagePath=" + fileName);
      const photoRespo = await imageResponse.json();
      if (imageResponse.ok) {
        if (photoRespo.status == 1) {
          setSelFile("/assets/Vector.png");
        }
      }
    }
    catch (error: any) {
      console.log(error.message);
    }
  }

  const clearImage = () => {
    setSelFile("/assets/Vector.png");
  };

  const closeModal = () => {
    setIsAlert(!isAlert);
  };
  const confirmEvent = (value: any) => {
    setIsAlert(!isAlert);
    console.log(value);
    const fileName = selFile.split("/").pop();
    removeCallSocketApi(fileName);
    dispatch(removePhotos({ indexKey: value }));
    clearImage();
  };

  useEffect(() => {
    clearImage();
  }, [clearAllImage]);

  useEffect(() => {
    dispatch(getAllPhotos());
    if (auctionPhotos) {
      let find = auctionPhotos.findIndex((item) => item.indexKey === indexKey);
      if (find >= 0) {
        if (auctionPhotos[find].path) {
          setSelFile(auctionPhotos[find].path);
        }
        else {
          setSelFile("/assets/Vector.png");
        }
      }
      else {
        setSelFile("/assets/Vector.png");
      }
    }
  }, [auctionPhotos]);

  // update chat on new message dispatched
  // socket.on("photos", (photo: any) => {
  //   dispatch(addPhotos(photo));
  // });

  // update chat on new message dispatched
  // socket.on("removephoto", (photo: any) => {
  //   dispatch(removePhotos({ indexKey: indexKey }));
  // });

  return (
    <div className="flex text-center flex-column p-4">
      {isAlert && (
        <AlertModal
          closeModal={closeModal}
          isConfirm={true}
          value={indexKey}
          confirmEvent={confirmEvent}
        ></AlertModal>
      )}
      {selFile !== "/assets/Vector.png" && (
        <div
          onClick={() => setIsAlert(true)}
          className="absolute top-0 right-0 border-1 px-2 py-1 rounded bg-gray-100 cursor-pointer"
        >
          <i className="fa fa-trash text-3xl text-[#ff0000]"></i>
        </div>
      )}
      <div
        className={`p-2 ${selFile !== "/assets/Vector.png"
          ? "absolute top-0 bottom-0 left-0 right-0 -z-10"
          : ""
          }`}
      >
        <img
          src={selFile}
          alt="Photo Frame"
          className={`${selFile !== "/assets/Vector.png" ? "object-cover w-full h-full" : ""
            }`}
        />
      </div>
      <div className="pt-3 pb-2">
        <p className=" text-slate-500">File Format.png</p>
      </div>
      <div className="text-center">
        <input
          id={`selImage${indexKey}`}
          onChangeCapture={handleFileChange}
          onClick={(e: any) => {
            e.target.value = null;
          }}
          type="file"
          className="hidden"
        />
        <label
          htmlFor={`selImage${indexKey}`}
          className="bg-gray-200 hover:bg-gray-400 text-gray-600 py-2 px-4 rounded inline-flex items-center"
        >
          <i className="fa fa-photo mr-3"></i>
          <span>Browse</span>
        </label>
      </div>
    </div>
  );
}
