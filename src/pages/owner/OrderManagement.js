import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axiosClient from "../../libraries/axiosClient";
import { useAuth } from "../../context/auth";
import { NavLink } from "react-router-dom";

const OrderManagement = () => {
  const [listorders, setListorders] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [auth, setAuth] = useAuth();
  const [status, setStatus] = useState("");

  const handleItemCheck = (event, orderID) => {
    const isChecked = event.target.checked;
    setCheckedItems({
      ...checkedItems,
      [orderID]: isChecked,
    });
  };

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    const newCheckedItems = {};

    listorders.forEach((order) => {
      newCheckedItems[order._id] = isChecked;
    });

    setCheckedItems(newCheckedItems);
  };

  const handleDeleteSelected = async () => {
    const selectedIds = Object.keys(checkedItems).filter(
      (itemId) => checkedItems[itemId]
    );

    try {
      await axiosClient.post("admin/orders/delete", { selectedIds });
      setCheckedItems({});
      setListorders(
        listorders.filter((order) => !selectedIds.includes(order.order._id))
      );
      toast.success("Đã xóa món ăn");
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra khi xóa món ăn");
    }
  };

  const updateCancel = async (orderId, employeeId, paymentType, customerId) => {
    try {
      const response = await axiosClient.patch(`admin/orders/${orderId}`, {
        status: "CANCELED",
        employeeId,
        paymentType,
        customerId,
      });
      setListorders((prevList) =>
        prevList.map((order) => {
          if (order.order._id === orderId) {
            return {
              ...order,
              order: {
                ...order.order,
                status: "CANCELED",
                employeeId,
                paymentType,
                customerId,
              },
            };
          }
          return order;
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const updateComplete = async (
    orderId,
    employeeId,
    paymentType,
    customerId
  ) => {
    try {
      const response = await axiosClient.patch(`admin/orders/${orderId}`, {
        status: "COMPLETED",
        employeeId,
        paymentType,
        customerId,
      });
      setListorders((prevList) =>
        prevList.map((order) => {
          if (order.order._id === orderId) {
            return {
              ...order,
              order: {
                ...order.order,
                status: "COMPLETED",
                employeeId,
                paymentType,
                customerId,
              },
            };
          }
          return order;
        })
      );
    } catch (error) {
      console.error(error);
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
              <div className="tile-body">
                <table
                  className="table table-hover table-bordered"
                  id="sampleTable"
                >
                  <thead>
                    <tr>
                      <th>ID đơn hàng</th>
                      <th>Tên bàn ăn</th>
                      <th>Ngày tạo</th>
                      <th>SL món ăn</th>
                      <th>Tổng tiền</th>
                      {/* <th>PTTT</th> */}
                      <th>
                        <select
                          className="border-0 bg-secondary-subtle fw-semibold"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value="">Trạng thái</option>
                          <option value="COMPLETED">COMPLETED</option>
                          <option value="WAITING">WAITING</option>
                          <option value="CANCELED">CANCELED</option>
                          <option value="DELIVERING">DELIVERING</option>
                        </select>
                      </th>
                      <th>Tính năng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listorders &&
                      listorders
                        .filter(
                          (e) => status === "" || e.order.status === status
                        )
                        .map((e) => (
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
                                    {e.totalOrderPrice} đ
                                  </td>
                                )}
                                {e.orderDetails.indexOf(orderDetail) === 0 && (
                                  <td className="status_or">
                                    {e.order.status}
                                  </td>
                                )}
                                {e.orderDetails.indexOf(orderDetail) === 0 && (
                                  <td>
                                    <NavLink
                                      to="/main/ordermanagement/orderdetails"
                                    >
                                    <button className="btn btn-cancel">
                                      <i className="fas fa-edit icon"></i>
                                    </button>
                                    </NavLink>
        
                                    <button
                                      className="btn btn-cancel "
                                      type="button"
                                      title="Xóa"
                                      onClick={() =>
                                        updateCancel(
                                          e.order._id,
                                          auth.user._id,
                                          e.order.paymentType,
                                          e.order.customer._id
                                        )
                                      }
                                      disabled={
                                        e.order.status === "COMPLETED" ||
                                        e.order.status === "CANCELED"
                                      }
                                    >
                                      <i className="fa fa-trash-alt red-color"></i>
                                    </button>
                                  </td>
                                )}
                              </tr>
                            ))}
                          </React.Fragment>
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderManagement;
