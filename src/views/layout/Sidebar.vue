<template>
  <div class="sidebar" :class="{ small: collapse }">
    <div class="logo">
      <img src="@/images/logo.png" />
      <!-- <transition name="sidebarLogoFade">
        <div class="title" v-show="!collapse">manager System</div>
      </transition> -->
    </div>
    <div class="list">
      <el-menu
        class="el-menu-vertical"
        :router="true"
        :default-active="$route.path"
        :collapse-transition="false"
        :collapse="collapse"
      >
        <template v-for="(menu, i) in menuList" :key="i">
          <el-sub-menu v-if="menu.children?.length" :index="'_' + i">
            <template #title>
              <!-- <i :class="menu.icon"></i> -->
              <el-icon><Setting /></el-icon>
              <span>{{ menu.title }}</span>
            </template>
            <template v-for="(submenu, i) in menu.children">
              <el-menu-item
                v-if="!submenu.hide"
                :index.="submenu.path"
                :key="i"
              >
                {{ submenu.title }}
              </el-menu-item>
            </template>
          </el-sub-menu>
          <el-menu-item v-else :index="menu.path" v-if="!menu.hide">
            <!-- <i :class="menu.icon"></i> -->
            <el-icon><Setting /></el-icon>
            <template #title>
              {{ menu.title }}
            </template>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import menuList from "@/utils/menu";
import { useMenuStore } from '@/stores/menu'
import { storeToRefs } from "pinia";

const { collapse } = storeToRefs(useMenuStore())

</script>
<style lang="less" scoped>
.sidebar {
  transition: width 0.28s;
  width: 210px;
  height: 100%;
  &.small {
    width: 64px;
  }
  .logo {
    padding: 15px 0;
    font-size: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    img {
      width: 80%;
      height: 32px;
    }
    .title {
      font-size: 20px;
      color: #54abe0;
      margin-left: 12px;
    }
  }
  .user {
    margin-bottom: 20px;
    .name {
      color: gray;
      margin-bottom: 10px;
    }
    .logout {
      width: 80px;
    }
  }
  .list {
    flex-grow: 1;
    font-size: 14px;
    .el-menu-vertical {
      border: none;
      :deep(.el-submenu__title) {
        span {
          font-size: 14px;
        }
      }
      :deep(.el-icon-s-home.menu-icon) {
        position: relative;
        top: -2px;
      }
      :deep(.el-menu-item-group__title) {
        padding: 0;
      }
      :deep(.el-submenu .el-menu-item) {
        padding-left: 47px !important;
        font-size: 13px;
      }
    }
    .iconfont {
      margin-right: 10px;
    }
  }
}
</style>
