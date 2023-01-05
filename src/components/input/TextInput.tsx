export enum LabelSize {
  Small = "text-sm",
  Medium = "text-md",
  Large = "text-lg",
  XL = "text=xl",
  XXL = "text-2xl",
}

export interface InputProps {
  name: string;
  id: string;
  value: string;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
}

export const Input = ({
  name,
  id,
  value,
  readOnly,
  changeHandler,
}: InputProps) => (
  <input
    name={name}
    id={id}
    value={value}
    readOnly={readOnly}
    onChange={changeHandler}
    className="form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
  />
);

export interface LabelProps {
  text: string;
  id: string;
  size: LabelSize;
}

export const Label = ({ text, id, size }: LabelProps) => (
  <label
    htmlFor={id}
    className={`py-2 block font-medium leading-5 text-gray-700 text-left ${size}`}
  >
    {text}
  </label>
);
