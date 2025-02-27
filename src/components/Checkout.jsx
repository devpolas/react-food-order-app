import { useActionState } from "react";
import { useCart } from "../contexts/CartContextAPI";
import { useUserProgressCheckout } from "../contexts/UserProgressContext.jsx";
import Button from "../UI/Button.jsx";
import Model from "../UI/Model";
import { formateCurrency } from "./../utils/formatting.js";
import Input from "./Input.jsx";
import { isEmail, isEmpty } from "./../validations/validations.js";
import Submit from "./Submit.jsx";
import useHttps from "../https/useHttps";
import Error from "./Error.jsx";

const URL = "http://localhost:3000/orders";
const reqConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const { items, clearItems } = useCart();
  const { progress, hideCartCheckout } = useUserProgressCheckout();

  const { data, isLoading, isError, sendRequest, clearData } = useHttps(
    URL,
    reqConfig
  );

  const totalPrice = items.reduce((acc, cur) => {
    return acc + cur.quantity * cur.price;
  }, 0);

  function closeCheckout() {
    hideCartCheckout();
  }

  async function formActions(prevState, formData) {
    // const userData  = Object.fromEntries(formData.entries())
    const name = formData.get("name");
    const email = formData.get("email");
    const street = formData.get("street");
    const postalCode = formData.get("postal-code");
    const city = formData.get("city");

    const errors = {};

    if (!isEmpty(email) && !isEmail(email)) {
      errors.email =
        "Please provide a valid email address for future connect with you!";
    }

    if (!isEmpty(name)) {
      errors.name = "Please Provide Your Name!";
    }

    if (!isEmpty(street)) {
      errors.street = "Please provide your street and help us for delivery!";
    }
    if (!isEmpty(postalCode)) {
      errors.postalCode =
        "Please provide your postal code and help us for identify your street!";
    }
    if (!isEmpty(city)) {
      errors.city =
        "Please provide your city and help us for identify your postal code and street!";
    }

    if (Object.keys(errors).length) {
      return { errors, email, name, postalCode, street, city };
    }

    const customer = { email, name, street, postalCode, city };

    await sendRequest(
      JSON.stringify({
        order: {
          items,
          customer,
        },
      })
    );

    return { errors: null };
  }

  const [formState, formAction] = useActionState(formActions, { errors: null });
  function handleFinished() {
    hideCartCheckout();
    clearItems();
    clearData();
  }

  if (data && !isError) {
    return (
      <Model open={progress === "checkout"} onClose={handleFinished}>
        <h2>Your order was successfully submitted!</h2>
        <p>Our Team contact you after few minutes!</p>
        <p className="model-actions">
          <Button onClick={handleFinished}>Okay</Button>
        </p>
      </Model>
    );
  }

  return (
    <Model
      open={progress === "checkout"}
      onClose={progress === "checkout" ? closeCheckout : null}
    >
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Price: {formateCurrency.format(totalPrice)} </p>
        <Input
          defaultValue={formState.name}
          label={"Full Name"}
          type={"text"}
          id={"name"}
        />
        {formState.errors?.name && (
          <p className="error"> {formState.errors.name} </p>
        )}
        <Input
          defaultValue={formState.email}
          label={"Email Address"}
          type={"email"}
          id={"email"}
        />
        {formState.errors?.email && (
          <p className="error"> {formState.errors.email} </p>
        )}
        <Input
          defaultValue={formState.street}
          label={"Street"}
          type={"text"}
          id={"street"}
        />
        {formState.errors?.street && (
          <p className="error"> {formState.errors.street} </p>
        )}

        <div className="control-row">
          <div>
            <Input
              defaultValue={formState.postalCode}
              label={"Postal Code"}
              id={"postal-code"}
              type={"number"}
            />
            {formState.errors?.postalCode && (
              <p className="error"> {formState.errors.postalCode} </p>
            )}
          </div>

          <div>
            <Input
              defaultValue={formState.city}
              label={"City"}
              id={"city"}
              type={"text"}
            />
            {formState.errors?.city && (
              <p className="error"> {formState.errors.city} </p>
            )}
          </div>
        </div>
        {isError && <Error title={"Fail to order"} message={isError.message} />}
        <p className="modal-actions">
          {!isLoading && (
            <Button onClick={closeCheckout} type="button" textOnly>
              Close
            </Button>
          )}
          <Submit />
        </p>
      </form>
    </Model>
  );
}
