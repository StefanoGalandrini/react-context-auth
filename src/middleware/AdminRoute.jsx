import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";

export default function ProtectedRoute() {
	const {isLogged} = useAuth();

	return isLogged ? <Outlet /> : <Navigate to="/login" />;
}
