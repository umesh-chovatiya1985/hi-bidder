import { NextPage } from "next";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import CustomLoader from "../../../../Admin/Components/CustomLoader";
import AdminLayout from "../../../../Admin/Layout/AdminLayout";
import { getAPIUrl } from "../../../../lib/useLocalStorage";

const AddHelpCategory: NextPage = () => {
  const mainApiUrl = getAPIUrl() || process.env.API_URL;
  const [apiError, setApiError] = useState(null);
  const [file, setFile] = useState("/img/logo.png");
  const [sourceFile, setSourceFile] = useState(null);
  const [categories, setCategories] = useState(null);

  async function handleFileChange(e: any) {
    setSourceFile(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  const [isLoading, setIsLoading] = useState(false);
  const [formControls, setFormControls] = useState({
    help_category: "",
    topic_id: "",
    image: "",
    description: "",
    isActive: "",
  });
  const inputHandler = (e: any) => {
    setFormControls({ ...formControls, [e.target.name]: e.target.value });
  };
  const uploadImage = async () => {
    const formData = new FormData();
    const fileName = Date.now().toString() + "_" + sourceFile.name;
    formData.append("file_url", sourceFile, fileName);
    setFormControls({ ...formControls, image: fileName });
    formData.append("table", "help-category");
    formData.append("data", JSON.stringify(formControls));
    const imageResponse = await fetch(mainApiUrl + "uploader/image-uploader", {
      method: "POST",
      body: formData,
      headers: { Accept: "*/*" },
    });
    return await imageResponse.json();
  };
  const submitEventHandler = async (e: any) => {
    e.preventDefault();
    if (!sourceFile) {
      toast.error("Please, Select photo for help category.", {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "dark",
      });
      return;
    }
    setIsLoading(true);
    await uploadImage()
      .then((data: any) => {
        if (data.error) {
          toast.error(data.error._message, {
            position: "top-right",
            autoClose: 5000,
            closeOnClick: true,
            theme: "dark",
          });
          return;
        }
        setFormControls({
          help_category: "",
          topic_id: "",
          image: "",
          description: "",
          isActive: "",
        });
        setSourceFile(null);
        setFile("/img/logo.png");
        toast.success(data.message, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          theme: "dark",
        });
      })
      .catch((error: any) => {
        console.log(error);
        toast.error(error.errors.message, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          theme: "dark",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const fetchCategories = async () => {
    const categoryData = await fetch(mainApiUrl + "helps/help-topic");
    const categoryJson = await categoryData.json();
    if (categoryData.ok) {
      setCategories(categoryJson.records);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  const headerProps = {
    pageTitle: process.env.COMPANY_NAME! + " | Help Category",
    pageDescription: process.env.COMPANY_NAME! + " - Help Category",
  };
  return (
    <>
      <AdminLayout>
        <ToastContainer />
        <div className="p-4">
          <div className="bg-no-repeat">
            <div>
              <div className="flex h-full">
                <div className="sm:full w-6/12 lg:w-4/12 xl:w-4/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                    {isLoading && <CustomLoader />}
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                      <div className="py-3 text-blue-800 text-center mb-3 font-bold">
                        <p className="text-xl capitalize">Add Help Category</p>
                      </div>
                      {apiError && (
                        <>
                          <div className="alert alert-danger pt-2 pb-2">
                            <i className="fa fa-info-circle mr-3"></i>
                            {apiError}
                          </div>
                        </>
                      )}
                      <form>
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blue-800 text-xs font-bold mb-2"
                            htmlFor="topic_id"
                          >
                            Help Topic
                          </label>
                          {categories && (
                            <>
                              <select
                                onChange={inputHandler}
                                name="topic_id"
                                id="topic_id"
                                className="border-1 px-3 py-3 placeholder-blue-300 text-blue-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              >
                                <optgroup label="Help Topic"></optgroup>
                                {categories.map((category: any) => (
                                  <option
                                    key={category._id}
                                    value={category._id}
                                  >
                                    {category.topic_name}
                                  </option>
                                ))}
                              </select>
                            </>
                          )}
                        </div>
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blue-800 text-xs font-bold mb-2"
                            htmlFor="help_category"
                          >
                            Help Category
                          </label>
                          <input
                            type="text"
                            name="help_category"
                            className="border-1 px-3 py-3 placeholder-blue-300 text-blue-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Help category"
                            id="help_category"
                            onChange={inputHandler}
                            value={formControls.help_category}
                          />
                        </div>
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blue-800 text-xs font-bold mb-2"
                            htmlFor="file_input"
                          >
                            Help Category Photo
                          </label>
                          <input
                            onChange={handleFileChange}
                            className="block w-full border-1 border-sky-800 px-3 py-2 placeholder-blue-300 text-blue-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            aria-describedby="file_input_help"
                            id="file_input"
                            type="file"
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p
                                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                                id="file_input_help"
                              >
                                SVG, PNG, JPG or GIF (MAX. 800x400px).
                              </p>
                            </div>
                            <div className="text-center p-2">
                              <img
                                src={file}
                                className="h-[80px] w-[80px] border-1 shadow"
                                alt="selected image"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blue-800 text-xs font-bold mb-2"
                            htmlFor="description"
                          >
                            Description
                          </label>
                          <textarea
                            name="description"
                            autoComplete="true"
                            className="border-1 px-3 py-3 placeholder-blue-300 text-blue-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Description"
                            id="description"
                            onChange={inputHandler}
                            value={formControls.description}
                          ></textarea>
                        </div>
                        <div>
                          is Active:
                          <div>
                            <input
                              type="checkbox"
                              id="isActive"
                              name="isActive"
                              onChange={inputHandler}
                              className="mr-3"
                            />
                            Active
                          </div>
                        </div>
                        <div className="text-center mt-6">
                          <button
                            disabled={isLoading}
                            onClick={submitEventHandler}
                            className="bg-blue-800 text-white active:bg-blue-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none disabled:bg-gray-400 mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="button"
                          >
                            Submit Now
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default AddHelpCategory;
