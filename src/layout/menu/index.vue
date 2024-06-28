<template>
	<el-menu
		class="menu"
		background-color="#545c64"
		text-color="#fff"
		active-text-color="#ffd04b">
		<el-menu-item v-for="(path, index) in permissionStore.routes" :key="index">
			<router-link :to="'/' + path">{{ path }}</router-link>
		</el-menu-item>
	</el-menu>
</template>

<script setup>
import usePermissionStore from "@/store/module/permission.js"
const permissionStore = usePermissionStore()
</script>
<style scoped>
.menu {
	width: 200px;
	height: 100vh;
}
</style>
