import Navbar from "../components/Navbar.jsx";

function Dashboard() {
	const user = JSON.parse(localStorage.getItem("user"));

	return (
		<div className="flex flex-col justify-center items-center h-[85vh] text-white">
			<img className="w-[13rem]" src="/logo.png" alt="" />
			<h1 className="mt-20 uppercase text-2xl">Dashboard</h1>
			<p className="mt-5 text-2xl text-fuchsia-600">
				Benvenuto, {user.name} {user.lastname}
			</p>

			<p className="mt-10 text-stone-400 underline">
				Clicca su "Blog" e guarda la lista degli articoli per sfogarti un po'
			</p>
		</div>
	);
}

export default Dashboard;
