import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import css from "./RegistrationForm.module.css";
import * as yup from "yup";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { registerThunk } from "../../redux/auth/operations.js";
import { showToastErrorMessage } from "../../utils/showToastErrorMessage.js";
import PasswordStrengthBar from "react-password-strength-bar";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Too short!")
    .max(24, "Too long!")
    .required("Name required!"),
  email: yup
    .string()
    .email("Invalid email format!")
    .required("Email required!"),
  password: yup
    .string()
    .min(6, "Too short!")
    .max(12, "Too long!")
    .required("Password required!"),
});

const nameFormId = nanoid();
const emailFormId = nanoid();
const passwordFormId = nanoid();
const passwordConfirmFormId = nanoid();

export const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({ resolver: yupResolver(schema) });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (payload) => {
    const data = {
      name: payload.name,
      email: payload.email,
      password: payload.password,
    };

    if (payload.password !== payload["confirm-password"]) {
      showToastErrorMessage("The passwords you entered do not match");
      return;
    }

    dispatch(registerThunk(data))
      .unwrap()
      .then(() => navigate("/"));

    reset();
  };

  const passwordValue = watch("password");

  return (
    <div className={css["register-form-container"]}>
      <form
        className={css.form}
        onSubmit={handleSubmit(onSubmit)}
        style={{ paddingBottom: 20 }}
      >
        <div className={`${css.fields}`}>
          <label htmlFor={nameFormId}>
            <img
              className={`${css.svg}`}
              src="/user.svg"
              width="24"
              height="24"
              alt="Letter picture"
            />
          </label>

          <input
            className={`${css.input} input`}
            placeholder="Name"
            id={nameFormId}
            {...register("name", {
              required: "Name required",
            })}
          />
          {errors.name && <p className={css.errors}>{errors.name.message}</p>}
        </div>

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

        <div className={`${css.fields}`}>
          <label htmlFor={passwordConfirmFormId}>
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
            placeholder="Confirm password"
            id={passwordConfirmFormId}
            {...register("confirm-password", {
              required: "Password required",
            })}
          />
        </div>

        <PasswordStrengthBar
          className={css["password-bar"]}
          password={passwordValue}
          colors={["#ff4d4f", "#ff7a45", "#faad14", "#52c41a", "#367c4d"]}
        />

        <button
          className="btn-gradient"
          type="submit"
          style={{ marginTop: 32 }}
        >
          register
        </button>
      </form>

      <Link to="/login" className={`btn-classic`} style={{ display: "block" }}>
        log in
      </Link>
    </div>
  );
};
