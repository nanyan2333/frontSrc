<template>
	<el-table :data="showData" style="width: 100%" v-if="hasData">
		<el-table-column label="患者id" prop="pid"></el-table-column>
		<el-table-column label="医生id" prop="did"></el-table-column>
		<el-table-column label="起始时间" prop="startTime"></el-table-column>
		<el-table-column label="结束时间" prop="endTime"></el-table-column>
		<el-table-column align="right">
			<template #header>
				<el-input
					v-model="searchId"
					size="small"
					placeholder="输入id"></el-input>
			</template>
			<template #default="scope">
				<el-button size="small" @click="edit(scope.row)">编辑</el-button>
				<el-button size="small" type="danger" @click="deleteReserve(scope.row)"
					>删除</el-button
				>
			</template>
		</el-table-column>
	</el-table>
	<el-empty v-else description="没有相关数据"></el-empty>
	<el-dialog title="修改预约时间" v-model="isShow" @close="isShow = false" style="width: 350px;">
		<el-form :model="motifiedItem" label-width="80px" label-position="left">
			<el-form-item label="开始时间"
				><el-date-picker
					v-model="motifiedItem.startTime"
					type="datetime"
					placeholder="选择开始时间"></el-date-picker>
			</el-form-item>
			<el-form-item label="结束时间"
				><el-date-picker
					v-model="motifiedItem.endTime"
					type="datetime"
					placeholder="选择结束时间"></el-date-picker
			></el-form-item>
		</el-form>
        <div style="text-align: right;">
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
} from "../../api/reserve"
import useUserStore from "@/store/module/user"

const user = useUserStore()
const isShow = ref(false)
const reserveData = ref([
	{
		pid: "65553",
		did: "10001",
		startTime: "2022-02-02 10:00:00",
		endTime: "2022-02-02 12:00:00",
	},
	{
		pid: "65554",
		did: "10002",
		startTime: "2022-02-03 10:00:00",
		endTime: "2022-02-03 12:00:00",
	},
	{
		pid: "65555",
		did: "10003",
		startTime: "2022-02-04 10:00:00",
		endTime: "2022-02-04 12:00:00",
	},
	//...
])
const searchId = ref("")
const motifyItem = ref({
	pid: "",
	did: "",
	startTime: "",
	endTime: "",
})
const motifiedItem = ref({
	startTime: "",
	endTime: "",
})
const hasData = computed(() => reserveData.value.length > 0)

const showData = computed(() => {
	return reserveData.value.filter((data) => {
		if (user.isDocter()) {
			return data.pid.includes(searchId.value) || !searchId.value
		} else {
			return data.did.includes(searchId.value) || !searchId.value
		}
	})
})

const getReserveData = () => {
	searchReserve(user.id, user.isDocter).then((res) => {
		reserveData.value = res.reserve
	})
}

const handleMotified = () => {
	motifiedReserve(
		motifyItem.value,
		motifiedItem.value.startTime,
		motifiedItem.value.endTime
	).then((res) => {
		if (res.status) {
			alert("修改成功")
			getReserveData()
		} else {
			alert("修改失败")
		}
	})
}

const edit = (oldVal) => {
	motifyItem.value = oldVal
	isShow.value = true
}

const deleteReserve = (oldVal) => {
	removeReserve(oldVal).then((res) => {
		if (res.status) {
			alert("删除成功")
			getReserveData()
		} else {
			alert("删除失败")
		}
	})
}
// getReserveData()
</script>
