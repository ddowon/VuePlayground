<template>
	<div class="tlb-wrap">
		<div class="container-inner">
			<BoardWriteForm :item="item"/>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

import BoardWriteForm from '@/components/board/BoardWriteForm.vue'

export default {
	props: [ 'id' ],
	components: {
		BoardWriteForm
	},
	data: () => ({
	}),
	watch: {
	},
	computed: {
		...mapGetters('notices', [ 'item' ])
	},
	created() {
		this.fetchItemById(this.id)
	},
	methods: {
		fetchItemById(id) {
			this.$store.dispatch('notices/fetchItemById', id)
		},
	}
}
</script>