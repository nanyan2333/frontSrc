<template>
  <el-form :model="medicalInfo" label-width="80px" ref="formRef" :rules="rules">
    <template v-if="isDoctor">
      <div class="form-container">
        <div class="form-item">
          <el-input v-model="medicalInfo.patientId" placeholder="请输入患者的身份ID" clearable style="width: 200px" :rows="2">
          </el-input>
        </div>
      </div>
      <br />

      <div class="table-container" style="display: flex; flex-direction: column; align-items: center;">
        <el-table :data="tableData" style="width: 100%" height="350px" overflow-y: auto :default-sort="{prop: 'mrTime', order: 'descending'}">
          <el-table-column prop="mrTime" label="就诊时间"></el-table-column>
          <el-table-column prop="content" label="医疗记录"></el-table-column>
        </el-table>
      </div>
      <br />

      <div class="button-container">
        <el-button type="primary" @click="dialogVisible = true">新增医疗记录</el-button>
        <el-dialog v-model="dialogVisible" title="新增医疗记录">
          <el-input v-model="medicalInfo.content" :rows="7" type="textarea" placeholder="请输入医疗记录内容"></el-input>
          <br /><br />
          <div slot="footer" class="dialog-footer button-container">
            <el-button @click="cancelDialog">取消</el-button>
            <el-button type="primary" @click="add">确认</el-button>
          </div>
        </el-dialog>

        <el-button type="primary" @click="search(medicalInfo)">查询医疗记录</el-button>
      </div>

    </template>

    <template v-else>
      <div class="table-container" style="display: flex; flex-direction: column; align-items: center;">
        <el-table :data="tableData" style="width: 100%" height="350px" overflow-y: auto :default-sort="{prop: 'mrTime', order: 'descending'}">
          <el-table-column prop="mrTime" label="就诊时间"></el-table-column>
          <el-table-column prop="content" label="医疗记录"></el-table-column>
        </el-table>
      </div>
      <br /><br />
      <div class="button-container">
        <el-button type="primary" round class="button" @click="search(medicalInfo)">查询医疗记录</el-button>
      </div>
    </template>
  </el-form>
</template>

<script setup>
import { ref, watch } from "vue";
import { addRecord, searchRecord } from "../../api/history";
import { ElMessage } from "element-plus";
import useUserStore from "@/store/module/user";

const medicalInfo = ref({
  patientId: "",
  content: "",
  mrTime: "",
});

const dialogVisible = ref(false)
const cancelDialog = () => {
  medicalInfo.value.content = '';
  dialogVisible.value = false;
};

const user = useUserStore();
medicalInfo.value.patientId = ref(user.id)
const isAdmin = ref(user.isAdmin());
const isDoctor = ref(user.isDoctor());
const isPatient = ref(user.isPatient());
watch(
  () => user.role,
  () => {
    isAdmin.value = user.isAdmin();
    isDoctor.value = user.isDoctor();
    isPatient.value = user.isPatient();
  }
);

const tableData = ref([]);
const search = (val) => {
  const jsonData = JSON.stringify({ id: val.patientId });
  searchRecord(jsonData).then((res) => {
    if (res.data && res.data.records && Array.isArray(res.data.records)) {
      tableData.value = res.data.records;
    } else {
      ElMessage.error("返回数据格式不正确");
    }
  }).catch((error) => {
    console.error('搜索记录失败:', error)
    ElMessage.error("无该患者的医疗记录")
  });
};

const formatDateTime = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const formRef = ref(null);
const add = () => {
  medicalInfo.value.mrTime = formatDateTime(new Date());
  formRef.value.validate((valid) => {
    if (valid) {
      addRecord(medicalInfo.value.patientId, medicalInfo.value.mrTime, medicalInfo.value.content).then((res) => {
        dialogVisible.value = false
        if (res.status) {
          ElMessage({
            message: res.data.msg,
            type: "success",
          })
          medicalInfo.value.content = ""
        } else {
          ElMessage({
            message: res.data.msg,
            type: "false",
          })
        }
      });
    }
  });
};

const rules = {
  patientId: [
    { required: true, message: "请输入病人ID", trigger: "blur" },
    { pattern: /^\d+$/, message: "病人ID必须为数字", trigger: "blur" },
  ],
  content: [
    { required: true, message: "请填写医疗记录", trigger: "blur" },

  ],
};

</script>

<style>
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: auto;
}

.form-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 100px;
  padding: 0 300px;
}

.form-item {
  margin-left: auto;
  margin-right: auto;
  max-width: 200px;
}

.button-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 60px;
}

.table-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
