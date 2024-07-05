<template>
	<p>{{ data }}</p>
	<button @click="testit">click</button>
    <button @click="userStore.setRole('Admin')">admin</button>
    <button @click="userStore.setRole('Patient')">patient</button>
    <button @click="userStore.setRole('Doctor')">doctor</button>
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
