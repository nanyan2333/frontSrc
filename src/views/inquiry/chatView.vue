<template>
	<div class="chat-container">
		<div class="messages">
			<el-scrollbar height="600px" ref="messagesContainer">
				<div ref="innerRef" style="padding: 10px">
					<message-bubble
						v-for="(obj, index) in messages"
						:key="index"
						:message="obj.message"
						:is-sent-by-me="judgeSender(obj.toId)"></message-bubble>
				</div>
			</el-scrollbar>
		</div>
		<div class="input-container">
			<el-input
				class="el-input"
				type="textarea"
				placeholder="请输入内容"
				v-model="message"
				@keyup.enter.native="sendMessage"
				:rows="4"></el-input>
			<el-button class="send-button" @click="sendMessage" size="large"
				>发送</el-button
			>
		</div>
	</div>
</template>

<script setup>
import { ref, toRefs, watch, nextTick } from "vue"
import MessageBubble from "./message.vue"

const props = defineProps({
	messages: Object,
	selectId: String,
})
const emits = defineEmits(["rollMessage"])
const message = ref("")
const { messages, selectId } = toRefs(props)
const messagesContainer = ref(null)
const innerRef = ref(null)

const sendMessage = () => {
	emits("rollMessage", message.value)
	message.value = ""
	setScrollToBottom() 
}

const judgeSender = (toId) => {
	return selectId.value === toId
}

async function setScrollToBottom() {
	await nextTick()
	const max = innerRef.value.scrollHeight
	messagesContainer.value.setScrollTop(max)
}

watch(
	() => messages.value,
	() => {
		setScrollToBottom()
	},
	{ deep: true }
)
</script>

<style>
.chat-container {
	display: flex;
	flex-direction: column;
	height: 97%;
	width: 100vw;
	padding: 10px;
}
.messages {
	flex: 1;
	overflow-y: auto;
	padding: 20px;
	background-color: #ffffff;
}
.input-container {
	display: flex;
	flex-direction: column;
	padding: 10px;
	background-color: #ffffff;
}
.el-input {
	width: 100%;
	font-size: 18px; /* 调整字号 */
	margin-bottom: 10px;
}
.send-button {
	align-self: flex-end; /* 右对齐按钮 */
}
</style>
