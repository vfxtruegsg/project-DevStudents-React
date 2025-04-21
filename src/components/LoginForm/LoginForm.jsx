import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import css from "./LoginForm.module.css";
import * as yup from "yup";
import { nanoid } from "nanoid";

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

  const onSubmit = async (payload) => {
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} style={{ paddingBottom: 20 }}>
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

        <button className="btn-gradient" type="submit">
          LOG IN
        </button>
      </form>

      <button className="btn-classic" type="button">
        REGISTER
      </button>
    </div>
  );
};
