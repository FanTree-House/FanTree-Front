// // src/components/FeedDetailPage.jsx
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { fetchFeedDetail, fetchComments, createComment } from '../../service/communityApi';
// import './FeedDetailPage.css'; // CSS 파일을 추가합니다.
//
// const FeedDetailPage = () => {
//     const { groupName, feedId } = useParams(); // URL에서 groupName과 feedId 가져오기
//     const [feedDetail, setFeedDetail] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [comments, setComments] = useState([]);
//     const [newComment, setNewComment] = useState('');
//
//     useEffect(() => {
//         const getFeedDetail = async () => {
//             try {
//                 const data = await fetchFeedDetail(groupName, feedId);
//                 setFeedDetail(data);
//                 console.log('Fetched feed detail:', data); // 가져온 feedDetail 출력
//             } catch (error) {
//                 console.error('Error fetching feed detail:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//
//         const getComments = async () => {
//             try {
//                 const data = await fetchComments(groupName, feedId);
//                 setComments(data);
//             } catch (error) {
//                 console.error('Error fetching comments:', error);
//             }
//         };
//
//         getFeedDetail();
//         getComments();
//     }, [groupName, feedId]);
//
//     const handleCommentChange = (event) => {
//         setNewComment(event.target.value);
//     };
//
//     const handleCommentSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             await createComment(groupName, feedId, { contents: newComment });
//             setNewComment(''); // 입력란 초기화
//             // 댓글 목록 새로 고침
//             const updatedComments = await fetchComments(groupName, feedId);
//             setComments(updatedComments);
//         } catch (error) {
//             console.error('Error creating comment:', error);
//         }
//     };
//
//     if (loading) {
//         return <p>Loading...</p>;
//     }
//
//     return (
//         <div className="feed-detail-page">
//             {feedDetail ? (
//                 <>
//                     <div className="feed-detail">
//                         <h2>{feedDetail.nickname}</h2>
//                         <p>{feedDetail.contents}</p>
//                         {feedDetail.post_picture && <img className="feed-image" src={feedDetail.post_picture} alt="Feed" />}
//                     </div>
//
//                     <div className="comment-section">
//                         <h3>댓글 작성</h3>
//                         <form onSubmit={handleCommentSubmit}>
//                             <textarea
//                                 value={newComment}
//                                 onChange={handleCommentChange}
//                                 placeholder="댓글을 입력하세요"
//                                 required
//                                 className="comment-input"
//                             />
//                             <button type="submit" className="submit-button">댓글 작성</button>
//                         </form>
//                     </div>
//
//                     <div className="comment-list">
//                         <h3>댓글 목록</h3>
//                         {comments.length > 0 ? (
//                             comments.map((comment, index) => (
//                                 <div key={index} className="comment-item">
//                                     <strong>{comment.nickname}:</strong> {comment.contents}
//                                 </div>
//                             ))
//                         ) : (
//                             <p>댓글이 없습니다.</p>
//                         )}
//                     </div>
//                 </>
//             ) : (
//                 <p>피드를 찾을 수 없습니다.</p>
//             )}
//         </div>
//     );
// };
//
// export default FeedDetailPage;