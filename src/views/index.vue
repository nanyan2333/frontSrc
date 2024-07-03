<template>
	<p>{{ data }}</p>
	<button @click="testit">click</button>
</template>
<script setup>
import { ref } from "vue"
import request from '@/utils/request'
const data = ref("0")
const testit = () => {
    request.get('/test').then((res) => {
        console.log(res.headers)  
        console.log(res.config)
        data.value = res.data
    })
}
</script>
