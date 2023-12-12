import {createContext, useContext, useState} from "react";

const AuthContext = createContext();

export function AuthProvider({children}) {
	const [isLogged, setIsLogged] = useState(
		localStorage.getItem("token") !== null,
	);

	function authenticateUser(email, password) {
		const user = {
			name: "Stefano",
			lastName: "Galandrini",
			email: "stefano@email.it",
			password: "password",
		};

		if (email === user.email && password === user.password) {
			setIsLogged(true);
			const fakeToken = "fake-jwt-token";
			const userData = {
				name: user.name,
				lastName: user.lastName,
				email: user.email,
				password: user.password,
			};
			localStorage.setItem("user", JSON.stringify({userData}));
			localStorage.setItem("token", fakeToken);
			return true;
		}
		return false;
	}

	function logout() {
		setIsLogged(false);
		localStorage.removeItem("user");
		localStorage.removeItem("token");
	}

	return (
		<AuthContext.Provider value={{isLogged, authenticateUser, logout}}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
