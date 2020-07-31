<template>
	<div class="tb_view">
		<template v-if="item">
			<BoardViewHeader :item="item" />
			<BoardViewContents :item="item" :id="id"/>
<!-- 
			근데 왜 다른 건 다 id인데 여기만 item.id냐는 게 궁금한 거죠? ㅋㅋㅋㅋㅋㅋㅋㅋ
			그건 얘가 1차 router-view 컴포넌트가 아니라서.. 그럼당...

			$route.params.id를 바탕으로 서버에서 get 요청으로 가져온 실제 데이터가 item이잖아요.
			그 item에 게시글 id정보가 있고,

			댓글을 삭제하거나 추천/비추천 할 때, 2가지 교차 검증이 필요하거든요.
			ex) 7번 게시글을 보는 중
			1. 삭제, 추천, 비추천할 댓글의 부모 게시글이 7번 게시글이 맞는가?
			2. 이 댓글의 id가 3번인데 3번 댓글은 7번 게시글의 자식이 맞는가?

			교차 검증을 해야 하는데 route.params.id와 실제 데이터의 id가 다를 수 있으니
			가져온 data를 바탕으로 처리해야 하기 때문에 item.id를 pr_id에 넣어준 것입니다!

			이번 예제에서는 부모 게시글 id값과 route.params.id를 동일하게 설정해주었지만
			db에서 보면 _id라고 각 데이터 document의 고유 _id가 있어요. 보여드릴게요.

			저게 실제 데이터의 고유 id값이구요, 저는 쉽게 데이터를 프론트에 내려주려고 라우트 id랑 게시글 id랑 일치시킨 거예요. ㅋㅋㅋㅋㅋㅋ 만약 저게 구현이 안 되어있으면, _id 고유 값을 사용해야 합니다. (이걸 auto increment by primary key라고 합니다.)

			http://localhost:8080/notice/view/12 이게 아니라
			http://localhost:8080/notice/view/5f01fa8ffcd78e5f04e251ae

			근데 사용자가 보기 불편하니까 백단에서 새로운 게시글이 작성될 때마다
			직전 게시글 번호 +1을 해서 0부터 n까지 고유키를 자동 증가시켜주는 거예요. -->


			<BoardViewFooter />
			<BoardViewComments :pr_id="item.id" :comments="item.comments" @forceKeyUpdate="changeRefreshKey" />
		</template>
	</div>
</template>

<script>
const API_URI = (window.location.protocol === 'https:') ? process.env.VUE_APP_HTTPS_API_URI : process.env.VUE_APP_API_URI
import { mapGetters, mapActions, mapState } from 'vuex'

import BoardViewHeader from '@/components/board/BoardViewHeader.vue'
import BoardViewContents from '@/components/board/BoardViewContents.vue'
import BoardViewFooter from '@/components/board/BoardViewFooter.vue'
import BoardViewComments from '@/components/board/BoardViewComments.vue'

export default {
	components: {
		BoardViewHeader, BoardViewContents, BoardViewFooter, BoardViewComments
	},
	props: [ 'id' ],
	data: () => ({
	}),
	watch: {
		'id': {
			handler(newVal, oldVal) {
				if (newVal && oldVal) {
					this.fetchItemById(this.id)
				}
			},
			deep: true,
			immediate: true
		}
	},
	computed: {
		...mapGetters('auth', [ 'token', 'currentUser', 'isLogged' ]),
		...mapGetters('notices', [ 'item' ])
	},
	created() {
		this.fetchItemById(this.id)
	},
	methods: {
		changeRefreshKey() {
			this.fetchItemById(this.id)
		},
		fetchItemById(id = 1) {
			// 블로그 글이랑은 좀 다른데요..
			// 라우트에서 동일 url로 이동하는 건 history API pushstate 정책 위반이래요.. ㅠㅠ
			// 그래서 push 에러를 없애봤는데 재이동은 안되는 걸로 판명나서
			// 블로그 글을 보니 key를 강제업데이트 하라고 하는데, 우리는 BoardViewComments.vue 안의 input 박스를 통으로 리렌더링 해야 하잖아요, 댓글 목록이랑?
			// 그래서 그걸 통합해서 새로고침 해야하니까 상위 컴포넌트로 업데이트 이벤트를 $emit으로 발생시켜서
			// 컴포넌트를 뿅하고 새로 만드는 겁니다.
			// 그러면 댓글이 작성되고 나면 mounted 또는 watch 이벤트를 타게 되거든요. 다시금?
			// created도 타는지 확인해 봅시다.

			this.$store.dispatch('notices/fetchItemById', id)
		},
		
		updateItem(id) {
			if (!this.isLogged) {
				return alert('로그인 해 주세요!')
			}
			this.$router.push({ name: 'notice_update', params: { id: id } })
		}
	}
}
</script>