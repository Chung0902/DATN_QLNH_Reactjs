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
  const [orders, setOrders] = useState([]);
  const [selected,setSelected] = useState(null)
  const [ustatus,setUStatus] = useState();
  const [udiscount,setUDiscount] = useState();
  const [uquantity,setUQuantity] = useState();
  const [orderDetailsId,setOrderDetailsId] = useState();
  const [tableId,setTableId] = useState();
  const [customerId,setCustomerId] = useState();
  const [showNewRow, setShowNewRow] = useState(false);
  const [newRows, setNewRows] = useState([]);

const handleAddNewItem = () => {
  setShowNewRow(true);
  setNewRows(prevRows => [
    ...prevRows,
    {
      productName: "",
      quantity: "",
      productPrice: "",
      productDiscount: "",
      totalOrderDetailPrice: ""
    }
  ]);
};

const handleNewRowChange = (e, index, field) => {
  const { value } = e.target;
  setNewRows((prevRows) => {
    const updatedRows = [...prevRows];
    updatedRows[index] = { ...updatedRows[index], [field]: value };
    return updatedRows;
  });
};

const handleDeleteNewRow = (index) => {
  setNewRows((prevRows) => {
    const updatedRows = [...prevRows];
    updatedRows.splice(index, 1);
    return updatedRows;
  });
};





  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        const response = await axiosClient.get(`questions/listorders1?id=${id}`);
        setOrderDetails(response.payload);
      } catch (error) {
        console.error(error);
      }
    };
    getOrderDetails();
  }, [id]);

  const getAllOrders = async () => {
    try {
      const response = await axiosClient.get('questions/listorders1');
      setOrderDetails(response.payload);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() =>{
    getAllOrders();
  },[]);

  //update orders
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
    
      const response = await axiosClient.patch(
        `admin/orders/${selected._id}`,
        {
          status: ustatus,
          discount: udiscount,
          quantity: uquantity,
          orderDetailsId: orderDetailsId,
          tableId: tableId,
          customerId: customerId
        }
      );
      if (response.success) {
        toast.success(" is updated");
        setSelected(null);
        setUStatus("");
        setUDiscount("");
        setUQuantity("");
        setOrderDetailsId("");
        setTableId("");
        setCustomerId("");
        setOrders(
          orders.map((order) => {
            if (order._id === selected._id) {
              return {
                ...order,
                status: ustatus,
                discount: udiscount,
                quantity: uquantity,
                orderDetailsId: orderDetailsId,
                tableId: tableId,
                customerId: customerId,
              };
            }
            return order;
          })
        );
        getAllOrders();
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong");
    }
  };

  

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
                          onChange={(e) => setTableId(e.target.value)}
                        />
                      </div>

                      <div>
                        <label>Khách hàng</label>
                        <input
                          className="form-control"
                          type="text"
                          required
                          value={`${e.order.customer.firstName}${e.order.customer.lastName}`}
                          onChange={(e) => setCustomerId(e.target.value)}
                        />
                      </div>
                      <div>
                        <span>Ngày đặt: {formatDate(e.order.createdDate)}</span>
                        <button type="button" title="Thêm món ăn" onClick={handleAddNewItem}>
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
                          {e.orderDetails.map((orderDetail, index) => (
                            <tr key={index}>
                              <td>
                                <input
                                  className="form-control"
                                  type="text"
                                  required
                                  value={orderDetail.productName}
                                  onChange={(e) => setOrderDetailsId(e.target.value)}
                                />
                              </td>
                              <td>
                                <input
                                  className="form-control"
                                  type="number"
                                  required
                                  value={orderDetail.quantity}
                                  onChange={(e) => setUQuantity(e.target.value)}
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
                                  onChange={(e) => setUDiscount(e.target.value)}
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
                          {showNewRow && newRows.map((row, index) => (
  <tr key={index}>
    <td>
      <input
        className="form-control"
        type="text"
        required
        value={row.productName}
        onChange={(e) => handleNewRowChange(e, index, 'productName')}
      />
    </td>
    <td>
      <input
        className="form-control"
        type="number"
        required
        value={row.quantity}
        onChange={(e) => handleNewRowChange(e, index, 'quantity')}
      />
    </td>
    <td>
      <input
        className="form-control"
        type="number"
        required
        value={row.productPrice}
        readOnly
      />
    </td>
    <td>
      <input
        className="form-control"
        type="number"
        required
        value={row.productDiscount}
        onChange={(e) => handleNewRowChange(e, index, 'productDiscount')}
      />
    </td>
    <td>
      <input
        className="form-control"
        type="text"
        required
        value={row.totalOrderDetailPrice}
        readOnly
      />
    </td>
    <td>
      <button type="button" title="Xóa món ăn" onClick={() => handleDeleteNewRow(index)}>
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
                          onChange={(e) => setUDiscount(e.target.value)}
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
                          onChange={(e) => setUStatus(e.target.value)}
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
                <button className="btn btn-save" type="submit" onClick={handleUpdate}>
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
