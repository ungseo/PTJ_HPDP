export default interface ButtonInterface {
  text: string;
  disabled?: boolean;
  onClick?: any;
  id?: string;
  styles?: { [key: string]: string };
}

export default interface InputInterface {
  id?: string;
  value?: string;
  placeholder?: string;
  onChange?: any;
}
