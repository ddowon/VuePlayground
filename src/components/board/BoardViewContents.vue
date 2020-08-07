<template>
	<div class="view_cont">
		<template>
			<div class="view_cont_txt" v-html="item.contents">
			</div>
			<!-- 보시면 files가 
			한 게시글에 첨부파일이 2개일 수도 있잖아요? 지금 저희는 구현을 글쓰기에 1개만 넣어놨지만요.
			db상에는 첨부파일이 여러개일수도 있으니.. files[] array로 되어 있어요.
			그래서 v-if에 item.files.length 처리를 한 후에, 첨부파일이 있으면 img를 v-for로 돌려돌려 아시쥬? 그리고 alt값에는 item.title 넣어주시고 고고고고고고ㅗ고곡고 -->
			<div v-if="item.files.length" class="view_cont_img">
				<img :src="img.url" :alt="item.title" v-for="img in item.files" :key="img.path">
			</div>
			<div class="bv_footer">
				<template>
					<div class="button button_center">
						<a href="#" class="box-btn btn-like" @click.prevent="likeItem(item.id)"><span>추천<span>{{cntLike}}</span></span></a>
						<a href="#" class="box-btn btn-dislike" @click.prevent="dislikeItem(item.id)"><span>비추천<span>{{cntDislike}}</span></span></a>
					</div>
				</template>
				<template>
					<div class="button button_right">
						<router-link :to="{ name: 'notice_update', params: { id: id } }" class="box-btn"><span>수정</span></router-link>
						<a class="box-btn" @click.prevent="removeItem(item.id)"><span>삭제</span></a>
					</div>
				</template>
			</div>
		</template>
	</div>
</template>

<script>
const API_URI = (window.location.protocol === 'https:') ? process.env.VUE_APP_HTTPS_API_URI : process.env.VUE_APP_API_URI
import { mapGetters } from 'vuex'

export default {
	props: [ 'item', 'id' ],
	components: {
	},
	data: () => ({
	}),
	computed: {
		...mapGetters('auth', [ 'isLogged', 'token' ]),
		...mapGetters('notices', [ 'isLikeSuccess', 'isDislikeSuccess' ]),

		cntLike() {
			if ( this.isLikeSuccess ){
				this.item.cnt.like = this.item.cnt.like + 1
			}
			return this.item.cnt.like
		},
		cntDislike() {
			if ( this.isDislikeSuccess ){
				this.item.cnt.dislike = this.item.cnt.dislike + 1
			}
			return this.item.cnt.dislike
		},
	},
	watch: {
	},

	created() {
	},
	mounted() {
	},
	methods: {
		removeItem(id) {
			this.$store.dispatch('notices/removeItem', id)
		},
		likeItem(id){
			this.$store.dispatch('notices/likeItem', id)
		},
		dislikeItem(id){
			this.$store.dispatch('notices/dislikeItem', id)
		}		
	}
}
</script>