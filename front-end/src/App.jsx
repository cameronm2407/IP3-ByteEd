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

// Layouts
import RootLayout from './layouts/RootLayout.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='saved' element={<Saved />} />
      <Route path='search' element={<Search />} />
    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={router} /> 
  );
}

export default App;
