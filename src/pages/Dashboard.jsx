import Navbar from "../components/Navbar.jsx";

function Dashboard() {
	const userString = localStorage.getItem("user");
	const user = userString ? JSON.parse(userString).userData : null;

	return (
		<div className="flex flex-col justify-center items-center h-[85vh] text-white">
			<img
				className="w-[13rem] hue-rotate-180 brightness-200"
				src="/logo.png"
				alt=""
			/>
			<h1 className="mt-20 uppercase text-2xl">Dashboard</h1>
			<p className="mt-5 text-2xl text-green-500">
				Benvenuto, {user.name} {user.lastName}
			</p>

			<p className="mt-10 text-stone-400 underline">
				Clicca su "Blog" e guarda la lista degli articoli per sfogarti un po'
			</p>
		</div>
	);
}

export default Dashboard;
