import {BrowserRouter, Routes, Route} from "react-router-dom";

import Home from "./pages/Home.jsx";
import Blog from "./pages/Blog.jsx";
import Show from "./pages/Show.jsx";
import DefaultLayout from "./pages/DefaultLayout.jsx";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route element={<DefaultLayout />}>
						<Route path="/" element={<Home />} />
						<Route path="/Blog" element={<Blog />} />
						<Route path="/blog/:slug" element={<Show />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
