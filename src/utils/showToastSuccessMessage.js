import toast from "react-hot-toast";

export const showToastSuccessMessage = (errorMessage) => {
  toast.success(errorMessage, {
    iconTheme: {
      primary: "#734aef",
    },
    style: {
      textAlign: "center",
      color: "#623f8b",
    },
  });
};
