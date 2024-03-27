import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

// Pages
import Home from './pages/Home/Home.jsx';
import Saved from './pages/Saved.jsx';
import Search from './pages/Search/Search.jsx'
import SignUp from './pages/LoginSignUp/SignUp.jsx';
import Login from './pages/LoginSignUp/LogIn.jsx';
import Watch from './pages/Watch/Watch.jsx';
import VideoUpload from './pages/videoUpload/VideoUpload.jsx';

// Layouts
import RootLayout from './layouts/RootLayout.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='saved' element={<Saved />} />
      <Route path='search' element={<Search />} />
      <Route path='register' element={<SignUp />} />
      <Route path='login' element={<Login />} />
      <Route path='watch/:videoId' element={<Watch />} />
      <Route path='watch' element={<Home />} />
      <Route path='videoupload' element={<VideoUpload />} />
    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={router} /> 
  );
}

export default App;
