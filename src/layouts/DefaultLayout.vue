<template>
    <div class="common-layout">
        <el-container>
            <el-header id="header"><Header /></el-header>

            <el-main id="main">
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import Header from '@/components/Header.vue';
</script>

<style scoped>
#header {
    position: fixed;
    width: 100%;
    z-index: 12;
    background-color: rgb(255, 255, 255);
}
#main {
    width: 100%;
    margin: 60px 0;
}
</style>
