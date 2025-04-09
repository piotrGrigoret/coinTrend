

import { Route, Routes } from "react-router-dom"
import { MainLayout } from "./layouts/MainLayout"
import { MainPage } from "./pages/MainPage"
import { Portfolio } from "./pages/Portfolio"
import { NotFound } from "./pages/NotFound"
function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<MainLayout/>}>
        <Route path="/" element={<MainPage/>}></Route>
        <Route path="/portfolio" element={<Portfolio/>}></Route>
        <Route path="/*" element={<NotFound/>}></Route>
      </Route>
    </Routes>
    </>
  )
}

export default App
