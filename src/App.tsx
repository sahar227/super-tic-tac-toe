import GameScreen from "./components/GameScreen/GameScreen";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GameSettingsScreen from "./components/GameSettingsScreen/GameSettingsScreen";
import Title from "./components/Title/Title";

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
      <Title text="Super Tic-Tac-Toe" />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
