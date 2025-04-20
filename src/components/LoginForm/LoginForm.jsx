import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import css from "./LoginForm.module.css";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email format!").required("Email required"),
  password: yup
    .string()
    .min(6, "Too short!")
    .max(12, "Too long!")
    .required("Password required"),
});

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

  const letterSVG = new URL("../../images/svg/letter.svg", import.meta.url);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} style={{ paddingBottom: 20 }}>
        <div>
          <label>
            <svg className={css.svg} width="24" height="24">
              <use href={letterSVG}></use>
            </svg>

            <input
              type="email"
              {...register("email", {
                required: "Email required",
              })}
            />
          </label>

          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label>
            <svg className="svg" width="24" height="24">
              <use href="../../images/svg/lock.svg"></use>
            </svg>

            <input
              type="password"
              {...register("password", {
                required: "Password required",
              })}
            />
          </label>

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
