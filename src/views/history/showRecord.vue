<template>
	<div class="form-container">
		<div class="form-item">
			<el-text class="form-label">记录日期</el-text>
			<el-select v-model="option" clearable placeholder="选择记录日期">
				<el-option
					v-for="(date, index) in options"
					:key="index"
					:label="date"
					:value="index"></el-option>
			</el-select>
		</div>
		<div class="form-item">
			<el-text class="form-label">医疗记录</el-text>
			<el-input
				type="textarea"
				v-model="record"
				:readonly="!isDoctor"
				rows="25"
				style="width: 100%"></el-input>
		</div>
	</div>
</template>

<script setup>
import { toRefs, ref, watch } from "vue"

const props = defineProps({
	options: {
		type: Array,
		required: true,
	},
	records: {
		type: Array,
		required: true,
	},
	isDoctor: {
		type: Boolean,
		required: true,
	},
})
const { options, records, isDoctor } = toRefs(props)
const option = ref("")
const record = ref("")

watch(
	() => option.value,
	(newV) => {
		record.value = records.value[newV]
	},
	{ immediate: true }
)
</script>

<style scoped>
.form-container {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.form-item {
	display: flex;
	align-items: center;
	gap: 1rem;
}

.form-label {
	min-width: 80px;
}
</style>
