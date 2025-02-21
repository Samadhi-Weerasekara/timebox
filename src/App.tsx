import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import {LoginPage} from "./pages/LoginPage.tsx";
import {Signup} from "./pages/SignUp.tsx";


export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/signup" element={<Signup />} />

            </Routes>
        </BrowserRouter>
    );
};