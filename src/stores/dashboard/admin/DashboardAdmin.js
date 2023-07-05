import { defineStore } from "pinia";
import * as s$DashboardAdmin from '@/services/dashboard/admin/DashboardAdmin';

const d$DashboardAdmin = defineStore({
    id: 'DashboardAdmin',
    state: () => ({
        overview: {
            total: null,
            processed: null,
            approved: null,
            rejected: null
        },
        lastrequest: []
    }),
    actions: {
        async a$list() {
            try {
                const { data } = await s$DashboardAdmin.list();
                console.log(data); 
                this.overview = data?.requestInventory;
                this.lastrequest = data?.lastRequest;
            } catch (e) {
                console.error('actions dashboard get list error', e);
                this.list = [];
                throw e;
            }
        },
        async a$update(id, body) {
            try {
                await s$DashboardAdmin.update(id, body);
                await this.a$list();
            } catch (e) {
                console.error('actions dashboard update error', e);
                throw e;
            }
        },
        async a$getById(id) {
            try {
                const {data} = await s$DashboardAdmin.getById(id);
                return data
            } catch (e) {
                console.error('actions dashboard update error', e);
                throw e;
            }
        },
        async a$add(body) {
            try {
                await s$DashboardAdmin.add(body);
                await this.a$list();
            } catch (e) {
                console.error('actions dashboard add error', e);
                throw e;
            }
        },
        async a$delete(id) {
            try {
                await s$DashboardAdmin.del(id);
                await this.a$list();
            } catch (e) {
                console.error('actions dashboard delete error', e);
                throw e;
            }
        },
    },
    getters: {
        g$list: ({ lastrequest }) => lastrequest,
        g$overview: ({ overview }) => overview,
    },
});

export default d$DashboardAdmin;