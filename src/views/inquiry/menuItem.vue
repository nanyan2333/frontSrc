<template>
	<div @click="handleClick" class="item">
		<el-avatar :src="user" class="custom-avatar"></el-avatar>
		<span>{{ id }}</span>
	</div>
</template>

<script setup>
import user from "@/assets/emokiss.png"
import { toRefs } from "vue"
const props = defineProps({
	id: String,
})
const { id } = toRefs(props)
const emits = defineEmits(["isSelected"])

const handleClick = () => {
	emits("isSelected", id.value)
}
</script>

<style scoped>
.item {
	display: flex;
	align-items: center;
	cursor: pointer; /* 鼠标悬停时显示为指针 */
	transition: background-color 0.3s, box-shadow 0.3s; /* 添加过渡效果 */
    height: 60px;
}
.item .el-avatar {
	margin-right: 30px;
    margin-left: 10px;
}
.custom-avatar {
	background-color: white !important; /* 设置纯白色底色 */
}
.item:hover {
	background-color: #f0f0f0; /* 鼠标悬停时背景颜色 */
}
.item:active {
	background-color: #e0e0e0; /* 点击时背景颜色 */
	box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2); /* 点击时的阴影效果 */
}
</style>
