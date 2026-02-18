import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import "./App.css";

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={theme}>
      <h1>Theme Toggle SPA</h1>
      <p>Current Theme: {theme.toUpperCase()}</p>

      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </div>
  );
}

export default App;
