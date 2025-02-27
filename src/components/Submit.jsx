import { useFormStatus } from "react-dom";
import Button from "../UI/Button";

export default function Submit() {
  const { pending } = useFormStatus();
  return <Button>{pending ? "Submitting" : "Submit"}</Button>;
}
