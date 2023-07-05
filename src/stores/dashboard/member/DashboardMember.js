import { defineStore } from "pinia";
import * as s$DashboardMember from '@/services/dashboard/member/DashboardMember';

const d$DashboardMember = defineStore({
    id: 'DashboardMember',
    state: () => ({
        overview: {
            total: null,
            oprocess: null,
            approved: null,
            rejected: null
        },
        lastrequest: []
    }),
    actions: {
        async a$list() {
            try {
                const  data  = await s$DashboardMember.list();
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
                await s$DashboardMember.update(id, body);
                await this.a$list();
            } catch (e) {
                console.error('actions dashboard update error', e);
                throw e;
            }
        },
        async a$getById(id) {
            try {
                const {data} = await s$DashboardMember.getById(id);
                return data
            } catch (e) {
                console.error('actions dashboard update error', e);
                throw e;
            }
        },
        async a$add(body) {
            try {
                await s$DashboardMember.add(body);
                await this.a$list();
            } catch (e) {
                console.error('actions dashboard add error', e);
                throw e;
            }
        },
        async a$delete(id) {
            try {
                await s$DashboardMember.del(id);
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

export default d$DashboardMember;