import React, { useEffect, useState } from "react";
import UpdateCategories from "./categories/UpdateCategories";
import axiosClient from "../../libraries/axiosClient";
import { toast } from "react-hot-toast";

const CategoriesManager = () => {
  const [categories,setCategories]= useState([]);
  const [photo,setPhoto]=useState("")
  const [name,setName] = useState("")
  const [visible,setVisible]= useState(false)
  const [selected,setSelected] = useState(null)
  const [updateName,setUpdateName] = useState("")
  //handle Form
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const response = await axiosClient.post("admin/categories", { name, photo });
      if (response?.payload) {
        toast.success(response.message);
        console.log(response.message)
        setName();
        setPhoto();
        setCategories([...categories, response.payload]); 
      } 
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };


  const getAllCategories = async () => {
    try {
      const response = await axiosClient.get('admin/categories');
      if(response?.payload){
        setCategories(response.payload);
      }else{
        alert('khong co du lieu!')
      }
      
      
    } catch (error) {
      console.error(error);
    }
  };

    useEffect(() =>{
      getAllCategories();
    },[]);
//update category
const handleUpdate = async (e) =>{
  e.preventDefault();
  try {
      const response = await axiosClient.patch(`admin/categories/${selected._id}`, {name: updateName});
      if(response.success){
          toast.success(`${updateName} is updated`);
          setSelected(null);
          setUpdateName("");
          setCategories(categories.map((category) => {
            if (category._id === selected._id) {
              return { ...category, name: updateName }; // Cập nhật tên của danh mục tương ứng
            }
            return category;
          }));
      }

  } catch (error) {
      toast.error('Something went wrong')
  }
};


    //Delete category
    const handleDelete = async (pId) =>{
      try {
          const response = await axiosClient.delete(`admin/categories/${pId}`);
          if(response?.success){
              toast.success(`category is deleted`);
              setCategories(categories.filter((category) => category._id !== pId)); // Loại bỏ danh mục đã được xóa khỏi danh sách
          }
          
      } catch (error) {
          toast.error('Something went wrong')
      }
  };
  return (
    <div className="maincate">
      <div className="col-md-9">
        <h3>Quản lý danh mục món ăn</h3>
        <div className="p-3 w-50">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nhập danh mục mới"
                value = {name}
                onChange={(e)=> setName(e.target.value)} 
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="image"
                value = {photo}
                onChange={(e)=> setPhoto(e.target.value)} 
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-submit">
              Submit
            </button>
          </form>
        </div>
        <div className="w-75">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {categories && categories.map((c)=> (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>
                  <button
                    className="btn btn-primary ms-2"
                    type="button"
                    title="Cập nhật"
                    id="show-emp"
                    data-bs-toggle="modal"
                    data-bs-target="#ModalUP"
                    onClick={() => {
                      setVisible(true) ;
                      setUpdateName(c.name);
                      setSelected(c)
                      }}
                  >
                    Edit
                  </button><UpdateCategories setVisible={setVisible} value={updateName}  setValue={setUpdateName} handleSubmit={handleUpdate} />
                  {/* <button className="btn btn-primary ms-2">Edit</button> */}
                  <button className="btn btn-delete btn-dele" 
                  onClick={() => { handleDelete(c._id)}}>Delete</button>
                </td>
              </tr>))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoriesManager;
