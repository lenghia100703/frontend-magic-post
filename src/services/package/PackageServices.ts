import { PackageAPI } from '@/api/package/PackageAPI';
import { http } from '@/utils/http';

export const PackageServices = {
    getPackageById: async (packageId: any) => {
        return (await http.get(PackageAPI.PACKAGE_BY_ID(packageId))).data.data;
    },

    // staff transaction
    getPackageShipping: async (user: any, page: any, httpJwt: any) => {
        return (
            await httpJwt.get(PackageAPI.LIST_SHIPPING(page), {
                headers: {
                    token: `Bearer ${user.accessToken}`,
                },
            })
        ).data;
    },

    getPackageSuccess: async (user: any, page: any, httpJwt: any) => {
        return (
            await httpJwt.get(PackageAPI.LIST_SUCCESS(page), {
                headers: {
                    token: `Bearer ${user.accessToken}`,
                },
            })
        ).data;
    },

    getPackageFail: async (user: any, page: any, httpJwt: any) => {
        return (
            await httpJwt.get(PackageAPI.LIST_FAIL(page), {
                headers: {
                    token: `Bearer ${user.accessToken}`,
                },
            })
        ).data;
    },

    getPackageToSend: async (user: any, page: any, httpJwt: any) => {
        return (
            await httpJwt.get(PackageAPI.LIST_SEND(page), {
                headers: {
                    token: `Bearer ${user.accessToken}`,
                },
            })
        ).data;
    },

    getPackageDelivery: async (user: any, page: any, httpJwt: any) => {
        return (
            await httpJwt.get(PackageAPI.LIST_DELIVERY(page), {
                headers: {
                    token: `Bearer ${user.accessToken}`,
                },
            })
        ).data;
    },

    // staff gathering
    getPackageToGathering: async (user: any, page: any, httpJwt: any) => {
        return (
            await httpJwt.get(PackageAPI.LIST_DELIVERY_GATHERING(page), {
                headers: {
                    token: `Bearer ${user.accessToken}`,
                },
            })
        ).data;
    },

    getPackageFromGathering: async (user: any, page: any, httpJwt: any) => {
        return (
            await httpJwt.get(PackageAPI.LIST_SEND_GATHERING(page), {
                headers: {
                    token: `Bearer ${user.accessToken}`,
                },
            })
        ).data;
    },

    // manager transaction
    getPackageFromGatheringInTransactionPoint: async (user: any, page: any, httpJwt: any) => {
        return (
            await httpJwt.get(PackageAPI.LIST_FROM_GATHERING(page), {
                headers: {
                    token: `Bearer ${user.accessToken}`,
                },
            })
        ).data;
    },

    getPackageToGatheringInTransactionPoint: async (user: any, page: any, httpJwt: any) => {
        return (
            await httpJwt.get(PackageAPI.LIST_TO_GATHERING(page), {
                headers: {
                    token: `Bearer ${user.accessToken}`,
                },
            })
        ).data;
    },

    // manager gathering
    getPackageToGatheringInGatheringPoint: async (user: any, page: any, httpJwt: any) => {
        return (
            await httpJwt.get(PackageAPI.LIST_TO_GATHERING_IN_GATHERING(page), {
                headers: {
                    token: `Bearer ${user.accessToken}`,
                },
            })
        ).data;
    },

    getPackageFromGatheringInGatheringPoint: async (user: any, page: any, httpJwt: any) => {
        return (
            await httpJwt.get(PackageAPI.LIST_FROM_GATHERING_IN_GATHERING(page), {
                headers: {
                    token: `Bearer ${user.accessToken}`,
                },
            })
        ).data;
    },

    // admin
    getPackageSendGatheringAdmin: async (user: any, page: any, managerId: any, httpJwt: any) => {
        return (
            await httpJwt.get(PackageAPI.LIST_SEND_GATHERING_ADMIN(page, managerId), {
                headers: {
                    token: `Bearer ${user.accessToken}`,
                },
            })
        ).data;
    },

    getPackageDeliveryGatheringAdmin: async (user: any, page: any, managerId: any, httpJwt: any) => {
        return (
            await httpJwt.get(PackageAPI.LIST_DELIVERY_GATHERING_ADMIN(page, managerId), {
                headers: {
                    token: `Bearer ${user.accessToken}`,
                },
            })
        ).data;
    },

    getPackageSendTransactionAdmin: async (user: any, page: any, managerId: any, httpJwt: any) => {
        return (
            await httpJwt.get(PackageAPI.LIST_SEND_TRANSACTION_ADMIN(page, managerId), {
                headers: {
                    token: `Bearer ${user.accessToken}`,
                },
            })
        ).data;
    },

    getPackageDeliveryTransactionAdmin: async (user: any, page: any, managerId: any, httpJwt: any) => {
        return (
            await httpJwt.get(PackageAPI.LIST_DELIVERY_TRANSACTION_ADMIN(page, managerId), {
                headers: {
                    token: `Bearer ${user.accessToken}`,
                },
            })
        ).data;
    },
};
