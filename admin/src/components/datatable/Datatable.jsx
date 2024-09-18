import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch.js"
import axios from "axios";



const Datatable = ({columns}) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState();
  const {data, loading, error} = useFetch(`https://mern-booking-web.onrender.com/api/${path}`)
  
  //const {data, loading, error} = useFetch("http://localhost:8800/api/users")
  //set lai du lieu moi khi co thay doi
  useEffect(()=>{
    setList(data)
  }, [data]);

  //them withCredentials: true (tranh loi khong xac thuc duoc nguoi dung cua axios)
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://mern-booking-web.onrender.com/api/${path}/${id}`,{withCredentials: true})
      setList(list.filter((item) => item._id !== id));
    } catch(err){
      console.log(err);
    }
  };



  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New 
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row)=>row._id}
      />
    </div>
  );
};

export default Datatable;
