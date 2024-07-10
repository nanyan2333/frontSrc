<template>
	<el-card class="info-card">
		<template #header>
			<div class="card-header">
				<el-icon><UserFilled /></el-icon>
				<span>个人信息</span>
			</div>
		</template>
		<div class="descriptions-wrapper">
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
		<div v-if="isEditInfo">
			<el-form :model="motifiedItem" label-width="80px" label-position="left">
				<el-form-item label="专长">
					<el-input v-model="motifiedItem.specialty"></el-input>
				</el-form-item>
				<el-form-item label="地区">
					<el-input v-model="motifiedItem.position"></el-input>
				</el-form-item>
			</el-form>
		</div>
		<template #footer>
			<div class="addButtonGroup">
				<el-button
					v-if="!isEditInfo && !isEditReserve"
					@click="isEditInfo = true"
					>修改个人信息</el-button
				>
				<el-button
					v-if="!isEditInfo && !isEditReserve"
					@click="motifiedReserve">
					修改预约信息
				</el-button>
				<div v-else>
					<el-button @click="updateUserInfo">提交</el-button>
					<el-button @click="cancel">取消</el-button>
				</div>
			</div>
		</template>
	</el-card>
</template>
<script setup>
import { ref, toRefs } from "vue"
import { updateInfo } from "../../api/userInfo"
import { ElMessage } from "element-plus";

const props = defineProps({
	userInfo: { type: Object, required: true },
})
const emits = defineEmits(["editReserve"])
const { userInfo } = toRefs(props)
const isEditInfo = ref(false)
const isEditReserve = ref(false)
const motifiedItem = ref({
	user_password: "",
	contact: "",
	specialty: "",
	position: "",
})
const motifiedReserve = () => {
	emits("editReserve", userInfo.value.id)
}
const cancel = () => {
	isEditInfo.value = false
}
const updateUserInfo = () => {
	updateInfo(userInfo.value.id, "Doctor", motifiedItem.value).then((res) => {
		if (res.data.status) {
			ElMessage.success(res.data.msg)
			userInfo.value.position = motifiedItem.value.position
			userInfo.value.specialty = motifiedItem.value.specialty
			cancel()
		} else {
			ElMessage.error(res.data.msg)
		}
	})
}
</script>

<style scoped>
.card-header {
	display: flex;
	align-items: center;
	font-size: 18px;
	color: #409eff;
}
.info-card {
	width: 100%;
	max-width: 300px;
	background-color: #ffffff;
	border-radius: 10px;
	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
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
</style>
