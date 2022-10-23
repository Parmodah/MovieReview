import ModalContainer from "./ModalContainer";
import { ImSpinner3 } from "react-icons/im";

const ConfirmModal = ({
  visible,
  busy,
  onCancel,
  onConfirm,
  title,
  subTitle,
}) => {
  const commonClass = "px-3 py-1 text-white rounded";
  return (
    <ModalContainer visible={visible} ignoreContainer>
      <div className="bg-white dark:bg-primary rounded p-3">
        <h1 className="text-red-400 font-semibold text-lg">{title}</h1>
        <p className="text-sm text-secondary dark:text-white">{subTitle}</p>

        <div className="flex items-center space-x-3 mt-3">
          {busy ? (
            <p className="flex items-center space-x-2 text-secondary dark:text-white">
              <ImSpinner3 className="animate-spin" />
              <span>Please wait</span>
            </p>
          ) : (
            <>
              <button
                onClick={onConfirm}
                type="button"
                className={commonClass + " bg-red-400"}
              >
                Confirm
              </button>
              <button
                onClick={onCancel}
                type="button"
                className={commonClass + " bg-blue-400"}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </ModalContainer>
  );
};

export default ConfirmModal;
