import { useState, useCallback, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import "./App.css";

function App() {
  const [notificationData, setNotificationData] = useState([]);
  const [index, setIndex] = useState(0);
  const [hasmore, setHasmore] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/products?offset=${index}&limit=15`
      );
      console.log(response);
      const { data } = response;
      setNotificationData((prevData) => [...prevData, ...data]);
      setIndex((prevIndx) => prevIndx + 5);
      data.length > 0 ? setHasmore(true) : setHasmore(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App">
      <div className="notify">
        <h2
          style={{ backgroundColor: "aqua", padding: "20px", marginTop: "0px" }}
        >
          Notification Header
        </h2>
        <div className="inner-box" id="scrollableDiv">
          <InfiniteScroll
            dataLength={notificationData.length}
            next={fetchData}
            hasMore={hasmore}
            loader={<p>Loading...</p>}
            endMessage={<p>No more data to load</p>}
            scrollableTarget="scrollableDiv"
          >
            {notificationData.length > 0 ? (
              <ul className="list">
                {notificationData.map((data, indx) => (
                  <li key={indx} style={{ margin: "11px" }}>
                    {data?.title || ""}
                  </li>
                ))}
              </ul>
            ) : (
              <h3>No Data...</h3>
            )}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}

export default App;
