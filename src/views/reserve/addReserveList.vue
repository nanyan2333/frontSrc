<template>
	<el-dialog v-model="visible" @close="close" title="预约信息">
		<el-form :model="reserveInfo" label-width="80px" label-position="left">
			<el-form-item label="患者id">
				<el-input v-model="reserveInfo.pid"></el-input>
			</el-form-item>
			<el-form-item label="医生id">
				<el-input v-model="reserveInfo.did"></el-input>
			</el-form-item>
			<el-form-item label="开始时间">
				<el-date-picker
					v-model="reserveInfo.startTime"
					type="datetime"
					placeholder="选择开始时间"></el-date-picker>
			</el-form-item>
			<el-form-item label="结束时间">
				<el-date-picker
					v-model="reserveInfo.endTime"
					type="datetime"
					placeholder="选择结束时间"></el-date-picker>
			</el-form-item>
		</el-form>
		<div class="dialog-footer">
			<el-button @click="addReserveButtonClick" type="primary">提交</el-button>
			<el-button @click="close">取消</el-button>
		</div>
	</el-dialog>
</template>

<script setup>
import { ref, toRefs } from "vue"
import { addReserve } from "../../api/reserve"

const emit = defineEmits(["controlDialogClose"])
const props = defineProps({
	visible: Boolean,
})

const reserveInfo = ref({
	pid: "",
	did: "",
	startTime: "",
	endTime: "",
})

const { visible } = toRefs(props)

const close = () => {
	emit("controlDialogClose", false)
}

const addReserveButtonClick = () => {
	addReserve(reserveInfo.value).then((res) => {
		if (res.status) {
			alert("预约成功")
			close()
		} else {
			alert("预约失败")
		}
	})
}
</script>

<style scoped>
.dialog-footer {
	text-align: right;
	padding: 10px 0;
}
</style>
