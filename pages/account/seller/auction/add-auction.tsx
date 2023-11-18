import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomLoader from "../../../../Admin/Components/CustomLoader";
import DynaFormControl from "../../../../Components/Reusable/Forms/DynaFormControl";
import { getAPIUrl } from "../../../../lib/useLocalStorage";
import AccountLayout from "../../AccountLayout";

const AddAuction: NextPage = () => {
  const mainApiUrl = getAPIUrl() || process.env.API_URL;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<any>();
  const headerProps = {
    pageTitle: "Hi Bidder : Category details page",
    pageDescription: "hi Bidder Category details page",
  };
  const [categoryAttribute, setCategoryAttribute] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAttribute = async () => {
    const response = await fetch(
      `${mainApiUrl}category/attributes/63b2aafe61424f9a99adbf8f`
    );
    const respoData = await response.json();
    setCategoryAttribute(respoData.records);
    setIsLoading(false);
  };

  useEffect(() => {
    getAttribute();
  }, []);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <AccountLayout>
      <div className="bg-white container">
        <div className="max-w-[70%] md:max-w-full margin-auto">
          <div className="pt-[20px]">
            <form onSubmit={handleSubmit(onSubmit)}>
              {isLoading && (
                <div className="h-[400px] relative">
                  <CustomLoader classData="z-50 absolute rounded-lg grid top-0 bottom-0 left-0 right-0 text-center content-center"></CustomLoader>
                </div>
              )}
              {!isLoading && (
                <div>
                  <div className="grid grid-cols-2 gap-4">
                    {categoryAttribute.map((attribute: any) => (
                      <div key={attribute.label}>
                        <DynaFormControl
                          register={register}
                          errors={errors}
                          type={attribute.field_type}
                          formLabel={attribute.label}
                          Options={attribute.field_options}
                          validation={attribute.is_required}
                          formName={attribute.label
                            .toLowerCase()
                            .replace(/ /g, "_")}
                        ></DynaFormControl>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="button-s text-right mt-20">
                <button
                  type="submit"
                  className="cursor-pointer hover:bg-primary-color hover:text-white text-[#FFFFFF] bg-[#1E2A78] rounded-[6px] px-[46px] py-[10px] font-normal"
                >
                  Submit Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
};

export default AddAuction;
