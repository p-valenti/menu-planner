import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MenusContextProvider } from "./context/MenuContext";
import { AuthContextProvider } from "./context/AuthContext";
import { RecipesContextProvider } from "./context/RecipeContext";

// ReactDOM.createRoot(document.getElementById('root')).render(
//     <React.StrictMode>
//         <MenusContextProvider>
//             <App />
//         </MenusContextProvider>
//     </React.StrictMode>
// )

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MenusContextProvider>
        <RecipesContextProvider>
          <App />
        </RecipesContextProvider>
      </MenusContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
