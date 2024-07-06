<template>
	<div class="navibar">
		<a
			href="https://github.com/nanyan2333/frontSrc"
			target="_blank"
			class="github-link">
			<img src="@/assets/github.svg" alt="GitHub Front" />
		</a>
		<a
			href="https://github.com/VicissitudeYW/backEnd"
			target="_blank"
			class="github-link">
			<img src="@/assets/github_blue.svg" alt="GitHub Back" />
		</a>
		<div class="logout" @click="logout">
			<span>退出登录</span>
			<img src="@/assets/logout.svg" alt="Logout" />
		</div>
	</div>
</template>

<script setup>
import useUserStore from "@/store/module/user"
import { removeToken } from "../../utils/auth"
import { useRouter } from "vue-router";
const user = useUserStore()
const router = useRouter()
const logout = () => {
	user.id = ""
	user.role = ""
	user.token = ""
	removeToken()
	router.replace('/login')
}
</script>

<style scoped>
.navibar {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding: 10px;
	background-color: #f5f5f5;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	border-radius: 8px;
}

.logout {
	display: flex;
	align-items: center;
	cursor: pointer;
	margin-right: 20px;
	margin-left: 40px;
}

.logout span {
	margin-right: 5px;
	color: #409eff;
	font-weight: bold;
}

.logout img {
	width: 24px;
	height: 24px;
}

.github-link {
	margin-left: 15px;
}

.github-link img {
	width: 24px;
	height: 24px;
	transition: transform 0.3s ease;
}

.github-link:hover img,
.logout:hover img {
	transform: scale(1.1);
}

.github-link:hover img {
	filter: brightness(0.8);
}
</style>
