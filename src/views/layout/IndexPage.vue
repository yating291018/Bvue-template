<template>
  <el-container class="container">
    <el-aside class="aside-menu" width="auto">
      <Sidebar />
    </el-aside>
    <el-container class="right-content">
      <Header/>
      <el-main>
        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <component :is="Component"></component>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import Sidebar from "./Sidebar.vue";
  import Header from "./Header.vue";
  import { ElMessage as Message } from "element-plus";

  const authed = ref<boolean>(false)
</script>

<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100vh;
  .aside-menu {
    box-shadow: -2px 1px 10px #c0c4cc;
    height: 100%;
  }
  .right-content {
    display: flex;
    flex-direction: column;
  }
}
</style>
