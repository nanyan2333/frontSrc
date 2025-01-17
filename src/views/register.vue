<template>
	<div class="page-container">
		<el-form
			:model="reigsterForm"
			class="reigster-container"
			:rules="rules"
			ref="userFormRef"
			label-width="auto">
			<h3 class="title">说的道理管理系统</h3>
			<el-form-item label="身份证号" prop="idCard">
				<el-input
					placeholder="请输入身份证号"
					v-model="reigsterForm.idCard"
					class="input-item"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input
					placeholder="请输入密码"
					v-model="reigsterForm.password"
					class="input-item"
					show-password></el-input>
			</el-form-item>
			<el-form-item label="身份" prop="isDoctor">
				<el-select
					v-model="reigsterForm.isDoctor"
					placeholder="选择身份"
					class="input-item">
					<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value"></el-option>
				</el-select>
			</el-form-item>

			<!-- 根据身份动态显示不同的表单项 -->
			<template v-if="reigsterForm.isDoctor === true">
				<el-form-item label="医生凭证编号" prop="certificate">
					<el-input
						placeholder="请输入医生凭证编号"
						v-model="reigsterForm.certificate"
						class="input-item"></el-input>
				</el-form-item>
				<el-form-item label="专长" prop="specialty">
					<el-input
						placeholder="请输入专长"
						v-model="reigsterForm.specialty"
						class="input-item"></el-input>
				</el-form-item>
				<el-form-item label="地理位置" prop="location">
					<el-input
						placeholder="请输入地理位置"
						v-model="reigsterForm.location"
						class="input-item"></el-input>
				</el-form-item>
			</template>

			<template v-else-if="reigsterForm.isDoctor === false">
				<el-form-item label="联系方式" prop="contact">
					<el-input
						placeholder="请输入联系方式"
						v-model="reigsterForm.contact"
						class="input-item"></el-input>
				</el-form-item>
			</template>

			<div class="button-container">
				<el-button class="button" @click="validateAndRegister">注册</el-button>
				<el-text class="back-login" tag="ins" @click="backLogin">已有账号?返回登陆</el-text>
			</div>
		</el-form>
	</div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import useUserStore from "@/store/module/user"
import { register } from "@/api/setUserState.js"
import { ElMessage } from "element-plus";

const userStore = useUserStore()
const router = useRouter()
const userFormRef = ref()

const reigsterForm = ref({
	password: "",
	isDoctor: false,
	idCard: "",
	certificate: "",
	specialty: "",
	location: "",
	contact: "",
})

const options = [
	{ value: true, label: "医生" },
	{ value: false, label: "患者" },
]

const rules = {
	password: [
		{ required: true, message: "请输入密码", trigger: "blur" },
		{ max: 30, message: "密码最多30位", trigger: "blur" },
	],
	isDoctor: [{ required: true, message: "请选择身份", trigger: "blur" }],
	idCard: [
		{ required: true, message: "请输入身份证ID", trigger: "blur" },
		{ pattern: /^\d+$/, message: "身份证号必须为数字", trigger: "blur" },
	],
	certificate: [
		{ required: true, message: "请输入医生凭证编号", trigger: "blur" },
		{ pattern: /^\d+$/, message: "医生凭证编号必须为数字", trigger: "blur" },
	],
	specialty: [
		{ required: true, message: "请输入专长", trigger: "blur" },
		{ max: 20, message: "专长最多20位汉字", trigger: "blur" },
		{
			pattern: /^[\u4e00-\u9fa5]+$/,
			message: "专长必须为汉字",
			trigger: "blur",
		},
	],
	location: [
		{ required: true, message: "请输入地理位置", trigger: "blur" },
		{ max: 20, message: "地理位置最多20位汉字", trigger: "blur" },
		{
			pattern: /^[\u4e00-\u9fa5]+$/,
			message: "地理位置必须为汉字",
			trigger: "blur",
		},
	],
	contact: [{ required: true, message: "请输入联系方式", trigger: "blur" }],
}

const validateAndRegister = () => {
	userFormRef.value.validate((valid) => {
		if (valid) {
			register(reigsterForm.value).then((res) => {
				if (res.data.status) {
					ElMessage.success(res.data.msg)
					router.push("/login")
				} else {
					ElMessage.error(res.data.msg)
				}
			})
		}
	})
}

const backLogin = () => {
    router.replace("/login")
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
	background-color: #e0f2f1;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0;
	margin: 0;
}

.reigster-container {
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
	flex-direction: column;
	align-items: center;
}

.button {
	margin-top: 10px;
	width: 100%;
	font-size: 1.1em;
	background-color: #42b983;
	color: #fff;
}

.button:hover {
	background-color: #339970;
}

.back-login {
	margin-top: 10px;
	width: 100%;
	text-align: right;
	cursor: pointer;
	color: #42b983;
}
</style>
