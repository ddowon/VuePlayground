<template>
	<div class="tlb-wrap">
		<div class="container-inner">
			<BoardList 
				:info="boardInfo" :itemsList="itemsList"/>
			<BoardListPagination 
				:totalPage="totalPageCount"
				:pageRange="boardInfo.pageRange"
				:currentPage="currentPage"
				@changePaging="changePage" />

			<div class="button">
				<router-link :to="{ name: `${boardInfo.routeName}_add` }" class="box-btn">
					<span>글쓰기</span>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

import BoardList from '@/components/board/BoardList.vue'
import BoardListPagination from '@/components/board/BoardListPagination.vue'

export default {
	name: 'noticeList',
	components: {
		BoardList, BoardListPagination
	},
	data: () => ({
		currentPage: null,
		boardInfo: {
			title: '공지사항',
			routeName: 'notice',
			itemPerPage: 5,
			pageRange: 10,
		}
	}),
	watch: {
		'$route.query': {
			handler(newVal, oldVal) {
				if (newVal && oldVal) {
					this.fetchListByPageSize(this.$route.query.page, this.boardInfo.itemPerPage)
				}
			},
			deep: true,
			immediate: true
		}
	},
	computed: {
		...mapGetters(
			'notices', [ 'totalPageCount', 'itemsList' ]
		)
	},
	created() {
		this.fetchListByPageSize(this.$route.query.page, this.boardInfo.itemPerPage)
	},
	methods: {
		fetchListByPageSize(pageNum, size = 10) {
			this.currentPage = Number(pageNum)
			this.$store.dispatch('notices/fetchListByPageSize', {
				pageNum: pageNum,
				size: size
			})
		},
		changePage(pageNum) {
			// this.page = pageNum
			this.$router.push({
				name: `${this.boardInfo.routeName}_list`,
				query: { 'page': pageNum }
			})
		}
	}
}
</script>
