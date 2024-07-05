<template>
	<el-menu
		class="menu"
		background-color="rgb(48,65,86)"
		text-color="#fff"
		active-text-color="#ffd04b"
		router>
		<div class="menu-header">
			<img src="@/assets/icon.svg" alt="Icon" class="menu-logo" />
			<el-text class="menu-title">说的道理</el-text>
			<el-text class="menu-subtitle">阿米诺斯</el-text>
		</div>
		<el-menu-item index="/index">
			<template #title>
				<el-icon><User /></el-icon>
				<el-text size="large" style="color: #ffffff;">首页</el-text>
			</template>
		</el-menu-item>
		<el-menu-item index="/history" v-if="isPatient || isAdmin">
			<template #title>
				<el-icon><Tickets /></el-icon>
				<el-text size="large" style="color: #ffffff;">历史记录</el-text>
			</template>
		</el-menu-item>
		<el-menu-item index="/reserve">
			<template #title>
				<el-icon><EditPen /></el-icon>
				<el-text size="large" style="color: #ffffff;">预约管理</el-text>
			</template>
		</el-menu-item>
		<el-menu-item index="/inquiry">
			<template #title>
				<el-icon><FirstAidKit /></el-icon>
				<el-text size="large" style="color: #ffffff;">咨询</el-text>
			</template>
		</el-menu-item>
		<el-menu-item index="/edit" v-if="isAdmin">
			<template #title>
				<el-icon><Setting /></el-icon>
				<el-text size="large" style="color: #ffffff;">信息管理</el-text>
			</template>
		</el-menu-item>
	</el-menu>
</template>

<script setup>
import { ref } from "vue"
import useUserStore from "@/store/module/user.js"
const userStore = useUserStore()
const isAdmin = ref(userStore.isAdmin())
const isDoctor = ref(userStore.isDoctor())
const isPatient = ref(userStore.isPatient())
watch(
	() => userStore.role,
	() => {
		isAdmin.value = userStore.isAdmin()
		isDoctor.value = userStore.isDoctor()
		isPatient.value = userStore.isPatient()
	}
)
</script>

<style scoped>
.menu {
  width: 230px;
  height: 100vh;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  background-color: rgb(48, 65, 86);
}

.menu-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 0;
}

.menu-logo {
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
}

.menu-title {
  margin: 0;
  font-size: 1.8em;
  color: #fff;
  text-align: center;
}

.menu-subtitle {
  margin: 0;
  font-size: 1.2em;
  color: #ffd04b;
  text-align: center;
}

.el-menu-item {
  font-size: 1.1em;
}

.el-menu-item .el-icon {
  margin-right: 10px;
}

:deep(.el-menu-item.is-active .el-icon),
:deep(.el-menu-item.is-active .el-text) {
  color: #ffd04b !important;
}

.el-menu-item:hover {
  background-color: #33475b;
}
</style>
