<template>
	<div class="main">
		<div class="search-bar" v-if="isDoctor">
			<div class="search-left">
				<el-button @click="showAddRecord = true"
					><el-icon><Plus /></el-icon>新增记录</el-button
				>
			</div>
			<div class="search-right">
				<el-input
					placeholder="请输入查询患者的ID"
					v-model="searchInfo"></el-input>
				<el-button @click="getRecordsData">
					<el-icon><Search /></el-icon> 查询
				</el-button>
			</div>
		</div>
		<el-divider></el-divider>
		<div class="text-area" v-if="!showAddRecord">
			<show-record :options="options" :records="records"></show-record>
		</div>
		<div v-if="showAddRecord" class="text-area">
			<add-record
				@added="added"
				@back="(val) => (showAddRecord = val)"></add-record>
		</div>
	</div>
</template>

<script setup>
import { ref, watch } from "vue"
import { searchRecord } from "../../api/history"
import useUserStore from "@/store/module/user"
import showRecord from "./showRecord.vue"
import addRecord from "./addRecord.vue"
import { ElMessage } from "element-plus"

const medicalInfo = ref({
	patientId: "",
	content: "",
	mrTime: "",
})
const searchInfo = ref("")
const user = useUserStore()
const options = ref([])
const records = ref([])
const isDoctor = user.isDoctor()
const showAddRecord = ref(false)

const getRecordsData = () => {
	searchRecord(isDoctor ? searchInfo.value : user.id).then((res) => {
		options.value = []
		records.value = []
		if (res.data.records.length > 0 && (searchInfo.value || !isDoctor)) {
			res.data.records.forEach((element) => {
				options.value.push(element.mrTime)
				records.value.push(element.content)
			})
			ElMessage.success("查询成功")
		} else if (
			res.data.records.length == 0 &&
			(searchInfo.value || !isDoctor)
		) {
			ElMessage.warning("未查询到相关记录")
		}
	})
}

getRecordsData()

const added = (val) => {
	searchInfo.value = val
	showAddRecord.value = false
	getRecordsData()
}
</script>

<style scoped>
.main {
	width: 100%;
}
.search-bar {
	padding-left: 30px;
	padding-right: 30px;
	padding-top: 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1rem;
}
.search-left {
	display: flex;
	align-items: center;
}
.search-right {
	display: flex;
	align-items: center;
	gap: 1rem;
}
.text-area {
	padding: 20px;
	width: 95%;
}
</style>
