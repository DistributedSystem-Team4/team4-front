import { useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthProvider";

function Logout() {

	const { auth, setAuth } = useContext(AuthContext);

	const navigate = useNavigate();
	
	const logout = () => {
		
		localStorage.removeItem("board_access_token");
		localStorage.removeItem("id");

		alert(auth + "님, 성공적으로 로그아웃 됐습니다 .");
		setAuth(null);
		
		navigate("/");
	};

	useEffect(() => {
		logout();
	}, []);

}

export default Logout;