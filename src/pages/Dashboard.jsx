import Navbar from "../components/Navbar.jsx";
import {useAuth} from "../contexts/AuthContext.jsx";

function Dashboard() {
	const auth = useAuth();
	const user = auth.user;

	return (
		<div className="flex flex-col justify-center items-center h-[85vh] text-white">
			<img
				className="w-[8rem] hue-rotate-180 brightness-200"
				src="/logo.png"
				alt=""
			/>
			<h1 className="mt-20 uppercase text-4xl">Dashboard</h1>
			<p className="mt-5 text-6xl text-green-500">Benvenuto/a, {user.name}</p>

			<p className="mt-10 text-stone-400">
				Clicca su "Blog", guarda la lista degli articoli
			</p>
			<p className="mt-2 text-stone-400">
				e scrivine uno tu per sfogarti un po'
			</p>
		</div>
	);
}

export default Dashboard;
