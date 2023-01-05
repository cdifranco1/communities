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

export default RadioButton;
