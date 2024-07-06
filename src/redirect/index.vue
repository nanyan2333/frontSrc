<template>
	<div></div>
</template>
<script setup>
import useUserStore from "@/store/module/user"
import { useRouter } from "vue-router"
import { onMounted } from "vue"
const router = useRouter()
const userStore = useUserStore()
onMounted(() => {
	if (userStore.id === "" || userStore.id === null) {
		router.replace("/login")
	} else {
		router.replace("/index")
	}
})
</script>
