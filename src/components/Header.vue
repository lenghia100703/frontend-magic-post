<template>
    <div class="header-content">
        <template v-if="isLoggedIn">
            <el-menu class="menu" mode="horizontal" :ellipsis="false" background-color="#fff" menu-trigger="click">
                <MenuHeader :role="user.role" />

                <div class="flex-grow"></div>
                <el-menu-item class="no-hover" index="10">
                    <span class="name-user" @click="handleOpenDrawer(user)">
                        <el-avatar :src="user.avatar" />
                        <span class="avatar">{{ user.username }}</span>
                    </span>
                </el-menu-item>
            </el-menu>
        </template>

        <template v-else>
            <el-menu class="menu" mode="horizontal" :ellipsis="false" background-color="#fff" menu-trigger="click">
                <el-menu-item class="no-hover">
                    <el-image :src="logo" style="height: 100%" />
                </el-menu-item>
                <el-menu-item @click="handleRoute('/')" index="1"> Trang chủ </el-menu-item>
                <el-menu-item @click="handleRoute('/about')" index="2"> Về chúng tôi </el-menu-item>
                <div class="flex-grow"></div>
                <el-menu-item class="no-hover">
                    <el-button type="primary" plain @click="handleRoute('/register')">Đăng ký</el-button>
                </el-menu-item>
                <el-menu-item class="no-hover">
                    <el-button type="primary" @click="handleRoute('/login')"> Đăng nhập </el-button>
                </el-menu-item>
            </el-menu>
        </template>
    </div>
    <InfoDrawer ref="infoRef" />
</template>

<script setup lang="ts">
import MenuHeader from '@/components/menu/MenuHeader.vue';
import useAuthStore from '@/stores/useAuthStore';
import { computed, ref } from 'vue';
import { handleRoute } from '@/utils/handleRoute';
import InfoDrawer from '@/components/drawers/InfoDrawer.vue';

const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.isLoggedIn);
const user = computed(() => authStore.userInfo);
const infoRef = ref<InstanceType<typeof InfoDrawer> | null>(null);
const logo =
    'https://raw.githubusercontent.com/lenghia100703/magic-post-image/341f7b9b2aec06276fa03db12fe45062a31698dd/logo.png';

const handleOpenDrawer = (user: any) => {
    if (isLoggedIn.value && user) {
        infoRef.value?.openDrawer(user);
    }
};
</script>

<style scoped>
#header {
    position: fixed;
    width: 100%;
    z-index: 12;
    background-color: rgb(255, 255, 255, 0.5);
}

.flex-grow {
    flex-grow: 1;
}

.menu .no-hover:hover {
    color: inherit !important;
    background-color: transparent !important;
}

.name-user {
    display: flex;
    align-items: center;
}

.avatar {
    margin-left: 8px;
}
.menu {
    background-color: rgba(255, 255, 255, 0.5);
}

.header-content {
    width: 100%;
    background-color: #fff;
}
</style>
