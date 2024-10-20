import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Login from "./components/Login";
import TasksPage from "./components/TaskPage";
import { useState } from "react";

function App() {
  let [authenticated, setAuthenticated] = useState(false);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route
          path="/login"
          element={<Login setAuthenticated={setAuthenticated} />}
        ></Route>
        <Route path="/tasks" element={<TasksPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
