import { http } from '@/utils/http';
import { AuthAPI } from '@/api/auth/AuthAPI';

export const AuthServices = {
    login: async (user: any) => {
        return await http.post(AuthAPI.LOGIN, user);
    },

    logout: async (user: any, httpJwt: any) => {
        await httpJwt.post(AuthAPI.LOGOUT, user?._id, {
            headers: {
                token: `Bearer ${user?.accessToken}`,
            },
        });
    },

    register: async (user: any) => {
        await http.post(AuthAPI.REGISTER, user);
    },

    refreshToken: async () => {
        return (await http.post(AuthAPI.REFRESH_TOKEN, {})).data;
    },

    changePassword: async (user: any, data: any, httpJwt: any) => {
        return (
            await httpJwt.put(AuthAPI.CHANGE_PASSWORD, data, {
                headers: {
                    token: `Bearer ${user.accessToken}`,
                },
            })
        ).data;
    },
};
