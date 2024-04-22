import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

// Pages
import Home from "./pages/Home/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Search from "./pages/Search/Search.jsx";
import SignUp from "./pages/LoginSignUp/SignUp.jsx";
import Login from "./pages/LoginSignUp/LogIn.jsx";
import Watch from "./pages/Watch/Watch.jsx";
import VideoUpload from "./pages/videoUpload/VideoUpload.jsx";
import SingleVideoPanel from "./pages/CreatorPanel/SingleVideoPanel.jsx";
import FirstPanelPage from "./pages/CreatorPanel/FirstPanelPage.jsx";
import Course from "./pages/Course/Course.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import CreatorPanel from "./pages/CreatorPanel/CourseCreatorPanel/CreatorPanel.jsx";
import CreatorCourse from "./pages/CreatorPanel/CreatorCourseVideoPanel/CreatorCourse.jsx";

// Layouts
import RootLayout from "./layouts/RootLayout.jsx";
import { First } from "react-bootstrap/esm/PageItem.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="profile" element={<Profile />} />
      <Route path="search" element={<Search />} />
      <Route path="register" element={<SignUp />} />
      <Route path="login" element={<Login />} />
      <Route path="watch/:videoId" element={<Watch />} />
      <Route path="watch" element={<Home />} />
      <Route path="videoupload" element={<VideoUpload />} />
      <Route path="videoupload" element={<VideoUpload />} />
      <Route path="course/:courseId" element={<Course />} />
      <Route path="creatorPanel/courses/:userId" element={<CreatorPanel />} />
      <Route
        path="creatorPanel/courseVideos/:courseId"
        element={<CreatorCourse />}
      />
      <Route
        path="creatorPanel/videos/:userId"
        element={<SingleVideoPanel />}
      />
      <Route path="/creatorPanel" element={<FirstPanelPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
