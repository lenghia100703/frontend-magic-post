<template>
    <div class="control-group-btn">
        <el-radio-group v-model="control" @change="handleChangeRadio">
            <el-radio-button label="receive"> Hàng đến</el-radio-button>
            <el-radio-button label="send"> Hàng đi </el-radio-button>
        </el-radio-group>
    </div>

    <template v-if="control === 'send'">
        <div class="search">
            <el-input
                class="search-input"
                placeholder="Tìm bằng mã hàng hóa ..."
                type="text"
                v-model="searchCode"
                clearable
            />
            <el-button type="primary" :loading="searchLoading" class="search-btn" @click="handleSearch"
                >Tìm kiếm</el-button
            >
        </div>
        <el-table
            :data="dataTableSend"
            :border="true"
            v-loading="loadingTable"
            :default-sort="{ prop: 'stt', order: 'ascending' }"
        >
            <el-table-column prop="stt" label="STT" width="80" sortable :align="'center'"></el-table-column>
            <el-table-column prop="name" label="Tên hàng hóa" width="140" sortable>
                <template #default="{ row }">
                    <el-popover placement="bottom" :width="200" trigger="click" :content="row.name">
                        <template #reference
                            ><el-text truncated> {{ row.name }} </el-text></template
                        >
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="code" label="Mã hàng hóa" width="110"></el-table-column>
            <el-table-column prop="weight" label="Cân nặng" width="90" :align="'center'"></el-table-column>
            <el-table-column prop="sender" label="Người gửi">
                <template #default="{ row }">
                    <el-popover placement="bottom" :width="200" trigger="click" :content="row.sender">
                        <template #reference
                            ><el-text truncated> {{ row.sender }} </el-text></template
                        >
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="receiver" label="Người nhận">
                <template #default="{ row }">
                    <el-popover placement="bottom" :width="200" trigger="click" :content="row.receiver">
                        <template #reference
                            ><el-text truncated> {{ row.receiver }} </el-text></template
                        >
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="sendingAddress" label="Nơi gửi">
                <template #default="{ row }">
                    <el-popover placement="bottom" :width="200" trigger="click" :content="row.sendingAddress">
                        <template #reference
                            ><el-text truncated> {{ row.sendingAddress }} </el-text></template
                        >
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="deliveryAddress" label="Nơi nhận" sortable>
                <template #default="{ row }">
                    <el-popover placement="bottom" :width="200" trigger="click" :content="row.deliveryAddress">
                        <template #reference
                            ><el-text truncated> {{ row.deliveryAddress }} </el-text></template
                        >
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                prop="shippingFee"
                label="Phí gửi"
                width="100"
                sortable
                :align="'center'"
            ></el-table-column>
            <el-table-column prop="shippingMethod" label="Phương thức vận chuyển" width="180"></el-table-column>
            <el-table-column prop="status" label="Trạng thái" width="110" :align="'center'">
                <template v-slot="scope" #default>
                    <el-button
                        link
                        :type="
                            scope.row.status === 'Thành công'
                                ? 'success'
                                : scope.row.status === 'Thất bại'
                                ? 'danger'
                                : 'warning'
                        "
                    >
                        {{ scope.row.status }}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="Hành động" width="100" :align="'center'">
                <template #default="scope">
                    <div>
                        <el-button
                            type="warning"
                            size="small"
                            plain
                            :loading="loadingConfirm"
                            :disabled="scope.row.currentPoint === scope.row.nextPoint"
                            @click="handleSendPackage(scope.row)"
                            >Gửi</el-button
                        >
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination">
            <el-pagination
                :page-size="10"
                :pager-count="5"
                layout="prev, pager, next"
                :total="totalDataSend"
                @current-change="handleChangePageSend"
            />
        </div>
    </template>

    <template v-if="control === 'receive'">
        <div class="search">
            <el-input
                class="search-input"
                placeholder="Tìm bằng mã hàng hóa ..."
                type="text"
                v-model="searchCode"
                clearable
            />
            <el-button type="primary" :loading="searchLoading" class="search-btn" @click="handleSearch"
                >Tìm kiếm</el-button
            >
        </div>
        <el-table
            :data="dataTableReceive"
            :border="true"
            v-loading="loadingTable"
            :default-sort="{ prop: 'stt', order: 'ascending' }"
        >
            <el-table-column prop="stt" label="STT" width="80" sortable :align="'center'"></el-table-column>
            <el-table-column prop="name" label="Tên hàng hóa" width="140" sortable>
                <template #default="{ row }">
                    <el-popover placement="bottom" :width="200" trigger="click" :content="row.name">
                        <template #reference
                            ><el-text truncated> {{ row.name }} </el-text></template
                        >
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="code" label="Mã hàng hóa" width="110"></el-table-column>
            <el-table-column prop="weight" label="Cân nặng" width="90" :align="'center'"></el-table-column>
            <el-table-column prop="sender" label="Người gửi">
                <template #default="{ row }">
                    <el-popover placement="bottom" :width="200" trigger="click" :content="row.sender">
                        <template #reference
                            ><el-text truncated> {{ row.sender }} </el-text></template
                        >
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="receiver" label="Người nhận">
                <template #default="{ row }">
                    <el-popover placement="bottom" :width="200" trigger="click" :content="row.receiver">
                        <template #reference
                            ><el-text truncated> {{ row.receiver }} </el-text></template
                        >
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="sendingAddress" label="Nơi gửi" sortable>
                <template #default="{ row }">
                    <el-popover placement="bottom" :width="200" trigger="click" :content="row.sendingAddress">
                        <template #reference
                            ><el-text truncated> {{ row.sendingAddress }} </el-text></template
                        >
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="deliveryAddress" label="Nơi nhận" sortable>
                <template #default="{ row }">
                    <el-popover placement="bottom" :width="200" trigger="click" :content="row.deliveryAddress">
                        <template #reference
                            ><el-text truncated> {{ row.deliveryAddress }} </el-text></template
                        >
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                prop="shippingFee"
                label="Phí gửi"
                width="100"
                sortable
                :align="'center'"
            ></el-table-column>
            <el-table-column prop="shippingMethod" label="Phương thức vận chuyển" width="180"></el-table-column>
            <el-table-column prop="status" label="Trạng thái" width="100"></el-table-column>
            <el-table-column fixed="right" label="Hành động" width="100" :align="'center'">
                <template #default="scope">
                    <el-tooltip effect="dark" content="Xác nhận hàng đã đến." placement="bottom">
                        <el-button
                            type="warning"
                            size="small"
                            plain
                            :disabled="scope.row.currentPoint !== scope.row.nextPoint"
                            @click="handleConfirmPackage(scope.row)"
                            >Xác nhận</el-button
                        >
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                :page-size="10"
                :pager-count="5"
                layout="prev, pager, next"
                :total="totalDataDelivery"
                @current-change="handleChangePageDelivery"
            />
        </div>
    </template>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { loadingFullScreen } from '@/utils/loadingFullScreen';
import useAuthStore from '@/stores/useAuthStore';
import { createAxiosJwt } from '@/utils/createInstance';
import { PackageServices } from '@/services/package/PackageServices';
import { UserServices } from '@/services/user/UserServices';
import { DistrictServices } from '@/services/district/DistrictServices';
import { ProvinceServices } from '@/services/province/ProvinceServices';
import { ElMessage } from 'element-plus';
import { GatheringStaffServices } from '@/services/user/GatheringStaffServices';

const control = ref<string>('receive');
const loadingTable = ref<boolean>(false);
const loadingConfirm = ref<boolean>(false);
const loadingSend = ref<boolean>(false);
const authStore = useAuthStore();
const httpJwt = createAxiosJwt(authStore.userInfo);

const searchCode = ref<string>('');
const searchLoading = ref<boolean>(false);

const totalDataSend = ref<number>(0);
const dataTableSend = ref<any[]>([]);
const handleChangePageSend = async (val: number) => {
    await getPackageToSend(val);
};

const totalDataDelivery = ref<number>(0);
const dataTableReceive = ref<any[]>([]);
const handleChangePageDelivery = async (val: number) => {
    await getReceivedPackage(val);
};

const getReceivedPackage = async (page: any) => {
    loadingTable.value = true;
    try {
        dataTableReceive.value = [];
        const res = await PackageServices.getPackageToGathering(authStore.userInfo, page, httpJwt);
        totalDataDelivery.value = res.total;
        res.data.map(async (item: any, index: number) => {
            const sender = await UserServices.getUserById(authStore.userInfo, item.senderId, httpJwt);
            const receiver = await UserServices.getUserById(authStore.userInfo, item.receiverId, httpJwt);
            const districtSend = await DistrictServices.getDistrictById(item.transactionSendingAddress);
            const provinceSend = await ProvinceServices.getProvinceById(districtSend.provinceId);
            const districtDelivery = await DistrictServices.getDistrictById(item.transactionDeliveryAddress);
            const provinceDelivery = await ProvinceServices.getProvinceById(districtDelivery.provinceId);
            let status = item.status === 'success' ? 'Thành công' : item.status === 'fail' ? 'Thất bại' : 'Đang xử lý';
            let shippingMethod = item.shippingMethod === 'fast' ? 'Vận chuyển nhanh' : 'Vận chuyển tiêu chuẩn';
            dataTableReceive.value.push({
                _id: item._id,
                stt: index + 1,
                name: item.name,
                code: item.code,
                weight: `${item.weight}kg`,
                sender: sender.username,
                receiver: receiver.username,
                sendingAddress: `${districtSend.name} - ${provinceSend.name}`,
                deliveryAddress: `${districtDelivery.name} - ${provinceDelivery.name}`,
                shippingFee: `${item.shippingFee}đ`,
                shippingMethod: shippingMethod,
                status: status,
                transactionSendingAddress: item.transactionSendingAddress,
                gatheringSendingAddress: item.gatheringSendingAddress,
                gatheringDeliveryAddress: item.gatheringDeliveryAddress,
                transactionDeliveryAddress: item.transactionDeliveryAddress,
                currentPoint: item.currentPoint,
                nextPoint: item.nextPoint,
            });
        });
    } catch (e) {
        console.log(e);
    } finally {
        loadingTable.value = false;
    }
};

const getPackageToSend = async (page: any) => {
    loadingTable.value = true;
    try {
        dataTableSend.value = [];
        const res = await PackageServices.getPackageFromGathering(authStore.userInfo, page, httpJwt);
        totalDataSend.value = res.total;
        res.data.map(async (item: any, index: number) => {
            const sender = await UserServices.getUserById(authStore.userInfo, item.senderId, httpJwt);
            const receiver = await UserServices.getUserById(authStore.userInfo, item.receiverId, httpJwt);
            const districtSend = await DistrictServices.getDistrictById(item.transactionSendingAddress);
            const provinceSend = await ProvinceServices.getProvinceById(districtSend.provinceId);
            const districtDelivery = await DistrictServices.getDistrictById(item.transactionDeliveryAddress);
            const provinceDelivery = await ProvinceServices.getProvinceById(districtDelivery.provinceId);
            let status = item.status === 'success' ? 'Thành công' : item.status === 'fail' ? 'Thất bại' : 'Đang xử lý';
            let shippingMethod = item.shippingMethod === 'fast' ? 'Vận chuyển nhanh' : 'Vận chuyển tiêu chuẩn';
            dataTableSend.value.push({
                _id: item._id,
                stt: index + 1,
                name: item.name,
                code: item.code,
                weight: `${item.weight}kg`,
                sender: sender.username,
                receiver: receiver.username,
                sendingAddress: `${districtSend.name} - ${provinceSend.name}`,
                deliveryAddress: `${districtDelivery.name} - ${provinceDelivery.name}`,
                shippingFee: `${item.shippingFee}đ`,
                shippingMethod: shippingMethod,
                status: status,
                transactionSendingAddress: item.transactionSendingAddress,
                gatheringSendingAddress: item.gatheringSendingAddress,
                gatheringDeliveryAddress: item.gatheringDeliveryAddress,
                transactionDeliveryAddress: item.transactionDeliveryAddress,
                currentPoint: item.currentPoint,
                nextPoint: item.nextPoint,
            });
        });
    } catch (e) {
        console.log(e);
    } finally {
        loadingTable.value = false;
    }
};

const handleConfirmPackage = async (row: any) => {
    loadingConfirm.value = true;
    try {
        if (row.currentPoint === row.gatheringSendingAddress) {
            await GatheringStaffServices.confirmPackageFromTransaction(authStore.userInfo, row._id, httpJwt);
        } else if (row.currentPoint === row.gatheringDeliveryAddress) {
            await GatheringStaffServices.confirmPackageFromGathering(authStore.userInfo, row._id, httpJwt);
        }
        await getReceivedPackage(1);
        ElMessage({
            type: 'success',
            message: 'Xác nhận hàng thành công.',
        });
    } catch (e) {
        console.log(e);
        ElMessage.error('Xác nhận hàng thất bại.');
    } finally {
        loadingConfirm.value = false;
    }
};

const handleSendPackage = async (row: any) => {
    loadingSend.value = true;
    try {
        if (row.currentPoint === row.gatheringSendingAddress) {
            await GatheringStaffServices.sendPackageToGathering(authStore.userInfo, row._id, httpJwt);
        } else if (row.currentPoint === row.gatheringDeliveryAddress) {
            await GatheringStaffServices.sendPackageToTransaction(authStore.userInfo, row._id, httpJwt);
        }
        await getPackageToSend(1);
        ElMessage({
            type: 'success',
            message: 'Gửi hàng thành công.',
        });
    } catch (e) {
        console.log(e);
        ElMessage.error('Gửi hàng thất bại.');
    } finally {
        loadingSend.value = false;
    }
};

const handleChangeRadio = async () => {
    searchCode.value = '';
    if (control.value === 'send') {
        await getPackageToSend(1);
    } else if (control.value === 'receive') {
        await getReceivedPackage(1);
    }
};

const handleSearch = () => {};

onMounted(async () => {
    loadingFullScreen();
    await getReceivedPackage(1);
});
</script>

<style scoped>
.control-group-btn {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.search {
    display: flex;
    float: right;
    margin-bottom: 20px;
}

.search-input {
    min-width: 180px;
}

.search-btn {
    margin-left: 20px;
}

.pagination {
    float: right;
}
</style>
