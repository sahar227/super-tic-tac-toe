import GameScreen from "./components/GameScreen/GameScreen";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GameSettingsScreen from "./components/GameSettingsScreen/GameSettingsScreen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GameSettingsScreen />,
  },
  {
    path: "/game",
    element: <GameScreen />,
  },
]);

function App() {
  return (
    <div style={{ width: "100vw", textAlign: "center" }}>
      <h1>Super Tic-Tac-Toe</h1>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
