/* 로그인 컴포넌트 */

import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthProvider";
import { HttpHeadersContext } from "../Context/HttpHeadersProvider";

function Login() {

	const { auth, setAuth } = useContext(AuthContext);
	const { headers, setHeaders } = useContext(HttpHeadersContext);

	const navigate = useNavigate();

	const [id, setId] = useState("");
	const [pwd, setPwd] = useState("");

	const changeId = (event) => {
		setId(event.target.value);
	}

	const changePwd = (event) => {
		setPwd(event.target.value);
	}

    // Login api
	const login = async () => {

		const req = {
			userId: id,
			passwd: pwd
		}

		await axios.post("http://203.252.166.225:8080/user/login", req)
		.then((resp) => {
			console.log("[Login.js] login() success :D");
			console.log(resp.data);

				alert(resp.data.result.userId + "님, 성공적으로 로그인 되었습니다 🔐" );

				// JWT 토큰 저장
				localStorage.setItem("board_access_token", resp.headers.get("Authorization"));
				localStorage.setItem("id", req.userId);

				setAuth(req.userId); // 사용자 인증 정보(아이디 저장)
				setHeaders({"Authorization": `${resp.headers.get("Authorization")}`}); // 헤더 Authorization 필드 저장
				console.log("header : "+ resp.headers.get("Authorization"))

				navigate("/boardlist");
			

		}).catch((err) => {
			console.log("[Login.js] login() error :<");
			console.log(err);

			alert("⚠️ " + err.response);
		});
	}

	return (
		<div>
			<table className="table">
				<tbody>
					<tr>
						<th className="col-3">아이디</th>
						<td>
							<input type="text" value={id} onChange={changeId} size="50px" />
						</td>
					</tr>

					<tr>
						<th>비밀번호</th>
						<td>
							<input type="password" value={pwd} onChange={changePwd} size="50px" />
						</td>
					</tr>
				</tbody>
			</table><br />

			<div className="my-1 d-flex justify-content-center">
				<button className="btn btn-outline-secondary" onClick={login}><i className="fas fa-sign-in-alt"></i> 로그인</button>
			</div>

		</div>
	);
}

export default Login;