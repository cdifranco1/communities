import React, { ChangeEvent, useState } from "react";

enum LabelSize {
  Small = "text-sm",
  Medium = "text-md",
  Large = "text-lg",
  XL = "text=xl",
  XXL = "text-2xl",
}

function TextInput({
  name,
  value,
  label,
  id,
  labelSize,
  changeHandler,
}: {
  name: string;
  value: string;
  label: string;
  labelSize: LabelSize;
  id: string;
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="mt-2">
      <label
        htmlFor={id}
        className={`block font-medium leading-5 text-gray-700 text-left ${labelSize}`}
      >
        {label}
      </label>
      <div className="mt-1 rounded-md shadow-sm">
        <input
          name={name}
          id={id}
          value={value}
          onChange={changeHandler}
          className="form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        />
      </div>
    </div>
  );
}

// function DynamicForm() {
//   const [inputs, setInputs] = useState([{ label: "Input 1", id: "input1" }]);

//   const handleAddInput = () => {
//     const newInputs = [
//       ...inputs,
//       {
//         label: "Input " + (inputs.length + 1),
//         id: "input" + (inputs.length + 1),
//       },
//     ];
//     setInputs(newInputs);
//   };

//   return (
//     <form>
//       {inputs.map((input) => (
//         <TextInput
//           value={"don't care"}
//           label={input.label}
//           id={input.id}
//           labelSize={LabelSize.Large}
//         />
//       ))}
//       <button
//         type="button"
//         onClick={handleAddInput}
//         className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
//       >
//         Add Question
//       </button>
//     </form>
//   );
// }

// <label>
//   <input type="radio" name="public" value="" onChange={handleChange} />
//   Public
// </label>

enum RadioButtonValues {
  public = "0",
  private = "1",
  restricted = "2",
}

const RadioButton = ({
  children,
  value,
  name,
  onChange,
  isSelected,
}: {
  children: React.ReactNode;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSelected: boolean;
}) => {
  return (
    <label>
      <input
        name={name}
        type="radio"
        value={value}
        checked={isSelected}
        onChange={onChange}
      />
      {children}
    </label>
  );
};

function NewCommunityForm() {
  const [radioButtonValue, setRadioButtonValue] = useState("0");
  const [communityName, setCommunityName] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name == "privacy") {
      setRadioButtonValue(e.target.value);
    }

    if (e.target.name == "communityName") {
      setCommunityName(e.target.value);
    }
  };

  const isRadioSelected = (radioValue: string) =>
    radioButtonValue === radioValue;

  return (
    <form className="my-4 border border-red broder-5">
      <TextInput
        name="communityName"
        value={communityName}
        label="Community Name"
        id="communityName"
        labelSize={LabelSize.Medium}
        changeHandler={handleChange}
      />
      <div className="flex flex-col space-y-2">
        <RadioButton
          name="privacy"
          value="0" // to be changed to actually update input
          onChange={handleChange}
          isSelected={isRadioSelected("0")}
        >
          Public
        </RadioButton>
        <RadioButton
          name="privacy"
          value="1"
          onChange={handleChange}
          isSelected={isRadioSelected("1")}
        >
          Restricted
        </RadioButton>
        <RadioButton
          name="privacy"
          value="2"
          onChange={handleChange}
          isSelected={isRadioSelected("2")}
        >
          Private
        </RadioButton>
      </div>
    </form>
  );
}

export default NewCommunityForm;
