import React, { ChangeEvent, useState } from "react";
import { Input, Label, LabelProps, LabelSize } from "../input/TextInput";
import RadioButton from "../input/RadioButton";
import SurveyBuilder from "./SurveyBuilder";

function LabeledInput({
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
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <Label text={label} id={id} size={labelSize} />
      <Input name={name} id={id} value={value} changeHandler={changeHandler} />
    </div>
  );
}

interface TextBoxProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  id: string;
  name: string;
}

const TextBox = ({ value, onChange, placeholder, id, name }: TextBoxProps) => {
  return (
    <textarea
      className="border rounded-md shadow-sm px-3 py-2 resize-none w-full"
      id={id}
      name={name}
      rows={10}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

interface CommunityOverviewProps {
  labelText: string;
  labelSize: LabelSize;
  name: string;
  value: string;
  changeHandler: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

function LabeledTextBox({
  labelText,
  labelSize,
  name,
  value,
  changeHandler,
}: CommunityOverviewProps) {
  return (
    <div>
      <Label text={labelText} size={labelSize} id="overview" />
      <TextBox
        value={value}
        onChange={changeHandler}
        id="overview"
        name={name}
      />
    </div>
  );
}

// Pieces to add:
//    1. Rules
//    2. Overview / Profile
function NewCommunityForm() {
  const [radioButtonValue, setRadioButtonValue] = useState("0");
  const [communityName, setCommunityName] = useState("");
  const [textArea, setTextArea] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name == "privacy") {
      setRadioButtonValue(e.target.value);
    }

    if (e.target.name == "communityName") {
      setCommunityName(e.target.value);
    }
  };

  //  Should put a limit on the size of the text area.
  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextArea(e.target.value);
  };

  const isRadioSelected = (radioValue: string) =>
    radioButtonValue === radioValue;

  return (
    <form className="my-4 p-2">
      <LabeledInput
        name="communityName"
        value={communityName}
        label="Community Name"
        id="communityName"
        labelSize={LabelSize.Large}
        changeHandler={handleChange}
      />
      <LabeledTextBox
        name="communityOverview"
        value={textArea}
        labelText="Profile"
        labelSize={LabelSize.Medium}
        changeHandler={handleTextArea}
      />
      <div className="flex flex-col space-y-2 py-3">
        <RadioButton
          name="privacy"
          value="0"
          onChange={handleChange}
          isSelected={isRadioSelected("0")}
        >
          <span className="font-bold p-2">Public</span>
        </RadioButton>
        <RadioButton
          name="privacy"
          value="1"
          onChange={handleChange}
          isSelected={isRadioSelected("1")}
        >
          <span className="font-bold p-2">Restricted</span>
        </RadioButton>
        <RadioButton
          name="privacy"
          value="2"
          onChange={handleChange}
          isSelected={isRadioSelected("2")}
        >
          <span className="font-bold p-2">Private</span>
        </RadioButton>
        <div className="py-3">
          <SurveyBuilder />
        </div>
      </div>
    </form>
  );
}

export default NewCommunityForm;
