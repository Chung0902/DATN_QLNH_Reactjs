import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axiosClient from "../../libraries/axiosClient";
import { toast } from "react-hot-toast";
import UpdateTable from "./table/UpdateTable";

const TablesManager = () => {
  const [tables, setTables] = useState([]);
  const [uname, setUName] = useState();
  const [unumberOfSeats, setUNumberOfSeats] = useState();
  const [usetup, setUSetup] = useState();
  const [ustatus, setUStatus] = useState();
  const [uphoto, setUPhoto] = useState();
  const [selected, setSelected] = useState(null);

  const [checkedItems, setCheckedItems] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const tablesPerPage = 10;

  const pageCount = Math.ceil(tables.length / tablesPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  //search
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.get(
        `questions/productSearchb?name=${searchTerm}`
      );
      console.log(response.payload);
      if (response?.payload) setTables(response?.payload);
    } catch (error) {
      console.log(error);
    }
  };

  //xử lý chọn vào checkbox lấy id
  const handleItemCheck = (event, tableId) => {
    const isChecked = event.target.checked;
    setCheckedItems({
      ...checkedItems,
      [tableId]: isChecked,
    });
  };

  // xử lý nhấn chọn tất cả checkbox
  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    const newCheckedItems = {};

    tables.forEach((table) => {
      newCheckedItems[table._id] = isChecked;
    });

    setCheckedItems(newCheckedItems);
  };
  //click nút ẩn sẽ ẩn đi
  const handleDeleteSelected = async () => {
    const selectedIds = Object.keys(checkedItems).filter(
      (itemId) => checkedItems[itemId]
    );

    try {
      await axiosClient.post("admin/tables/delete", { selectedIds });
      setCheckedItems({});
      setTables(tables.filter((table) => !selectedIds.includes(table._id)));
      toast.success("Đã xóa bàn");
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra khi xóa bàn");
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.patch(`admin/tables/${selected._id}`, {
        name: uname,
        numberOfSeats: unumberOfSeats,
        setup: usetup,
        status: ustatus,
        photo: uphoto,
      });
      if (response.success) {
        toast.success(" is updated");
        setSelected(null);
        setUName("");
        setUNumberOfSeats("");
        setUSetup("");
        setUStatus("");
        setUPhoto("");
        setTables(
          tables.map((table) => {
            if (table._id === selected._id) {
              return {
                ...table,
                name: uname,
                numberOfSeats: unumberOfSeats,
                setup: usetup,
                status: ustatus,
                photo: uphoto,
              };
            }
            return table;
          })
        );
        getAllTables();
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong");
    }
  };

  //Delete tables
  const handleDelete = async (pId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bàn này không?")) {
      try {
        const response = await axiosClient.delete(`admin/tables/${pId}`);
        if (response?.success) {
          toast.success(`Bàn đã được xóa`);
          setTables(tables.filter((table) => table._id !== pId));
        }
      } catch (error) {
        toast.error("Đã xảy ra lỗi khi xóa bàn");
      }
    }
  };

  const getAllTables = async () => {
    try {
      const response = await axiosClient.get("admin/tables");
      setTables(response.payload);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllTables();
  }, [tables]);

  return (
    <main className="app-content">
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb side">
          <li className="breadcrumb-item active">
            <a href="#">
              <b>Danh sách bàn</b>
            </a>
          </li>
        </ul>
        <div id="clock"></div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <div className="tile-body">
              <div className="row element-button">
                <div className="col-sm-2">
                  <NavLink
                    to="/main/tablesmanager/addtables"
                    className="active1"
                  >
                    <a
                      className="btn btn-add btn-sm"
                      href="form-add-san-pham.html"
                      title="Thêm"
                    >
                      <i className="fas fa-plus"></i>
                      Tạo mới bàn
                    </a>
                  </NavLink>
                </div>
                {/* <div className="col-sm-2">
                  <a
                    className="btn btn-delete btn-sm"
                    type="button"
                    title="Xóa"
                    onClick={handleDeleteSelected}
                  >
                    <i className="fas fa-trash-alt"></i> Xóa tất cả{" "}
                  </a>
                </div> */}
                <div className="col-sm-7">
                  <form
                    className="d-flex "
                    role="search"
                    onSubmit={handleSearch}
                  >
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="btn btn-info" type="submit">
                      Search
                    </button>
                  </form>
                </div>
              </div>
              <table
                className="table table-hover table-bordered"
                id="sampleTable"
              >
                <thead>
                  <tr>
                    <th width="10">
                      <input
                        type="checkbox"
                        id="all"
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th>Mã bàn</th>
                    <th>Tên bàn</th>
                    <th>Ảnh</th>
                    <th>Số lượng chỗ</th>
                    <th>Setup</th>
                    <th>Tình trạng</th>
                    <th>Chức năng</th>
                  </tr>
                </thead>
                <tbody>
                  {tables &&
                    tables
                      .slice(
                        pageNumber * tablesPerPage,
                        pageNumber * tablesPerPage + tablesPerPage
                      )
                      .map((p) => (
                        <tr key={p._id}>
                          <td width="10">
                            <input
                              type="checkbox"
                              checked={checkedItems[p._id] || false}
                              onChange={(e) => handleItemCheck(e, p._id)}
                            />
                          </td>
                          <td>{p._id}</td>
                          <td>{p.name}</td>
                          <td>
                            <img
                              src={p.photo}
                              alt=""
                              width="100px;"
                              height={"100px"}
                            />
                          </td>
                          <td>{p.numberOfSeats}</td>
                          <td>
                            <span
                              className={`badge ${
                                p.setup === "Có sẵn"
                                  ? "bg-success"
                                  : "bg-warning"
                              }`}
                            >
                              {p.setup}
                            </span>
                          </td>

                          <td>
                            <span
                              className={`badge ${
                                p.status === "Đang trống"
                                  ? "bg-success"
                                  : "bg-warning"
                              }`}
                            >
                              {p.status}
                            </span>
                          </td>

                          <td>
                            <button
                              className="btn btn-primary btn-sm trash"
                              type="button"
                              title="Xóa"
                              onClick={() => handleDelete(p._id)}
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                            <button
                              className="btn btn-primary btn-sm edit"
                              type="button"
                              title="Sửa"
                              id="show-emp"
                              data-bs-toggle="modal"
                              data-bs-target="#ModalUP"
                              onClick={() => {
                                setSelected(p);
                                setUName(p.name);
                                setUPhoto(p.photo);
                                setUNumberOfSeats(p.numberOfSeats);
                                setUSetup(p.setup);
                                setUStatus(p.status);
                              }}
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <UpdateTable
                              handleSubmit={handleUpdate}
                              name={uname}
                              photo={uphoto}
                              numberOfSeats={unumberOfSeats}
                              setup={usetup}
                              status={ustatus}
                              setName={setUName}
                              setPhoto={setUPhoto}
                              setNumberOfSeats={setUNumberOfSeats}
                              setSetup={setUSetup}
                              setStatus={setUStatus}
                            />
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
              <div className="pagination">
                <button
                  onClick={() => setPageNumber(0)}
                  disabled={pageNumber === 0}
                >
                  Previous
                </button>
                {Array.from({ length: pageCount }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setPageNumber(index)}
                    className={pageNumber === index ? "active" : ""}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPageNumber(pageCount - 1)}
                  disabled={pageNumber === pageCount - 1}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TablesManager;
