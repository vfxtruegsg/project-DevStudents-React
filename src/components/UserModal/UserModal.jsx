import css from "./UserModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { ModalTemplate } from "../ModalTemplate/ModalTemplate.jsx";
import { closeModal } from "../../redux/modal/slice.js";
import { selectIsUserModalOpen } from "../../redux/modal/selectors.js";
import { selectisAuthLoading, selectUser } from "../../redux/auth/selectors.js";
import { Loader } from "../Loader/Loader.jsx";
import { userEditThunk } from "../../redux/auth/operations.js";
import { nanoid } from "nanoid";

function UserModal() {
  const fileInputId = nanoid();

  const dispatch = useDispatch();

  const handleClickSave = async (e) => {
    e.preventDefault();

    const name = e.target.elements.name.value;
    const image = e.target.elements.userImage.files[0];

    const formData = new FormData();
    formData.append("name", name);
    if (image) {
      formData.append("avatar", image);
    }

    dispatch(userEditThunk(formData))
      .unwrap()
      .then(() => dispatch(closeModal()));
  };

  const userImage = useSelector(selectUser).avatar;
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
                  <img
                    className={css.userPhotoImg}
                    src={userImage}
                    alt="user photo"
                  />
                  <label className={css.inputContainer}>
                    +
                    <input
                      type="file"
                      id={fileInputId}
                      name="userImage"
                      className={css.fileInput}
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>
              <input
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
