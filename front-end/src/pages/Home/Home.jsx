import Carosel from "./Carousel.jsx";
import Featured from "./Featured/Featured.jsx";
import ImproveIn from "./ImproveIn/ImproveIn.jsx";

export default function Home() {
  return (
    <div className="app-container d-flex flex-column align-items-center w-100">
      <Carosel />
      <ImproveIn />
      <h1>Featured</h1>
      <div className="text-center">
        <div></div>
        <Featured
        title="another example"
        imageUrl="http://www.codingwithruss.com/wp-content/uploads/2023/07/module_not_found_thumb.png"
        rating={3}
        videoLength={99}
        videoLink="https://www.youtube.com/watch?v=Q3I_NwaCZI8"
        />

        <Featured
        title="example overflow and more text"
        imageUrl="https://i.ytimg.com/vi/zOjov-2OZ0E/maxresdefault.jpg"
        rating={4}
        videoLength={33}
        videoLink="https://www.youtube.com/watch?v=Q3I_NwaCZI8"
        />

        <Featured
        title="example tutorial & text overflow this is too long"
        imageUrl="https://i.ytimg.com/vi/PfboK_HccW0/maxresdefault.jpg"
        rating={2}
        videoLength={66}
        videoLink="https://www.youtube.com/watch?v=Q3I_NwaCZI8"
        />

        <Featured
        title="example tutorial & text overflow this is too long"
        imageUrl="https://embed-ssl.wistia.com/deliveries/b0f7c2aedf367583230a74ea6a92070c.webp?image_crop_resized=1280x720"
        rating={3}
        videoLength={9000}
        videoLink="https://www.youtube.com/watch?v=Q3I_NwaCZI8"
        />

        <Featured
        title="example tutorial & text overflow this is too long"
        imageUrl="https://i.ytimg.com/vi/__izua1kKeI/maxresdefault.jpg"
        rating={4}
        videoLength={400}
        videoLink="https://www.youtube.com/watch?v=Q3I_NwaCZI8"
        />

        <Featured
        title="example tutorial & text overflow this is too long"
        imageUrl="https://www.softwaretestinghelp.com/wp-content/qa/uploads/2019/11/Basics-of-Computer-Programming.png"
        rating={5}
        videoLength={20}
        videoLink="https://www.youtube.com/watch?v=Q3I_NwaCZI8"
        />
      </div>
      
    </div>
  );
}
