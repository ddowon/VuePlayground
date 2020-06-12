<template>
	<div class="nominee-title-wrap sub-title">
		<div class="container-inner">
			<h2>56회 후보자 · 작품</h2>
			<div class="button">
				<a href="#" v-for="(item, index) in tabList"
				:key="item.id"
				:id="`division_${item.id}`"
				:class="['box-btn', item.id, {'on': index === currentTabIdx}]"
				@click.prevent="changeDivision(index)">
					<span>{{item.title}}</span>
				</a>
			</div>
		</div><!-- .container-inner -->
	</div><!-- .nominee-title-wrap -->
</template>

<script>
	export default {
		name: '',
		props: {
			msg: String
		},
		data: () => ({
			tabList: [
				{title: 'TV부문', id: 'tv'},
				{title: '영화부문', id: 'movie'},
				{title: '연극부문', id: 'play'}
			],
			currentTabIdx: 0
		}),
		methods: {
			changeDivision(idx) {
				this.currentTabIdx = idx
			}
		}
	}

</script>

