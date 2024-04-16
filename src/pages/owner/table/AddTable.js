import React, { useState } from "react";
import axiosClient from "../../../libraries/axiosClient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AddTable = () => {
  const [tables, setTables] = useState([]);
  const [name, setName] = useState("");
  const [numberOfSeats, setNumberOfSeats] = useState("");
  const [setup, setSetup] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post("admin/tables", {
        name,
        numberOfSeats,
        setup,
        status,
      });
      console.log(response.data);
      if (response?.payload) {
        toast.success(response.message);
        console.log(response.message);
        setTables([...tables, response.payload]);
        navigate("/main/tablesmanager");
      }
    } catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi khi tạo bàn");
    }
  };

  return (
    <main className="app-content">
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb">
          <li
            className="breadcrumb-item"
            onClick={() => navigate("/main/tablesmanager")}
          >
            Danh sách bàn
          </li>
          <li className="breadcrumb-item">
            <a href="#">Thêm bàn</a>
          </li>
        </ul>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <h3 className="tile-title">Tạo mới bàn</h3>
            <div className="tile-body">
              <div className="row element-button"></div>
              <form className="row" onSubmit={handleSubmit}>
                <div className="form-group col-md-3">
                  <label className="control-label">Tên bàn</label>
                  <input
                    className="form-control"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group  col-md-3">
                  <label className="control-label">Số lượng chỗ</label>
                  <input
                    className="form-control"
                    type="number"
                    required
                    value={numberOfSeats}
                    onChange={(e) => setNumberOfSeats(e.target.value)}
                  />
                </div>

                <div className="form-group col-md-3">
                  <label className="control-label">Setup</label>
                  <div className="input-group">
                    <select
                      className="custom-select form-control"
                      value={setup}
                      onChange={(e) => setSetup(e.target.value)}
                    >
                      <option value="">Chọn</option>
                      <option value="Có sẵn">Có sẵn</option>
                      <option value="Không có sẵn">Không có sẵn</option>
                    </select>
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="fas fa-caret-down"></i>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="form-group col-md-3">
                  <label className="control-label">Trạng thái</label>
                  <div className="input-group">
                    <select
                      className="custom-select form-control"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="">Chọn</option>
                      <option value="Đang trống">Đang trống</option>
                      <option value="Đã đặt">Đã đặt</option>
                    </select>
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="fas fa-caret-down"></i>
                      </span>
                    </div>
                  </div>
                </div>

                <button className="btn btn-info" type="submit">
                  Lưu lại
                </button>
                <a
                  className="btn btn-danger"
                  onClick={() => navigate("/main/tablesmanager")}
                >
                  Trở về
                </a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddTable;
