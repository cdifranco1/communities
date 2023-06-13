import React, { ReactNode, useState } from "react";

interface ModalProps {
  children: React.ReactNode;
  title: string;
  closeButton: (clickHandler: () => void) => ReactNode;
  saveChangesButton: ReactNode;
  modalButtonText: string;
}

interface ContentProps {
  children: React.ReactNode;
  title: string;
}

const ModalContent = ({ title, children }: ContentProps) => (
  <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
    <div className="mt-3 text-left sm:mt-0 sm:ml-4 sm:mr-4">
      <h3 className="text-lg leading-6 font-medium text-gray-900 border-b border-gray-200 py-2">
        {title}
      </h3>
      {children}
    </div>
  </div>
);

interface ModalButtonProps {
  closeButton: ReactNode;
  saveChangesButton: ReactNode;
}

const ModalButtons = ({ closeButton, saveChangesButton }: ModalButtonProps) => (
  <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
    <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
      {closeButton}
    </span>
    <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
      {saveChangesButton}
    </span>
  </div>
);

function Modal({
  children,
  title,
  modalButtonText,
  closeButton,
  saveChangesButton,
}: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-600 shadow-sm hover:shadow-md text-white p-2 rounded"
        onClick={() => setIsOpen(true)}
      >
        {modalButtonText}
      </button>
      {isOpen && (
        <div className="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div
            style={{ maxHeight: "85vh" }}
            className="bg-white rounded-sm shadow-xl transform transition-all xl:max-w-4xl sm:max-w-2xl sm:w-full overflow-y-scroll"
          >
            <ModalContent title={title}>{children}</ModalContent>
            <ModalButtons
              closeButton={closeButton(() => setIsOpen(false))}
              saveChangesButton={saveChangesButton}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export { Modal };
