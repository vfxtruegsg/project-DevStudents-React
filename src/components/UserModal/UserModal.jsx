import css from "./UserModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { ModalTemplate } from "../ModalTemplate/ModalTemplate.jsx";
import { closeModal } from "../../redux/modal/slice.js";
import { selectIsUserModalOpen } from "../../redux/modal/selectors.js";
import { selectisAuthLoading } from "../../redux/auth/selectors.js";
import { Loader } from "../Loader/Loader.jsx";
import { userEditThunk } from "../../redux/auth/operations.js";
import { useState } from "react";

function UserModal() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleClickSave = (e) => {
    e.preventDefault();
    dispatch(userEditThunk({ name }))
      .unwrap()
      .then(() => dispatch(closeModal()));
  };

  const isUserModalOpen = useSelector(selectIsUserModalOpen);
  const isLoading = useSelector(selectisAuthLoading);

  const handleChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (!/^[a-zA-Zа-яА-ЯіїІЇєЄґҐ' -]*$/.test(value)) {
      setError("Error: You can add only letters");
    } else {
      setError("");
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <ModalTemplate
        isOpenModal={isUserModalOpen}
        className={css.modal}
        modalContent={css.modalContent}
      >
        <form
          onSubmit={handleClickSave}
          className={`${css.userContainer} container`}
        >
          <div className={css.backdrop}>
            <button
              onClick={() => dispatch(closeModal())}
              id="menu-close"
              className={css.mobileMenuClose}
              aria-label="Close menu"
            >
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <path d="M1 1L17 17" stroke="#FBFBFB" strokeWidth="1" />
                <path d="M1 17L17 1" stroke="#FBFBFB" strokeWidth="1" />
              </svg>
            </button>
            <div className={css.userWrapper}>
              <div className={css.textWrapper}>
                <p className={css.text}>Edit Profile</p>
              </div>
              <div className={css.userPhotoWrapper}>
                <div className={css.userPhoto}>
                  <img className={css.userPhotoImg} src={userUrl} alt="user" />
                </div>
                <button className={css.plusWrapper} type="button">
                  <span className={css.plus}>+</span>
                </button>
              </div>
              <div className={css.inputWrapper}>
                <input
                  onChange={handleChange}
                  type="text"
                  className={`input ${css.inputName} ${
                    error ? css.errorInput : ""
                  }`}
                  value={name}
                  placeholder="Name"
                />
                {error && <p className={css.errorText}>{error}</p>}
              </div>
              <button
                className={`btn-gradient ${css.btn}`}
                type="submit"
                disabled={error || !name.trim()}
              >
                save
              </button>
            </div>
          </div>
        </form>
      </ModalTemplate>
    </>
  );
}

export default UserModal;
