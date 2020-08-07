<template>
	<div class="notice-wrap ani-visible">
		<div class="container-inner">
			<h2>제56회 백상예술대상 <strong>공지사항</strong></h2>
			<p class="desc">새로운 소식을 전해드립니다.</p>
			<div class="notice">
				<div class="head">
					<h3>공지사항</h3>
					<router-link :to="{ name: 'notice' }">
						<span>더보기</span>
					</router-link>
				</div><!-- .head -->

				<!-- 도원님이 가장 최근 공지사항 게시글 2개 출력 구현할 부분 -->

				<div class="list" v-if="itemsList.length">
					<ul>

						<li v-for="item in itemsList" :key="item.id">
							<router-link :to="{ name: 'notice_view', params: { 'id': item.id } }">
								<strong>
									<i>{{ item.title }}</i>
								</strong>
								<em>{{ formatDate(item.created_at, 'YYYY-MM-DD') }}</em>
							</router-link>
						</li>
					</ul>
				</div><!-- .list -->
			</div><!-- .notice -->
			<div class="share">
				<!-- 20200513 -->
				<a class="insta" href="https://www.instagram.com/baeksang.official/"
					target="_blank"><span>인스타그램</span></a>
				<!-- //20200513 -->
				<a class="facebook" href="https://www.facebook.com/BaeksangAwards/"
					target="_blank"><span>페이스북</span></a>
				<a class="youtube" href="https://www.youtube.com/channel/UCVXN28NHfphVQrdtjooc33g"
					target="_blank"><span>유튜브</span></a>
			</div><!-- .share -->
		</div><!-- .container-inner -->
	</div><!-- .notice-wrap -->
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
	name: 'latestNotice',
	computed: {
		...mapGetters('notices', ['itemsList'])
	},
	created(){
		this.fetchListByPageSize()
	},
	methods: {
		fetchListByPageSize(pageNum = 1, size = 2) {
			this.$store.dispatch('notices/fetchListByPageSize', {
				pageNum: pageNum,
				size: size
			})
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
