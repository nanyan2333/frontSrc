<template>
	<div class="info-div" v-if="!showReserveList">
		<div class="search-bar">
			<el-input
				:suffix-icon="Search"
				v-model="searchId"
				placeholder="搜索医生ID"></el-input>
			<el-button @click="searchDoctorById"
				><el-icon><Search /></el-icon
			></el-button>
			<el-button @click="resetPage">
				<el-icon><RefreshRight /></el-icon
			></el-button>
		</div>
		<div class="doctor-cards">
			<template v-for="(userInfo, index) in doctorData" :key="index">
				<info-card
					:userInfo="userInfo"
					@editReserve="onEditReserve"></info-card>
			</template>
		</div>
		<div class="pagination">
			<el-pagination
				v-model:current-page="page"
				v-model:page-size="eachPageNum"
				layout="prev, pager, next, jumper"
				:total="maxPage"
				@current-change="handleCurrentChange" />
		</div>
	</div>
	<div class="reserve-view" v-else>
		<div class="button-return">
			<el-button @click="showReserveList = false">返回</el-button>
		</div>
		<div>
			<reserve-list :userId="reserveListId" />
		</div>
	</div>
</template>
<script setup>
import { ref } from "vue"
import reserveList from "../reserve/reserveList.vue"
import infoCard from "./infoCard.vue"
import { Search } from "@element-plus/icons-vue"
import { getInfo } from "../../api/userInfo"
import { getPageDoctorInfo } from "../../api/admin"
const page = ref(1)
const eachPageNum = ref(9)
const showReserveList = ref(false)
const searchId = ref("")
const doctorData = ref([])
const reserveListId = ref("")
const maxPage = ref(0)
const searchDoctorById = () => {
	getInfo(searchId.value, true).then((res) => {
		doctorData.value = []
		doctorData.value.push(res.data)
	})
}
const resetPage = () => {
	searchId.value = ""
	page.value = 1
	getPageData()
}
const onEditReserve = (val) => {
	reserveListId.value = val
	showReserveList.value = true
}
const getPageData = () => {
	getPageDoctorInfo(page.value, eachPageNum.value).then((res) => {
		doctorData.value = res.data.data
		maxPage.value = res.data.allPage
	})
}
const handleCurrentChange = (newPage) => {
	page.value = newPage
	getPageData()
}

getPageData()
</script>
