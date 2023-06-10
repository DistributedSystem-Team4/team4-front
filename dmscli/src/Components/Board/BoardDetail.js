import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate ,useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import { HttpHeadersContext } from "../Context/HttpHeadersProvider";



function BoardDetail() {

	const { auth, setAuth } = useContext(AuthContext) // 권한설정

	const [board, setBoard] = useState({});
	const location=useLocation();
	
	const boardId={...location.state}
	console.log(boardId.boardId)
	const { headers, setHeaders } = useContext(HttpHeadersContext);
	//	const { seq } = useParams(); // 파라미터 가져오기


	const navigate = useNavigate();

	const getBoardDetail = async () => {

		await axios.get(`http://203.252.166.225:8080/board/info` ,{ params: {boardId:boardId.boardId}}) // 게시글 상세보기 api 
		.then((resp) => {
			console.log("[BoardDetail.js] getBoardDetail() success :D");
			console.log(resp.data);

			setBoard(resp.data);
			
		})


		.catch((err) => {
			console.log("header"+headers)
			console.log(" : "+boardId.boardId)
			console.log("[BoardDetail.js] getBoardDetail() error :<");
			console.log(err);
		});

	}

	const deleteBoard = async () => {

		await axios.delete(`http://203.252.166.225:8080/board/delete`,{params:{boardId:boardId.boardId},headers:headers})  // 게시글 삭제 api
		.then((resp) => {
			console.log("[BoardDetail.js] deleteBoard() success :D");
			console.log(resp.data);

			
				alert("게시글 삭제 성공");
				navigate("/boardlist");
			

		}).catch((err) => {
			console.log("[BoardDetail.js] deleteBoard() error :<");
			console.log(headers)
			console.log(err);
		});

	}

	useEffect(() => {
		getBoardDetail();
	}, []);

	const updateBoard = {
		boardId: boardId.boardId,
		userId: board.result && board.result.user && board.result.user.userId,
		title: board.result && board.result.title,
		content: board.result && board.result.content
	}
	const handleEditClick = () => {
		navigate("/boardupdate", { state: { board: updateBoard } }); // navigate로 이동
	  };



	return (
		<div>

			<div className="my-3 d-flex justify-content-end">	
			{
				/* 자신이 작성한 게시글인 경우에만 수정 삭제 가능 */
				(board.result && board.result.user && localStorage.getItem("id") === board.result.user.userId) ?
				<><button className="btn btn-outline-secondary" onClick={handleEditClick}><i className="fas fa-edit"></i> 수정
            </button>{" "}
            &nbsp;						
			<button className="btn btn-outline-danger"  onClick={deleteBoard}><i className="fas fa-trash-alt"></i> 삭제</button>
					</>
				:
				null
			}

			</div>

			<table className="table table-striped">
				<tbody>
					<tr>
						<th className="col-3">작성자</th>
						<td>
							<span>{board.result && board.result.user && board.result.user.userId}</span>
							
						</td>
					</tr>

					<tr>
						<th>제목</th>
						<td>
							<span>{board.result && board.result.title}</span>
						</td>
					</tr>

					<tr>
						<th>작성일</th>
						<td>
							<span>{board.result&& board.result.createdAt}</span>
						</td>
					</tr>

		
					<tr>
						<th>내용</th>
						<td>
							<div>
								{board.result&&board.result.content}
							</div>
						</td>
					</tr>
				</tbody>
			</table>

			<div className="my-3 d-flex justify-content-center">
				<Link className="btn btn-outline-secondary" to="/boardlist"><i className="fas fa-list"></i> 글목록</Link>
			</div><br/><br/>

		</div>
	);
}

export default BoardDetail;