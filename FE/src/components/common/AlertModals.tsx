import Swal from "sweetalert2";

interface LibModalInterface {
  title?: string;
  text: string;
  footer?: string;
}

export const NotOkModal = ({ title, text, footer }: LibModalInterface) => {
  return Swal.fire({ icon: "error", title, text, footer });
};

export const OkModal = ({ title, text, footer }: LibModalInterface) => {
  return Swal.fire({ icon: "success", title, text, footer });
};

export const QuestionModal = ({
  title = "???",
  text,
  footer,
}: LibModalInterface) => {
  return Swal.fire({ icon: "question", title, text, footer });
};
