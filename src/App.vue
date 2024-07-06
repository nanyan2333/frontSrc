<template>
	<div class="layout">
		<el-container>
			<el-aside v-if="isLoginOrReg" class="sider">
				<menu-bar></menu-bar>
			</el-aside>
			<el-container>
				<el-header v-if="isLoginOrReg" style="padding: 0;"> 
                    <navi-bar></navi-bar>
				</el-header>
				<el-main style="padding: 0;">
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script setup>
import NaviBar from "@/layout/navibar/index.vue"
import { useRouter } from "vue-router"
import { computed } from "vue"
import MenuBar from "@/layout/menu/index.vue"
const router = useRouter()
const isLoginOrReg = computed(() => {
	const currentPath = router.currentRoute.value.path
	return !(
		currentPath === "/login" ||
		currentPath === "/register" ||
		currentPath === "/"
	)
})
</script>

<style scoped>
.layout {
	display: flex;
	width: 100%;
	height: 100%;
	flex-direction: column;
}
.sider {
	width: 230px;
	padding: 0px;
	margin: 0px;
}
</style>
