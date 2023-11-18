import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAPIUrl } from "../../lib/useLocalStorage";
import AccountLayout from "./AccountLayout";
import { useState, useEffect } from "react";
import LoadingSckeleton from "../../Components/Reusable/LoadingSkeleton";
import AlertModal from "../../Components/Common/AlertModal";
import { toast, ToastContainer } from "react-toastify";

const MyAddress: NextPage = () => {
  const headerProps = {
    pageTitle: "Hi Bidder : Category details page",
    pageDescription: "hi Bidder Category details page",
  };

  const mainApiUrl = getAPIUrl() || process.env.API_URL;
  const [userAddress, setUserAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddress, setIsAddress] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const addressData = async () => {
    const dataRecord = await fetch(mainApiUrl + "user/user-address");
    const userJson = await dataRecord.json();
    if (dataRecord.ok) {
      console.log(userJson);
      if (userJson.status === 1) {
        setUserAddress(userJson.records);
        setIsAddress(true);
      } else {
        setIsAddress(false);
      }
    }
    setIsLoading(false);
  };
  const closeModal = () => {
    setIsAlert(!isAlert);
    setDeleteId(null);
  };
  const confirmEvent = () => {
    setIsAlert(!isAlert);
    removeRecord();
  };
  const deleteRecord = async (record_id: any) => {
    setDeleteId(record_id);
    setIsAlert(true);
  };
  const removeRecord = async () => {
    setIsLoading(true);
    try {
      const removeRespo = await fetch(
        mainApiUrl + "user/user-address/" + deleteId,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const response = await removeRespo.json();
      if (removeRespo.ok) {
        toast.success(response.message, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          theme: "dark",
        });
        if (response.status == 1) {
          setDeleteId(null);
        }
        addressData();
      }
    } catch (errors) {
      toast.error(errors.message, {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "dark",
      });
    }
    setIsLoading(false);
  };
  useEffect(() => {
    setIsLoading(true);
    addressData();
  }, []);

  return (
    <AccountLayout headerProps={headerProps}>
      <ToastContainer />
      {isAlert && (
        <AlertModal
          closeModal={closeModal}
          isConfirm={true}
          confirmEvent={confirmEvent}
        ></AlertModal>
      )}
      <div className="container-fluid px-8 border-b-2 border-[#D7D7D7]">
        <div className="row">
          <div className="flex flex-wrap">
            <div className="w-1/2 h-[70px] text-[30px] text-[600] pt-[10px]">
              <p>Address</p>
            </div>
            <div className="w-1/2 h-[70px] text-right text-[20px] text-[500] text-[#1E2A78] pt-[18px]">
              <Link href={"/account/add-address"}>
                <a>+ Add Address</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="user-info">
        {isLoading &&
          [1, 2, 3, 4, 5].map((value: any) => (
            <div className="px-3 py-3" key={value}>
              <LoadingSckeleton
                baseColor="#AAAAAA"
                highlightColor="#FFFFFF"
                count={1}
                height="30px"
                width="250px"
              />
              <LoadingSckeleton
                baseColor="#AAAAAA"
                highlightColor="#FFFFFF"
                count={1}
                height="20px"
                width="350px"
              />
              <LoadingSckeleton
                baseColor="#AAAAAA"
                highlightColor="#FFFFFF"
                count={1}
                height="20px"
                width="300px"
              />
              <LoadingSckeleton
                baseColor="#AAAAAA"
                highlightColor="#FFFFFF"
                count={1}
                height="20px"
                width="350px"
              />
            </div>
          ))}
        {!isLoading &&
          (!isAddress ? (
            <div className="relative">
              <div className="h-[700px] flex items-center justify-center">
                <div className="text-center">
                  <div className="relative w-[160px] h-[150px] m-auto">
                    <Image layout="fill" src="/img/2.png" alt="Avatar" />
                  </div>
                  <div className="mt-4">
                    <p>Please Add Your Address</p>
                    <p>
                      Our courier will get adjust to your Customers schedule. As a result everyone is pleased!
                    </p>
                  </div>
                  <div className="mt-4">
                    <Link href={"/account/add-address"}>
                      <a className="btn btn-primary">+ Add Address</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="container-fluid px-2 py-3 bg-[#F2F2F2]">
              <div className="row">
                <div className="flex flex-wrap justify-between">
                  {userAddress.map((record: any) => (
                    <div className="w-1/2 px-2 mb-3" key={record._id}>
                      <div className="bg-white shadow rounded-[6px]">
                        <div className="add p-[20px] border-b-2 border-[#E5E5E5]">
                          <p className="w-[176px] h-[42px] pt-[7px] text-[17px] text-[500] text-center bg-[#E40462]/[0.08] text-[#E40462] rounded-[100px]">
                            Shipping Address
                          </p>
                          <p className="text-left text-[20px] text-[500] pt-[20px]">
                            {record.first_name} {record.last_name}
                          </p>
                          <div className="pt-[10px]">
                            <span className="text-left text-[18px] text-[500] mr-2">
                              Address :
                            </span>
                            <span className="text-[#808089] text-[16px]">
                              {record.address_one}
                              {record.address_two}
                            </span>
                            <br />
                            <span className="text-[#808089] text-[16px]">
                              {record.city} -{record.pin_code},{record.state},
                              {record.country}
                            </span>
                          </div>
                          <div className="pt-[10px]">
                            <span className="text-left text-[18px] text-[500]">
                              Mobile Number :
                            </span>
                            <span className="text-[#808089] text-[16px]">
                              {record.mobile_number}
                            </span>
                          </div>
                        </div>
                        <div className="edit-remove">
                          <div className="flex flex-wrap py-2 pr-2 flex-reverse">
                            <div className="flex-1">
                              <p className="w-[120px] ml-2 py-2 text-[17px] text-[500] text-center bg-aeliya-blue/[0.08] text-aeliya-blue rounded-[100px]">
                                <i className="fa fa-check-circle mr-2"></i>
                                Default
                              </p>
                            </div>
                            {/* <div className="w-1/2 py-[10px] text-center"> */}
                            <Link href={`/account/user-address/` + record._id}>
                              <a className="text-[#ffffff] btn bg-aeliya-blue text-[16px] text-[500] mr-2">
                                <i className="fa fa-pencil mr-2"></i>
                                EDIT
                              </a>
                            </Link>
                            {/* </div> */}
                            {/* <div className="w-1/2 py-[10px] text-center"> */}
                            <button
                              onClick={() => deleteRecord(record._id)}
                              className="text-[16px] btn btn-danger text-[500]"
                            >
                              <i className="fa fa-trash mr-2"></i>
                              REMOVE
                            </button>
                            {/* </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* <div className="w-1/2 pl-3">
                            <div className='border-solid border-2 border-[#D7D7D7] rounded-[6px]'>
                                <div className="add p-[20px] border-b-2 border-[#E5E5E5]">
                                    <p
                                        className="w-[176px] h-[42px] pt-[7px] text-[17px] text-[500] text-center bg-[#00909E]/[0.08] text-[#00909E] rounded-[100px]">
                                        Billing Address</p>
                                    <p className="text-left text-[20px] text-[500] pt-[20px]">John Deo</p>
                                    <div className="pt-[10px]">
                                        <span className="text-left text-[18px] text-[500]">Address :</span>
                                        <span className="text-[#808089] text-[16px]">50 , Tiwari Chawl, Sv Rd,
                                            Dahisar,
                                            Mumbai, Maharashtra,400068</span>
                                    </div>
                                    <div className="pt-[10px]">
                                        <span className="text-left text-[18px] text-[500]">Mobile Number :
                                        </span>
                                        <span className="text-[#808089] text-[16px]">
                                            98630 12345</span>
                                    </div>
                                </div>
                                <div className="edit-remove">
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="flex flex-wrap">
                                                <div className="w-1/2 py-[10px] text-center">
                                                    <a href="#"
                                                        className="text-[#1E2A78] text-[16px] text-[500]">EDIT</a>
                                                </div>
                                                <div className="w-1/2 py-[10px] text-center">
                                                    <a href="#" className="text-[16px] text-[500]">REMOVE</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                </div>
              </div>
            </div>
          ))}
      </div>
    </AccountLayout>
  );
};

export default MyAddress;
