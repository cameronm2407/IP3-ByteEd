import Carosel from "./Carousel.jsx";
import Featured from "./Featured.jsx";
import ImproveIn from "./ImproveIn/ImproveIn.jsx";

export default function Home() {
  return (
    <div className="app-container d-flex flex-column align-items-center w-100">
      <Carosel />
      <ImproveIn />
      <Featured />
    </div>
  );
}
