<template>
	<el-menu
	  class="menu"
	  active-text-color="#3498db"
	  background-color="#FFC0CB"
	  :default-active="activeIndex">
	  <h2 class="menu-title">菜单</h2>
	  <el-menu-item v-for="(path, index) in permissionStore.routes" :key="index">
		<router-link :to="path" class="menu-link">{{ path }}</router-link>
	  </el-menu-item>
	</el-menu>
  </template>
  
  <script setup>
  import usePermissionStore from "@/store/module/permission.js"
  import { ref } from "vue"
  const permissionStore = usePermissionStore()
  const activeIndex = ref(permissionStore.routes[0])
  </script>
  
  <style scoped>
  .menu {
	width: 200px;
	height: 100vh;
	padding: 10px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	overflow-y: auto;
  }
  
  .menu-title {
	margin: 0;
	padding: 10px;
	font-size: 1.5em;
	color: #fff;
	text-align: center;
  }
  
  .menu-link {
	text-decoration: none;
	font-size: 1.1em;
	color: #333;
	display: block;
	padding: 10px;
	border-radius: 4px;
	transition: background-color 0.3s, color 0.3s;
  }
  
  .menu-link:hover {
	background-color: #ff99cc;
	color: #fff;
  }
  
  .el-menu-item.is-active .menu-link {
	background-color: #ff6699;
	color: #fff;
  }
  </style>
  