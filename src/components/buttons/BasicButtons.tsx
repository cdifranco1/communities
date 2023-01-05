import { ReactNode } from "react";

const GreenButton = ({
  children,
  clickHandler,
}: {
  clickHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}) => (
  <button
    type="button"
    className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-800"
    onClick={clickHandler}
  >
    {children}
  </button>
);

const RedButton = (clickHandler: () => void) => (
  <button
    type="button"
    className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-800"
    onClick={clickHandler}
  >
    Close
  </button>
);

export { GreenButton, RedButton };
