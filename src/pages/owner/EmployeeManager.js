import React, { useState } from "react";
import "../../../src/styles/main.css";
import { NavLink } from "react-router-dom";
import UpdateEmployee from "./employees/UpdateEmployee";
import axiosClient from "../../libraries/axiosClient";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/auth";

const EmployeeManager = () => {
  const [employees, setEmployees] = useState([]);
  const [role, setRole] = useState();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updateFirstName, setUpdateFirstName] = useState();
  const [updateLastName, setUpdateLastName] = useState();
  const [updatePhoneNumber, setUpdatePhoneNumber] = useState();
  const [updateEmail, setUpdateEmail] = useState();
  const [updateAddress, setUpdateAddress] = useState();
  const [auth, setAuth] = useAuth();
  const [checkedItems, setCheckedItems] = useState({});
  const [searchFirstName, setSearchFirstName] = useState("");
  const [searchLastName, setSearchLastName] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const employeesPerPage = 10;

  const pageCount = Math.ceil(employees.length / employeesPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const [firstName, ...lastName] = inputValue.split(" ");
    setSearchFirstName(firstName || "");
    setSearchLastName(lastName.join(" ") || "");
  };
  //search
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.get(
        `questions/employeeSearch?firstName=${searchFirstName}&lastName=${searchLastName}`
      );
      console.log(response.payload);
      if (response?.payload) setEmployees(response?.payload); // Cập nhật state products với kết quả tìm kiếm
    } catch (error) {
      console.log(error);
    }
  };
  //xử lý chọn vào checkbox lấy id
  const handleItemCheck = (event, employeeId) => {
    const isChecked = event.target.checked;
    setCheckedItems({
      ...checkedItems,
      [employeeId]: isChecked,
    });
  };

  // xử lý nhấn chọn tất cả checkbox
  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    const newCheckedItems = {};

    employees.forEach((product) => {
      newCheckedItems[product._id] = isChecked;
    });

    setCheckedItems(newCheckedItems);
  };
  //click nút ẩn sẽ ẩn đi
  const handleDeleteSelected = async () => {
    const selectedIds = Object.keys(checkedItems).filter(
      (itemId) => checkedItems[itemId]
    );

    try {
      //await axiosClient.post(`admin/products/${selectedIds.join(',')}/delete`);
      await axiosClient.post("admin/employees/delete", { selectedIds });
      setCheckedItems({});
      setEmployees(
        employees.filter((employee) => !selectedIds.includes(employee._id))
      );
      toast.success("Đã xóa món ăn");
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra khi xóa món ăn");
    }
  };

  const handleRoleChange = (event) => {
    const selectedRole = event.target.value;
    let roleCode;

    if (selectedRole === "Bán hàng") {
      roleCode = 0;
    } else if (selectedRole === "Shipper") {
      roleCode = 2;
    } else if (selectedRole === "Chủ shop") {
      roleCode = 1;
    }

    setRole(roleCode);
  };

  const getAllEmployees = async () => {
    try {
      const response = await axiosClient.get("admin/employees");
      setEmployees(response.payload);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const authToken = `Bearer ${auth.token}`; // Replace with your actual authentication token

      const config = {
        headers: {
          Authorization: authToken,
        },
      };

      const response = await axiosClient.patch(
        `admin/employees/${selected._id}`,
        {
          firstName: updateFirstName,
          lastName: updateLastName,
          phoneNumber: updatePhoneNumber,
          email: updateEmail,
          address: updateAddress,
          role: role,
        },
        config
      );
      if (response.success) {
        toast.success(" is updated");
        setSelected(null);
        setUpdateFirstName("");
        setUpdateLastName("");
        setUpdateEmail("");
        setUpdateAddress("");
        setUpdatePhoneNumber("");
        setRole("");
        setEmployees(
          employees.map((employee) => {
            if (employee._id === selected._id) {
              return {
                ...employee,
                firstName: updateFirstName,
                lastName: updateLastName,
                phoneNumber: updatePhoneNumber,
                email: updateEmail,
                address: updateAddress,
                role: role,
              }; // Cập nhật tên của danh mục tương ứng
            }
            return employee;
          })
        );
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong");
    }
  };
  //Delete
  const handleDelete = async (pId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa nhân viên này không?")) {
      try {
        const authToken = `Bearer ${auth.token}`;
        const config = {
          headers: {
            Authorization: authToken,
          },
        };

        const response = await axiosClient.delete(
          `admin/employees/${pId}`,
          config
        );
        if (response?.success) {
          toast.success("Nhân viên đã được xóa");
          setEmployees(employees.filter((employee) => employee._id !== pId));
        }
      } catch (error) {
        toast.error("Đã xảy ra lỗi khi xóa nhân viên");
      }
    }
  };

  // Hàm biến đổi định dạng ngày sinh
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(0);
    return `${day}/${month}/${year}`;
  };
  return (
    <main className="app-content">
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb side">
          <li className="breadcrumb-item active">
            <a href="#">
              <b>Danh sách nhân viên</b>
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
                    to="/main/employeemanager/addemployee"
                    className="active1"
                  >
                    <a
                      className="btn btn-add btn-sm"
                      href="form-add-san-pham.html"
                      title="Thêm"
                    >
                      <i className="fas fa-plus"></i>
                      Tạo mới nhân viên
                    </a>
                  </NavLink>
                </div>
                <div className="col-sm-2">
                  <a
                    className="btn btn-delete btn-sm"
                    onClick={handleDeleteSelected}
                  >
                    <i className="fas fa-trash-alt"></i> Xóa tất cả{" "}
                  </a>
                </div>
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
                      value={searchFirstName + " " + searchLastName}
                      onChange={handleInputChange}
                    />
                    <button className="btn btn-info" type="submit">
                      Search
                    </button>
                  </form>
                </div>
              </div>
              <table
                className="table table-hover table-bordered js-copytextarea"
                cellPadding="0"
                cellSpacing="0"
                border="0"
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
                    <th>ID nhân viên</th>
                    <th width="150">Họ và tên</th>
                    <th width="300">Địa chỉ</th>
                    <th>Ngày sinh</th>
                    <th>Giới tính</th>
                    <th>SĐT</th>
                    <th>Chức vụ</th>
                    <th width="100">Tính năng</th>
                  </tr>
                </thead>
                <tbody>
                  {employees &&
                    employees
                      .slice(
                        pageNumber * employeesPerPage,
                        pageNumber * employeesPerPage + employeesPerPage
                      )
                      .map((e) =>
                        e.role !== 1 ? (
                          <tr key={e._id}>
                            <td width="10">
                              <input
                                type="checkbox"
                                checked={checkedItems[e._id] || false}
                                onChange={(event) =>
                                  handleItemCheck(event, e._id)
                                }
                              />
                            </td>
                            <td>{e._id}</td>
                            <td>
                              {e.firstName} {e.lastName}
                            </td>
                            <td>{e.address}</td>
                            <td>{formatDate(e.birthday)}</td>
                            <td>{e.sex}</td>
                            <td>{e.phoneNumber}</td>
                            <td>{e.role === 0 ? "Bán hàng" : "Giao hàng"}</td>
                            <td className="table-td-center">
                              <button
                                className="btn btn-primary btn-sm trash"
                                type="button"
                                title="Xóa"
                                onClick={() => handleDelete(e._id)}
                              >
                                <i className="fas fa-trash-alt"></i>
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary btn-sm edit"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                data-bs-whatever="@mdo"
                                onClick={() => {
                                  setVisible(true);
                                  setSelected(e);
                                  setUpdateFirstName(e.firstName);
                                  setUpdateLastName(e.lastName);
                                  setUpdatePhoneNumber(e.phoneNumber);
                                  setUpdateEmail(e.email);
                                  setUpdateAddress(e.address);
                                  setRole(e.role);
                                }}
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <UpdateEmployee
                                handleSubmit={handleUpdate}
                                firstName={updateFirstName}
                                lastName={updateLastName}
                                phoneNumber={updatePhoneNumber}
                                email={updateEmail}
                                address={updateAddress}
                                setEmail={setUpdateEmail}
                                setLastName={setUpdateLastName}
                                setPhoneNumber={setUpdatePhoneNumber}
                                setFirstName={setUpdateFirstName}
                                setAddress={setUpdateAddress}
                                handleRoleChange={handleRoleChange}
                              />
                            </td>
                          </tr>
                        ) : (
                          ""
                        )
                      )}
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

export default EmployeeManager;
