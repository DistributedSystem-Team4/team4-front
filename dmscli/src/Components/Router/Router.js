import { Routes, Route } from "react-router-dom";

import Home from "../App/Home"
import Join from "../Member/Join"
import Login from "../Member/Login"
import Logout from "../Member/Logout"
import BoardList from "../Board/BoardList"
import BoardWrite from "../Board/BoardWrite"
import BoardDetail from "../Board/BoardDetail"
import BoardUpdate from "../Board/BoardUpdate"


function Router() {
	return (
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/join" element={<Join />}></Route>
				<Route path="/logout" element={<Logout />}></Route>
				<Route path="/boardlist" element={<BoardList />}></Route>
				<Route path="/boardwrite" element={<BoardWrite />}></Route>
				<Route path="/boarddetail" element={<BoardDetail />} />
				<Route path="/boardupdate" element={<BoardUpdate />}></Route>
			</Routes>
	);
}

export default Router;