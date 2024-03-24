import { Routes, Route } from "react-router-dom"
import LandingPage from "./components/LandingPage";
import UserDashboard from "./components/UserDashboard";
import Login from "./Login";
import Register from "./Register";
import NotFound from "./components/NotFound";
import Quiz from "./components/Quiz";
import ProfilePage from "./components/ProfilePage";
import Calendar from "./components/Calender";
import Reports from "./components/Reports";
function App() {
  return (
    <div>
      
      <Routes>
        <Route exact path="/" element={ <LandingPage/> } />
        <Route path="/register" element={ <Register/> } />
        <Route path="/login" element={ <Login/> } />
        
        <Route path="/dashboard" element={ <UserDashboard/> } />
        <Route path="/quiz" element={ <Quiz/> } />
        <Route path="/profile" element={ <ProfilePage/> } />
        <Route path="/calender" element={ <Calendar/>}/>
        <Route path="/reports" element={ <Reports/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
