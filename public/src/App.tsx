import { BrowserRouter, Route, Routes } from "react-router-dom"
import Chat from "./pages/Chat"
import Login from "./pages/Login"
import Register from "./pages/Register"
import SetAvatar from "./pages/SetAvatar"

const App = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/setAvatar" element={<SetAvatar />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/" element={<Login />} />
         </Routes>
      </BrowserRouter>
   )
}

export default App
