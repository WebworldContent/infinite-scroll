import { useState, useCallback, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import ContentBody from "./ContentBody";

function Content() {
    const [notificationData, setNotificationData] = useState([]);
    const [index, setIndex] = useState(0);
    const [hasmore, setHasmore] = useState(true);
  
    const fetchData = useCallback(async () => {
      try {
        const response = await axios.get(
          `https://api.escuelajs.co/api/v1/products?offset=${index}&limit=15`
        );
  
        const { data } = response;
        setNotificationData((prevData) => [...prevData, ...data]);
        setHasmore(data.length > 0);
      } catch (error) {
        console.error(error);
      }
    }, [index]);
  
    const loadMore = () => {
      setIndex((prevIndx) => prevIndx + 5);
    };
  
    useEffect(() => {
      fetchData();
    }, [fetchData]);
  
    return (
      <div className="App">
        <div className="notify">
          <h2
            style={{ backgroundColor: "aqua", padding: "20px", marginTop: "0px" }}
          >
            Infinity Scroll
          </h2>
          <div className="inner-box" id="scrollableDiv">
            <InfiniteScroll
              dataLength={notificationData.length}
              next={loadMore}
              hasMore={hasmore}
              loader={<p>Loading...</p>}
              endMessage={<p>No more data to load</p>}
              scrollableTarget="scrollableDiv"
            >
              {notificationData.length > 0 ? (
                <ul className="list">
                  {notificationData.map((data, indx) => (
                    <li key={indx} style={{ margin: "11px" }}>
                      <ContentBody data={data}/>
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

export default Content