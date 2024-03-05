import Carosel from "./Carousel.jsx";
import Featured from "./Featured.jsx";
import Improve from "./Improve.jsx";

export default function Home() {
  return (
    <div className="app-container d-flex flex-column">
      <Carosel />
      <Improve />
      <Featured />
    </div>
  );
}
