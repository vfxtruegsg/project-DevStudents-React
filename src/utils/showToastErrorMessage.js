import toast from "react-hot-toast";

export const showToastErrorMessage = (errorMessage) => {
  toast.error(errorMessage, {
    iconTheme: {
      primary: "#734aef",
    },
    style: {
      textAlign: "center",
      color: "#623f8b",
    },
  });
};

export const showToastSuccessMessage = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
