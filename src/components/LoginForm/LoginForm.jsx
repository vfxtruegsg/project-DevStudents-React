import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import css from "./LoginForm.module.css";
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

export const LoginForm = () => {
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

    dispatch(loginThunk(data));
    // .unwrap()
    // .then(() => navigate("/"));

    // navigate("/dashboard"); доделать через unwrap

    reset();
  };

  return (
    <div className={css["login-form-container"]}>
      <form
        className={css.form}
        onSubmit={handleSubmit(onSubmit)}
        style={{ paddingBottom: 20 }}
      >
        <div className={`${css.fields}`}>
          <label htmlFor={emailFormId}>
            <img
              className={`${css.svg}`}
              src="/letter.svg"
              width="24"
              height="24"
              alt="Letter picture"
            />
          </label>

          <input
            className={`${css.input} input`}
            // type="email"
            placeholder="E-mail"
            id={emailFormId}
            {...register("email", {
              required: "Email required",
            })}
          />

          {errors.email && <p className={css.errors}>{errors.email.message}</p>}
        </div>

        <div className={`${css.fields}`}>
          <label htmlFor={passwordFormId}>
            <img
              className={`${css.svg}`}
              src="/lock.svg"
              width="24"
              height="24"
              alt="Lock picture"
            />
          </label>

          <input
            className={`${css.input} input`}
            type="password"
            placeholder="Password"
            id={passwordFormId}
            {...register("password", {
              required: "Password required",
            })}
          />

          {errors.password && (
            <p className={css.errors}>{errors.password.message}</p>
          )}
        </div>

        <button className="btn-gradient" type="submit">
          log in
        </button>
      </form>

      <Link
        to="/register"
        className={`btn-classic`}
        style={{ display: "block" }}
      >
        register
      </Link>
    </div>
  );
};
