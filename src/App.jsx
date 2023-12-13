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
			<BrowserRouter>
				<AuthProvider>
					<Routes>
						<Route element={<DefaultLayout />}>
							<Route index path="/" element={<Home />} />
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
							<Route element={<ProtectedRoute />}>
								<Route path="/dashboard" element={<Dashboard />} />
								<Route path="/blog" element={<Blog />} />
								<Route path="/blog/:slug" element={<Show />} />
							</Route>
						</Route>
					</Routes>
				</AuthProvider>
			</BrowserRouter>
		</>
	);
}
