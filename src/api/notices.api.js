import client from '~/httpClient'

export const fetchListByPageSize = (
		{ pageNum, size }
) => {
	client.get(`/notice?page=${pageNum}&size=${size}`)
}

// 도원님이 컴포넌트에 흩어진 request 모아 구현할 부분
export default {
	fetchListByPageSize: ({ pageNum, size }) => client.get(`/notice?page=${pageNum}&size=${size}`),
	fetchItemById: (id) => client.get(`/notice/${id}`),
	addItem: (formData) => client.post(`/notice/add`, formData),
	updateItem: ({ id, formData }) => client.put(`/notice/update/${id}`, formData),
	removeItem: (id) => client.delete(`/notice/delete/${id}`),
	likeItem: (id) => client.put(`/notice/like/${id}`),
	dislikeItem: (id) => client.put(`/notice/dislike/${id}`),
	addComment: ({ pr_id, formData }) => client.post(`/notice/${pr_id}/comment/add`, formData),
	removeComment: ({ pr_id, id, password }) => client.delete(`/notice/${pr_id}/comment/delete/${id}`, { data: { password: password } }),
	updateComment: ({ pr_id, id, name, password, contents }) => client.put(`/notice/${pr_id}/comment/update/${id}`, { name: name, password: password, contents: contents }),
	likeComment: ({ pr_id, id }) => client.put(`/notice/${pr_id}/comment/like/${id}`),
	dislikeComment: ({ pr_id, id }) => client.put(`/notice/${pr_id}/comment/dislike/${id}`)
}