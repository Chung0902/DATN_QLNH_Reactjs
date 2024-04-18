import React from "react";
import { Form } from "react-router-dom";

const UpdateCategories = ({ handleSubmit, value, setValue, setVisible }) => {
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
      <div
        className="modal-dialog modal-dialog-centered"
        role="document"
        onCancel={() => setVisible(false)}
      >
        <div className="modal-content">
          <form className="modal-body" onSubmit={handleSubmit}>
            <div className="row">
              <div className="form-group  col-md-12">
                <span className="thong-tin-thanh-toan">
                  <h5>Cập nhật danh mục món ăn</h5>
                </span>
              </div>
              <div className="form-group col-md-12">
                <label className="control-label">
                  Nhập tên danh mục món ăn
                </label>
                <input
                  className="form-control"
                  type="text"
                  required
                  placeholder="Sửa rửa mặt"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
            </div>
            <button className="btn btn-save" type="submit">
              Lưu lại
            </button>
            <button
              type="button"
              className="btn btn-cancel"
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

export default UpdateCategories;
