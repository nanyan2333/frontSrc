<template>
	<el-row>
		<el-button @click="handleAddDialog" v-if="isPatient" >
			<el-icon><Plus /></el-icon>新增预约
		</el-button>
	</el-row>
	<el-row>
		<reserve-list></reserve-list>
	</el-row>
	<add-reserve-list
		:visible="isShow"
		@controlDialogClose="
			(val) => {
				isShow = val
			}
		">
	</add-reserve-list>
</template>

<script setup>
import { computed, ref } from "vue"
import useUserStore from "@/store/module/user"
import addReserveList from "./addReserveList.vue"
import reserveList from "./reserveList.vue"

const user = useUserStore()
const isShow = ref(false)
const isPatient = ref(user.isPatient())

const handleAddDialog = () => {
	isShow.value = true 
}
</script>
