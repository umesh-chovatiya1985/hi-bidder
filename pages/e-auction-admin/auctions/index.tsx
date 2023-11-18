import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import CustomLoader from "../../../Admin/Components/CustomLoader";
import NoSsr from "../../../Admin/Components/NoSsr";
import AdminLayout from "../../../Admin/Layout/AdminLayout";
import AlertModal from "../../../Components/Common/AlertModal";
import { getAPIUrl } from "../../../lib/useLocalStorage";
import dateFormat from "dateformat";

const Auctions: NextPage = () => {

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
    try {
      const response = await fetch(
        `${mainApiUrl}auction?page=${page}&per_page=${perPage}&delay=1`
      );
      const respoData = await response.json();
      setData(respoData.products);
      setTotalRows(respoData.totalRecord);
    } catch (error: any) {
      console.log(error);
    }
    setLoading(false);
  };

  const handlePageChange = (page: any) => {
    fetchCategory(page);
  };

  const handlePerRowsChange = async (newPerPage: any, page: any) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${mainApiUrl}auction?page=${page}&per_page=${newPerPage}&delay=1`
      );
      const respoData = await response.json();
      setData(respoData.products);
      // setData(response.data.data);
      setPerPage(newPerPage);
    } catch (error: any) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategory(1); // fetch page 1 of users
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
  };
  const confirmEvent = () => {
    setIsAlert(!isAlert);
  };
  const columns = [
    {
      name: "Auction Title",
      selector: (row: any) => row.title
    },
    {
      name: "Seller Name",
      selector: (row: any) => row.seller_id?.company_name,
    },
    {
      name: "Category Name",
      selector: (row: any) => row.category_id.title,
    },
    {
      name: "Auction Photo",
      cell: (tableProps: any) => (
        <img src={tableProps.default_image} width={60} alt="Avatar" />
      ),
    },
    {
      name: "SKU",
      selector: (row: any) => row.sku
    },
    {
      name: "Condition",
      selector: (row: any) => row.condition
    },
    {
      name: "Modal No",
      selector: (row: any) => row.model_no
    },
    {
      name: "Status",
      selector: (row: any) => row.status
    },
    {
      name: "Created at",
      selector: (row: any) => dateFormat(row.createdAt, "dd-mm-yyyy hh:MM tt")
    },
    {
      name: "Actions",
      // selector: (row: any) => row.avatar,
      cell: (tableProps: any) => (
        <>
          <Link href={"/e-auction-admin/auctions/edit/" + tableProps._id}>
            <a key="edit" className="btn">
              <i className="fa text-primary fa-edit"></i>
            </a>
          </Link>
          <a key="delete" onClick={handleDeleteEvent} className="btn">
            <i className="fa text-danger fa-trash"></i>
          </a>
          <Link href={"/details/" + tableProps.slug} target="_blank">
            <a key="view" className="btn" target="_blank">
              <i className="fa text-dark fa-eye"></i>
            </a>
          </Link>
        </>
      ),
    },
  ];

  const contextActions = useMemo(() => {
    const handleDelete = () => {
      if (
        window.confirm(
          `Are you sure you want to delete:\r ${selectedRows.map(
            (r: any) => r.title
          )}?`
        )
      ) {
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

  const headerProps = {
    pageTitle: "Hi Bidder : Auction details page",
    pageDescription: "hi Bidder Auction details page",
  };
  return <AdminLayout>
    {isAlert && (
        <AlertModal
          closeModal={closeModal}
          isConfirm={true}
          confirmEvent={confirmEvent}
        />
    )}
    <div className="p-6 pt-0">
      <div className="row">
          <div className="col-md-8">
            <h2 className="border-b mb-2 p-3 text-xl font-semibold">
              Auction List
            </h2>
          </div>
      </div>      
      <NoSsr>
        <div className="table-custom-css">
              <DataTable
                title="All Auction"
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
        </NoSsr>
      </div>
  </AdminLayout>;
};

export default Auctions;
