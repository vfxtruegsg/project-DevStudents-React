import css from "./UserModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { ModalTemplate } from "../ModalTemplate/ModalTemplate.jsx";
import { closeModal } from "../../redux/modal/slice.js";
import { selectIsUserModalOpen } from "../../redux/modal/selectors.js";
import { selectisAuthLoading, selectUser } from "../../redux/auth/selectors.js";
import { Loader } from "../Loader/Loader.jsx";
import { userEditThunk } from "../../redux/auth/operations.js";
import { nanoid } from "nanoid";
import { useState } from "react";

function UserModal() {
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputId = nanoid();
  const dispatch = useDispatch();

  const handleClickSave = async (e) => {
    e.preventDefault();

    const name = e.target.elements.name.value.trim();
    const image = e.target.elements.userImage.files[0];

    if (!name) {
      setError("Error: Name is required");
      return;
    }

    if (!/^[a-zA-Zа-яА-ЯіїІЇєЄґҐ' -]*$/.test(name)) {
      setError("Error: You can add only letters");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    if (image) {
      formData.append("avatar", image);
    }

    dispatch(userEditThunk(formData))
      .unwrap()
      .then(() => {
        dispatch(closeModal());
        setSelectedImage(null);
        setError("");
      });
  };

  const imageOnChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);
    }
  };

  const userData = useSelector(selectUser);
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
              onClick={() => {
                dispatch(closeModal());
                setSelectedImage(null);
              }}
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
                    src={selectedImage ? selectedImage : userData.avatar}
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
                      onChange={imageOnChange}
                    />
                  </label>
                </div>
              </div>
              <div className={css.nameInputContainer}>
                <input
                  type="text"
                  className={`input ${css.inputName}`}
                  placeholder="Name"
                  name="name"
                  defaultValue={userData.name}
                />

                {error && <p className={css.errorText}>{error}</p>}
              </div>
              <button
                className={`btn-gradient ${css.btn}`}
                type="submit"
                style={{ marginBottom: 20 }}
                disabled={error}
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
