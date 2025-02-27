import useHttps from "../https/useHttps";
import Error from "./Error";
import MealItems from "./MealItems";
const URL = "http://localhost:3000/meals";
const INITIAL_METHOD = {};
export default function Meals() {
  const { data: meals, isLoading, isError } = useHttps(URL, INITIAL_METHOD, []);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <Error title="Fail to fetch meals" message={isError.message} />;
  }
  return (
    <ul id="meals">
      {meals.length > 0 &&
        meals.map((meal) => <MealItems key={meal.id} meal={meal} />)}
    </ul>
  );
}
