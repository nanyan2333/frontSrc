<template>
	<el-dialog v-model="visible" @close="close" title="预约信息">
		<el-form
			:model="reserveInfo"
			label-width="80px"
			label-position="left"
			ref="formRef"
			:rules="rules">
			<el-form-item label="医生属地">
				<el-input
					placeholder="输入属地"
					v-model="queryParams.position"></el-input>
			</el-form-item>
			<el-form-item label="医生专长">
				<el-input
					placeholder="输入专长"
					v-model="queryParams.specialty"></el-input>
			</el-form-item>
			<el-form-item label="患者id" prop="patientId">
				<el-input v-model="reserveInfo.patientId"></el-input>
			</el-form-item>
			<el-form-item label="医生id" prop="doctorId">
				<el-select
					v-model="reserveInfo.doctorId"
					filterable
					placeholder="选择医生id">
					<el-option
						v-for="item in doctorIdOptions"
						:key="item.value"
						:label="item.label"
						:value="item.value" />
				</el-select>
			</el-form-item>
			<el-form-item label="预约日期" prop="resDate">
				<el-date-picker
					v-model="reserveInfo.resDate"
					type="date"
					placeholder="选择日期"
					format="YYYY-MM-DD"
					value-format="YYYY-MM-DD"
					style="width: 646.33px"
					:disabled-date="disabledDate" />
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
import { ref, toRefs, watch } from "vue"
import {
	addReserve,
	searchAvailableTime,
	getSelectedDoctorId,
} from "../../api/reserve"
import { ElMessage } from "element-plus"

const formRef = ref(null)
const queryParams = ref({
	position: "",
	specialty: "",
})
const options = ref([
	{ label: "8:00-9:00", value: "08:00:00-09:00:00", disabled: false },
	{ label: "9:00-10:00", value: "09:00:00-10:00:00", disabled: false },
	{ label: "10:00-11:00", value: "10:00:00-11:00:00", disabled: false },
	{ label: "11:00-12:00", value: "11:00:00-12:00:00", disabled: false },
	{ label: "14:00-15:00", value: "14:00:00-15:00:00", disabled: false },
	{ label: "15:00-16:00", value: "15:00:00-16:00:00", disabled: false },
])
const doctorIdOptions = ref([])
const rules = {
	patientId: [{ required: true, trigger: "blur", message: "输入患者ID" }],
	doctorId: [{ required: true, trigger: "blur", message: "输入医生ID" }],
	resDate: [{ required: true, trigger: "blur", message: "请选择日期" }],
	timeSeg: [{ required: true, trigger: "blur", message: "请选择时段" }],
}
const emit = defineEmits(["controlDialogClose", "flushForm"])
const props = defineProps({
	visible: Boolean,
})

const reserveInfo = ref({
	patientId: "",
	doctorId: "",
	resDate: "",
	timeSeg: "",
})

const { visible } = toRefs(props)

const close = () => {
	emit("controlDialogClose", false)
}
const disabledDate = (time) => {
	return time.getTime() < Date.now() - 86400000
}
const selectDoctorId = (newParms) => {
	getSelectedDoctorId(newParms).then((res) => {
		doctorIdOptions.value = []
		res.data.forEach((element) => {
			doctorIdOptions.value.push({
				label: element,
				value: element,
			})
		})
	})
}
watch(
	() => [reserveInfo.value.resDate, reserveInfo.value.doctorId],
	([newDate, newdoctorId]) => {
		if (newDate !== "" && newdoctorId !== "") {
			searchAvailableTime(newdoctorId, newDate).then((res) => {
				for (let i = 0; i < 6; i++) {
					options.value[i].disabled = !res.data[i]
				}
			})
		}
	}
)
watch(
	() => queryParams.value,
	(newVal) => {
		selectDoctorId(newVal)
	},
	{ immediate: true, deep: true }
)
const addReserveButtonClick = () => {
	formRef.value.validate((valid) => {
		if (valid) {
			addReserve(reserveInfo.value).then((res) => {
				if (res.status) {
					ElMessage({
						message: res.data.msg,
						type: "success",
					})
					close()
					reserveInfo.value.doctorId = ""
					reserveInfo.value.resDate = ""
					reserveInfo.value.timeSeg = ""
					reserveInfo.value.patientId = ""
					emit("flushForm")
				} else {
					ElMessage.error(res.data.msg)
					close()
				}
			})
		}
	})
}
selectDoctorId(queryParams.value)
</script>

<style scoped>
.dialog-footer {
	text-align: right;
	padding: 10px 0;
}
</style>
