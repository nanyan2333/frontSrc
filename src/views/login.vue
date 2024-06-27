<template>
	<el-input placeholder="account" v-model="account"></el-input>
	<el-input placeholder="password" v-model="password"></el-input>
	<el-button @click="login">提交</el-button>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router"
import useUserStore from "@/store/module/user"
import usePermissionStore from '@/store/module/permission';

const userStore = useUserStore()
const permissionStore = usePermissionStore()
const router = useRouter()
const account = ref("")
const password = ref("")
const login = () => {
	if (account.value === "admin") {
		userStore.username = account.value
		permissionStore.routes = ["allprivileges"]
	} else {
		// 假设password是md5加密过的
		if (password.value === "password") {
			userStore.username = account.value
			permissionStore.routes = ["read", "write"]
		} else {
			alert("password error")
		}
	}
	router.replace("/index")
}
</script>
