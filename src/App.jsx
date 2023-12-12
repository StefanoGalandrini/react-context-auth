import {BrowserRouter, Routes, Route} from "react-router-dom";
import {AuthProvider} from "./contexts/AuthContext.jsx";
import Home from "./pages/Home.jsx";
import Blog from "./pages/Blog.jsx";
import Show from "./pages/Show.jsx";
import DefaultLayout from "./pages/DefaultLayout.jsx";
import ProtectedRoute from "./middleware/AdminRoute.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";

export default function App() {
	return (
		<>
			<AuthProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route element={<DefaultLayout />}>
							<Route path="/" element={<Home />} />
							<Route element={<ProtectedRoute />}>
								<Route path="/blog" element={<Blog />} />
								<Route path="/blog/:slug" element={<Show />} />
							</Route>
						</Route>
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</>
	);
}
