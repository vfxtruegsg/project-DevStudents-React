import css from "./UserModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { ModalTemplate } from "../ModalTemplate/ModalTemplate.jsx";
import { closeModal } from "../../redux/modal/slice.js";
import { selectIsUserModalOpen } from "../../redux/modal/selectors.js";
import { selectisAuthLoading } from "../../redux/auth/selectors.js";
import { Loader } from "../Loader/Loader.jsx";
import { userModalThunk } from "../../redux/auth/operations.js";
import { FaRegUser } from "react-icons/fa6";
import { useState } from "react";

function UserModal() {
  let userUrl = "/public/home.svg";

  const dispatch = useDispatch();

  const handleClickSave = () => {
    // dispatch(userModalThunk())
    //   .unwrap()
    //   .then(() => dispatch(closeModal()));
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
        <div className={`${css.userContainer} container`}>
          <div className={css.backdrop}>
            <button
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
                onChange={() => {}}
                type="text"
                className={`input ${css.inputName}`}
                type="text"
                placeholder="Name"
              />
              <button
                onClick={handleClickSave}
                className={`btn-gradient ${css.btn}`}
                type="button"
                style={{ marginBottom: 20 }}
              >
                save
              </button>
            </div>
          </div>
        </div>
      </ModalTemplate>
    </>
  );
}

export default UserModal;
