import { defineStore } from "pinia";
import * as s$MemberManagement from '@/services/dashboard/admin/MemberManagement'

const d$MemberManagement = defineStore({
    id: 'MemberManagement',
    state: () => ({
        list: [],
    }),
    actions: {
        async a$list() {
            try {
                const { data } = await s$MemberManagement.list();
                this.list = data;
            } catch (e) {
                console.error('actions todo get list error', e);
                this.list = [];
                throw e;
            }
        },
        async a$update(id, body) {
            try {
                await s$MemberManagement.update(id, body);
                await this.a$list();
            } catch (e) {
                console.error('actions todo update error', e);
                throw e;
            }
        },
        async a$getById(id) {
            try {
                const {data} = await s$MemberManagement.getById(id);
                return data
            } catch (e) {
                console.error('actions todo update error', e);
                throw e;
            }
        },
        async a$add(body) {
            try {
                await s$MemberManagement.add(body);
                await this.a$list();
            } catch (e) {
                console.error('actions todo add error', e);
                throw e;
            }
        },
        async a$delete(id) {
            try {
                await s$MemberManagement.del(id);
                await this.a$list();
            } catch (e) {
                console.error('actions todo delete error', e);
                throw e;
            }
        },
    },
    getters: {
        g$list: ({ list }) => list,
    },
});

export default d$MemberManagement;