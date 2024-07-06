<template>
	<div class="profileInfo">
		<div class="avatar-section">
			<el-avatar :size="128" :src="emj" :fit="fill"></el-avatar>
		</div>
		<el-card v-if="notAdmin" class="info-card">
			<template #header>
				<div class="card-header">
					<el-icon><UserFilled /></el-icon>
					<span>个人信息</span>
				</div>
			</template>
			<div v-if="isDoctor && !isEdit" class="descriptions-wrapper">
				<el-descriptions :column="1">
					<el-descriptions-item label="身份ID">{{
						userInfo.id
					}}</el-descriptions-item>
					<el-descriptions-item label="医疗凭证">{{
						userInfo.doctorNo
					}}</el-descriptions-item>
					<el-descriptions-item label="专长方向">{{
						userInfo.specialty
					}}</el-descriptions-item>
					<el-descriptions-item label="地区">{{
						userInfo.position
					}}</el-descriptions-item>
				</el-descriptions>
			</div>
			<div v-else-if="!isDoctor && !isEdit" class="descriptions-wrapper">
				<el-descriptions :column="1">
					<el-descriptions-item label="身份ID">{{
						userInfo.id
					}}</el-descriptions-item>
					<el-descriptions-item label="联系方式">{{
						userInfo.contact
					}}</el-descriptions-item>
				</el-descriptions>
			</div>
			<div v-else-if="isEdit">
				<el-form :model="motifiedItem" label-width="80px" label-position="left">
					<el-form-item label="新密码">
						<el-input v-model="motifiedItem.user_password"></el-input>
					</el-form-item>
					<el-form-item label="联系方式" v-if="!isDoctor">
						<el-input v-model="motifiedItem.contact"></el-input>
					</el-form-item>
					<el-form-item label="专长" v-if="isDoctor">
						<el-input v-model="motifiedItem.specialty"></el-input>
					</el-form-item>
					<el-form-item label="地区" v-if="isDoctor">
						<el-input v-model="motifiedItem.position"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<template #footer>
				<div class="addButtonGroup">
					<el-button v-if="!isEdit" @click="isEdit = true"
						>修改个人信息</el-button
					>
					<div v-else>
						<el-button @click="updateUserInfo">提交</el-button>
						<el-button @click="cancel">取消</el-button>
					</div>
				</div>
			</template>
		</el-card>
	</div>
	<div class="otherInfo"></div>
</template>

<script setup>
import { ref, watch } from "vue"
import { getInfo, updateInfo } from "../api/userInfo"
import useUserStore from "@/store/module/user"
import emj from "@/assets/emj128.png"
import { ElMessage } from "element-plus"

const userStore = useUserStore()
const isDoctor = ref(userStore.isDoctor())
const notAdmin = ref(!userStore.isAdmin())
const isEdit = ref(false)
const userInfo = ref({})
const motifiedItem = ref({
	user_password: "",
	contact: "",
	specialty: "",
	position: "",
})

const getUserInfo = () => {
	getInfo(userStore.id, isDoctor.value).then((res) => {
		userInfo.value = res.data
	})
}

const updateUserInfo = () => {
	updateInfo(userStore.id, userStore.role, motifiedItem.value).then((res) => {
		if (res.data.status) {
			ElMessage.success(res.data.msg)
			getUserInfo()
			cancel()
		} else {
			ElMessage.error(res.data.msg)
		}
	})
}
const cancel = () => {
	isEdit.value = false
	motifiedItem.value.contact = userInfo.value.contact
	motifiedItem.value.specialty = userInfo.value.specialty
	motifiedItem.value.position = userInfo.value.position
	motifiedItem.value.user_password = ""
}
watch(
	() => userInfo.value,
	(newVal) => {
		motifiedItem.value.contact = newVal.contact
		motifiedItem.value.specialty = newVal.specialty
		motifiedItem.value.position = newVal.position
	}
)

getUserInfo()
</script>

<style scoped>
.profileInfo {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 20px;
}

.avatar-section {
	margin-bottom: 20px;
}

.info-card {
	width: 100%;
	max-width: 400px;
	background-color: #ffffff;
	border-radius: 10px;
	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.card-header {
	display: flex;
	align-items: center;
	font-size: 18px;
	color: #409eff;
}

.card-header el-icon {
	margin-right: 10px;
}

.descriptions-wrapper {
	background-color: #ffffff;
	padding: 16px;
	border-radius: 10px;
}

.el-descriptions-item__label {
	font-weight: bold;
	width: 80px;
}

.el-button {
	margin: 5px;
}

.addButtonGroup {
	width: 100%;
	display: flex;
	justify-content: flex-end;
}
</style>
