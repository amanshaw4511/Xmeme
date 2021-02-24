import { useEffect, useState } from "react";
import MainContainer from "./components/MainContainer";

function App() {
  const [memes, setMemes] = useState([]);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    getMemes();
  }, []);

  /**
   * fetch list of 100 recents posted memes
   */
  const getMemes = async () => {
    await fetch(process.env.REACT_APP_URL + "/memes")
      .then((response) => {
        if (!response.ok) throw new Error("Error Code : " + response.status);
        return response.json();
      })
      // response is ok , then update components
      .then(data => {
        setMemes(data);
        setShowLoading(false);
      })
      .catch((error) => {
        setShowLoading(true);
        console.error(error);
      });
  };

  return (
    <div className="App">
      <MainContainer memes={memes} getMemes={getMemes} showLoading={showLoading}/>
    </div>
  );
}

export default App;
