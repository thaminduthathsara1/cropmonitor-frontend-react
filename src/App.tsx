import Dashboard from "./component/Dashboard.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootLayout from "./component/RootLayout.tsx";
import StaffPage from "./pages/StaffPage.tsx";
import {Toaster} from "react-hot-toast";
import VehiclePage from "./pages/VehiclePage.tsx";
import FieldPage from "./pages/FieldPage.tsx";



function App() {
  const routes = createBrowserRouter([
      {
          path: '',
          element: <RootLayout />,
          children: [
              {path: '', element: <Dashboard />},
              {path: '/staff', element: <StaffPage />},
              {path:'/vehicle', element: <VehiclePage/>},
              {path:'/field', element: <FieldPage/>},
          ]
      }
  ])
  return (
    <>
        <Toaster position={"top-center"}/>
      <RouterProvider router={routes} />
    </>
  )
}

export default App
