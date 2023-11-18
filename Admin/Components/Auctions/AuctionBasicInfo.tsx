import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
const ReactQuill = dynamic(import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css';
import { toast, ToastContainer } from "react-toastify";
import DynaFormControl from "../../../Components/Reusable/Forms/DynaFormControl";
import { getAPIUrl, getLocalStorage, removeLocalStorage, setLocalStorage } from "../../../lib/useLocalStorage";

interface productInfo {
  title: string,
  sku: string,
  condition: string,
  brand: string,
  model_no: string,
  description: string,
  long_description: string
}

export default function AuctionBasicInfo({ clickEvent }: any) {
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<productInfo>();
  const mainApiUrl = getAPIUrl() || process.env.API_URL;
  const [mainCategory, setMainCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [auctionId, setAuctionId] = useState(null);

  const onSubmit = async (data: any) => {
    data.category_id = mainCategory;
    data.sub_category = subCategory;
    if (auctionId) {
      data._id = auctionId;
    }
    const jsonRespo = await fetch(mainApiUrl + "auction", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });
    try {
      const jsonData = await jsonRespo.json();
      if (jsonRespo.ok) {
        if (jsonData.status == '1') {
          toast.success(jsonData.message, {
            position: "top-right",
            autoClose: 5000,
            closeOnClick: true,
            theme: "dark",
          });
          setLocalStorage('auction_id', jsonData.auction);
          clickEvent(3);
        }
        // else {
        //   removeLocalStorage('auction_id');
        //   setAuctionId(null);
        // }
      }
      else {
        toast.error("Some error found. Try after sometime.", {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          theme: "dark",
        });
      }
    }
    catch (errors) {
      toast.error(errors.message, {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "dark",
      });
    };
  };

  useEffect(() => {
    register("long_description", { required: true, minLength: 50 });
  }, [register]);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'align': [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'color': [] }, { 'background': [] }],
      ['clean']
    ],
  };

  const onEditorStateChange = (editorState: any) => {
    setValue("long_description", editorState);
  };

  const editorContent = watch("long_description");
  const conditionOptions = "Brand New,Used,Open Package,Close Package";

  const getAuctionBasic = async (auctionId: any) => {
    const jsonRespo = await fetch(mainApiUrl + "auction/" + auctionId);
    const auctionData = await jsonRespo.json();
    if (jsonRespo.ok) {
      if (auctionData.status == '1') {
        setValue("long_description", auctionData.record.long_description);
        setValue("title", auctionData.record.title);
        setValue("sku", auctionData.record.sku);
        setValue("condition", auctionData.record.condition);
        setValue("brand", auctionData.record.brand);
        setValue("model_no", auctionData.record.model_no);
        setValue("description", auctionData.record.description);
      }
    }
  }

  useEffect(() => {
    if (getLocalStorage('main_category')) {
      const main_category = getLocalStorage('main_category');
      setMainCategory(main_category);
    }
    if (getLocalStorage('sub_category')) {
      const sub_category = JSON.parse(getLocalStorage('sub_category'));
      setSubCategory(sub_category);
    }
    if (getLocalStorage('auction_id')) {
      const auction_id = getLocalStorage('auction_id');
      if (auction_id && auction_id !== 'null' && auction_id !== 'undefined') {
        setAuctionId(auction_id);
        getAuctionBasic(auction_id);
      }
    }
  }, [])

  return (
    <div className="row">
      <ToastContainer />
      <div className="col-md-8 col-12">
        <h1 className="text-2xl font-semibold border-b-2 pb-3">
          Product Details
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-12 my-3">
              <DynaFormControl
                register={register}
                errors={errors}
                type="text"
                formName="title"
                formLabel="Title"
                validation={{ required: "Title is required field." }}
              ></DynaFormControl>
            </div>
            <div className="col-6 my-3">
              <DynaFormControl
                register={register}
                errors={errors}
                type="text"
                formName="sku"
                formLabel="SKU"
                validation={{ required: "SKU is required field." }}
              ></DynaFormControl>
            </div>
            <div className="col-6 my-3">
              <DynaFormControl
                register={register}
                errors={errors}
                type="select"
                formName="condition"
                formLabel="Condition"
                Options={conditionOptions}
                validation={{ required: "Condition is required field." }}
              ></DynaFormControl>
            </div>
            <div className="col-6 my-3">
              <DynaFormControl
                register={register}
                errors={errors}
                type="text"
                formName="brand"
                formLabel="Brand"
              ></DynaFormControl>
            </div>
            <div className="col-6 my-3">
              <DynaFormControl
                register={register}
                errors={errors}
                type="text"
                formName="model_no"
                formLabel="Model No"
              ></DynaFormControl>
            </div>
            <div className="col-12 my-3">
              <DynaFormControl
                register={register}
                errors={errors}
                type="textarea"
                formName="description"
                formLabel="Short Description"
                validation={{ required: "Description is required field" }}
              ></DynaFormControl>
            </div>
            <div className="col-12 my-3 relative">
              <label className="font-semibold">Full Description *</label>
              <ReactQuill className={`h-[500px] pb-[50px] border-2 shadow-md block w-full rounded ${errors.long_description
                ? "border-[#990000] shadow-[#9900005c]"
                : "border-gray-300"}`}
                modules={modules}
                value={editorContent}
                placeholder="Write down the details of your object."
                onChange={onEditorStateChange} />
              <span
                className="absolute top-8 right-6 text-2xl"
                id={`long_description-error-title`}
              >
                {errors.long_description && (
                  <p className="text-[#990000]" role="alert">
                    <i className="fa fa-info-circle"></i>
                  </p>
                )}
              </span>
            </div>
          </div>
          <div className="button-s text-right mt-10">
            <a className="cursor-pointer text-[#1E2A78] pr-[30px] font-semibold">
              Cancel
            </a>
            <button
              type="submit"
              className="cursor-pointer hover:bg-primary-color hover:text-white text-[#FFFFFF] bg-[#1E2A78] rounded-[6px] px-[46px] py-[10px] font-normal"
            >
              Save Daft & Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
