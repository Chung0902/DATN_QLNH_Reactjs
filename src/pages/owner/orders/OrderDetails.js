import React, { useEffect, useState } from "react";
import axiosClient from "../../../libraries/axiosClient";
import { useNavigate } from "react-router-dom";
import "./OrderDetails.css";

const OrderDetails = () => {
  const [listorders, setListorders] = useState([]);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const getlistorders = async () => {
    try {
      const response = await axiosClient.get(
        `questions/listorders?status=${status}`
      );
      setListorders(response.payload);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getlistorders();
  }, [status]);

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
                <div className="invoice-container">
                  <div className="invoice-header">
                    <div>
                      <label>Bàn</label>
                      <select>
                        <option value="table1">Bàn 1</option>
                        <option value="table2">Bàn 2</option>
                        <option value="table3">Bàn 3</option>
                      </select>
                    </div>
                    <div>
                      <label>Khách hàng</label>
                      <select>
                        <option value="customer1">Apricot Hotel</option>
                      </select>
                    </div>
                    <div>
                      <span>Ngày tạo: 2020-03-04</span>
                      <span>Giờ tạo: 11:16 pm</span>
                    </div>
                  </div>
                  <div className="invoice-body">
                    <table>
                      <thead>
                        <tr>
                          <th>Sản phẩm</th>
                          <th>Số lượng</th>
                          <th>Giá</th>
                          <th>Tổng tiền</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Xôi dừa hạt sen</td>
                          <td>
                            <input type="number" value="2" />
                          </td>
                          <td>
                            <input type="text" value="250000" />
                          </td>
                          <td>500000.00</td>
                          <td>
                            <button>X</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="invoice-totals">
                    <div>
                      <label>Tạm tính</label>
                      <input type="text" value="1580000.00" readOnly />
                    </div>
                    <div>
                      <label>VAT 13%</label>
                      <input type="text" value="205400.00" readOnly />
                    </div>
                    <div>
                      <label>Giảm giá</label>
                      <input type="text" value="20" />
                    </div>
                    <div>
                      <label>Thực trả</label>
                      <input type="text" value="1785380.00" readOnly />
                    </div>
                    <div>
                      <label>Trạng thái</label>
                      <select>
                        <option value="paid">Đã thanh toán</option>
                        <option value="unpaid">Chưa thanh toán</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderDetails;
