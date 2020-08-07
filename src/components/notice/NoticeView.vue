<template>
	<div class="tlb-wrap">
		<div class="container-inner">
			<BoardView :id="id" :routeName="routeName" />
		</div>
	</div>
</template>

<script>
import BoardView from '@/components/board/BoardView.vue'

export default {
	components: {
		BoardView
	},
	props: [ 'id' ],
	data: () => ({
		routeName: 'notice' 
	}),
	created() {
	},
	methods: {
	}
}
</script>
