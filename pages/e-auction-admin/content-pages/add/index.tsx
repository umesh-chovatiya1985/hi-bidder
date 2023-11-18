import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useState } from 'react';
const ReactQuill = dynamic(import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css';
import { toast, ToastContainer } from 'react-toastify';
import CustomLoader from '../../../../Admin/Components/CustomLoader';
import AdminLayout from '../../../../Admin/Layout/AdminLayout';
import { getAPIUrl } from '../../../../lib/useLocalStorage';

const AddCmsPage: NextPage = () => {
    const mainApiUrl = getAPIUrl() || process.env.API_URL;
    const [apiError, setApiError] = useState(null);
    const [file, setFile] = useState('/img/logo.png');
    const [sourceFile, setSourceFile] = useState(null);
    async function handleFileChange(e: any) {
        setSourceFile(e.target.files[0]);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    const [isLoading, setIsLoading] = useState(false);
    const [formControls, setFormControls] = useState({
      "title":"", 
      "image": "",
      "description": "",
      "meta_title": "",
      "meta_description": "",
      "meta_image": ""
    });
    const inputHandler = (e: any) => {
        setFormControls({...formControls, [e.target.name]: e.target.value});
    }
    const quillHandler = (e: any) => {
        setFormControls({...formControls, description: e});
    }
    const uploadImage = async () => {
        const formData = new FormData();
        const fileName = Date.now().toString() + "_" + sourceFile.name;
        formData.append('file_url', sourceFile, fileName);
        setFormControls({...formControls, "image": fileName});
        formData.append('table', "contentpage");
        formData.append('data', JSON.stringify(formControls));
        const imageResponse = await fetch(mainApiUrl+'uploader/image-uploader', {
            method: 'POST',
            body: formData,
            headers: { "Accept": "*/*" }
        });
        return await imageResponse.json();
    }
    const submitEventHandler = async (e: any) => {
        e.preventDefault();
        if(!sourceFile){
            toast.error("Please, Select photo for Content Page.", {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                theme: "dark",
            });
            return;
        }
        setIsLoading(true);
        await uploadImage().then((data: any) => {
            if(data.error){
                toast.error(data.error._message, {
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                    theme: "dark",
                });
                return;
            }
            toast.success(data.message, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                theme: "dark",
            });
        }).catch((error: any) => {
            console.log(error);
            toast.error(error.errors.message, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                theme: "dark",
            });
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const modules = {
        toolbar: [
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'align': [] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          [{ 'color': [] }, { 'background': [] }],
          ['clean']
        ],
    };

   const headerProps = {pageTitle: process.env.COMPANY_NAME! + ' | Add Content Page',pageDescription: process.env.COMPANY_NAME! + ' - Add Content Page'};
   return (
       <>
           <Head>
               <title>{headerProps.pageTitle}</title>
               <meta name='description' content={headerProps.pageDescription} />
           </Head>
           <AdminLayout>
           <ToastContainer />
                <div className='p-4'>
                    <div className='bg-no-repeat'>
                        <div>
                        <div className="flex h-full">
                            <div className="w-full px-4">
                            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                                {isLoading && <CustomLoader />}
                                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <div className="py-3 text-blue-800 text-center mb-3 font-bold">
                                    <p className='text-xl capitalize'>Add Content Page</p>
                                </div>
                                {apiError && <>
                                    <div className="alert alert-danger pt-2 pb-2">
                                        <i className="fa fa-info-circle mr-3"></i>
                                        {apiError}
                                    </div>
                                </>}
                                <form>
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blue-800 text-xs font-bold mb-2"
                                            htmlFor="title">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            name='title'
                                            className="border-1 px-3 py-3 placeholder-blue-300 text-blue-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Content Page Title" 
                                            id='title'
                                            onChange={inputHandler}
                                            value={formControls.title}
                                            />
                                    </div>
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blue-800 text-xs font-bold mb-2"
                                            htmlFor="file_input">
                                            Page Image
                                        </label>
                                        <input onChange={handleFileChange} className="block w-full border-1 border-sky-800 px-3 py-2 placeholder-blue-300 text-blue-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" aria-describedby="file_input_help" id="file_input" type="file" />
                                        <div className="grid grid-cols-2 gap-4">
                                            <div><p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p></div>
                                            <div className='text-center p-2'>
                                                <img src={file} className='h-[80px] w-[80px] border-1 shadow' alt='selected image' />
                                            </div>
                                        </div>    
                                    </div>
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blue-800 text-xs font-bold mb-2"
                                            htmlFor="description" >
                                            Description
                                        </label>
                                        <ReactQuill className='h-[500px] pb-[50px] rounded border-1 border-sky-800' 
                                            modules={modules}
                                            theme="snow" 
                                            value={formControls.description} 
                                            onChange={quillHandler} />
                                    </div>
                                    <div className="relative w-full mb-3">
                                    <label className="block uppercase text-blue-800 text-xs font-bold mb-2"
                                            htmlFor="meta-title">
                                            Meta Title
                                        </label>
                                        <input
                                            type="text"
                                            name='meta_title'
                                            className="border-1 px-3 py-3 placeholder-blue-300 text-blue-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Meta Title" 
                                            id='meta-title'
                                            onChange={inputHandler}
                                            value={formControls.meta_title}
                                        />
                                    </div>
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blue-800 text-xs font-bold mb-2"
                                            htmlFor="meta-description" >
                                            Meta Description
                                        </label>
                                        <textarea
                                            name='meta_description'
                                            autoComplete='true'
                                            className="border-1 px-3 py-3 placeholder-blue-300 text-blue-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Meta Description"
                                            id='meta-description'
                                            onChange={inputHandler}
                                            value={formControls.meta_description}
                                        ></textarea>
                                    </div>
                                    <div className="text-center mt-6">
                                        <button
                                            disabled={isLoading}
                                            onClick={submitEventHandler}
                                            className="bg-blue-800 text-white active:bg-blue-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none disabled:bg-gray-400 mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button" >
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
}

export default AddCmsPage;