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
          <el-input v-model="form.name" style="width:90%"/>
          <el-button size="small" type="primary">validate</el-button>
        </el-form-item>
        <el-form-item label="Activity zone">
          <el-select v-model="form.region" placeholder="please select your zone">
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
          />
        </el-form-item>
        <el-form-item label="upload file">
          <div class="uplaodfile" @click="startUpload">
            <span v-if="!imgSrc">上传文件</span>
            <img :src="imgSrc" v-else>
            <input type="file" v-show="false" @change="getUploadFile" ref="inputRef">
          </div>
        </el-form-item>
        <el-form-item label="Activity zone">
          <el-select v-model="form.region1" placeholder="Activity zone" clearable>
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="Activity time">
          <el-date-picker v-model="form.date" type="date" placeholder="Pick a date" clearable />
        </el-form-item>
        <el-form-item label="Activity address">
          <el-input v-model="form.address" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">Cancel</el-button>
          <el-button type="primary" @click="submit">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang='ts' setup>
  import { reactive, ref, onMounted } from 'vue'

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
    isEdit: boolean
  }

  const form = reactive<FormInterface>({
    name: '',
    region: '',
    date1: '',
    region1: '',
    date: '',
    address: ''
  })

  const props = withDefaults(defineProps<PropsInterface>(), {
    rowData: () => ({
      name: '',
      region: '',
      date1: '',
      region1: '',
      date: '',
      address: ''
    }),
    isEdit: false
  })
  const emits = defineEmits<{
    (event: 'update:new', val: boolean): void
  }>()
  const dialogVisible = ref(true)
  const imgSrc = ref('')
  const inputRef = ref<HTMLInputElement>(null)


  onMounted(() => {
    console.log('props.isEdit', props.isEdit)
    if (props.isEdit) {
      Object.assign(form, props.rowData)
    }
  })

  const handleClose = () => {
    emits('update:new', false)
  }

  const submit = () => {
    alert('new add a data')
    handleClose()
  }

  const startUpload = () => {
    inputRef.value.click()
  }

  const getUploadFile = (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files[0]
    imgSrc.value = URL.createObjectURL(file)
  }
</script>
<style lang='less' scoped>
  .uplaodfile {
    width: 100px;
    height: 100px;
    border: 1px solid #ccc;
    text-align: center;
    line-height: 100px;
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>