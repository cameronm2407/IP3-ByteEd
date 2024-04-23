import "../style.css";
import htmlIcon from "./ImproveIcons/html.png";
import cssIcon from "./ImproveIcons/css.png";
import jsIcon from "./ImproveIcons/js.png";
import reactIcon from "./ImproveIcons/react.png";
import nodeIcon from "./ImproveIcons/node.png";
import tsIcon from "./ImproveIcons/ts.png";
import phpIcon from "./ImproveIcons/php.png";
import pythonIcon from "./ImproveIcons/python.png";
import dockerIcon from "./ImproveIcons/docker.png";
import jenkinsIcon from "./ImproveIcons/jenkins.png";

export default function ImproveIn() {
  return (
    <>
      <h1 className="mb-5 mt-5">Improve your skills in:</h1>

      <div className="grid-container mb-5">
        <div className="grid-item">
          <img src={htmlIcon} alt="html" />
        </div>
        <div className="grid-item">
          <img src={cssIcon} alt="css" />
        </div>
        <div className="grid-item">
          <img src={jsIcon} alt="js" />
        </div>
        <div className="grid-item">
          <img src={reactIcon} alt="react" />
        </div>
        <div className="grid-item">
          <img src={nodeIcon} alt="node" />
        </div>
        <div className="grid-item">
          <img src={tsIcon} alt="ts" />
        </div>
        <div className="grid-item">
          <img src={phpIcon} alt="php" />
        </div>
        <div className="grid-item">
          <img src={pythonIcon} alt="python" />
        </div>
        <div className="grid-item">
          <img src={dockerIcon} alt="docker" />
        </div>
        <div className="grid-item">
          <img src={jenkinsIcon} alt="jenkins" />
        </div>
      </div>
    </>
  );
}
