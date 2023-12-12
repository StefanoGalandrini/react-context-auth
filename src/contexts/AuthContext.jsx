import {createContext, useContext, useState} from "react";

const AuthContext = createContext();

export function AuthProvider({children}) {
	const [isLogged, setIsLogged] = useState(
		localStorage.getItem("token") !== null,
	);

	function authenticateUser(email, password) {
		const user = {email: "stefano@email.it", password: "password"};

		if (email === user.email && password === user.password) {
			setIsLogged(true);
			const fakeToken = "fake-jwt-token";
			localStorage.setItem("user", JSON.stringify({email}));
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
