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
import Saved from "./pages/Saved.jsx";
import Search from "./pages/Search/Search.jsx";
import SignUp from "./pages/LoginSignUp/SignUp.jsx";
import Login from "./pages/LoginSignUp/LogIn.jsx";
import Watch from "./pages/Watch/Watch.jsx";
import VideoUpload from "./pages/videoUpload/VideoUpload.jsx";

import Course from "./pages/Course/Course.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import CreatorPanel from "./pages/CreatorPanel/MainCreatorPanel/CreatorPanel.jsx";
import CreatorCourse from "./pages/CreatorPanel/CreatorCoursePanel/CreatorCourse.jsx";
// Layouts
import RootLayout from "./layouts/RootLayout.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="profile" element={<Profile />} />
      <Route path="saved" element={<Saved />} />
      <Route path="search" element={<Search />} />
      <Route path="register" element={<SignUp />} />
      <Route path="login" element={<Login />} />
      <Route path="watch/:videoId" element={<Watch />} />
      <Route path="watch" element={<Home />} />
      <Route path="videoupload" element={<VideoUpload />} />
      <Route path="videoupload" element={<VideoUpload />} />
      <Route path="course/:courseId" element={<Course />} />
      <Route path="creatorPanel/main/:userId" element={<CreatorPanel />} />
      <Route path="creatorPanel/main/:userId" element={<CreatorPanel />} />
      <Route path="creatorPanel/course/:courseId" element={<CreatorCourse />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
