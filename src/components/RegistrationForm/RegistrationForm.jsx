import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import css from "./RegistrationForm.module.css";
import * as yup from "yup";
import { nanoid } from "nanoid";

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
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (payload) => {
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} style={{ paddingBottom: 20 }}>
        <div className={`${css.fields}`}>
          <label htmlFor={nameFormId}>
            <img
              className={`${css.svg}`}
              src="/user.svg"
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

          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div className={`${css.fields}`}>
          <label htmlFor={emailFormId}>
            <img
              className={`${css.svg}`}
              src="/letter.svg"
              alt="Letter picture"
            />
          </label>

          <input
            className={`${css.input} input`}
            type="email"
            placeholder="E-mail"
            id={emailFormId}
            {...register("email", {
              required: "Email required",
            })}
          />

          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div className={`${css.fields}`}>
          <label htmlFor={passwordFormId}>
            <img className={`${css.svg}`} src="/lock.svg" alt="Lock picture" />
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

          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div className={`${css.fields}`}>
          <label htmlFor={passwordConfirmFormId}>
            <img className={`${css.svg}`} src="/lock.svg" alt="Lock picture" />
          </label>

          <input
            className={`${css.input} input`}
            type="password"
            placeholder="Confirm password"
            id={passwordFormId}
            {...register("password", {
              required: "Password required",
            })}
          />

          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button className="btn-gradient" type="submit">
          register
        </button>
      </form>

      <button className="btn-classic" type="button">
        log in
      </button>
    </div>
  );
};
