import { useCart } from "./../contexts//CartContextAPI.jsx";
import Button from "./../UI/Button.jsx";
import { formateCurrency } from "./../utils/formatting.js";
export default function MealItems({ meal }) {
  const { addItem } = useCart();
  function addMeal(meal) {
    addItem(meal);
  }
  const { image, name, price, description } = meal;
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${image}`} alt={name} />
        <div>
          <h3>{name}</h3>
          <p className="meal-item-price">{formateCurrency.format(price)}</p>
          <p className="meal-item-description">{description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={() => addMeal(meal)}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
