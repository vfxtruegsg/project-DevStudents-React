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
