import styleInterface from "./styleInterface";

export default interface ButtonInterface {
  text: string;
  disabled?: boolean;
  onClick?: any;
  id?: string;
  styles?: styleInterface;
  type?: "button" | "reset" | "submit" | undefined;
}

export interface InputInterface {
  id?: string;
  type: string;
  value?: string;
  onChange?: any;
  styles?: styleInterface;
  labelTitle: string | "";
  required?: boolean;
  disabled?: boolean;
}

export interface AscendingNumberInterface {
  num: number;
  fs?: string;
  unit?: string;
}
