import { useState, useEffect } from "react";
import "./App.css";

const CustomInfiniteScroll = ({ items, elementsPerPage, loadingThreshold }) => {
  const [page, setPage] = useState(1);
  const [threshholdVisible, setThresholdVisible] = useState(false);
  const thresholdItems = document.getElementsByClassName("scrollingThreshold");
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  };

  const loadMoreItems = () => {
    setPage((prev) => ++prev);
  };

  useEffect(() => {
    if (threshholdVisible) {
      console.log("threshold");
      loadMoreItems();
    }
  }, [threshholdVisible]);

  const thresholdEntryObserved = (entries) => {
    setThresholdVisible(entries[0].isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(thresholdEntryObserved, options);
    if (thresholdItems.length > 0)
      observer.observe(thresholdItems[thresholdItems.length - 1]);

    return () => {
      if (thresholdItems.length > 0)
        observer.unobserve(thresholdItems[thresholdItems.length - 1]);
    };
  }, [thresholdItems, options]);

  const preThresholdItems = items.slice(
    0,
    (page - 1) * elementsPerPage + loadingThreshold - 1
  );

  const postThresholdItems = (page - 1) * elementsPerPage + loadingThreshold <= items.length
    ? items.slice(
        (page - 1) * elementsPerPage + loadingThreshold,
        page * elementsPerPage - 1
      )
    : items.slice(page * elementsPerPage - loadingThreshold);
  
  return (
    <>
      {preThresholdItems.map((item, index) => (
        <div className="list-item" key={"1-" + index.toString()}>
          {item}
        </div>
      ))}

      <div className="list-item scrollingThreshold">
        {items[page * elementsPerPage - 1 - loadingThreshold]}
      </div>

      {postThresholdItems.map((item, index) => (
        <div className="list-item" key={"2-" + index.toString()}>
          {item}
        </div>
      ))}
    </>
  );
};

export default CustomInfiniteScroll;