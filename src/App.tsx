import AppFooter from "components/AppFooter/AppFooter";
import AppHeader from "components/AppHeader/AppHeader";
import RouteProvider from "RouteProvider";

function App() {
  return (
    <>
      <AppHeader />
      <RouteProvider />
      <AppFooter />
    </>
  );
}

export default App;
