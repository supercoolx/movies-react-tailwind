import { useRoutes } from "react-router-dom";
import routes from "./routes";
import Header from "src/components/Header";

const App = () => {
  const routing = useRoutes(routes);
  return (
    <div className="min-h-screen px-12 py-6 bg-black">
      <Header />
      <>{routing}</>
    </div>
  );
};

export default App;
