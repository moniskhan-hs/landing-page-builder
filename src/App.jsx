import { Route, BrowserRouter as Router, Routes } from "react-router"
import HomePage from "./pages/Home"
import Website from "./shared/Website"





const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/website/:id" element={<Website />} />

      </Routes>
    </Router>
  )
}

export default App
