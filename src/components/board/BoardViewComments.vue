<template>
	<div class="comment_wrap">
		<!--
			댓글이 0일 경우
		-->
		<h3 class="comment_count">댓글 <strong>{{comments.length}}</strong></h3>
		<div class="comment_refresh">
			<button type="button" class="btn btn-comment_refresh" @click.prevent="refreshComments()"><span>댓글 새로고침</span></button>
		</div>
		<div class="comment_write">
			<!--
				이름, 비밀번호칸은 비회원일 때만 보여주세요.
			-->
			<div class="ipt_wrap" v-if="!isLogged">
				<label for="comment-name" class="ipt_label">이름</label>
				<input id="comment-name" v-model="name" name="comment_name" type="text" class="ipt_keyword ipt_name" n4maxlength="10" placeholder="이름을 입력해 주세요." required>
				<label for="comment-password" class="ipt_label">비밀번호</label>
				<input id="comment-password" v-model="password" name="comment_password" type="password" class="ipt_keyword ipt_password" n4maxlength="50" placeholder="비밀번호를 입력해 주세요." required>
			</div>
			<textarea name="comment_contents" v-model="contents" class="ipt_contents" placeholder="디자인을 너무 오랜만에 하다 보니 온몸이 뻐근하다. 전에 본 무릉이 생각나서 사진첩을 열었더니 쩌-억짤이 등장해서 심쿵해버리고 말았다."></textarea>
			<a href="#" class="box-btn primary" @click.prevent="addComments">댓글쓰기</a>
		</div>
		<ul class="comment_list">
			<li v-if="!comments.length" class="no_list">
				 <p>등록된 댓글이 없습니다.</p>
			</li>
			<li v-for="comment in comments" :key="comment.id" :class="{mine : comment.isMine}">
				<div class="comment_header">
					<div class="info">
						<span class="nickname">{{ comment.display_name }}</span>
						<span class="date">{{ formatDate(comment.created_at, 'YY-MM-DD HH:mm') }}</span>
					</div>
					<div class="btns">
						<!--
							비회원이 댓글 삭제할 때는 버튼 누르면 comment_delete_password에 v-if로 보이게 처리 + 비밀번호 입력칸으로 focus 처리해 주세요.
							비밀번호 input에 문자 입력하면 삭제 버튼에 active 처리, 누르면 최종 삭제 되게해 주세요.

							비회원이 작성한 댓글은 무조건 삭제 버튼(+ 비밀번호 입력칸)이 있고,
							회원이 작성한 댓글은 본인 댓글에만 삭제 버튼을 보여 주세요.
						-->
						<!-- 
						비회원/회원 나누지 않고 비회원일 때를 가정

						1. 삭제 버튼만 있다.
						2. 삭제 버튼을 누르면 취소 버튼과 input 박스가 나온다.
						3. 여러 댓글 동시 수정 방지를 위해 input 박스와 취소 버튼은 반드시 1번만 렌더링 한다.
						(ex - 1번 댓글의 수정을 누르고 -> 3번 댓글의 수정을 누르면, 1번 댓글에 있던 input과 취소는 3번 댓글로 렌더링) -->

						<!-- for문으로 그려지고있느거라
						모든 댓글 클래스나 v-model 이나 이름이 다 같아서... 
						거기서 막혔어요
						ㅇㅇ v-model은 같을 수 있음. 한 사람이 동시에 댓글 수정을 여러개 다다다닥 누를 일이 거의 없거든요,
						이거를 
						예시를 보자 크롬좀 켜주
						뭔말인지 이해되졍ㅇㅇ

						저거 코드가 좀 지저분한데 ㅋㅋㅋ 원리는 수정 클릭할 때마다 textarea에다가 댓글 id를 심어요,
						그다음에 ajax 통과할 때 댓글 id를 넘기는 식인데
						이걸 비슷하게 구현하면 removeComments(comment.id) 가 담기잖아요,
						currentCommentId = 현재 수정/삭제할 댓글 id

						ㅇㅋㅇㅋ??? 부모랑 자식 값을 form에 넘기는 것임 저경우는 지금이랑 똑같아여 거의??????????넹 ???
						댓글을 수정하거나 삭제할 때 
						해당 댓글의 id값이잖아여 저 숫자들이 
						지금은 우리거는 댓글이 없어서 한자린데 
						저기는 댓글이 겁나 많아서 저렇게 길어요 숫자가 ㅇㅋㅇㅋ


						이렇게 버튼 클릭할 때 값을 저장하면 되지 않을까요????????????
						크롬
						그다음에 댓글이 나오잖아요,
						아니 댓글이래 input 비밀번호 치는 칸 
						걔는 class로 처리하면 좀 더 쉬운데 이거 보면 도원님 까무러침 헐 이거였구나 하면서 이거임홀...홀..... 호에엥....
						그러쿤..... 
						그러면은 input 보이기/안보이기는 됐고, 
						v-model 이거는 v-if 자체가 현재 선택된 댓글이 있을 때만 보여지니까 dom 상태에도 input은 하나만 존재함
						그래서 수정/삭제가 자유롭게 되는 것이고

						댓글 한개를 수정하거나 삭제하고 나면 (action - success 통신)
						deletePassword를 초기화 하거나 댓글 리프레시 시켜주면 끝 ㅇㅋㅇㅋㅇ?ㅇㅋㅋ
						그럼 지금 해봐여 나 보고 있으니까 ㅋㅋㅋ 
						힌트는 요거로  -->



						<!-- 비회원일 때 -->
						<template v-if="!isLogged">
							<!-- 수정 기능 -->
							<template v-if="isUpdateMode && currentCommentId === comment.id">
								<!-- 수정중일 때 화면 -->
								<input name="comment_delete_password" type="password" v-model="commentPassword" class="ipt_keyword ipt_password" n4maxlength="50" placeholder="댓글의 비밀번호를 입력해 주세요." required="">
								<button 
								type="button" 
								class="active btn btn-update" 
								@click="updateComment(comment)">
									<span>수정</span>
								</button>
								<button type="button" class="btn btn-cancel" @click="setDefaultMode()"><span>취소</span></button>
							</template>

							<!-- 삭제 기능 -->
							<template v-else-if="isDeleteMode && currentCommentId === comment.id">
								<!-- 삭제중일 때 화면 -->
								<input name="comment_delete_password" type="password" v-model="commentPassword" class="ipt_keyword ipt_password" n4maxlength="50" placeholder="댓글의 비밀번호를 입력해 주세요." required="">
								<button 
								type="button" 
								class="active btn btn-update" 
								@click="deleteComment(comment)">
									<span>삭제</span>
								</button>
								<button type="button" class="btn btn-cancel" @click="setDefaultMode()"><span>취소</span></button>
							</template>

							<template v-else>
								<!-- 기본화면 -->
								<button 
								v-if="comment.author === null"
								type="button" 
								class="btn btn-update"
								@click="setUpdateMode(comment)">
									<span>수정</span>
								</button>
								<button 
								v-if="comment.author === null"
								type="button" 
								class="btn btn-delete"
								@click="setDeleteMode(comment)">
									<span>삭제</span>
								</button>
							</template>
						</template>

						<!-- 회원일 때 -->
						<template v-if="isLogged">
							<!-- 수정 기능 -->
							<template v-if="isUpdateMode && currentCommentId === comment.id">
								<!-- 수정중일 때 화면 -->
								<input
								v-if="comment.author === null && currentUser.role !== 'admin'"
								name="comment_delete_password" type="password" v-model="commentPassword" class="ipt_keyword ipt_password" n4maxlength="50" placeholder="댓글의 비밀번호를 입력해 주세요." required="">
								<button 
								type="button" 
								class="active btn btn-update" 
								@click="updateComment(comment)">
									<span>수정</span>
								</button>
								<button type="button" class="btn btn-cancel" @click="setDefaultMode()"><span>취소</span></button>
							</template>

							<!-- 삭제 기능 -->
							<template v-else-if="isDeleteMode && currentCommentId === comment.id">
								<!-- 삭제중일 때 화면 -->
								<input
								v-if="comment.author === null && currentUser.role !== 'admin'"
								name="comment_delete_password" type="password" v-model="commentPassword" class="ipt_keyword ipt_password" n4maxlength="50" placeholder="댓글의 비밀번호를 입력해 주세요." required="">
								<button 
								type="button" 
								class="active btn btn-delete" 
								@click="deleteComment(comment)">
									<span>삭제</span>
								</button>
								<button type="button" class="btn btn-cancel" @click="setDefaultMode()"><span>취소</span></button>
							</template>

							<template v-else>
								<!-- 기본화면 -->
								<button 
								v-if="comment.author === null || comment.isMine  || currentUser.role === 'admin'"
								type="button" 
								class="btn btn-update"
								@click="setUpdateMode(comment)">
									<span>수정</span>
								</button>
								<button 
								v-if="comment.author === null || comment.isMine  || currentUser.role === 'admin'"
								type="button" 
								class="btn btn-delete"
								@click="setDeleteMode(comment)">
									<span>삭제</span>
								</button>
							</template>
						</template>
					</div>
				</div>
				<div class="comment_contents">
					<p v-if="currentCommentId !== comment.id || !isUpdateMode">{{ comment.contents }}</p>
					<template v-else>
						<template v-if="!currentUser">
							<label for="comment-name" class="ipt_label">이름</label>
							<input id="comment-name" v-model="updateName" name="comment_name" type="text" class="ipt_keyword ipt_name" n4maxlength="10" placeholder="이름을 입력해 주세요." required>
						</template>
						<textarea name="comment_contents_update" class="ipt_contents update" v-model="updateContents" :placeholder="comment.contents"></textarea>
					</template>
				</div>
				<div class="comment_footer">
					<button type="button" class="btn btn-upvote" @click="likeComment(comment.id)">좋아요<span>{{ comment.cnt.like }}</span></button>
					<button type="button" class="btn btn-downvote" @click="dislikeComment(comment.id)">싫어요<span>{{ comment.cnt.dislike }}</span></button>
				</div>
			</li>
		</ul>
	</div>
</template>


<script>
const API_URI = (window.location.protocol === 'https:') ? process.env.VUE_APP_HTTPS_API_URI : process.env.VUE_APP_API_URI
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
	props: [ 'pr_id', 'comments' ],
	components: {
	},
	data: () => ({
		isUpdateMode: false,
		isDeleteMode: false,
		name: null,
		password: null,
		contents: null,
		updateName: null,
		updateContents: null,
		commentPassword: null,
		currentCommentId: null,	
	}),
	computed: {
		// 자, 지금 도원님이 로그인/로그아웃부터 생각하느냐고 머리가 복잡해서 vuex를 먼저 작업하시는 거 같은데,
		// 기본은 '비회원'이므로
		// 비회원일 때 댓글을 작성하는 것부터 먼저 하시면은
		// 개발이 훨씬 수월해 질 겁니다요bundleRenderer.renderToStream

		// 비회원으로 댓글 작성 -> 작성된 댓글의 출력 -> 회원으로 댓글 작성 고고고고고고

		...mapGetters('auth', [ 'isLogged', 'currentUser', 'token' ]),
		...mapGetters('notices', [ 'refreshKey' ])
	},

	methods: {
		setDefaultMode() {
			console.log('기본 모드로 들어가기')
			this.currentCommentId = null
			this.commentPassword = null
		},
		setUpdateMode(comment) {
			console.log('수정 모드로 들어가기')
			this.isUpdateMode = true
			this.isDeleteMode = false
			this.currentCommentId = comment.id
			this.updateContents = comment.contents
			if (!this.isLogged) {
				this.updateName = comment.display_name
			}
		},
		setDeleteMode(comment) {
			console.log('삭제 모드로 들어가기')
			this.isDeleteMode = true
			this.isUpdateMode = false
			this.currentCommentId = comment.id
		},
		updateComment(comment) {		
			this.$store.dispatch('notices/updateComment', {
				pr_id: this.pr_id,
				id: comment.id,
				name: this.updateName,
				password: this.commentPassword,
				contents: this.updateContents
			})
		},
		deleteComment(comment) {
			this.$store.dispatch('notices/removeComment', {
				pr_id: this.pr_id,
				id: comment.id,
				password: this.commentPassword
			})
		},
		addComments() {
			// isLogged는 vuex에서 가져옵니다!
			// token도 vuex에서 가져옵니다!
			// const는 수정을 할 수 없으니 let을 씁니다.
			let formData = {
				contents: this.contents
			}

			if (!this.isLogged) {
				if (!this.name){
					alert('이름을 입력해주세요.')
					return false
				}
				if (!this.password){
					alert('비밀번호를 입력해주세요.')
					return false
				}
				if (!this.contents){
					alert('댓글을 입력해주세요.')
					return false
				}
			}

			if (!this.isLogged) {
				formData.name = this.name
				formData.password = this.password
			}

			this.$store.dispatch('notices/addComment', {
				pr_id: this.pr_id,
				formData: formData
			})
			
		},
	
		closeInput(){
			this.currentCommentId = null
			this.commentPassword = null,
			this.isInputOpen = false
			this.isOpenRemove = false
			this.isOpenUpdate = false
		},
		openRemove(id) {
			this.closeInput()
			this.setCurrentCommentId(id)
			this.isOpenRemove = true
		},
		openUpdate(comment) {
			this.closeInput()
			this.setCurrentCommentId(comment.id)
			this.isOpenUpdate = true
			this.updateContents= comment.contents

			if (!this.isLogged) {
				this.updateName = comment.display_name
			}
		},
		likeComment(id) {
			this.$store.dispatch('notices/likeComment', {
				pr_id: this.pr_id,
				id: id})
		},
		dislikeComment(id) {
			this.$store.dispatch('notices/dislikeComment', {
				pr_id: this.pr_id,
				id: id
			})
		},
		refreshComments() {
			this.$store.commit('notices/SET_REFRESHKEY')
		},
		formatDate(time, displayFormat = 'YYYY-MM-DD') {
			// BoardList.vue에도 formatDate 메서드를 중복 사용하는데, 어떻게 하면 코드를 한 번만 호출할 수 있을까요?
			let created_at = this.$moment(time)
			let compareDate = this.$moment().subtract(1, 'days')

			if (created_at.isSameOrAfter(compareDate, 'day')) {
				return created_at.fromNow()
			}
			return created_at.format(displayFormat)
		}
	}
}
</script>