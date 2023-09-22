import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditBlog() {

  const navigate = useNavigate()

  const { register, handleSubmit, reset, setValue } = useForm();

  const [item, setItem] = useState({});

  const { id } = useParams();

  const URI = "http://localhost:8000/blogs/";

  useEffect(() => {
    getBlogs(id);
  }, []);

  const getBlogs = async (llave) => {
    const url = `${URI}${llave}`
    console.log(url)
    const res = await axios.get(url);
    setItem(res.data);
  };

  useEffect(() => {
    setValue("title", item.title);
    setValue("content", item.content);
  }, [getBlogs]);

  const onSubmit = async (data) => {
    const url = `${URI}${id}`
    const res = await axios.put(url, data);

    console.log(res.data);

    if (res.data.status === 200) {
      Swal.fire({
        text: `${res.data.message}`,
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      getBlogs(id)
      navigate("/")
    } else {
      Swal.fire({
        text: "Ocurrio un error!",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }

    reset();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 d-flex justify-content-center align-items-center">
          <div className="card w-50">
            <div className="card-header">Ingresar blog</div>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  className="form-control"
                  placeholder="Ingrese el titulo"
                  {...register("title")}
                />
                <input
                  className="form-control mt-2"
                  placeholder="Ingrese el contenido"
                  {...register("content")}
                />
                <input className="btn btn-info mt-3" type="submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
