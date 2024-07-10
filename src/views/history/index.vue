<template>
	<el-form
	:model="medicalInfo"
	label-width="80px"
	label-position="left"
	ref="formRef"
	:rules="rules">
	<template v-if="isDoctor">
		<div class="form-container">
			<div class="form-item">
				<el-input v-model="medicalInfo.pid"
					placeholder="请输入患者的身份ID"
					clearable
					style="width: 200px">
				</el-input>
			</div>
			<div class="form-item">
				<el-date-picker v-model="medicalInfo.time"
					type="datetime"
					placeholder="选择日期时间">
				</el-date-picker>
			</div>
		</div>
		<br><br>

		<el-collapse style="max-width: 600px; margin: 0 auto;">
			<el-collapse-item title="新增医疗记录" name="1" style="text-align: center;">
				<el-input
				type="textarea"
				placeholder="请填写患者的医疗记录"
				v-model="medicalInfo.updateInfo"
				:rows="3"
				class="input-item"
				prefix-icon="el-icon-search"></el-input>
				<div style="margin-top: 20px;"></div> 
				<div class="button-container">
					<el-button type="primary" round class="button" @click="addRecord(medicalInfo)">提交记录</el-button>
				</div>
			</el-collapse-item>
			
			<el-collapse-item title="查询历史医疗记录" @change="searchRecord(medicalInfo)" name="2">
				<el-table :data="tableData" style="width: 100%" height="250">
					<el-table-column
						label="日期"
						width="180">
						<template slot-scope="scope">
							<i class="el-icon-time"></i>
							<span style="margin-left: 10px">{{ scope.row.time }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="updateInfo" label="医疗信息" width="180"></el-table-column>
					<el-table-column fixed="right" label="操作" width="100">
						<template slot-scope="scope">
							<el-button @click="editRecord(scope.row)" size="small">编辑</el-button>
						</template>
    			</el-table-column>
				</el-table>
			</el-collapse-item>
		</el-collapse>

		<el-dialog title="编辑医疗信息" :visible.sync="dialogVisible">
			<el-form :model="medicalInfo" label-width="80px">
				<el-form-item label="更新信息">
					<el-input v-model="medicalInfo.updateInfo"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveUpdate">确 定</el-button>
			</div>
		</el-dialog>
			
	</template>


	<template v-else>
		<el-form-item label="身份ID" prop="pid">
			<el-input v-model="medicalInfo.pid" placeholder="请输入身份ID"></el-input>
		</el-form-item>
		<div class="button-container">
			<el-button type="primary" round class="button" @click="fetchData">查询医疗记录</el-button>
		</div>

	</template>

	</el-form>
</template>

<script setup >
import { ref , watch, computed} from 'vue';
import useUserStore from "@/store/module/user"
import { addRecord, searchRecord, updateRecord } from "../../api/history"
import { ElMessage} from "element-plus";
import { addReserve } from '../../api/reserve';

const dialogVisible = ref(false);
let currentRow = null;
const editRecord = (row) => {
  currentRow = row;
  medicalInfo.value.updateInfo = row.updateInfo;
  dialogVisible.value = true;
};
const saveUpdate = () => {
  if (!medicalInfo.value.updateInfo.trim()) {
    ElMessage({
      message: '更新信息不能为空',
      type: 'warning'
    });
    return;
  }
  currentRow.updateInfo = medicalInfo.value.updateInfo;
  dialogVisible.value = false;
  updateRecord(medicalInfo.value.pid,medicalInfo.value.time,medicalInfo.value.updateInfo)
};

const userStore = useUserStore();
const role = "Doctor"
userStore.setRole(role);

const formRef = ref(null)
const isAdmin = ref(userStore.isAdmin())
const isDoctor = ref(userStore.isDoctor())
const isPatient = ref(userStore.isPatient())
watch(
	() => userStore.role,
	() => {
		isAdmin.value = userStore.isAdmin()
		isDoctor.value = userStore.isDoctor()
		isPatient.value = userStore.isPatient()
	}
)

const tableData = ref([])

const medicalInfo = ref({
	pid: "",
	updateInfo: "",
	time: "",
})

const medicalData = ref([])
const hasData = computed(
	() => Array.isArray(medicalData.value) && medicalData.value.length > 0)

const add = () => {
	formRef.value.validate((valid) => {
		if (valid) {
			addRecord(medicalInfo.value.pid).then((res) => {
				if (res.status) {
					ElMessage({
						message: res.data.msg,
						type: "success",
					})
					close()
					reserveInfo.value.pid = ""
					reserveInfo.value.updateInfo = ""
					reserveInfo.value.time = ""
					emit("flushForm")
				} else {
					ElMessage.error(res.data.msg)
					close()
				}
			})
		}
	})
}

const rules = {
	pid: [
		{ required: true, message: "请输入病人ID", trigger: "blur" },
		{ pattern: /^\d+$/, message: "病人ID必须为数字", trigger: "blur" },
	],
	updateInfo: [
    { required: true, message: '请填写医疗记录', trigger: 'blur' },
  ],
}
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
    padding: 0 200px;
}
.form-item {
    margin-left: auto;
    margin-right: auto;
    max-width: 100px; 
}

</style>
