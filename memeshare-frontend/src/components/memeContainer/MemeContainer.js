import { Alert } from "react-bootstrap";
import Meme from "./meme/Meme";
import "./MemeContainer.css";

const MemeContainer = ({ memes, getMemes }) => {
  return (
    <div className="MemeContainer">
      <div>
        {memes.map((meme) => (
          <Meme key={meme.id} meme={meme} getMemes={getMemes} />
        ))}
      </div>
    </div>
  );
};

export default MemeContainer;
