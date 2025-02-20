import { Route, BrowserRouter as Router, Routes } from "react-router"
import HomePage from "./pages/Home"





const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<HomePage />} />

      </Routes>
    </Router>
  )
}

export default App
