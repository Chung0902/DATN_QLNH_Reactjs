import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axiosClient from "../../libraries/axiosClient";
import { useAuth } from "../../context/auth";
import { NavLink } from "react-router-dom";
import OrderDetails from "./orders/OrderDetails";

const OrderManagement = () => {
  const [listorders, setListorders] = useState([]);
  const [utable, setUTable] = useState();
  const [ufirstName, setUFirstName] = useState();
  const [ulastName, setULastName] = useState();
  const [ucreatedDate, setUCreatedDate] = useState();
  const [uproductName, setUProductName] = useState();
  const [uquantity, setUPuantity] = useState();
  const [uproductPrice, setUProductPrice] = useState();
  const [utotalOrderDetailPrice, setUTotalOrderDetailPrice] = useState();
  const [utotalamountdiscount, setUTotalamountdiscount] = useState();
  const [udiscount, setUDiscount] = useState();
  const [utotalOrderPrice, setUTotalOrderPrice] = useState();
  const [ustatus, setUStatus] = useState();
  const [status, setStatus] = useState("");

  const [selected, setSelected] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.patch(
        `questions/listorders1/${selected._id}`,
        {
          table: utable,
          firstName: ufirstName,
          lastName: ulastName,
          createdDate: ucreatedDate,
          productName: uproductName,
          quantity: uquantity,
          productPrice: uproductPrice,
          totalOrderDetailPrice: utotalOrderDetailPrice,
          totalamountdiscount: utotalamountdiscount,
          discount: udiscount,
          totalOrderPrice: utotalOrderPrice,
          status: ustatus,
        }
      );
      if (response.success) {
        toast.success(" is updated");
        setSelected(null);
        setUTable("");
        setUFirstName("");
        setUDiscount("");
        setULastName("");
        setUCreatedDate("");
        setUProductName("");
        setUPuantity("");
        setUProductPrice("");
        setUTotalOrderDetailPrice("");
        setUTotalamountdiscount("");
        setUTotalOrderPrice("");
        setUStatus("");
        setListorders(
          listorders.map((product) => {
            if (product._id === selected._id) {
              return {
                ...product,
                table: utable,
                firstName: ufirstName,
                lastName: ulastName,
                createdDate: ucreatedDate,
                productName: uproductName,
                quantity: uquantity,
                productPrice: uproductPrice,
                totalOrderDetailPrice: utotalOrderDetailPrice,
                totalamountdiscount: utotalamountdiscount,
                discount: udiscount,
                totalOrderPrice: utotalOrderPrice,
                status: ustatus,
              };
            }
            return product;
          })
        );
        getlistorders();
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (pId) =>{
    try {
        const response = await axiosClient.delete(`questions/listorders1/${pId}`);
        if(response?.success){
            toast.success(`orders is deleted`);
            setListorders(listorders.filter((listorder) => listorder._id !== pId)); 
        }
        
    } catch (error) {
        toast.error('Something went wrong')
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
                                    <button
                                      className="btn btn-primary btn-sm trash"
                                      type="button"
                                      title="Xóa"
                                      onClick={() => { handleDelete(e.order._id)}}
                                    >
                                      <i className="fas fa-trash-alt"></i>
                                    </button>

                                    <NavLink to={`/main/ordermanagement/orderdetails/${e.order._id}`} >
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderManagement;
