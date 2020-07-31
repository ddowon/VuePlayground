import client from '~/httpClient'

// 도원님이 컴포넌트에 흩어진 request 모아 구현할 부분
export default {
	noticeList: ({ pageNum, size }) => client.get(`/notice?page=${pageNum}&size=${size}`),
	fetchItemById: (id) => client.get(`/notice/${id}`),
	addItem: (formData) => client.post(`/notice/add`, formData),
	updateItem: ({ id, formData }) => client.put(`/notice/update/${id}`, formData),
	removeItem: (id) => client.delete(`/notice/delete/${id}`),
	like: (id) => client.put(`/notice/like/${id}`),
	dislike: (id) => client.put(`/notice/dislike/${id}`),
	addComment: ({ pr_id, formData }) => client.post(`/notice/${pr_id}/comment/add`, formData),
	removeComment: ({ pr_id, id, formData }) => client.delete(`/notice/${pr_id}/comment/delete/${id}`, formData),
	likeComment: ({ pr_id, id }) => client.put(`/notice/${pr_id}/comment/like/${id}`),
	dislikeComment: ({ pr_id, id }) => client.put(`/notice/${pr_id}/comment/dislike/${id}`)
}