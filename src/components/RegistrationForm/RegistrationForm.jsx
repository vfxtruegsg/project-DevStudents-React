import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import css from "./RegistrationForm.module.css";
import * as yup from "yup";

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
        <div>
          <label>
            <svg className={css.svg} width="24" height="24">
              <use href="../../images/svg/user.svg"></use>
            </svg>

            <input
              {...register("name", {
                required: "Name required",
              })}
            />
          </label>

          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div>
          <label>
            <svg className={css.svg} width="24" height="24">
              <use href="../../images/svg/letter.svg"></use>
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
          register
        </button>
      </form>

      <button className="btn-classic" type="button">
        log in
      </button>
    </div>
  );
};
