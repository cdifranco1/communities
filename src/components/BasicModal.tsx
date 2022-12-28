import React, { ReactNode, useState } from "react";

interface ModalProps {
  children: React.ReactNode;
  title: string;
  closeButton: (clickHandler: () => void) => ReactNode;
  saveChangesButton: (clickHandler: () => void) => ReactNode;
}

interface ContentProps {
  children: React.ReactNode;
  title: string;
}

const ModalContent = ({ title, children }: ContentProps) => (
  <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
    <div className="mt-3 text-left sm:mt-0 sm:ml-4 sm:mr-4">
      <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
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
  closeButton,
  saveChangesButton,
}: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={() => setIsOpen(true)}
      >
        Open Modal
      </button>
      {isOpen && (
        <div className="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div className="bg-white rounded-sm overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <ModalContent title={title}>{children}</ModalContent>
            <ModalButtons
              closeButton={closeButton(() => setIsOpen(false))}
              saveChangesButton={saveChangesButton(() =>
                console.log("Implement change save!!!!")
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export { Modal };
