import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import CustomLoader from '../../../Admin/Components/CustomLoader';
import AdminLayout from '../../../Admin/Layout/AdminLayout';
import AlertModal from '../../../Components/Common/AlertModal';
import { getAPIUrl } from '../../../lib/useLocalStorage';

const ContentPage: NextPage = () => {
    const mainApiUrl = getAPIUrl() || process.env.API_URL;
    const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [totalRows, setTotalRows] = useState(0);
	const [perPage, setPerPage] = useState(10);
    const [selectedRows, setSelectedRows] = useState([]);
	const [toggleCleared, setToggleCleared] = useState(false);
    const [isAlert, setIsAlert] = useState(false);

	const fetchCategory = async (page: any) => {
		setLoading(true);
		const response = await fetch(`${mainApiUrl}content-page?page=${page}&per_page=${perPage}&delay=1`);
        const respoData = await response.json();
		setData(respoData);
		// setTotalRows(response.data.total);
		setLoading(false);
	};

	const handlePageChange = (page: any) => {
		fetchCategory(page);
	};

	const handlePerRowsChange = async (newPerPage: any, page: any) => {
		setLoading(true);
		const response = await fetch(`${mainApiUrl}content-page?page=${page}&per_page=${newPerPage}&delay=1`);
        const respoData = await response.json();
		setData(respoData);
		// setData(response.data.data);
		setPerPage(newPerPage);
		setLoading(false);
	};

	useEffect(() => {
		fetchCategory(0); // fetch page 1 of users		
	}, []);

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
    const columns = [
        {
            name: 'Page Name',
            selector: (row: any) => row.title,
        },
        {
            name: 'Page Photo',
            // selector: (row: any) => row.avatar,
            cell: (tableProps: any) => (
                <img
                  src={`/images/`+tableProps.image}
                  width={60}
                  alt='Avatar'
                />
            )
        },
        {
            name: 'Actions',
            // selector: (row: any) => row.avatar,
            cell: (tableProps: any) => (
                <>
                    <Link href={'/e-auction-admin/content-pages/edit/'+tableProps._id}>
                        <a key="edit" className="btn">
                            <i className="fa text-primary fa-edit"></i>
                            
                        </a>
                    </Link>
                    <a key="delete" onClick={handleDeleteEvent} className="btn">
                        <i className="fa text-danger fa-trash"></i>
                    </a>
                    <Link href={'/e-auction-admin/content-pages/view/'+tableProps._id}>
                        <a key="view" className="btn">
                            <i className="fa text-dark fa-eye"></i>
                        </a>
                    </Link>
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

   const headerProps = {pageTitle: process.env.COMPANY_NAME! + ' | Content Management Page',pageDescription: process.env.COMPANY_NAME! + ' - Content Management Page'};
   return (
       <>
           <Head>
               <title>{headerProps.pageTitle}</title>
               <meta name='description' content={headerProps.pageDescription} />
           </Head>
           <AdminLayout>
                { isAlert && <AlertModal closeModal={closeModal} isConfirm={true} confirmEvent={confirmEvent} /> }
                    <div className='p-6 pt-0'>
                        <div className="row">
                            <div className="col-md-8">
                            <h2 className='border-b mb-2 p-3 text-xl font-semibold'>Content Page List</h2>
                            </div>
                            <div className="col-md-4 mt-3 text-right">
                                <Link href={'/e-auction-admin/content-pages/add'}>
                                    <a key="delete" className="btn btn-primary">
                                        <i className="fa fa-plus mr-2"></i>
                                        Add New
                                    </a>
                                </Link>
                            </div>
                        </div>
                        <div className="table-custom-css">
                            <DataTable
                                title="Content Page"
                                columns={columns}
                                data={data}
                                selectableRows
                                progressPending={loading}
                                progressComponent={<CustomLoader />}
                                pagination
                                paginationServer
                                paginationTotalRows={totalRows}
                                onChangeRowsPerPage={handlePerRowsChange}
                                onChangePage={handlePageChange}
                                contextActions={contextActions}
                                // onSelectedRowsChange={handleRowSelected}
                                clearSelectedRows={toggleCleared}
                                striped={true}
                            />
                        </div>
                    </div>
           </AdminLayout>
       </>
   );
}

export default ContentPage;