<template>
	<Fragment>
		<h3 class="veiw_tit" v-html="item.title"></h3>
		<div class="view_info_wrap">
			<span class="author"><span class="ico"></span>{{ item.author.name }}</span>
			<div class="info">
				<span class="cnt_comment"><span class="ico"></span>{{ item.cnt.comment }}</span>
				<span class="cnt_like"><span class="ico"></span>{{ item.cnt.like }}</span>
				<span class="cnt_dislike"><span class="ico"></span>{{ item.cnt.dislike }}</span>
			</div>
		</div>
	</Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'

export default {
	props: [ 'item' ],
	components: {
		Fragment
	},
	data: () => ({
	}),
	watch: {
	},
	created() {
	},
	methods: {
	}
}
</script>