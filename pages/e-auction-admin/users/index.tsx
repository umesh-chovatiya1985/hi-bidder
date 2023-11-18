import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import CustomLoader from "../../../Admin/Components/CustomLoader";
import AdminLayout from "../../../Admin/Layout/AdminLayout";
import AlertModal from "../../../Components/Common/AlertModal";
import { getAPIUrl } from "../../../lib/useLocalStorage";

const UserList: NextPage = () => {
  const mainApiUrl = getAPIUrl() || process.env.API_URL;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [isAlert, setIsAlert] = useState(false);

  const fetchUsers = async (page: any) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${mainApiUrl}user?page=${page}&per_page=${perPage}&delay=1`
      );
      const respoData = await response.json();
      setData(respoData.records);
      // setTotalRows(response.data.total);
    } catch (error: any) {
      console.log(error);
    }
    setLoading(false);
  };

  const handlePageChange = (page: any) => {
    fetchUsers(page);
  };

  const handlePerRowsChange = async (newPerPage: any, page: any) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${mainApiUrl}user?page=${page}&per_page=${newPerPage}&delay=1`
      );
      const respoData = await response.json();
      setData(respoData.records);
      // setData(response.data.data);
      setPerPage(newPerPage);
    } catch (error: any) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(0); // fetch page 1 of users
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
    console.log("I am accepted");
    setIsAlert(!isAlert);
  };
  const columns = [
    {
      name: "Name",
      selector: (row: any) => row.name,
    },
    {
      name: "Contact No",
      cell: (tableProps: any) =>
        tableProps.contact ? (
          <>
            <span className="mr-2">
              {tableProps.is_contact_verified ? (
                <i className="fa fa-check-circle text-xl text-[#008000]"></i>
              ) : (
                <i className="fa fa-times-circle text-xl text-[#d34545]"></i>
              )}
            </span>
            <span>{tableProps.contact}</span>
          </>
        ) : (
          <>
            <span className="mr-2">
              <i className="fa fa-times-circle text-xl text-[#d34545]"></i>
            </span>
            <span>No Contact No</span>
          </>
        ),
    },
    {
      name: "Email Id",
      selector: (row: any) => row.email,
      cell: (tableProps: any) => (
        <>
          <span className="mr-2">
            {tableProps.emailVerified ? (
              <i className="fa fa-check-circle text-xl text-[#008000]"></i>
            ) : (
              <i className="fa fa-times-circle text-xl text-[#d34545]"></i>
            )}
          </span>
          <span>{tableProps.email}</span>
        </>
      ),
    },
    {
      name: "Status",
      selector: (row: any) => row.email,
      cell: (tableProps: any) => (
        <>
          <span>
            {tableProps.isActive ? (
              <i className="fa fa-check-circle text-2xl text-[#008000]"></i>
            ) : (
              <i className="fa fa-times-circle text-2xl text-[#d34545]"></i>
            )}
          </span>
        </>
      ),
    },
    {
      name: "Register Date",
      selector: (row: any) => row.createdOn,
    },
    {
      name: "Actions",
      // selector: (row: any) => row.avatar,
      cell: (tableProps: any) => (
        <>
          <Link href={"/e-auction-admin/users/edit/" + tableProps._id}>
            <a key="edit" className="btn">
              <i className="fa text-primary fa-edit"></i>
            </a>
          </Link>
          <a key="delete" onClick={handleDeleteEvent} className="btn">
            <i className="fa text-danger fa-trash"></i>
          </a>
          <Link href={"/e-auction-admin/users/view/" + tableProps._id}>
            <a key="view" className="btn">
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
    pageTitle: "Hi Bidder : Category details page",
    pageDescription: "hi Bidder Category details page",
  };
  return (
    <AdminLayout>
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
              Admin User List
            </h2>
          </div>
          <div className="col-md-4 mt-3 text-right">
            <Link href={"/e-auction-admin/users/add"}>
              <a key="delete" className="btn btn-primary">
                <i className="fa fa-plus mr-2"></i>
                Add New
              </a>
            </Link>
          </div>
        </div>
        <div className="table-custom-css">
          <DataTable
            title="All Admin Users"
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
  );
};

export default UserList;
