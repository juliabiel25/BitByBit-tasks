import CustomInfiniteScroll from "./CustomInfiniteScroll";
import "./App.css";

function App() {
  let items = new Array(1000000).fill(0);
  items = items.map((item, index) => index);

  return (
    <div className="App">
      <CustomInfiniteScroll
        items={items}
        elementsPerPage={100} // how many items will be rendered at once
        loadingThreshold={90} // which element should be the trigger to render more items
        // (must be >= 0 && <= elementsPerPage)
      />
    </div>
  );
}

export default App;
