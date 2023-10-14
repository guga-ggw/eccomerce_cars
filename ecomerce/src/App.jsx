import { useState } from 'react'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import routes from './Route/route';

function App() {
  return <RouterProvider router={createBrowserRouter(routes)}/>
}

export default App
