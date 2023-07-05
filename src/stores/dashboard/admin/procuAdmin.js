import { defineStore } from "pinia";
import * as s$procuAdmin from '@/services/dashboard/admin/procuAdmin';

const d$procuAdmin = defineStore({
    id: 'procuAdmin',
    state: () => ({
        list: [],
        pagination: {}
    }),
    actions: {
        async a$list(params) {
            try {
                const { data, message, ...pagination } = await s$procuAdmin.list(params);
                this.list = data;
                this.pagination=pagination;
            } catch (e) {
                console.error('actions dashboard get list error', e);
                this.list = [];
                throw e;
            }
        },
        async a$update(id, body) {
            try {
                await s$procuAdmin.update(id, body);
                await s$procuAdmin.create(id, body);
                await this.a$list();
            } catch (e) {
                console.error('actions dashboard update error', e);
                throw e;
            }
        },
        async a$getById(id) {
            try {
                const {data} = await s$procuAdmin.getById(id);
                return data
            } catch (e) {
                console.error('actions dashboard update error', e);
                throw e;
            }
        },
        async a$add(id, body) {
            try {
                await s$procuAdmin.add(id, body);
                await this.a$list();
            } catch (e) {
                console.error('actions dashboard add error', e);
                throw e;
            }
        },
        async a$delete(id) {
            try {
                await s$procuAdmin.del(id);
                await this.a$list();
            } catch (e) {
                console.error('actions dashboard delete error', e);
                throw e;
            }
        },
    },
    getters: {
        g$list: ({ list }) => list,
        g$pagination: ({ pagination }) => pagination,
    },

});

export default d$procuAdmin;