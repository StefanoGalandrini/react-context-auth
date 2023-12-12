import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Register() {
	const [name, setName] = useState("");
	const [lastname, setLastname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const navigate = useNavigate();

	async function handleSubmit(event) {
		event.preventDefault();

		console.log("Dati di Registrazione:", {
			name,
			lastname,
			email,
			password,
		});

		if (password === confirmPassword) {
			// Implementa la logica di registrazione

			// salva in localStorage i dati dell'utente
			const fakeToken = "fake-jwt-token";
			const userData = {name, lastname, email};
			localStorage.setItem("token", fakeToken);
			localStorage.setItem("user", JSON.stringify(userData));
			// reindirizza l'utente alla dashboard
			navigate("/dashboard");
		} else {
			throw new Error("Le password non corrispondono");
		}
	}

	return (
		<div className="flex justify-center items-center h-screen">
			<form
				onSubmit={handleSubmit}
				className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
				{/* Campo Nome */}
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="name">
						Nome
					</label>
					<input
						onChange={(e) => setName(e.target.value)}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="name"
						type="text"
						placeholder="Inserisci il tuo nome"
					/>
				</div>
				{/* Campo Cognome */}
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="lastname">
						Cognome
					</label>
					<input
						onChange={(e) => setLastname(e.target.value)}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="lastname"
						type="text"
						placeholder="Inserisci il tuo cognome"
					/>
				</div>
				{/* Campo Email */}
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="email">
						Email
					</label>
					<input
						onChange={(e) => setEmail(e.target.value)}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="email"
						type="email"
						placeholder="Inserisci la tua email"
					/>
				</div>
				{/* Campo Password */}
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="password">
						Password
					</label>
					<input
						onChange={(e) => setPassword(e.target.value)}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="password"
						type="password"
						placeholder="Inserisci una password"
					/>
				</div>
				{/* Campo Conferma Password */}
				<div className="mb-6">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="confirm-password">
						Conferma Password
					</label>
					<input
						onChange={(e) => setConfirmPassword(e.target.value)}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="confirm-password"
						type="password"
						placeholder="Conferma la tua password"
					/>
				</div>
				{/* Bottone per la Registrazione */}
				<div className="flex items-center justify-between">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit">
						Registra
					</button>
				</div>
			</form>
		</div>
	);
}
