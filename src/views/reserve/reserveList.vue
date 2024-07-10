<template>
	<el-table :data="showData" style="width: 100%" v-if="hasData">
		<el-table-column label="患者id" prop="patientId"></el-table-column>
		<el-table-column label="医生id" prop="doctorId"></el-table-column>
		<el-table-column label="预约日期" prop="resDate"></el-table-column>
		<el-table-column label="预约时段" prop="timeSeg"></el-table-column>
		<el-table-column align="center">
			<template #header>
				<el-row type="flex" class="searchBar">
					<el-icon size="25"><Search /></el-icon>
					<el-input
						v-model="searchId"
						placeholder="输入id"
						size="large"
						style="width: 200px"></el-input>
				</el-row>
			</template>
			<template #default="scope">
				<el-button size="large" @click="edit(scope.row)">编辑</el-button>
				<el-button
					size="large"
					type="danger"
					@click="deleteReserve(scope.row, scope.$index)"
					>删除</el-button
				>
			</template>
		</el-table-column>
	</el-table>
	<div v-else class="empty-container">
		<el-empty description="没有相关数据"></el-empty>
	</div>
	<el-dialog
		title="修改预约时间"
		v-model="isShow"
		@close="isShow = false"
		style="width: 350px">
		<el-form
			:model="motifiedItem"
			label-width="80px"
			label-position="left"
			ref="formRef"
			:rules="rules">
			<el-form-item label="选择时段">
				<el-select v-model="motifiedItem.timeSeg" placeholder="选择时段">
					<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value"
						:disabled="item.disabled" />
				</el-select>
			</el-form-item>
		</el-form>
		<div style="text-align: right">
			<el-button @click="handleMotified">提交</el-button>
		</div>
	</el-dialog>
</template>

<script setup>
import { ref, computed } from "vue"
import {
	searchReserve,
	removeReserve,
	motifiedReserve,
	searchAvailableTime,
} from "../../api/reserve"
import useUserStore from "@/store/module/user"
import { ElMessage } from "element-plus"
const props = defineProps({
	isFlush: Boolean,
	userId: { type: String, required: true },
})

const user = useUserStore()
const isShow = ref(false)
const reserveData = ref([])
const formRef = ref(null)
const options = ref([
	{ label: "8:00-9:00", value: "08:00:00-09:00:00", disabled: false },
	{ label: "9:00-10:00", value: "09:00:00-10:00:00", disabled: false },
	{ label: "10:00-11:00", value: "10:00:00-11:00:00", disabled: false },
	{ label: "11:00-12:00", value: "11:00:00-12:00:00", disabled: false },
	{ label: "14:00-15:00", value: "14:00:00-15:00:00", disabled: false },
	{ label: "15:00-16:00", value: "15:00:00-16:00:00", disabled: false },
])
const rules = {
	timeSeg: [{ required: true, trigger: "blur", message: "请选择时段" }],
}
const searchId = ref("")
const motifyItem = ref({
	patientId: "",
	doctorId: "",
	resDate: "",
	timeSeg: "",
})
const motifiedItem = ref({
	timeSeg: "",
})
const hasData = computed(
	() => Array.isArray(reserveData.value) && reserveData.value.length > 0
)

const showData = computed(() => {
	return reserveData.value.filter((data) => {
		if (user.isDoctor()) {
			return data.patientId.includes(searchId.value) || !searchId.value
		} else {
			return data.doctorId.includes(searchId.value) || !searchId.value
		}
	})
})

const getReserveData = () => {
	searchReserve(props.userId, user.isDoctor() || user.isAdmin()).then((res) => {
		reserveData.value = res.data.reserves
	})
}

const handleMotified = () => {
	motifiedReserve(motifyItem.value, motifiedItem.value.timeSeg).then((res) => {
		if (res.data.status) {
			getReserveData()
			ElMessage.success(res.data.msg)
		} else {
			ElMessage.error(res.data.msg)
		}
	})
}

const edit = (oldVal) => {
	motifyItem.value = oldVal
	isShow.value = true
	searchAvailableTime(
		motifiedItem.value.doctorId,
		motifyItem.value.resDate
	).then((res) => {
		for (let i = 0; i < options.value.length; i++) {
			options.value[i].disabled = !res.data[i]
		}
	})
}

const deleteReserve = (oldVal, index) => {
	removeReserve(oldVal).then((res) => {
		if (res.data.status) {
			reserveData.value.splice(index, 1)
			ElMessage.success(res.data.msg)
			getReserveData()
		} else {
			ElMessage.error(res.data.msg)
		}
	})
}
getReserveData()

watch(
	() => props.isFlush,
	(oldVal, newVal) => {
		if (newVal !== oldVal) {
			getReserveData()
		}
	}
)
</script>

<style scoped>
.searchBar {
	align-items: center;
	padding-left: 5px;
}
.empty-container {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 400px; /* Adjust height as needed */
	width: 100%;
}
</style>
