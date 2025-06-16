import { BrowserRouter } from "react-router-dom";
import RekberDetailPage from "./pages/RekberDetailPage";
import { UserDetail } from "./pages/UserDetail";

function App() {
  return (
    <BrowserRouter>
      <UserDetail />
    </BrowserRouter>
  );
}

export default App;
