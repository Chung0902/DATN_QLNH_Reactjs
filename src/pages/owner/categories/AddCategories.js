import React from "react";

const AddCategories = () => {
  return (
    <div
      className="modal fade"
      id="adddanhmuc"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <div className="row">
              <div className="form-group  col-md-12">
                <span className="thong-tin-thanh-toan">
                  <h5>Thêm mới danh mục </h5>
                </span>
              </div>
              <div className="form-group col-md-12">
                <label className="control-label">Nhập tên danh mục mới</label>
                <input className="form-control" type="text" required />
              </div>
              <div className="form-group col-md-12">
                <label className="control-label">
                  Danh mục món ăn hiện đang có
                </label>
                <ul className="adulc">
                  <li>Son môi</li>
                  <li>Tonner</li>
                  <li>Kem chống nắng</li>
                  <li>Nước hoa</li>
                  <li>Kem dưỡng thể</li>
                  <li>Tẩy trang</li>
                </ul>
              </div>
            </div>

            <button className="btn btn-save" type="button">
              Lưu lại
            </button>
            <button
              type="button"
              className="btn btn-cancel"
              data-bs-dismiss="modal"
            >
              Hủy bỏ
            </button>
          </div>
          <div className="modal-footer"></div>
        </div>
      </div>
    </div>
  );
};

export default AddCategories;
