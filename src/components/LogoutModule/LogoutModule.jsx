import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import css from "./LogoutModule.module.css";
import * as yup from "yup";
import { nanoid } from "nanoid";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../redux/auth/operations.js";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email format!").required("Email required"),
  password: yup
    .string()
    .min(6, "Too short!")
    .max(12, "Too long!")
    .required("Password required"),
});

const emailFormId = nanoid();
const passwordFormId = nanoid();

function LogoutModule() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (payload) => {
    const data = {
      email: payload.email,
      password: payload.password,
    };

    dispatch(loginThunk(data))
      .unwrap()
      .then(() => navigate("/"));

    // navigate("/dashboard"); доделать через unwrap

    reset();
  };

  return (
    <div className={css.logoutFormContainer}>
      <form
        className={css.form}
        onSubmit={handleSubmit(onSubmit)}
        style={{ paddingBottom: 20 }}
      >
        <div className={css.textWrapper}>
          <p className={css.text}>Are you sure you want to log out?</p>
        </div>

        <button className="btn-gradient" type="submit">
          logout
        </button>
      </form>

      <Link to="/logout" className={`btn-classic`} style={{ display: "block" }}>
        cancel
      </Link>
    </div>
  );
}

export default LogoutModule;
