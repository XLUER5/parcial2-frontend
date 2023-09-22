import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function CreateBlog() {
  const { register, handleSubmit, reset } = useForm();

  const navigate = useNavigate();

  const URI = "http://localhost:8000/blogs/";

  const onSubmit = async (data) => {
    const res = await axios.post(URI, data);

    console.log(res.data);

    if (res.data.status === 200) {
      Swal.fire({
        text: `${res.data.message}`,
        icon: "success",
        confirmButtonText: "Aceptar",
      });
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
