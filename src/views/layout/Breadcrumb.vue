<template>
  <el-breadcrumb class="m-l-10" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.path" :to="item.path">
      <span @click="breadcrumbClick(item)" class="crumbitem">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
  import { ref, watch, onMounted } from "vue";
  import type { RouteLocationMatched } from 'vue-router'
  import { useRoute, useRouter } from "vue-router";

  let breadcrumbList = ref<RouteLocationMatched[]>([]);
  const route = useRoute();
  const router = useRouter();

  onMounted(() => {
    getBreadcrumb();
  });

  const getBreadcrumb = () => {
    breadcrumbList.value = route.matched.filter((item: RouteLocationMatched) => item.meta && item.meta.title);
  };

  const breadcrumbClick = (breadcrumb: RouteLocationMatched) => {
    router.push(breadcrumb.path);
  };

  watch(() => route.path, () => {
    getBreadcrumb();
  });
</script>
<style lang="less" scoped>
  .crumbitem {
    &:hover {
      cursor: pointer;
    }
  }
</style>
