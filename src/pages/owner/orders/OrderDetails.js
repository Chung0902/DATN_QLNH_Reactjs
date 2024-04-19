import React, { useEffect, useState } from "react";
import axiosClient from "../../../libraries/axiosClient";
import { useNavigate, useParams } from "react-router-dom";
import "./OrderDetails.css";
import { FaPlusSquare } from "react-icons/fa";
import { toast } from "react-hot-toast";

const OrderDetails = () => {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState([]);
  const { id } = useParams(); // Lấy id từ đường dẫn
  const [status, setStatus] = useState("");


  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        const response = await axiosClient.get(`questions/listorders1?id=${id}`);
        setOrderDetails(response.payload); // Cập nhật thông tin đơn hàng vào state
      } catch (error) {
        console.error(error);
      }
    };
  
    getOrderDetails(); // Gọi hàm để lấy thông tin đơn hàng khi component mount
  }, [id]); // Mảng phụ thuộc đã được sửa

  

  // Hàm biến đổi định dạng ngày
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
          <li
            className="breadcrumb-item"
            onClick={() => navigate("/main/ordermanagement")}
          >
            Danh sách đơn hàng
          </li>
          <li className="breadcrumb-item">
            <a href="#">Chi tiết đơn hàng</a>
          </li>
        </ul>
        <div id="clock"></div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <div className="tile-body">
              <div className="tile-body">
                <div className="col-sm-2"></div>
      
                {orderDetails && orderDetails
                  .filter((order) => order.order._id === id)
                  .map((e) => (
                  <div key={e.order._id} className="invoice-container" >
                    <div className="invoice-header ">
                      <div>
                        <label>Bàn</label>
                        <input
                          className="form-control"
                          type="text"
                          required
                          value={e.order.table}
                        />
                      </div>

                      <div>
                        <label>Khách hàng</label>
                        <input
                          className="form-control"
                          type="text"
                          required
                          value={`${e.order.customer.firstName}${e.order.customer.lastName}`}
                        />
                      </div>
                      <div>
                        <span>Ngày đặt: {formatDate(e.order.createdDate)}</span>
                        <button type="button" title="Thêm món ăn">
                          <FaPlusSquare />
                        </button>
                      </div>
                    </div>
                    <div className="invoice-body">
                      <table>
                        <thead>
                          <tr>
                            <th>Món ăn</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                            <th>Giảm giá</th>
                            <th>Tổng tiền</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {e.orderDetails.map((orderDetail) => (
                            <tr key={orderDetail.productId}>
                              <td>
                                <input
                                  className="form-control"
                                  type="text"
                                  required
                                  value={orderDetail.productName}
                                />
                              </td>
                              <td>
                                <input
                                  className="form-control"
                                  type="number"
                                  required
                                  value={orderDetail.quantity}
                                />
                              </td>
                              <td>
                                <input
                                  className="form-control"
                                  type="number"
                                  required
                                  value={orderDetail.productPrice}
                                />
                              </td>
                              <td>
                                <input
                                  className="form-control"
                                  type="number"
                                  required
                                  value={orderDetail.productDiscount}
                                />
                              </td>
                              <td>
                                <input
                                  className="form-control"
                                  type="text"
                                  required
                                  value={orderDetail.totalOrderDetailPrice}
                                />
                              </td>
                              <td>
                                <button type="button" title="Xóa món ăn">
                                  X
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="invoice-totals">
                      <div>
                        <label>Tạm tính</label>
                        <input
                          // className="form-control"
                          type="text"
                          required
                          value={e.totalOrder}
                        />
                      </div>
                      <div>
                        <label>Chiết khấu</label>
                        <input
                          // className="form-control"
                          type="text"
                          required
                          value={e.order.discount}
                        />
                      </div>
                      
                      <div>
                        <label>Thành tiền</label>
                        <input
                          // className="form-control"
                          type="text"
                          required
                          value={e.totalamountdiscount}
                        />
                      </div>
                      <div>
                        <label>Trạng thái</label>
                        <select
                          // className="form-control"
                          value={e.order.status}
                        >
                          <option value="COMPLETED">COMPLETED</option>
                          <option value="WAITING">WAITING</option>
                          <option value="CANCELED">CANCELED</option>
                          <option value="DELIVERING">DELIVERING</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="btn btn-save" type="submit" >
                  Lưu lại
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate("/main/ordermanagement")}
                >
                  Trở về
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderDetails;
