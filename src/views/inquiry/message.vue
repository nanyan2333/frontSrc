<template>
	<div :class="['line', isSentByMe ? 'sent' : 'received']">
		<div class="message-bubble">
			<div class="message-content">{{ message }}</div>
		</div>
	</div>
</template>

<script setup>
import { toRefs } from "vue"
const props = defineProps({
	message: {
		type: String,
		required: true,
	},
	isSentByMe: {
		type: Boolean,
		required: true,
	},
})
</script>

<style scoped>
.line {
	display: flex;
	width: 100%;
	margin: 10px 0;
}

.sent {
	justify-content: flex-end;
}

.received {
	justify-content: flex-start;
}

.message-bubble {
	max-width: 60%;
	padding: 10px;
	border-radius: 10px;
	word-wrap: break-word;
}

.sent .message-bubble {
	background-color: #cce4ff;
	color: #000;
}

.received .message-bubble {
	background-color: #e0e0e0;
	color: #000;
}

.message-content {
	font-size: 16px;
}
</style>
