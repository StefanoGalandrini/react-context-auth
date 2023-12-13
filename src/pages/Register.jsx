import {useState} from "react";
import {useAuth} from "../contexts/AuthContext";
import {useNavigate} from "react-router-dom";
import fetchApi from "../utilities/fetchApi";
import {handleInputChange} from "../utilities/handleInputChange";

export default function Register() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		role: "user",
	});
	const [confirmPassword, setConfirmPassword] = useState("");
	const navigate = useNavigate();
	const {handleLoginOrRegistration} = useAuth();
	const [error, setError] = useState("");

	async function handleSubmit(event) {
		event.preventDefault();
		setError(null);

		if (formData.password !== confirmPassword) {
			setError("Le password non corrispondono");
			return;
		}

		try {
			const response = await fetchApi("/users", "POST", formData);
			if (response && response.token) {
				handleLoginOrRegistration(response);
				navigate("/dashboard");
			}
		} catch (error) {
			setError(error.message);
		}
	}

	return (
		<div className="flex justify-center items-center h-screen">
			<form
				onSubmit={handleSubmit}
				className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
				{error && <div className="text-red-500">{error}</div>}
				{/* Campo Nome */}
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="name">
						Nome e Cognome
					</label>
					<input
						onChange={(e) => handleInputChange(e, "name", setFormData)}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="name"
						type="text"
						name="name"
						placeholder="Inserisci il tuo nome"
					/>
				</div>
				{/* Campo Cognome
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
				</div> */}
				{/* Campo Email */}
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="email">
						Email
					</label>
					<input
						onChange={(e) => handleInputChange(e, "email", setFormData)}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="email"
						type="email"
						name="email"
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
						onChange={(e) => handleInputChange(e, "password", setFormData)}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="password"
						type="password"
						name="password"
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
						name="confirm-password"
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
