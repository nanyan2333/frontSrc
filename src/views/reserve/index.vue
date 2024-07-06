<template>
	<el-row>
		<div class="addButtonGroup">
			<el-button @click="handleAddDialog" v-if="isPatient" style="padding-right: 30px;">
				<el-icon><Plus /></el-icon>新增预约
			</el-button>
		</div>
	</el-row>
	<el-row>
		<el-divider>
			<el-text size="large"> 我的预约 </el-text>
		</el-divider>
	</el-row>
	<el-row>
		<reserve-list :isFlush="isFlush"></reserve-list>
	</el-row>
	<add-reserve-list
		:visible="isShow"
		@controlDialogClose="
			(val) => {
				isShow = val
			}
		"
		@flush-form="isFlush = !isFlush"></add-reserve-list>
</template>

<script setup>
import { computed, ref } from "vue"
import useUserStore from "@/store/module/user"
import addReserveList from "./addReserveList.vue"
import reserveList from "./reserveList.vue"

const user = useUserStore()
const isShow = ref(false)
const isFlush = ref(false)
const isPatient = ref(user.isPatient() || user.isAdmin())

const handleAddDialog = () => {
	isShow.value = true
}
</script>

<style scoped>
.addButtonGroup {
	width: 100%;
	display: flex;
	justify-content: flex-end;
}
</style>
