<template>
	<p>{{ data }}</p>
	<button @click="testit">click</button>
    <button @click="userStore.setRole('admin')">admin</button>
    <button @click="userStore.setRole('patient')">patient</button>
    <button @click="userStore.setRole('docter')">docter</button>
</template>
<script setup>
import { ref } from "vue"
import request from '@/utils/request'
import useUserStore from '@/store/module/user'
const data = ref("0")
const userStore = useUserStore()
const testit = () => {
    request.get('/test').then((res) => {
        console.log(res.headers)  
        console.log(res.config)
        data.value = res.data
    })
}

</script>
