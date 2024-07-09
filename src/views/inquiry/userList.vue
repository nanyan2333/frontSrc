<template>
	<el-menu
		default-active="1"
		class="el-menu-vertical-demo"
		style="height: 100%">
		<div class="search-container">
			<input v-model="addId" placeholder="添加ID" class="search-input" />
			<button class="add-button" @click="addUser">
				<el-icon><plus /></el-icon>
			</button>
		</div>
		<menu-item
			v-for="(val, index) in menuItems"
			:id="val"
			:key="index"
			@is-selected="isSelected">
		</menu-item>
	</el-menu>
</template>

<script setup>
import { ref } from "vue"
import MenuItem from "./menuItem.vue"
import { getInfo } from "@/api/userInfo.js"
import { searchReserve } from "@/api/reserve.js"
import useUserStore from "@/store/module/user"
const user = useUserStore()
const menuItems = ref([])
const addId = ref("")
const emits = defineEmits(["selectId"])
const isSelected = (selectedId) => {
	emits("selectId", selectedId)
}

const addUser = () => {
	getInfo(addId.value, !user.isDoctor()).then((res) => {
		if (res.data.id) {
			if (!menuItems.value.includes(res.data.id)) {
				menuItems.value.push(res.data.id)
				addId.value = ""
			}
		}
	})
}

const getUser = () => {
	searchReserve(user.id, user.isDoctor()).then((res) => {
		if (res.data.reserves.length) {
			if (user.isDoctor()) {
				res.data.reserves.forEach((item) => {
					menuItems.value.push(item.patientId)
				})
			} else {
				res.data.reserves.forEach((item) => {
					menuItems.value.push(item.doctorId)
				})
			}
			menuItems.value = Array.from(new Set(menuItems.value)) // 去重
		}
	})
}

getUser()
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 300px;
	min-height: 400px;
}
.search-container {
	display: flex;
	align-items: center;
	padding: 10px;
	background-color: #ffffff;
	justify-content: center;
	height: 50px; /* 设定容器高度 */
}
.search-input {
	font-size: 14px;
	margin-right: 10px;
	border-radius: 20px; /* 圆角样式 */
	text-align: center;
	height: 30px; /* 设定输入框高度 */
	line-height: 30px; /* 设置行高以对齐文本 */
	padding: 0 10px;
	width: 150px; /* 适当宽度 */
}
.add-button {
	flex-shrink: 0;
	height: 35px; /* 设定按钮高度 */
	line-height: 30px; /* 设置行高以对齐文本 */
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px; /* 适当宽度 */
	padding: 0; /* 确保按钮内部没有额外的padding */
	background-color: #f0f0f0; /* 背景颜色 */
	border: none; /* 无边框 */
	border-radius: 20px; /* 圆角样式 */
	color: #333; /* 字体颜色 */
	cursor: pointer; /* 鼠标悬停时的光标 */
}
.add-button:hover {
	background-color: #e0e0e0; /* 鼠标悬停时的背景颜色 */
}
</style>
