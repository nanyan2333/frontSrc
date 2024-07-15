<template>
	<div class="form-container">
		<div class="form-item">
			<el-text class="form-label">患者ID</el-text>
			<el-input v-model="info.patientId" placeholder="请输入患者ID"></el-input>
		</div>
		<div class="form-item">
			<el-text class="form-label">医疗记录</el-text>
			<el-input
				type="textarea"
				v-model="info.content"
				placeholder="请输入患者医疗记录"
				rows="25"></el-input>
		</div>
		<div class="form-actions">
			<el-button @click="submit">提交</el-button>
			<el-button @click="back">返回</el-button>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue"
import { getCurrentFormattedTime } from "../../utils/time"
import { addRecord } from "@/api/history"
import { ElMessage } from "element-plus"

const info = ref({
	patientId: "",
	content: "",
})
const emits = defineEmits(["added", "back"])

const submit = () => {
	if (info.value.patientId !== "" && info.value.content !== "" && info.value) {
		addRecord(
			info.value.patientId,
			info.value.content,
			getCurrentFormattedTime()
		).then((res) => {
			if (res.data.status) {
				ElMessage.success(res.data.msg)
				emits("added", info.value.patientId)
			} else {
				ElMessage.error(res.data.msg)
			}
		})
	} else {
		ElMessage.error("请填写完整信息")
	}
}
const back = () => {
	emits("back", false)
}
</script>

<style scoped>
.form-container {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}
.form-item {
	display: flex;
	gap: 1rem;
}
.form-label {
	min-width: 80px;
}
.form-actions {
	display: flex;
	justify-content: flex-end;
	gap: 1rem;
}
</style>
