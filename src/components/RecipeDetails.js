import { useRecipesContext } from "../hooks/useRecipesContext";
import { useAuthContext } from "../hooks/useAuthContext";

const RecipeDetails = ({ recipe }) => {
  const { dispatch } = useRecipesContext();
  const { user } = useAuthContext();
  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch("${process.env.REACT_APP_API_PROXY}/api/recipes/" + recipe._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_RECIPE", payload: json });
    }
  };

  const durationToString = (duration) => {
    const date = new Date(duration * 1000);
    let hrs = "";
    if (date.getUTCHours() > 0) {
        hrs = date.getUTCHours() + "hrs "
    }
    return hrs.concat(date.getUTCMinutes() + " min");
  };

  return (
      <div className="menu-details">
        <h4>Name: {recipe.name}</h4>
        <p>Time of preparation: {durationToString(recipe.prepTimeSec)}</p>
        <p>Time of cooking: {durationToString(recipe.cookTimeSec)}</p>
        <p>Ingredients: {recipe.ingredients}</p>
        <p>Recipe: {recipe.instruction}</p>
        <span className="material-symbols-outlined" onClick={handleClick}>
          delete
        </span>
      </div>
  );
};

export default RecipeDetails;
