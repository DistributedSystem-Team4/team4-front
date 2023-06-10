import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "react-bootstrap-4-pagination";

import "../../css/boardlist.css";
import "../../css/page.css";

function BoardList() {

	const [boardList, setBoardList] = useState([]);

	// Paging
	const [page, setPage] = useState(1);
	const [totalCnt, setTotalCnt] = useState(0);

	// Link 용 (함수) 
	const navigate = useNavigate();




	/* [GET /board]: 게시글 목록 */
	const getBoardList = async (page) => {

		await axios.get("http://203.252.166.225:8080/board", { params: {"page": page,"size":10 } })  // 게시글 리스트 api
			.then((resp) => {
				console.log("[BoardList.js] useEffect() success :D");
				console.log("Totalpage : "+resp.headers.get("Totalboard"))
	
				setBoardList(resp.data.result);
				setTotalCnt(parseInt(resp.headers.get("Totalboard")));
			})
			.catch((err) => {
				console.log("[BoardList.js] useEffect() error :<");
				console.log(err);

			});
	}

	useEffect(() => {
		getBoardList(page);
	}, []);


	const changePage = (page) => {
		setPage(page);
		getBoardList(page);
	}

	return (

		<div>
			<table className="table table-hover">
				<thead>
					<tr>
						<th className="col-1">번호</th>
						<th className="col-8">제목</th>
						<th className="col-3">작성자</th>
					</tr>
				</thead>

				<tbody>
				
					
					{
						boardList.map(function (board, idx) {
							return (
								<TableRow obj={board} key={idx} cnt={idx + 1} />
							)
						})
					}
				</tbody>
			</table>

			<Pagination className="pagination"
				activePage={page}
				itemsCountPerPage={10}
				totalItemsCount={totalCnt}
				pageRangeDisplayed={5}
				prevPageText={"‹"}
				nextPageText={"›"}
				onChange={changePage}
				onClick={changePage}
				 />
				
			<div className="my-5 d-flex justify-content-center">
				<Link className="btn btn-outline-secondary" to="/boardwrite"><i className="fas fa-pen"></i> &nbsp; 글쓰기</Link>
			</div>

		</div>
	);
}


/* 글 목록 테이블 행 컴포넌트 */
function TableRow(props) {
	const { obj: board, cnt } = props;
	const navigate = useNavigate();
  
	const handleBoardClick = () => {
	  navigate(`/boarddetail`, { state: { boardId: board.boardId } });
	};
  
	return (
	  <tr>
		<th>{cnt}</th>
		<td>
		  <span className="underline board-title" onClick={handleBoardClick}>
			{board.title}
		  </span>
		</td>
		<td>{board.userId}</td>
	  </tr>
	);
  }

const tap = "\u00A0\u00A0\u00A0\u00A0";


export default BoardList;