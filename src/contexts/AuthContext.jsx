import {createContext, useContext, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import fetchApi from "../utilities/fetchApi";

const AuthContext = createContext();

export function AuthProvider({children}) {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(
		() => localStorage.getItem("token") ?? null,
	);
	const [isLogged, setIsLogged] = useState(null);
	const [initComplete, setInitComplete] = useState(false);
	const navigate = useNavigate();

	function handleLoginOrRegistration(response) {
		setUser(response.user);
		setIsLogged(true);
		storeToken(response.token);
	}

	function handleLogout() {
		setUser(null);
		storeToken(null);
		setIsLogged(false);
		localStorage.removeItem("token");

		setTimeout(() => {
			navigate("/");
		});
	}

	function storeToken(token) {
		setToken(token);
		localStorage.setItem("token", token);
	}

	async function fetchLoggedUser() {
		const {user} = await fetchApi("/me");
		setUser(user);
		setIsLogged(true);
	}

	async function initializeData() {
		if (token) {
			await fetchLoggedUser();
		}
		setInitComplete(true);
	}

	useEffect(() => {
		initializeData();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				isLogged,
				handleLoginOrRegistration,
				handleLogout,
				initComplete,
			}}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
