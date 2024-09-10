
import Root from "./components/Root"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import PostDetail from "./components/PostDetail";
import './mock/index';


import styles from "./App.module.css";
function App() {

  const router = createBrowserRouter([
    {path: '/PostListingsApp', element: <Root/> },
    { path: '/PostListingsApp/posts/:id', element: <PostDetail /> },
  ])

  return <div className = {styles.container} >{
    
    <RouterProvider router = {router}/>
    /* Complete the exercise here. */}</div>;
}

export default App;
