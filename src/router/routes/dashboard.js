const dashboard = {
    path: '/dashboard',
    name: 'Dashboard',
    children: [
        {
            path: "member",
            name: "dashboardmember",
            component: () => import('@/views/Dashboard/member/DashboardMember.vue'),
            meta: { auth: true },
        },
        {
            path: "admin",
            name: "dashboardadmin",
            component: () => import('@/views/Dashboard/admin/DashboardAdmin.vue'),
            meta: { auth: true },
        },
        {
            path: "MemberManagement",
            name: "MemberManagement",
            component: () => import('@/views/Dashboard/admin/MemberManagement/MemberManagement.vue'),
            meta: { auth: true },
        },
        {
            path: "MemberManagement",
            children: [
                {
                    path: "create",
                    name: "Add member",
                    component: () => import('@/views/Dashboard/admin/MemberManagement/create.vue'),
                    meta: { auth: true },
                }
            ]
        },
        {
            path: "procuAdmin",
            name: "procuAdmin",
            component: () => import('@/views/Dashboard/admin/procuAdmin.vue'),
            meta: { auth: true },
        },

        // member
        {
            path: "procurement",
            name: "procurement member",
            component: () => import('@/views/Dashboard/member/procurement/index.vue'),
            meta: { auth: true },
        },
        {
            path: 'procurement',
            children: [
                {
                    path: "create",
                    name: "Add Procurement",
                    component: () => import('@/views/Dashboard/member/procurement/create.vue'),
                    meta: { auth: true },
                }
            ]
        },

       
        
        
    ]
};

export default dashboard;