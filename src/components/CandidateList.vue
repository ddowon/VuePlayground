<template>
	<div class="nominee-list-wrap">
		<div class="container-inner">
			<div class="nominee-award-sector sector-title">
				<strong class="nominee-award">드라마 작품상</strong>
				<span class="nominee-sector sector01" id="sector_tv" style="display: inline-block;">TV부문</span>
				<span class="nominee-sector sector02" id="sector_movie" style="display: none;">영화부문</span>
				<span class="nominee-sector sector03" id="sector_play" style="display: none;">연극부문</span>
			</div>
			<ul class="nominee-list">
				<li> <span class="list-thumb"><img
							src="http://images.jtbc.joins.com/baeksang/2020/nominee/tv/01.jpg" alt=""></span>
					<div class="title"> <strong>동백꽃 필 무렵</strong> <span class="name">KBS</span> </div>
				</li>
				<li> <span class="list-thumb"><img
							src="http://images.jtbc.joins.com/baeksang/2020/nominee/tv/02.jpg" alt=""></span>
					<div class="title"> <strong>사랑의 불시착</strong> <span class="name">tvN</span> </div>
				</li>
				<li> <span class="list-thumb"><img
							src="http://images.jtbc.joins.com/baeksang/2020/nominee/tv/03.jpg" alt=""></span>
					<div class="title"> <strong>스토브리그</strong> <span class="name">SBS</span> </div>
				</li>
				<li> <span class="list-thumb"><img
							src="http://images.jtbc.joins.com/baeksang/2020/nominee/tv/04.jpg" alt=""></span>
					<div class="title"> <strong>킹덤2</strong> <span class="name">넷플릭스</span> </div>
				</li>
				<li> <span class="list-thumb"><img
							src="http://images.jtbc.joins.com/baeksang/2020/nominee/tv/05.jpg" alt=""></span>
					<div class="title"> <strong>하이에나</strong> <span class="name">SBS</span> </div>
				</li>
			</ul>
		</div><!-- .container-inner -->
	</div><!-- nominee-list-wrap -->
</template>

<script>
	export default {
		name: '',
		props: {
			msg: String
		}
	}

</script>

