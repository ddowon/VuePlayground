<template>
	<div class="nominated-wrap" style="">
		<div class="container-inner">
			<ul class="nominnated-list">

				<li class="prizeCd_movie" style="display: none;">
					<!-- 해당탭: on -->
					<a href="javascript:getCandidate('movie','M01');" id="M01">
						<span>작품상</span>
					</a>
				</li>

				<li class="prizeCd_movie" style="display: none;">
					<!-- 해당탭: on -->
					<a href="javascript:getCandidate('movie','M02');" id="M02">
						<span>감독상</span>
					</a>
				</li>

				<li class="prizeCd_movie" style="display: none;">
					<!-- 해당탭: on -->
					<a href="javascript:getCandidate('movie','M03');" id="M03">
						<span>시나리오상</span>
					</a>
				</li>

				<li class="prizeCd_movie" style="display: none;">
					<!-- 해당탭: on -->
					<a href="javascript:getCandidate('movie','M04');" id="M04">
						<span>예술상</span>
					</a>
				</li>

				<li class="prizeCd_movie" style="display: none;">
					<!-- 해당탭: on -->
					<a href="javascript:getCandidate('movie','M05');" id="M05">
						<span>신인 감독상</span>
					</a>
				</li>

				<li class="prizeCd_movie" style="display: none;">
					<!-- 해당탭: on -->
					<a href="javascript:getCandidate('movie','M06');" id="M06">
						<span>남자 최우수 연기상</span>
					</a>
				</li>

				<li class="prizeCd_movie" style="display: none;">
					<!-- 해당탭: on -->
					<a href="javascript:getCandidate('movie','M07');" id="M07">
						<span>여자 최우수 연기상</span>
					</a>
				</li>

				<li class="prizeCd_movie" style="display: none;">
					<!-- 해당탭: on -->
					<a href="javascript:getCandidate('movie','M08');" id="M08">
						<span>남자 조연상</span>
					</a>
				</li>

				<li class="prizeCd_movie" style="display: none;">
					<!-- 해당탭: on -->
					<a href="javascript:getCandidate('movie','M09');" id="M09">
						<span>여자 조연상</span>
					</a>
				</li>

				<li class="prizeCd_movie" style="display: none;">
					<!-- 해당탭: on -->
					<a href="javascript:getCandidate('movie','M10');" id="M10">
						<span>남자 신인 연기상</span>
					</a>
				</li>

				<li class="prizeCd_movie" style="display: none;">
					<!-- 해당탭: on -->
					<a href="javascript:getCandidate('movie','M11');" id="M11">
						<span>여자 신인 연기상</span>
					</a>
				</li>

				<li class="prizeCd_play" style="display: none;">
					<!-- 해당탭: on -->
					<a href="javascript:getCandidate('play','P01');" id="P01">
						<span>백상 연극상</span>
					</a>
				</li>

				<li class="prizeCd_play" style="display: none;">
					<!-- 해당탭: on -->
					<a href="javascript:getCandidate('play','P02');" id="P02">
						<span>젊은 연극상</span>
					</a>
				</li>

				<li class="prizeCd_play" style="display: none;">
					<!-- 해당탭: on -->
					<a href="javascript:getCandidate('play','P03');" id="P03">
						<span>남자 최우수 연기상</span>
					</a>
				</li>

				<li class="prizeCd_play" style="display: none;">
					<!-- 해당탭: on -->
					<a href="javascript:getCandidate('play','P04');" id="P04">
						<span>여자 최우수 연기상</span>
					</a>
				</li>

				<li class="prizeCd_tv on" style="display: block;">
					<!-- 해당탭: on -->
					<a href="javascript:getCandidate('tv','T01');" id="T01">
						<span>드라마 작품상</span>
					</a>
				</li>

				<li class="prizeCd_tv" style="display: block;">
					<!-- 해당탭: on -->
					<a href="javascript:getCandidate('tv','T02');" id="T02">
						<span>예능 작품상</span>
					</a>
				</li>

				<li class="prizeCd_tv" style="display: block;">
					<!-- 해당탭: on -->
					<a href="javascript:getCandidate('tv','T03');" id="T03">
						<span>교양 작품상</span>
					</a>
				</li>

				<li class="prizeCd_tv" style="display: block;">
					<!-- 해당탭: on -->
					<a href="javascript:getCandidate('tv','T04');" id="T04">
						<span>연출상</span>
					</a>
				</li>

				<li class="prizeCd_tv" style="display: block;">
					<!-- 해당탭: on -->
					<a href="javascript:getCandidate('tv','T05');" id="T05">
						<span>극본상</span>
					</a>
				</li>

				<li class="prizeCd_tv" style="display: block;">
					<!-- 해당탭: on -->
					<a href="javascript:getCandidate('tv','T06');" id="T06">
						<span>예술상</span>
					</a>
				</li>

				<li class="prizeCd_tv" style="display: block;">
					<!-- 해당탭: on -->
					<a href="javascript:getCandidate('tv','T07');" id="T07">
						<span>남자 최우수 연기상</span>
					</a>
				</li>

				<li class="prizeCd_tv" style="display: block;">
					<!-- 해당탭: on -->
					<a href="javascript:getCandidate('tv','T08');" id="T08">
						<span>여자 최우수 연기상</span>
					</a>
				</li>

				<li class="prizeCd_tv" style="display: block;">
					<!-- 해당탭: on -->
					<a href="javascript:getCandidate('tv','T09');" id="T09">
						<span>남자 조연상</span>
					</a>
				</li>

				<li class="prizeCd_tv" style="display: block;">
					<!-- 해당탭: on -->
					<a href="javascript:getCandidate('tv','T10');" id="T10">
						<span>여자 조연상</span>
					</a>
				</li>

				<li class="prizeCd_tv" style="display: block;">
					<!-- 해당탭: on -->
					<a href="javascript:getCandidate('tv','T11');" id="T11">
						<span>남자 신인 연기상</span>
					</a>
				</li>

				<li class="prizeCd_tv" style="display: block;">
					<!-- 해당탭: on -->
					<a href="javascript:getCandidate('tv','T12');" id="T12">
						<span>여자 신인 연기상</span>
					</a>
				</li>

				<li class="prizeCd_tv" style="display: block;">
					<!-- 해당탭: on -->
					<a href="javascript:getCandidate('tv','T13');" id="T13">
						<span>남자 TV예능상</span>
					</a>
				</li>

				<li class="prizeCd_tv" style="display: block;">
					<!-- 해당탭: on -->
					<a href="javascript:getCandidate('tv','T14');" id="T14">
						<span>여자 TV예능상</span>
					</a>
				</li>

			</ul><!-- .nominnated-list -->
		</div><!-- .container-inner -->
	</div><!-- .nominated-wrap -->
</template>

<script>
	export default {
		name: '',
		props: {
			msg: String
		}
	}

</script>

