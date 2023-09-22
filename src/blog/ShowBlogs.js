import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const URI = "http://3.22.9.231:8000/blogs/";

const ShowBlogs = () => {
  const [item, setItem] = useState([]);

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    const res = await axios.get(URI);
    setItem(res.data);
    console.log(res.data);
  };

  const deleteBlog = async (id) => {
    Swal.fire({
      title: "Por favor espere",
      html: "Eliminando el registro",
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });
    await axios.delete(`${URI}${id}`);
    getBlogs();
    Swal.close()
  };

  const editBlog = async (id) => {
    alert("Actualizar el ID" + id);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Link to={"/insertar"} className="btn btn-info mb-3">
            <i class="fa fa-plus"></i>
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <table className="table table-dark">
            <thead>
              <tr>
                <th>TItle</th>
                <th>Content</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {item.map((blog) => (
                <tr key={blog.id}>
                  <td>{blog.title}</td>
                  <td>{blog.content}</td>
                  <td>
                    <Link
                      className="btn btn-info mt-2 mb-2"
                      to={`edit/${blog.id}`}
                    >
                      <i class="fa fa-pen-to-square"></i>
                    </Link>
                    <button
                      onClick={() => deleteBlog(blog.id)}
                      className="btn btn-danger"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShowBlogs;
