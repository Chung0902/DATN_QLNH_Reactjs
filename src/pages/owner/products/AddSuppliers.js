import React from "react";

const AddSuppliers = () => {
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <div className="row">
              <div className="form-group  col-md-12">
                <span className="thong-tin-thanh-toan">
                  <h5>Thêm mới nhà cung cấp</h5>
                </span>
              </div>
              <div className="form-group col-md-12">
                <label className="control-label">Nhập tên nhà cung cấp</label>
                <input className="form-control" type="text" required />
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

export default AddSuppliers;
