<template>
	<Fragment>
		<div class="tbl_other">
			<ul>
				<li class="prev" v-if="prevItem">
					<strong>이전글</strong>
					<span>
						<router-link :to="{ name: `${routeName}_view`, params: { 'id': prevItem.id } }">
							{{ prevItem.title }}
						</router-link>
					</span>
					<span class="cnt_comment">{{ `[${prevItem.cnt.comment}]` }}</span>
				</li>
				<li class="next" v-if="nextItem">
					<strong>다음글</strong>
					<span>
						<router-link :to="{ name: `${routeName}_view`, params: { 'id': nextItem.id } }">
							{{ nextItem.title }}
						</router-link>
					</span>
					<span class="cnt_comment">{{ `[${nextItem.cnt.comment}]` }}</span>
				</li>
			</ul>
		</div>
		<!--
			'목록' 버튼 클릭 시, 직전 게시판 목록의 페이지로 이동하려면 page값을 어떻게 가져와야 할까요?
			ex) 2페이지의 7번글 클릭 -> 하단 목록 버튼 클릭 -> 1페이지가 아닌 /notice/list/2로 이동
		-->
		<div class="button">
			<router-link :to="{ name: `${routeName}_list`, params: { 'page': currentPage } }" class="box-btn">
				<span>목록</span>
			</router-link>
		</div>
	</Fragment>
</template>

<script>
import { mapGetters } from 'vuex'

import { Fragment } from 'vue-fragment'

export default {
	components: {
		Fragment
	},
	props: [ 'routeName', 'prevItem', 'nextItem' ],
	data: () => ({
	}),
	watch: {
	},
	created() {
	},
	computed: {
		////////////////////////////////////////////////////////////////////////////////
		// computed에 this.$store.state.currentPage값을 가져오세요.
		// state는 vuex의 getters를 이용해 가져옵니다.
		// 가져온 vuex page값을 <template> 목록 버튼에 <router-link>에 삽입하면 끝..?
		////////////////////////////////////////////////////////////////////////////////
		...mapGetters('notices', [ 'currentPage' ])
	},
	methods: {
	}
}
</script>