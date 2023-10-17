<template>
  <div class="header">
    <div class="left">
      <div class="collapse" @click="setCollapse">
        <el-icon v-if="!collapse"><Expand /></el-icon>
        <el-icon v-else><Fold /></el-icon>
        <!-- <i
          :class="{
            'iconfont': true,
            'icondaohangzhankai-': collapse,
            'icondaohangshouqi-': !collapse,
          }"
        ></i> -->
      </div>
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="right">
      <el-dropdown placement="bottom">
        <div class="user">
          <img class="avatar" src="@/images/noface.jpg" />
          <div class="name">{{ username }}</div>
          <i class="el-icon-arrow-down"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <a @click="logout" class="logout">退出</a>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import Breadcrumb from "./Breadcrumb.vue";
  import { useMenuStore } from '@/stores/menu'
  import { storeToRefs } from 'pinia'

  const menustore = useMenuStore()
  const { collapse, username } = storeToRefs(menustore)

  const logout = () => {
    alert('login out')
  }

  const setCollapse = () => {
    console.log('setCollapse')
    menustore.changeCollapse()
  }
  
  // export default defineComponent({
  //   components: {
  //     Breadcrumb
  //   },
  //   computed: {
  //     ...mapState(["collapse", "username"])
  //   },
  //   methods: {
  //     ...mapMutations(["setCollapse"]),
  //     logout() {
  //       location.href = "http://dashboard-mng.bilibili.co/logout?caller=bcut-mng";
  //     }
  //   }
  // });
</script>

<style lang="less" scoped>
.header {
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  border-bottom: 1px solid rgba(0, 21, 41, 0.08);
  flex-shrink: 0;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    align-items: center;
    .collapse {
      padding: 0 24px;
      cursor: pointer;
      i {
        font-size: 20px;
        color: gray;
      }
    }
  }
  .right {
    padding-right: 50px;
    .user {
      display: flex;
      align-items: center;
      color: gray;
      cursor: pointer;
      .avatar {
        border-radius: 50%;
        border: 1px solid #c0c0c0;
        width: 32px;
        height: 32px;
      }
      .name {
        margin-left: 10px;
        margin-right: 5px;
      }
    }
  }
}
.logout {
  color: #606266;
  text-decoration: none;
}
</style>
