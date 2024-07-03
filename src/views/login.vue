<template>
	<div class="page-container">
		<div class="login-container">
			<h3 class="title">欢迎来到在线医疗咨询管理系统</h3>
			<el-input placeholder="account" v-model="account" class="input-item"></el-input>
			<el-input placeholder="password" v-model="password" class="input-item"></el-input>
			<el-button @click="login" class="button">登录</el-button>
			<el-button @click="goToRegister" class="button">注册</el-button>
		</div>
	</div>
</template>

<style>
body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: auto;
}
.page-container {
    background-color: #e0f2f1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-container {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    width: 600px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.title {
    margin-bottom: 20px;
    font-size: 1.5em;
    color: #333;
}

.input-item {
    margin-bottom: 15px;
}

.button {
    margin-top: 10px;
}
</style>
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
		userStore.id = account.value
		userStore.role = "admin"
		permissionStore.routes = ["/history","/inquiry","/reserve"]
	} else {
		// 假设password是md5加密过的
		if (password.value === "password") {
			userStore.id = account.value
			permissionStore.routes = ["/history","/inquiry"]
		} else {
			alert("password error")
		}
	}
	
	router.replace("/index")
}
</script>
