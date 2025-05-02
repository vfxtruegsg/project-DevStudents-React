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
  let userUrl = "/public/home.svg";
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const handleClickSave = (e) => {
    e.preventDefault();
    dispatch(userEditThunk({ name }))
      .unwrap()
      .then(() => dispatch(closeModal()));
  };

  const isUserModalOpen = useSelector(selectIsUserModalOpen);
  const isLoading = useSelector(selectisAuthLoading);

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
              <img
                className={css.userClose}
                src="./close.svg"
                alt="Icon close"
              />
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
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                className={`input ${css.inputName}`}
                placeholder="Name"
                name="name"
              />
              <button
                className={`btn-gradient ${css.btn}`}
                type="submit"
                style={{ marginBottom: 20 }}
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
