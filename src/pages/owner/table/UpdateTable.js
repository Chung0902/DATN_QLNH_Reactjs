import React from "react";
import { useState } from "react";
import axiosClient from "../../../libraries/axiosClient";
import { useEffect } from "react";

const UpdateTable = ({
  handleSubmit,
  name,
  numberOfSeats,
  setup,
  status,
  setName,
  setNumberOfSeats,
  setSetup,
  setStatus,
}) => {
  const [tables, setTables] = useState([]);
  const getAllTables = async () => {
    try {
      const response = await axiosClient.get("admin/tables");
      if (response?.payload) {
        setTables(response.payload);
      } else {
        alert("khong co du lieu!");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllTables();
  }, []);
  return (
    <div
      className="modal fade"
      id="ModalUP"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <form className="modal-body" onSubmit={handleSubmit}>
            <div className="row">
              <div className="form-group  col-md-12">
                <span className="thong-tin-thanh-toan">
                  <h5>Chỉnh sửa thông tin bàn ăn</h5>
                </span>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label className="control-label">Tên ăn</label>
                <input
                  className="form-control"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Số lượng chỗ</label>
                <input
                  className="form-control"
                  type="number"
                  value={numberOfSeats}
                  onChange={(e) => setNumberOfSeats(e.target.value)}
                />
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Setup</label>
                <input
                  className="form-control"
                  type="text"
                  value={setup}
                  onChange={(e) => setSetup(e.target.value)}
                />
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Trạng thái</label>
                <input
                  className="form-control"
                  type="text"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </div>
            </div>

            <button className="btn btn-save" type="submit">
              Lưu lại
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Hủy bỏ
            </button>
          </form>
          <div className="modal-footer"></div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTable;
