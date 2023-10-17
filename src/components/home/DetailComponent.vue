<!-- -->
<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      title="newDialog"
      width="50%"
      :before-close="handleClose"
    >
      <el-form :model="form" label-width="120px">
        <el-form-item label="Activity name">
          <el-input v-model="form.name" disabled/>
        </el-form-item>
        <el-form-item label="Activity zone">
          <el-select v-model="form.region" placeholder="please select your zone" disabled>
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="Activity time">
          <el-date-picker
            v-model="form.date1"
            type="date"
            placeholder="Pick a date"
            style="width: 100%"
            disabled
          />
        </el-form-item>
        <el-form-item label="Activity zone">
          <el-select v-model="form.region1" placeholder="Activity zone" clearable disabled>
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="Activity time">
          <el-date-picker v-model="form.date" type="date" placeholder="Pick a date" clearable disabled/>
        </el-form-item>
        <el-form-item label="Activity address">
          <el-input v-model="form.address" disabled/>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">Cancel</el-button>
          <el-button type="primary" @click="handleClose">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang='ts' setup>
  import { reactive, ref} from 'vue'

  interface FormInterface {
    name: string
    region: string
    date1: string
    region1: string
    date: string
    address: string
  }
  interface PropsInterface {
    rowData: FormInterface
  }

  const props = withDefaults(defineProps<PropsInterface>(), {
    rowData: () => ({
      name: '',
      region: '',
      date1: '',
      region1: '',
      date: '',
      address: ''
    })
  })


  const emits = defineEmits<{
    (event: 'update:detail', val: boolean): void
  }>()


  const dialogVisible = ref(true)
  const form = reactive<FormInterface>(props.rowData)

  const handleClose = () => {
    emits('update:detail', false)
  }
</script>
<style lang='less' scoped></style>