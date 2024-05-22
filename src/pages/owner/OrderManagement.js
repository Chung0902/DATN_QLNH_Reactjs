import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axiosClient from "../../libraries/axiosClient";
import { NavLink } from "react-router-dom";
import "././orders/OrderManagement.css"

const OrderManagement = () => {
  const [listorders, setListorders] = useState([]);
  const [status, setStatus] = useState("");
 
  const [pageNumber, setPageNumber] = useState(0);
  const ordersPerPage = 10; // Số lượng đơn hàng mỗi trang

  const handleDelete = async (pId) => {
    try {
      const response = await axiosClient.delete(`questions/listorders1/${pId}`);
      if (response?.success) {
        toast.success(`orders is deleted`);
        setListorders(listorders.filter((listorder) => listorder._id !== pId));
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const getlistorders = async () => {
    try {
      const response = await axiosClient.get(
        `questions/listorders1?status=${status}`
      );
      setListorders(response.payload);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getlistorders();
  }, [status]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(0);
    return `${day}/${month}/${year}`;
  };

  const pageCount = Math.ceil(listorders.length / ordersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  

  return (
    <main className="app-content">
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb side">
          <li className="breadcrumb-item active">
            <a href="#">
              <b>Danh sách đơn hàng</b>
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
                    to="/main/ordermanagement/addorders"
                    className="active1"
                  >
                    <a
                      className="btn btn-add btn-sm"
                      href="form-add-san-pham.html"
                      title="Thêm"
                    >
                      <i className="fas fa-plus"></i>
                      Tạo mới đơn hàng
                    </a>
                  </NavLink>
                </div>
              </div>
              <div className="tile-body">
                <table
                  className="table table-hover table-bordered"
                  id="sampleTable"
                >
                  {/* Table headers */}
                  <thead>
                    <tr>
                      <th>ID đơn hàng</th>
                      <th>Tên bàn ăn</th>
                      <th>Ngày tạo</th>
                      <th>SL món ăn</th>
                      <th>Tổng tiền</th>
                      <th>
                        Trạng thái
                      </th>
                      <th>Tính năng</th>
                    </tr>
                  </thead>
                  {/* Table body */}
                  <tbody>
                    {(listorders.length > 0
                      ? listorders.slice(
                          pageNumber * ordersPerPage,
                          pageNumber * ordersPerPage + ordersPerPage
                        )
                      : []
                    ).map((e) => (
                      <React.Fragment key={e.order._id}>
                        {/* Hiển thị thông tin khách hàng cho mỗi đơn hàng */}
                        <tr>
                          <td rowSpan={e.orderDetails.length + 1}>
                            {e.order._id}
                          </td>
                          <td rowSpan={e.orderDetails.length + 1}>
                            {e.order.table}
                          </td>
                          <td rowSpan={e.orderDetails.length + 1}>
                            {formatDate(e.order.createdDate)}
                          </td>
                        </tr>
                        {/* Hiển thị thông tin sản phẩm cho mỗi đơn hàng */}
                        {e.orderDetails.map((orderDetail) => (
                          <tr key={orderDetail.productId}>
                            {e.orderDetails.indexOf(orderDetail) === 0 && (
                              <td>{e.totalProductQuantity}</td>
                            )}
                            {e.orderDetails.indexOf(orderDetail) === 0 && (
                              <td className="totalor">
                                {e.totalamountdiscount} đ
                              </td>
                            )}
                            {e.orderDetails.indexOf(orderDetail) === 0 && (
                              <td className="status_or">{e.order.status}</td>
                            )}
                            {e.orderDetails.indexOf(orderDetail) === 0 && (
                              <td>
                                <button
                                  className="btn btn-primary btn-sm trash"
                                  type="button"
                                  title="Xóa"
                                  onClick={() => {
                                    handleDelete(e.order._id);
                                  }}
                                >
                                  <i className="fas fa-trash-alt"></i>
                                </button>

                                <NavLink
                                  to={`/main/ordermanagement/orderdetails/${e.order._id}`}
                                >
                                  <button
                                    className="btn btn-primary btn-sm edit"
                                    title="Xem chi tiết"
                                  >
                                    <i className="fas fa-edit icon"></i>
                                  </button>
                                </NavLink>
                              </td>
                            )}
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
                {/* Pagination */}
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
      </div>
    </main>
  );
};

export default OrderManagement;
