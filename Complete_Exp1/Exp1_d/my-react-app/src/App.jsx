import { useContext } from "react";
import { FormContext } from "./FormContext";
import "./App.css";

function App() {
  const { name, setName, email, setEmail, submitted, handleSubmit } = useContext(FormContext);

  return (
    <div className="container">
      <h1>Simple Form SPA</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Submit</button>
      </form>

      {submitted && (
        <div className="output">
          <h3>Submitted Data</h3>
          <p>Name: {name}</p>
          <p>Email: {email}</p>
        </div>
      )}
    </div>
  );
}

export default App;
