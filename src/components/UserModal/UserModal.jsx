import css from "./UserModal.module.css";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateUserThunk } from "../../redux/user/operations.js";

const UserModal = ({ onClose }) => {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user.user);
  const user = useSelector((state) => {
    console.log(state.user);
    return state.user.user;
  });
  const [name, setName] = useState(user?.name || "");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url || "");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setAvatarPreview(user.avatar?.url || "");
    }
  }, [user]);
  const handleNameChange = (e) => setName(e.target.value);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      return alert("Name cannot be empty!");
    }

    const formData = new FormData();
    formData.append("id", user._id);
    formData.append("name", name);
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    dispatch(updateUserThunk(formData)).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        onClose(); // Close modal after successful update
      }
    });
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // if (!user) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className={css.editProfileContainer} onClick={handleBackdropClick}>
      <div className={css.backdrop}>
        <button className={css.closeButton} onClick={onClose}>
          ✖
        </button>

        <form onSubmit={handleSubmit} className={css.form}>
          <div className={css.avatarUpload}>
            <label htmlFor="avatar-input">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar"
                  className={css.avatarImage}
                />
              ) : (
                <div className={css.avatarPlaceholder}></div> // 👈 Show empty box or "add avatar" icon
              )}
              <div className={css.plusButton}>+</div>
            </label>
            <input
              id="avatar-input"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>

          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Name"
            className={css.nameInput}
          />

          <button type="submit" className={`btn-gradient ${css.saveBtn}`}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
