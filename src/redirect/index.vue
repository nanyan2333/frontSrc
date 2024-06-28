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
	
    console.log(userStore.username)
	if (userStore.username == "") {
		router.replace("/login")
	} else {
		console.log(111)
	}
})
</script>
