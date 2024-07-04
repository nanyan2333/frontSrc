<template>
	<el-dialog v-model="visible" @close="close" title="预约信息">
		<el-form
			:model="reserveInfo"
			label-width="80px"
			label-position="left"
			ref="formRef"
			:rules="rules">
			<el-form-item label="患者id" prop="pid">
				<el-input v-model="reserveInfo.pid"></el-input>
			</el-form-item>
			<el-form-item label="医生id" prop="did">
				<el-input v-model="reserveInfo.did"></el-input>
			</el-form-item>
			<el-form-item label="预约日期" prop="date">
				<el-date-picker
					v-model="reserveInfo.date"
					type="date"
					placeholder="选择日期"
					format="YYYY/MM/DD"
					value-format="YYYY/MM/DD"
					style="width: 646.33px" />
			</el-form-item>
			<el-form-item label="选择时段" prop="timeSeg">
				<el-select v-model="reserveInfo.timeSeg" placeholder="选择时段">
					<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value"
						:disabled="item.disabled" />
				</el-select>
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
const formRef = ref(null)
const options = [
	{ label: "8:00-9:00", value: "08/00/00-09/00/00", disabled: false },
	{ label: "9:00-10:00", value: "09/00/00-10/00/00", disabled: false },
	{ label: "10:00-11:00", value: "10/00/00-11/00/00", disabled: false },
	{ label: "11:00-12:00", value: "11/00/00-12/00/00", disabled: false },
	{ label: "14:00-15:00", value: "14/00/00-15/00/00", disabled: false },
	{ label: "15:00-16:00", value: "15/00/00-16/00/00", disabled: false },
]
const rules = {
	pid: [{ required: true, trigger: "blur", message: "输入患者ID" }],
	did: [{ required: true, trigger: "blur", message: "输入医生ID" }],
	date: [{ required: true, trigger: "blur", message: "请选择日期" }],
	timeSeg: [{ required: true, trigger: "blur", message: "请选择时段" }],
}
const emit = defineEmits(["controlDialogClose"])
const props = defineProps({
	visible: Boolean,
})

const reserveInfo = ref({
	pid: "",
	did: "",
	date: "",
	timeSeg: "",
})

const { visible } = toRefs(props)

const close = () => {
	emit("controlDialogClose", false)
}

const addReserveButtonClick = () => {
	formRef.value.validate((valid) => {
		if (valid) {
			addReserve(reserveInfo.value).then((res) => {
				if (res.status) {
					alert("预约成功")
					close()
				} else {
					alert("预约失败")
				}
			})
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
