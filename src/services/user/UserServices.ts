import { UserAPI } from '@/api/user/UserAPI';

export const UserServices = {
    update: async (user: any, data: any, httpJwt: any) => {
        await httpJwt.put(UserAPI.UPDATE(user._id), data, {
            headers: {
                token: `Bearer ${user.accessToken}`,
            },
        });
    },

    getUserByPhoneNumber: async (user: any, phoneNumber: any, httpJwt: any) => {
        return (
            await httpJwt.get(UserAPI.USER_BY_PHONE(phoneNumber), {
                headers: {
                    token: `Bearer ${user.accessToken}`,
                },
            })
        ).data.data;
    },

    getUserById: async (user: any, userId: any, httpJwt: any) => {
        console.log(userId);
        return (
            await httpJwt.get(UserAPI.USER_BY_ID(userId), {
                headers: {
                    token: `Bearer ${user.accessToken}`,
                },
            })
        ).data.data;
    },

    // admin role
    getGatheringManager: async (user: any, page: any, httpJwt: any) => {
        return (
            await httpJwt.get(UserAPI.LIST_GATHERING_MANAGER_ACCOUNT(page), {
                headers: {
                    token: `Bearer ${user.accessToken}`,
                },
            })
        ).data;
    },

    getTransactionManager: async (user: any, page: any, httpJwt: any) => {
        return (
            await httpJwt.get(UserAPI.LIST_TRANSACTION_MANAGER_ACCOUNT(page), {
                headers: {
                    token: `Bearer ${user.accessToken}`,
                },
            })
        ).data;
    },

    createManagerAccount: async (user: any, data: any, httpJwt: any) => {
        return (
            await httpJwt.post(UserAPI.CREATE_MANAGER, data, {
                headers: {
                    token: `Bearer ${user.accessToken}`,
                },
            })
        ).data.data;
    },

    updateManagerAccount: async (user: any, data: any, httpJwt: any, managerId: any) => {
        return (
            await httpJwt.put(UserAPI.UPDATE_MANAGER(managerId), data, {
                headers: { token: `Bearer ${user.accessToken}` },
            })
        ).data.data;
    },

    deleteManagerAccount: async (user: any, httpJwt: any, managerId: any) => {
        await httpJwt.delete(UserAPI.DELETE_MANAGER(managerId), {
            headers: {
                token: `Bearer ${user.accessToken}`,
            },
        });
    },

    searchGatheringAccount: async (user: any, page: any, username: any, httpJwt: any) => {
        return (
            await httpJwt.get(UserAPI.SEARCH_GATHERING_ACCOUNT(page, username), {
                headers: {
                    token: `Bearer ${user.accessToken}`,
                },
            })
        ).data;
    },

    searchTransactionAccount: async (user: any, page: any, username: any, httpJwt: any) => {
        return (
            await httpJwt.get(UserAPI.SEARCH_TRANSACTION_ACCOUNT(page, username), {
                headers: {
                    token: `Bearer ${user.accessToken}`,
                },
            })
        ).data;
    },
};
