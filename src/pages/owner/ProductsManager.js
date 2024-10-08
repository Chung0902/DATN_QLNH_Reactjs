import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UpdateProduct from "./products/UpdateProduct";
import axiosClient from "../../libraries/axiosClient";
import { toast } from "react-hot-toast";

const ProductsManager = () => {
  const [products, setProducts] = useState([]);
  const [udescription, setUDescription] = useState();
  const [uname, setUName] = useState();
  const [uprice, setUPrice] = useState();
  const [udiscount, setUDiscount] = useState();
  const [ustock, setUStock] = useState();
  const [categoryId, setCategoryId] = useState();
  const [supplierId, setSupplierId] = useState();
  const [uphoto, setUPhoto] = useState();
  const [selected, setSelected] = useState(null);

  const [checkedItems, setCheckedItems] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 10;

  const pageCount = Math.ceil(products.length / productsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  //search
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.get(
        `questions/productSearchb?name=${searchTerm}`
      );
      console.log(response.payload);
      if (response?.payload) setProducts(response?.payload); // Cập nhật state products với kết quả tìm kiếm
    } catch (error) {
      console.log(error);
    }
  };

  //xử lý chọn vào checkbox lấy id
  const handleItemCheck = (event, productId) => {
    const isChecked = event.target.checked;
    setCheckedItems({
      ...checkedItems,
      [productId]: isChecked,
    });
  };

  // xử lý nhấn chọn tất cả checkbox
  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    const newCheckedItems = {};

    products.forEach((product) => {
      newCheckedItems[product._id] = isChecked;
    });

    setCheckedItems(newCheckedItems);
  };
  //click nút ẩn sẽ ẩn đi
  const handleDeleteSelected = async () => {
    const selectedIds = Object.keys(checkedItems).filter(
      (itemId) => checkedItems[itemId]
    );

    try {
      //await axiosClient.post(`admin/products/${selectedIds.join(',')}/delete`);
      await axiosClient.post("admin/products/delete", { selectedIds });
      setCheckedItems({});
      setProducts(
        products.filter((product) => !selectedIds.includes(product._id))
      );
      toast.success("Đã xóa món ăn");
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra khi xóa món ăn");
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.patch(
        `admin/products/${selected._id}`,
        {
          name: uname,
          price: uprice,
          discount: udiscount,
          stock: ustock,
          photo: uphoto,
          description: udescription,
          categoryId: categoryId,
          supplierId: supplierId,
        }
      );
      if (response.success) {
        toast.success(" is updated");
        setSelected(null);
        setUName("");
        setUPrice("");
        setUDiscount("");
        setUDescription("");
        setUPhoto("");
        setUStock("");
        setCategoryId("");
        setSupplierId("");
        setProducts(
          products.map((product) => {
            if (product._id === selected._id) {
              return {
                ...product,
                name: uname,
                price: uprice,
                discount: udiscount,
                stock: ustock,
                photo: uphoto,
                description: udescription,
                categoryId: categoryId,
                supplierId: supplierId,
              };
            }
            return product;
          })
        );
        getAllProducts();
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong");
    }
  };

  //Delete
  const handleDelete = async (pId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa món ăn này không?")) {
      try {
        const response = await axiosClient.delete(`admin/products/${pId}`);
        if (response?.success) {
          toast.success("Món ăn đã được xóa");
          setProducts(products.filter((product) => product._id !== pId));
        }
      } catch (error) {
        toast.error("Đã xảy ra lỗi khi xóa món ăn");
      }
    }
  };

  const getAllProducts = async () => {
    try {
      const response = await axiosClient.get("questions/grossprcate");
      setProducts(response.payload);
      // setProductsList(response.payload);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);


  return (
    <main className="app-content">
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb side">
          <li className="breadcrumb-item active">
            <a href="#">
              <b>Danh sách món ăn</b>
            </a>
          </li>
        </ul>
        <div id="clock"></div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <div className="tile-body">
              <div className="row element-button">
                <div className="col-sm-2">
                  <NavLink
                    to="/main/productsmanager/addproducts"
                    className="active1"
                  >
                    <a
                      className="btn btn-add btn-sm"
                      href="form-add-san-pham.html"
                      title="Thêm"
                    >
                      <i className="fas fa-plus"></i>
                      Tạo mới món ăn
                    </a>
                  </NavLink>
                </div>
                {/* <div className="col-sm-2">
                  <a
                    className="btn btn-delete btn-sm"
                    type="button"
                    title="Xóa"
                    onClick={handleDeleteSelected}
                  >
                    <i className="fas fa-trash-alt"></i> Xóa tất cả{" "}
                  </a>
                </div> */}
                <div className="col-sm-7">
                  <form
                    className="d-flex "
                    role="search"
                    onSubmit={handleSearch}
                  >
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="btn btn-info" type="submit">
                      Search
                    </button>
                  </form>
                </div>
              </div>
              <table
                className="table table-hover table-bordered"
                id="sampleTable"
              >
                <thead>
                  <tr>
                    <th width="10">
                      <input
                        type="checkbox"
                        id="all"
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th>Mã món ăn</th>
                    <th>Tên món ăn</th>
                    <th>Ảnh</th>
                    <th>Số lượng</th>
                    <th>Tình trạng</th>
                    <th>Giá tiền</th>
                    <th>Danh mục</th>
                    <th>Chức năng</th>
                  </tr>
                </thead>
                <tbody>
                  {products &&
                    products
                      .slice(
                        pageNumber * productsPerPage,
                        pageNumber * productsPerPage + productsPerPage
                      )
                      .map((p) => (
                        <tr key={p._id}>
                          <td width="10">
                            <input
                              type="checkbox"
                              checked={checkedItems[p._id] || false}
                              onChange={(e) => handleItemCheck(e, p._id)}
                            />
                          </td>
                          <td>{p._id}</td>
                          <td>{p.name}</td>
                          <td>
                            <img
                              src={p.photo}
                              alt=""
                              width="100px;"
                              height={"100px"}
                            />
                          </td>
                          <td>{p.stock}</td>
                          <td>
                            <span className="badge bg-success">
                              {p.stock > 0 ? "Còn hàng " : "Hết hàng"}
                            </span>
                          </td>
                          <td>{p.price} đ</td>
                          <td>{p.category}</td>
                          <td>
                            <button
                              className="btn btn-primary btn-sm trash"
                              type="button"
                              title="Xóa"
                              onClick={() => handleDelete(p._id)}
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                            <button
                              className="btn btn-primary btn-sm edit"
                              type="button"
                              title="Sửa"
                              id="show-emp"
                              data-bs-toggle="modal"
                              data-bs-target="#ModalUP"
                              onClick={() => {
                                setSelected(p);
                                setUName(p.name);
                                setUDescription(p.description);
                                setUPrice(p.price);
                                setUStock(p.stock);
                                setUDiscount(p.discount);
                                setUPhoto(p.photo);
                                setCategoryId(p.category);
                                setSupplierId(p.supplierId);
                              }}
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <UpdateProduct
                              handleSubmit={handleUpdate}
                              name={uname}
                              description={udescription}
                              price={uprice}
                              stock={ustock}
                              photo={uphoto}
                              discount={udiscount}
                              setName={setUName}
                              setDescription={setUDescription}
                              setDiscount={setUDiscount}
                              setPrice={setUPrice}
                              setPhoto={setUPhoto}
                              setStock={setUStock}
                              setCategoryId={setCategoryId}
                              setSupplierId={setSupplierId}
                            />

                            <NavLink
                              to={`/main/productsmanager/reviews/${p._id}`}
                            >
                              <button
                                className="btn btn-primary btn-sm edit"
                                title="Xem đánh giá món ăn"
                              >
                                <i className="fas fa-wallet"></i>
                              </button>
                            </NavLink>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
              <div className="pagination">
                <button
                  onClick={() => setPageNumber(0)}
                  disabled={pageNumber === 0}
                >
                  Previous
                </button>
                {Array.from({ length: pageCount }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setPageNumber(index)}
                    className={pageNumber === index ? "active" : ""}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPageNumber(pageCount - 1)}
                  disabled={pageNumber === pageCount - 1}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductsManager;
