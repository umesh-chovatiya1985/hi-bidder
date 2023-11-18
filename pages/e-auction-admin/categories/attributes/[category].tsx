import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AdminLayout from '../../../../Admin/Layout/AdminLayout';
import { useForm } from 'react-hook-form';
import FormControl from '../../../../Components/Reusable/FormControl';
import { toast, ToastContainer } from 'react-toastify';
import CustomLoader from '../../../../Admin/Components/CustomLoader';
import { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { getAPIUrl } from '../../../../lib/useLocalStorage';

interface formAttribute {
    category_id: String,
    label: String,
    field_type: String,
    field_options: String
}

const CategoryAttributes: NextPage = () => {
    const mainApiUrl = getAPIUrl() || process.env.API_URL;
    const router = useRouter();
    const { category } = router.query;
    const { register, setValue, handleSubmit, formState: { errors }, getValues, setError } = useForm<formAttribute>();
    const [apiError, setApiError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [primaryId, setPrimaryId] = useState(false);
    const attrForm = [
        {
            formName: "label",
            type: "text",
            formLabel: "Attribute Label *",
            validation: { required: "Attribute Label is required" }
        },
        {
            formName: "field_type",
            type: "text",
            formLabel: "Field Type *",
            validation: { required: "Field Type is required" }
        },
        {
            formName: "field_options",
            type: "text",
            formLabel: "Field Options",
            validation: { }
        }
    ];

    const onSubmit = async (data: formAttribute) => {
        setLoading(true);
        const field_type = getValues("field_type");
        if(field_type != 'text'){
            const field_options = getValues("field_options");
            if(field_options == ""){
                setError("field_options",  {
                    types: {
                      required: "Field Option is required!"
                    }
                });
                return;
            }
        }
        let Url = mainApiUrl+"category/attributes";
        let Method = "POST";
        if(primaryId){
            Url = mainApiUrl+"category/attributes/actions/"+primaryId;
            Method = "PUT";
        }
        const attrRespo = await fetch(Url, {
            method: Method,
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });
        const respoJson = await attrRespo.json();
        if(attrRespo.ok){
            console.log(respoJson);
            if(respoJson.status == '1'){
                toast.success(respoJson.message, {
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                    theme: "dark",
                });
                setValue("label","");
                setValue("field_type","text");
                setValue("field_options","");
                fetchCategory();
                setPrimaryId(null);
            }
        }
        setLoading(false);
    }

    const fetchCategory = async () => {
		// setLoading(true);
		const response = await fetch(`${mainApiUrl}category/attributes/${category}`);
        const respoData = await response.json();
		setData(respoData.records);
		// setTotalRows(response.data.total);
		// setLoading(false);
	};

    useEffect(() => {
        if(category){
            setValue("category_id", category.toString());
            fetchCategory();
        }
    }, []);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
	const [totalRows, setTotalRows] = useState(0);
	const [perPage, setPerPage] = useState(10);
    const [selectedRows, setSelectedRows] = useState([]);
	const [toggleCleared, setToggleCleared] = useState(false);
    const [isAlert, setIsAlert] = useState(false);

    const handleDeleteEvent = async () => {			
        // if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map((r: any) => r.title)}?`)) {
        //     setToggleCleared(!toggleCleared);
            // setData(differenceBy(data, selectedRows, 'title'));
        // }
        setIsAlert(!isAlert);
    };

    const closeModal = () => {
        setIsAlert(!isAlert);
    }
    const confirmEvent = () => {
        console.log("I am accepted");
        setIsAlert(!isAlert);
    }
    const clearForm = () => {
        setPrimaryId(null);
        setValue("label","");
        setValue("field_type","text");
        setValue("field_options","");
    }
    const openEditForm = async (tableProps: any) => {
        console.log(tableProps);
        setPrimaryId(tableProps._id);
        setValue("label",tableProps.label);
        setValue("field_type",tableProps.field_type);
        setValue("field_options",tableProps.field_options);
    }

    const columns = [
        {
            name: 'Attribute Label',
            selector: (row: any) => row.label,
        },
        {
            name: 'Attribute Field Type',
            selector: (row: any) => row.field_type,
        },
        {
            name: 'Attribute Field Values',
            selector: (row: any) => row.field_options
        },
        {
            name: 'Actions',
            // selector: (row: any) => row.avatar,
            cell: (tableProps: any) => (
                <>
                    <a key="edit" className="btn" onClick={() => openEditForm(tableProps)}>
                        <i className="fa text-primary fa-edit"></i>                            
                    </a>
                    <a key="delete" onClick={handleDeleteEvent} className="btn">
                        <i className="fa text-danger fa-trash"></i>
                    </a>
                </>
            )
        },
    ];

    const contextActions = useMemo(() => {
		const handleDelete = () => {			
			if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map((r: any) => r.title)}?`)) {
				setToggleCleared(!toggleCleared);
				// setData(differenceBy(data, selectedRows, 'title'));
			}
		};
		return (
			<button key="delete" onClick={handleDelete} className="btn btn-danger">
				<i className="fa fa-trash mr-2"></i>
                Delete
			</button>
		);
	}, [data, selectedRows, toggleCleared]);

   const headerProps = {pageTitle: process.env.COMPANY_NAME! + ' | Category Attributes',pageDescription: process.env.COMPANY_NAME! + ' - Category Attributes'};
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
                                <div className="sm:w-full md:w-full w-4/12 lg:w-4/12 xl:w-4/12 px-4">
                                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                                        {isLoading && <CustomLoader />}
                                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                        <div className="py-3 text-blue-800 text-center mb-3 font-bold">
                                            <p className='text-xl capitalize'>Manage Attributes</p>
                                        </div>
                                        {apiError && <>
                                            <div className="alert alert-danger pt-2 pb-2">
                                                <i className="fa fa-info-circle mr-3"></i>
                                                {apiError}
                                            </div>
                                        </>}
                                        <form method='post' onSubmit={handleSubmit(onSubmit)}>
                                            {/* {attrForm && attrForm.map((formData: any) => (
                                                <div key={formData.formName} className="mt-4 mb-4">
                                                    <FormControl register={register} errors={errors} formName={formData.formName} type={formData.type} formLabel={formData.formLabel} validation={formData.validation} ></FormControl>
                                                </div>
                                            ))} */}
                                            <div className="mt-4 mb-4">
                                                <FormControl register={register} errors={errors} formName={`label`} type={'text'} formLabel={'Attribute Label *'} validation={{ required: "Attribute Label is required" }}></FormControl>
                                            </div>
                                            <div className="mt-4 mb-4">
                                                <label htmlFor="field_type" className={`${errors.field_type ? 'text-[#990000]' : ''} font-semibold`}>Field Type *</label>
                                                <div className='relative'>
                                                    <select {...register("field_type")} defaultValue="text" name='field_type' id='field_type' className={`${errors.field_type ? 'border-[#990000] shadow-[#9900005c]' : 'border-gray-300'} shadow-md relative block w-full appearance-none rounded px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-color focus:outline-none focus:ring-primary-color sm:text-sm`} >
                                                        <option value={`text`} defaultValue="text">Textbox</option>
                                                        <option value={`textarea`}>Text Area</option>
                                                        <option value={`select`}>Dropdown</option>
                                                        <option value={`checkbox`}>Checkbox</option>
                                                        <option value={`radio`}>Radio</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="mt-4 mb-4">
                                                <FormControl register={register} errors={errors} formName={`field_options`} type={'text'} formLabel={'Field Options'} validation={{}}></FormControl>
                                            </div>
                                            <div className="mt-6 pt-4 text-center">
                                                <button className="bg-blue-800 text-white active:bg-blue-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none disabled:bg-gray-400 mr-1 mb-1 ease-linear transition-all duration-150">
                                                    {primaryId && <span>Update Now</span>}
                                                    {!primaryId && <span>Submit Now</span>}
                                                </button>
                                                <button type='button' onClick={clearForm} className="bg-red-800 text-white active:bg-blue-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none disabled:bg-gray-400 mr-1 mb-1 ease-linear transition-all duration-150">
                                                    Clear Now
                                                </button>
                                            </div>
                                        </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="sm:w-full md:w-full w-8/12 lg:w-8/12 xl:w-8/12 px-4">
                                    <div className="table-custom-css">
                                        <DataTable
                                            title="Attribute of Category"
                                            columns={columns}
                                            data={data}
                                            selectableRows
                                            progressPending={loading}
                                            progressComponent={<CustomLoader />}
                                            // pagination
                                            // paginationServer
                                            // paginationTotalRows={totalRows}
                                            contextActions={contextActions}
                                            // onSelectedRowsChange={handleRowSelected}
                                            clearSelectedRows={toggleCleared}
                                            striped={true}
                                        />
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

export default CategoryAttributes;