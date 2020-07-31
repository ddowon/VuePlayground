<template>
	<div class="tlb-wrap">
		<div class="container-inner">
			<BoardList 
				:info="noticeInfo" :itemsList="itemsList"/>
			<BoardListPagination 
				:totalPage="totalPageCount"
				:pageRange="noticeInfo.pageRange"
				:currentPage="page"
				@changePaging="chagePage" />

			<div class="button">
				<router-link :to="{ name: 'notice_add' }" class="box-btn">
					<span>글쓰기</span>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
const API_URI = (window.location.protocol === 'https:') ? process.env.VUE_APP_HTTPS_API_URI : process.env.VUE_APP_API_URI
import { mapActions, mapGetters } from 'vuex'

import BoardList from '@/components/board/BoardList.vue'
import BoardListPagination from '@/components/board/BoardListPagination.vue'

export default {
	name: 'noticeList',
	components: {
		BoardList, BoardListPagination
	},
	props: [ 'page' ],
	data: () => ({
		noticeInfo: {
			title: '공지사항',
			routeName: 'notice',
			itemPerPage: 5,
			pageRange: 10,
		}
	}),
	watch: {
		'$route.params': {
			handler(newVal, oldVal) {
				if (newVal && oldVal) {
					this.noticeList(this.page, this.noticeInfo.itemPerPage)
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
		this.noticeList(this.page, this.noticeInfo.itemPerPage)
	},
	methods: {
		noticeList(pageNum, size = 10) {
			this.$store.dispatch('notices/noticeList', {
				pageNum: pageNum,
				size: size
			})
		},
		chagePage(pageNum) {
			this.$router.push({
				name: `${this.noticeInfo.routeName}_list`,
				params: { 'page': pageNum }
			})
		}
	}
}
</script>
