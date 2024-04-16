import React from "react";

const AddStatus = () => {
  return (
    <div
      className="modal fade"
      id="addtinhtrang"
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
                  <h5>Thêm mới tình trạng</h5>
                </span>
              </div>
              <div className="form-group col-md-12">
                <label className="control-label">Nhập tình trạng mới</label>
                <input className="form-control" type="text" require />
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

export default AddStatus;
