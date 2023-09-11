import styleInterface from "./styleInterface";

export default interface ButtonInterface {
  text: string;
  disabled?: boolean;
  onClick?: any;
  id?: string;
  styles?: styleInterface;
}

export interface InputInterface {
  id?: string;
  type: string;
  value?: string;
  onChange?: any;
  styles?: styleInterface;
  labelTitle: string | "";
}
