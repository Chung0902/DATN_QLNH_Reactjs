import React, { useState } from "react";
import axiosClient from "../../../libraries/axiosClient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AddTable = () => {
  const [tables, setTables] = useState([]);
  const [name, setName] = useState();
  const [numberOfSeats, setNumberOfSeats] = useState();
  const [setup, setSetup] = useState();
  const [status, setStatus] = useState();
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
      if (response?.payload) {
        toast.success(response.message);
        console.log(response.message);
        setTables([...tables, response.payload]);
        navigate("/main/tablesmanager");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
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
                      className="form-control"
                      id="exampleSelect4"
                      required
                      onChange={(e) => {
                        setSetup(e.target.value);
                      }}
                    >
                      <option>-- Chọn --</option>
                      <option>Có sẵn</option>
                      <option>Không có sẵn</option>
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
                      className="form-control"
                      id="exampleSelect5"
                      required
                      onChange={(e) => {
                        setStatus(e.target.value);
                      }}
                    >
                      <option>-- Chọn --</option>
                      <option>Đang trống</option>
                      <option>Đã đặt</option>
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
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => navigate("/main/tablesmanager")}
                >
                  Trở về
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddTable;
