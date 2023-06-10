import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import { HttpHeadersContext } from "../Context/HttpHeadersProvider";

function BoardWrite() {

	const { auth, setAuth } = useContext(AuthContext)
	const { headers, setHeaders } = useContext(HttpHeadersContext);
	const navigate = useNavigate();

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	

	const changeTitle = (event) => {
		setTitle(event.target.value);
	}

	const changeContent = (event) => {
		setContent(event.target.value);
	}

	/* 게시글 작성 api */
	const createBoard = async() => {

		const req = {
			userId: localStorage.getItem("id"), 
			title: title, 
			content: content
		}

		await axios.post("http://203.252.166.225:8080/board/post", req, {headers: headers})
		.then((resp) => {
			console.log("[BoardWrite.js] createBoard() success :D");
			console.log(resp.data);
			console.log("header : "+headers)

			alert("새로운 게시글을 성공적으로 등록했습니다 :D");
			navigate("/boarddetail", { state: { boardId: resp.data.result } });
		})
		.catch((err) => {
			console.log("[BoardWrite.js] createBoard() error :<");
			console.log(err);
		});
	}

	useEffect(() => {
		if (!auth) {
			alert("로그인 한 사용자만 게시글을 작성할 수 있습니다 !");
			navigate(-1);
		}
	}, []);


	return (
		<div>
			<table className="table">
				<tbody>
					<tr>
						<th className="table-primary">작성자</th>
						<td>
							<input type="text" className="form-control"  value={localStorage.getItem("id")} size="50px" readOnly />
						</td>
					</tr>

					<tr>
						<th className="table-primary">제목</th>
						<td>
							<input type="text" className="form-control" value={title} onChange={changeTitle} size="50px" />
						</td>
					</tr>

					<tr>
						<th className="table-primary">내용</th>
						<td>
							<textarea className="form-control" value={content} onChange={changeContent} rows="10"></textarea>
						</td>
					</tr>
				</tbody>
			</table>

			<div className="my-5 d-flex justify-content-center">
				<button className="btn btn-outline-secondary" onClick={createBoard}><i className="fas fa-pen"></i> 등록하기</button>
			</div>
		</div>
	);
}

export default BoardWrite;