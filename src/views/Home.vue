<!-- -->
<template>
  <div class="homepage">
    <el-form :model="form" label-width="120px" inline>
      <el-form-item label="Activity name">
        <el-input v-model="form.name" />
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
      <div class="btn-group">
        <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
      </div>
    </el-form>
    <div class="btn-handle-group">
      <el-button type="primary" @click="newDialog">new</el-button>
      <el-button type="danger">delete</el-button>
      <el-button type="primary">upload</el-button>
      <el-button type="primary">download</el-button>
      <el-button type="danger">exportExecl</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column label="name">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="region">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.region }}</span>
        </template>
      </el-table-column>
      <el-table-column label="date1">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.date1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Date">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon><timer /></el-icon>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Name">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="auto">
            <template #default>
              <div>name: {{ scope.row.name }}</div>
              <div>address: {{ scope.row.address }}</div>
            </template>
            <template #reference>
              <el-tag>{{ scope.row.name }}</el-tag>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="Operations">
        <template #default="scope">
          <el-button type="danger" size="small" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button type="success" size="small" @click="handleDetail(scope.$index, scope.row)"
            >detail</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pigination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40, 50]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <newComponent
      v-if="newComponentFlag"
      v-model:new="newComponentFlag"
      :rowData="rowData"
      :isEdit="isEdit"
    />
    <DetailComponent
      v-if="detailComponentFlag"
      v-model:detail="detailComponentFlag"
      :rowData="rowData"
    ></DetailComponent>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, defineAsyncComponent } from 'vue'
const newComponent = defineAsyncComponent(() => import('@/components/home/NewComponent.vue'))
const DetailComponent = defineAsyncComponent(() => import('@/components/home/DetailComponent.vue'))

interface FormInterface {
  name: string
  region: string
  date1: string
  region1: string
  date: string
  address: string
}

interface User {
  date: string
  name: string
  date1: string
  region: string
  region1: string
  address: string
}

const currentPage = ref(0)
const pageSize = ref(10)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const newComponentFlag = ref(false)
const detailComponentFlag = ref(false)
const isEdit = ref(false)
const rowData = reactive<User>({
  name: '',
  region: '',
  date1: '',
  region1: '',
  date: '',
  address: ''
})
const form = reactive<FormInterface>({
  name: '',
  region: '',
  date1: '',
  region1: '',
  date: '',
  address: ''
})

let originDataList: User[] = []
const tableData = ref<User[]>([])
  // {
  //   date: '2016-05-03',
  //   name: 'Tom',
  //   date1: '2016-05-03',
  //   region: '1111',
  //   region1: '22222',
  //   address: 'No. 189, Grove St, Los Angeles',
  // },
  // {
  //   date: '2016-05-02',
  //   name: 'Tom',
  //   date1: '2016-05-03',
  //   region: '1111',
  //   region1: '22222',
  //   address: 'No. 189, Grove St, Los Angeles',
  // },
  // {
  //   date: '2016-05-04',
  //   name: 'Tom',
  //   date1: '2016-05-03',
  //   region: '1111',
  //   region1: '22222',
  //   address: 'No. 189, Grove St, Los Angeles',
  // },
  // {
  //   date: '2016-05-01',
  //   name: 'Tom',
  //   date1: '2016-05-03',
  //   region: '1111',
  //   region1: '22222',
  //   address: 'No. 189, Grove St, Los Angeles',
  // },

onMounted(() => {
  mockData()
  queryList(1)
})

// mock接口
const mockData = () => {
  const list: User[] = []
  for (let i = 0; i < 1000; i++) {
    const obj: User = {
      date: '2016-05-03',
      name: 'Tom' + i,
      date1: '2016-05-03',
      region: '1111' + i,
      region1: '22222' + i,
      address: 'No. 189, Grove St, Los Angeles' + i,
    }
    list.push(obj)
  }
  originDataList = list
}

const queryList = (currentPage: number) => {
  tableData.value = originDataList.slice((currentPage - 1) * pageSize.value, currentPage * pageSize.value)
}

const handleEdit = (index: number, row: User) => {
  console.log(index, row)
  isEdit.value = true
  Object.assign(rowData, row)
  newComponentFlag.value = true
}

const handleDetail = (index: number, row: User) => {
  Object.assign(rowData, row)
  detailComponentFlag.value = true
}

const handleDelete = (index: number, row: User) => {
  console.log(index, row)
}
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
  currentPage.value = 1
  queryList(currentPage.value)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
  queryList(val)
}

const onSubmit = () => {
  console.log('search')
  currentPage.value = 1
  queryList(1)
}

const handleSelectionChange = (list: User[]) => {
  console.log('list', list)
}

const newDialog = () => {
  isEdit.value = false
  newComponentFlag.value = true
}


// {
//   code: 0,
//   data: {
//     menulist: [
//       {
//         path: '/home',
//         icon: 'setting',
//         children: [
//           {
//             path: '/about',
//             icon: ''
//           }
//         ]
//       }
//     ]
//   },
//   message: 'error info'
// }

</script>
<style lang="less" scoped>
  .btn-group {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .btn-handle-group {
    margin: 10px auto;
  }
  .pigination {
    margin-top: 10px;
    float: right;
  }
</style>
