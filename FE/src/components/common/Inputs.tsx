import InputInterface from "../../interface/commonInterface";

const DefaultInputs = ({
  value,
  placeholder,
  onChange,
  id,
}: InputInterface) => {
  return <input type="text" />;
};

export default DefaultInputs;
