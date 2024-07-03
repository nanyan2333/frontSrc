<template>
	<div class="page-container">
		<el-form
			:model="loginForm"
			class="login-container"
			:rules="rules"
			ref="ruleRef">
			<h3 class="title">说的道理管理系统</h3>
			<el-form-item label="账号" prop="account">
				<el-input
					placeholder="请输入账号"
					v-model="loginForm.account"
					class="input-item"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input
					placeholder="请输入密码"
					v-model="loginForm.password"
					class="input-item"
					show-password></el-input>
			</el-form-item>
			<el-form-item label="身份" prop="isDocter">
				<el-select
					v-model="loginForm.isDocter"
					placeholder="选择身份"
					class="input-item">
					<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value" />
				</el-select>
			</el-form-item>
			<div class="button-container">
				<el-button @click="loginFunc" class="button">登录</el-button>
				<el-button @click="goToRegister" class="button">注册</el-button>
			</div>
		</el-form>
	</div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import useUserStore from "@/store/module/user"
import usePermissionStore from "@/store/module/permission"
import { login } from "@/api/setUserState.js"
import { setToken } from "../utils/auth"

const userStore = useUserStore()
const permissionStore = usePermissionStore()
const router = useRouter()
const loginForm = ref({
	account: "",
	password: "",
	isDocter: null,
})

const options = [
	{ value: true, label: "医生" },
	{ value: false, label: "患者" },
]
const ruleRef = ref()
const rules = {
	account: [
		{ required: true, message: "请输入账号", trigger: "blur" },
		{ max: 11, message: "账号最多11位", trigger: "blur" },
	],
	password: [
		{ required: true, message: "请输入密码", trigger: "blur" },
		{ max: 30, message: "密码最多30位", trigger: "blur" },
	],
	isDocter: [{ required: true, message: "请选择身份", trigger: "blur" }],
}

const loginFunc = () => {
	const form = loginForm.value
	form.$refs.loginForm.validate((valid) => {
		if (valid) {
			login(form.account, form.password, form.isDocter).then((res) => {
				if (res.data.status) {
					userStore.id = form.account
					userStore.token = res.data.token
					userStore.role = res.data.role
					setToken(res.data.token)
					router.replace("/index")
				} else {
					alert(res.data.msg)
					form.password = ""
					form.account = ""
				}
			})
		}
	})
}

const goToRegister = () => {
	router.push("/register")
}
</script>

<style>
body,
html {
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
	padding: 0;
	margin: 0;
}

.login-container {
	background-color: #fff;
	padding: 40px;
	border-radius: 10px;
	width: 400px;
	box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
	text-align: center;
}

.title {
	margin-bottom: 30px;
	font-size: 2em;
	color: #333;
}

.input-item {
	flex: 1;
	font-size: 1.1em;
}

.button-container {
	display: flex;
	justify-content: center;
}

.button {
	margin-top: 10px;
	width: 48%;
	font-size: 1.1em;
	background-color: #42b983;
	color: #fff;
	margin: 0 5px;
}

.button:hover {
	background-color: #339970;
}
</style>
