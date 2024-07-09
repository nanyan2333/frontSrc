<template>
	<div class="main">
		<user-list @selectId="handleSelect"></user-list>
		<chat-view
			:selectId="selectedId"
			:messages="messages[selectedId]"
			@roll-message="sendMessage"></chat-view>
	</div>
</template>
<script setup>
import SocketApi from "../../utils/socket"
import { ref, watch } from "vue"
import useUserStore from "@/store/module/user"
import UserList from "./userList.vue"
import ChatView from "./chatView.vue"
import { getChatHistory } from "../../api/inquiry"
import { getCurrentFormattedTime } from "../../utils/time"
const user = useUserStore()
const messages = ref({})
const selectedId = ref("")
const socketApi = new SocketApi(user.id, user.role, messages.value)

const handleSelect = (val) => {
	selectedId.value = val
}

const sendMessage = (message) => {
	var _toRole = user.isDoctor() ? "Patient" : "Doctor"
	if (!messages.value[selectedId.value]) {
		messages.value[selectedId.value] = []
	}
	if (message !== "" && message) {
		messages.value[selectedId.value].push({
			message: message,
			toId: selectedId.value,
			fromId: user.id,
            chatTime : getCurrentFormattedTime(),
			toRole : _toRole,
			fromRole: user.role
		})
		socketApi.sendMessage(selectedId.value, _toRole, message)
	}
}
watch(
	() => selectedId.value,
	(newId) => {
		if (newId) {
			if (user.isDoctor()) {
				getChatHistory(newId, user.id).then((res) => {
					messages.value[newId] = res.data
				})
			} else {
				getChatHistory(user.id, newId).then((res) => {
					messages.value[newId] = res.data
				})
			}
		}
	}
)
</script>

<style scoped>
.main {
	display: flex;
	width: 100%;
	height: 100%;
}
</style>
