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
			<el-form-item label="身份" prop="isDoctor">
				<el-select
					v-model="loginForm.isDoctor"
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
				<el-button @click="goToRegister" class="button register-button"
					>注册</el-button
				>
			</div>
		</el-form>
	</div>
</template>

<script setup>
import { ref, watch } from "vue"
import { useRouter } from "vue-router"
import useUserStore from "@/store/module/user"
import { login } from "@/api/setUserState.js"
import { setToken } from "../utils/auth"
import { ElMessage } from "element-plus"

const userStore = useUserStore()
const router = useRouter()
const loginForm = ref({
	account: "",
	password: "",
	isDoctor: true,
})

const options = [
	{ value: true, label: "医生" },
	{ value: false, label: "患者" },
]
const ruleRef = ref(null)
const rules = {
	account: [
		{ required: true, message: "请输入账号", trigger: "blur" },
		{ max: 11, message: "账号最多11位", trigger: "blur" },
	],
	password: [
		{ required: true, message: "请输入密码", trigger: "blur" },
		{ max: 30, message: "密码最多30位", trigger: "blur" },
	],
	isDoctor: [{ required: true, message: "请选择身份", trigger: "blur" }],
}

const loginFunc = () => {
	ruleRef.value.validate((valid) => {
		if (valid) {
			login(
				loginForm.value.account,
				loginForm.value.password,
				loginForm.value.isDoctor
			).then((res) => {
				if (res.data.status) {
					userStore.id = loginForm.value.account
					userStore.token = loginForm.value.account
					userStore.role = res.data.role
					setToken(loginForm.value.password)
					ElMessage.success(res.data.msg)
					router.replace("/index")
				} else {
					ElMessage.error(res.data.msg)
				}
			})
		}
	})
}

const goToRegister = () => {
	router.push("/register")
}
</script>

<style scoped>
body,
html {
	margin: 0;
	padding: 0;
	height: 100%;
	overflow: auto;
}

.page-container {
	background-color: #f5f7fa;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0;
	margin: 0;
}

.login-container {
	background-color: #ffffff;
	padding: 40px;
	border-radius: 12px;
	width: 400px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	text-align: center;
}

.title {
	margin-bottom: 30px;
	font-size: 2em;
	color: #333333;
	font-weight: bold;
}

.input-item {
	flex: 1;
	font-size: 1.1em;
}

.button-container {
	display: flex;
	justify-content: space-between;
}

.button {
	margin-top: 10px;
	width: 48%;
	font-size: 1.1em;
	background-color: #409eff;
	color: #ffffff;
	border: none;
	border-radius: 5px;
	padding: 10px;
	transition: background-color 0.3s ease;
}

.register-button {
	background-color: #67c23a;
}
</style>
