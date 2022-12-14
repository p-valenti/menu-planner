import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="about">
      <div>
        <p>
          This is a site for <br />
          creating food menu and <br />
          working with recipes.
        </p>
        <div className="link">
          <Link to="/menus">
            <h1>Food menu</h1>
          </Link>
          <Link to="/recipes">
            <h1>Recipes</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
