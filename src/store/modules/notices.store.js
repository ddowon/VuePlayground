import NOTICES from '~/notices.api'
import router from '@/router'


const state = {
	refreshKey: 0,
	totalPageCount: null,
	itemsList: [],
	item: null,
	isLikeSuccess: false,
	isDislikeSuccess: false,
}

const mutations = {
	SET_REFRESHKEY(state) {
		state.refreshKey = state.refreshKey + 1
	},
	SET_TOTALPAGE_COUNT(state, totalPageCount) {
		state.totalPageCount = totalPageCount
	},
	SET_NOTICE_ITEMLIST(state, itemsList) {
		state.itemsList = itemsList
	},
	SET_ITEM(state, item) {
		state.item = item
	},
	SET_CNT_LIKE(state, cnt) {
		state.cntlike = cnt
	},
	SET_CNT_DISLIKE(state, cnt) {
		state.cntDislike = cnt
	}
}

const actions = {
	// 게시판 목록 불러오기
	async fetchListByPageSize({ commit, dispatch }, payload) {
		try {
			const res = await NOTICES.fetchListByPageSize(payload)
			if (res.data) {
				commit('SET_TOTALPAGE_COUNT', res.data.totalPageCount)
				commit('SET_NOTICE_ITEMLIST', res.data.itemsList)
			} 
		} catch (err) {
			dispatch('ui/toast', { message: err }, { root: true })
		}
	},
	// 게시글 불러오기
	async fetchItemById({ commit, dispatch }, id) {
		try {
			const res = await NOTICES.fetchItemById(id)
			if (res.data) {
				commit('SET_ITEM', res.data.itemsList[0])
			}
		} catch (err) {
			dispatch('ui/toast', { message: err }, { root: true })
		}
	},
	// 게시글 추가
	async addItem({ dispatch }, formData) {
		try {
			const res = await NOTICES.addItem(formData)
			if (res.data) {
				router.push({ name: 'notice_view', params: { id: res.data.id } })
			} 
		} catch (err) {
			dispatch('ui/toast', { message: err }, { root: true })
		}
	},
	// 게시글 수정
	async updateItem({ dispatch }, payload) {
		try {
			const res = await NOTICES.updateItem(payload)
			if (res.data) {
				router.push({ name: 'notice_view', params: { id: res.data.id } })
			} 
		} catch (err) {
			dispatch('ui/toast', { message: err }, { root: true })
		}
	},
	// 게시글 삭제
	async removeItem({ dispatch }, id) {
		try {
			const res = await NOTICES.removeItem(id)
			if (res.data) {
				dispatch('ui/toast', { message: '게시글이 삭제되었습니다.' }, { root: true })
				router.push({ name: 'notice_list', params: { page: '1' }})
			} 
		} catch (err) {
			dispatch('ui/toast', { message: err }, { root: true })
		}
	},
	//게시글 추천
	async likeItem({ commit, dispatch }, id) {
		try {
			const res = await NOTICES.likeItem(id)
			if (res.data) {
				console.log(res.data)
				// commit('SET_CNT_LIKE')
				// dispatch('ui/toast', { message: res.data.message }, { root: true })	
			}
			
		} catch (err) {
			// dispatch('ui/toast', { message: err }, { root: true })	
		}
	},
	//게시글 비추천
	async dislikeItem({ commit, dispatch }, id) {
		try {
			const res = await NOTICES.dislikeItem(id)
			if (res.data) {
				commit('SET_DISLIKE_STAUTS')
				dispatch('ui/toast', { message: res.data.message }, { root: true })	
			}

		} catch (err) {
			dispatch('ui/toast', { message: err }, { root: true })
		}
	},
	// 댓글 추가
	async addComment({ commit, dispatch }, payload) {
		try {
			const res = await NOTICES.addComment(payload)
			if (res) {
				commit('SET_REFRESHKEY')
			}
		} catch (err) {
			dispatch('ui/toast', { message: err }, { root: true })
		}
	},
	// 댓글 삭제
	async removeComment({ commit, dispatch }, payload) {
		try {
			const res = await NOTICES.removeComment(payload)
			if (res) {
				commit('SET_REFRESHKEY')
				dispatch('ui/toast', { message: "댓글이 삭제되었습니다." }, { root: true })
			}
		} catch (err) {
			dispatch('ui/toast', { message: err }, { root: true })
		}
	},
	// 댓글 수정
	async updateComment({ commit, dispatch }, payload) {
		try {
			const res = await NOTICES.updateComment(payload)
			if (res) {
				commit('SET_REFRESHKEY')
			}
		} catch (err) {
			dispatch('ui/toast', { message: err }, { root: true })
		}
	},
	// 댓글 추천
	async likeComment({ commit, dispatch }, payload) {
		try {
			const res = await NOTICES.likeComment(payload)
			if (res) {
				commit('SET_REFRESHKEY')
			}
		} catch (err) {
			dispatch('ui/toast', { message: err }, { root: true })
		}
	},
	//댓글 비추천
	async dislikeComment({ commit, dispatch }, payload) {
		try {
			const res = await NOTICES.dislikeComment(payload)
			if (res) {
				commit('SET_REFRESHKEY')
			}
		} catch (err) {
			dispatch('ui/toast', { message: err }, { root: true })
		}
	}

}

const getters = {
	refreshKey: (state) => state.refreshKey,
	totalPageCount: (state) => state.totalPageCount,
	latestItemsList: (state) => state.latestItemsList,
	itemsList: (state) => state.itemsList,
	item: (state) => state.item,
	isLikeSuccess: (state) => state.isLikeSuccess,
	isDislikeSuccess: (state) => state.isDislikeSuccess
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}