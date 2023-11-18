import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import CustomLoader from '../../../../Admin/Components/CustomLoader';
import AdminLayout from '../../../../Admin/Layout/AdminLayout';
import { getAPIUrl } from '../../../../lib/useLocalStorage';

const EditCategory: NextPage = () => {
    const mainApiUrl = getAPIUrl() || process.env.API_URL;
    const router = useRouter();
    const { _id } = router.query;
    console.log(_id);
    const [apiError, setApiError] = useState(null);
    const [file, setFile] = useState('/img/logo.png');
    const [fileName, setFileName] = useState(null);
    const [sourceFile, setSourceFile] = useState(null);
    const [categories, setCategories] = useState(null);

    async function handleFileChange(e: any) {
        setSourceFile(e.target.files[0]);
        setFile(URL.createObjectURL(e.target.files[0]));
        const fileUName = Date.now().toString() + "_" + e.target.files[0].name;
        setFileName(fileUName);
        setFormControls({...formControls, "image": fileUName});
    }
    const [isLoading, setIsLoading] = useState(false);
    const [formControls, setFormControls] = useState({
      "_id": "",
      "title":"", 
      "parent_id":"",
      "image": "",
      "description": "",
      "color": ""
    });
    const inputHandler = (e: any) => {
        setFormControls({...formControls, [e.target.name]: e.target.value});
    }
    const uploadImage = async () => {
        const formData = new FormData();        
        formData.append('file_url', sourceFile, fileName);        
        if(formControls.parent_id == ''){
            delete formControls.parent_id;
        }
        formData.append('table', "category");
        formData.append('data', JSON.stringify(formControls));
        const imageResponse = await fetch(mainApiUrl+'uploader/image-uploader', {
            method: 'POST',
            body: formData,
            headers: { "Accept": "*/*" }
        });
        return await imageResponse.json();
    }
    const submitEventHandler = async(e: any) => {
        e.preventDefault();
        if(!sourceFile){
            delete formControls._id;
            if(formControls.parent_id == ''){
                delete formControls.parent_id;
            }
            const fetchRespo = await fetch(mainApiUrl+'category/'+_id, {
                method: 'PUT',
                body: JSON.stringify(formControls),
                headers: { "Content-Type": "application/json" }
            });
            const response = await fetchRespo.json();
            if(fetchRespo.ok){
                if(response.status == 1){
                    toast.success(response.message, {
                        position: "top-right",
                        autoClose: 5000,
                        closeOnClick: true,
                        theme: "dark",
                    });
                    setTimeout(() => {
                        router.back();
                    }, 5000);
                }
            }
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
            setSourceFile(null);
            setFile('/img/logo.png');
            toast.success(data.message, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                theme: "dark",
            });
            router.back();
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
    const getEditRecord = async () => {
        const editRecord = await fetch(mainApiUrl+"category/"+_id);
        const response = await editRecord.json();
        if(editRecord.ok){
            setFormControls({
                "_id": response._id,
                "title": response.title, 
                "parent_id": response.parent_id,
                "image": response.image,
                "description": response.description,
                "color": response.color
            });
            setFile("/images/"+response.image);
        }
    }
    const fetchCategories = async () => {
        const categoryData = await fetch(mainApiUrl+"category/categories");
        const categoryJson = await categoryData.json();
        if(categoryData.ok){
            console.log(categoryJson);
            setCategories(categoryJson.record);
        }
    }
    useEffect(() => {
        fetchCategories();
        if(_id){
            getEditRecord();
        }
    }, [_id]);
    const headerProps = {pageTitle: process.env.COMPANY_NAME! + ' | Edit Category',pageDescription: process.env.COMPANY_NAME! + ' - Edit Category'};
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
                            <div className="sm:full w-6/12 lg:w-4/12 xl:w-4/12 px-4">
                            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                                {isLoading && <CustomLoader />}
                                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <div className="py-3 text-blue-800 text-center mb-3 font-bold">
                                    <p className='text-xl capitalize'>Edit Category</p>
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
                                            htmlFor="parent">
                                            Parent Category
                                        </label>
                                        {categories && <>
                                            <select onChange={inputHandler} name='parent_id' id='parent' className="border-1 px-3 py-3 placeholder-blue-300 text-blue-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                                <option value="">Main Category</option>
                                                <optgroup label='Added Main Categories'></optgroup>
                                                {categories.map((category: any) => (
                                                    <option key={category._id} value={category._id} defaultValue={formControls.parent_id}>{category.title}</option>
                                                ))}
                                            </select>
                                        </>}
                                    </div>
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blue-800 text-xs font-bold mb-2"
                                            htmlFor="title">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            name='title'
                                            className="border-1 px-3 py-3 placeholder-blue-300 text-blue-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Category Title" 
                                            id='title'
                                            onChange={inputHandler}
                                            value={formControls.title}
                                            />
                                    </div>
                                    <div className="relative w-full mb-3">
                                    <label className="block uppercase text-blue-800 text-xs font-bold mb-2"
                                        htmlFor="file_input">
                                        Category Photo
                                    </label>
                                        <input onClick={(e: any) => (e.target.value = null)} onChange={handleFileChange} className="block w-full border-1 border-sky-800 px-3 py-2 placeholder-blue-300 text-blue-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" aria-describedby="file_input_help" id="file_input" type="file" />
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
                                    <textarea
                                        name='description'
                                        autoComplete='true'
                                        className="border-1 px-3 py-3 placeholder-blue-300 text-blue-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Description"
                                        id='description'
                                        onChange={inputHandler}
                                        value={formControls.description}
                                    ></textarea>
                                    </div>
                                    <div className="relative w-full mb-3">
                                    <label className="block uppercase text-blue-800 text-xs font-bold mb-2"
                                        htmlFor="color">
                                        Background Color
                                    </label>
                                    <input
                                        type="color"
                                        name='color'
                                        className="border-1 h-[40px] px-3 py-2 placeholder-blue-300 text-blue-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Category Background Color" 
                                        id='color'
                                        onChange={inputHandler}
                                        value={formControls.color}
                                        />
                                    </div>
                                    <div className="text-center mt-6">
                                    <button
                                        disabled={isLoading}
                                        onClick={submitEventHandler}
                                        className="bg-blue-800 text-white active:bg-blue-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none disabled:bg-gray-400 mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                        type="button" >
                                        Update Now
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

export default EditCategory;