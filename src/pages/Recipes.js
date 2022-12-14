import { useRecipesContext } from "../hooks/useRecipesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import RecipeDetails from "../components/RecipeDetails";
import RecipeForm from "../components/RecipeForm";
import React, { useEffect } from "react";

const Recipes = () => {
  const { recipes, dispatch } = useRecipesContext();
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch("/api/recipes", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_RECIPES", payload: json });
      }
    };
    if (user) {
      fetchRecipes();
    }
  }, [dispatch, user]);

  return (
    <div className="home" id="recipes">
      <div className="menus">
        {recipes &&
          recipes.map((recipe) => (
            <RecipeDetails key={recipe._id} recipe={recipe} />
          ))}
      </div>
      <RecipeForm />
    </div>
  );
};

export default Recipes;
