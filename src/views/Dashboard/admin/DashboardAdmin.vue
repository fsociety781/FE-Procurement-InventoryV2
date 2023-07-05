<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12" >

        <div class="row">
          <div class="col-lg-3 col-md-6 ">
            <card style="
            border-bottom-color: #246AFC;
            border-bottom-width: 4px;" 
            title="Request Total"
            :value="g$overview.total"
            directionReverse></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card style="
            border-block-color: #F9CE7E;
            border-bottom-width: 4px;" 
            title="On Progress"
            :value="g$overview.processed"
              directionReverse></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card style="
            border-bottom-color: #B8E0D2;
            border-bottom-width: 4px;" 
            title="Approved"
            :value="g$overview.approved"
              directionReverse></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card style="
            border-bottom-color: #E26163;
            border-bottom-width: 4px;" 
            title="Rejceted"
            :value="g$overview.rejected"
              directionReverse></card>
          </div>
        </div>
    <div class="card-body px-0 pt-0 pb-2">
        <div class="table-responsive p-0">
          <data-tabel
          :index="false"
          :data="g$list"
          v-bind="dt"
          @detail-member="showDetail"

        />
      </div>
    </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Card from "@/examples/Cards/Card.vue";
  import { mapActions, mapState } from "pinia";
  import ArgonSwitch from "@/components/ArgonSwitch.vue";
  import d$DashboardAdmin from "@/stores/dashboard/admin/DashboardAdmin";
  import DataTabel from "@/components/datatabels.vue"

  

  export default {
    name: "DashboardAdmin",
    components: {
    DataTabel
  },
    data () {
      return {
        dt: {
      columns: [
      {
          name: 'name',
          th: 'Member Name',
          render: ({ detailItems }) => detailItems.name,
        },
        {
          name: 'description',
          th: 'Description',
          render: ({ detailItems }) => detailItems.description,
          
        },
        {
          name: 'category',
          th: 'Category',
          render: ({ detailItems }) => detailItems.category.category,
        },
        {
          name: 'Total',
          th: 'Total',
          render: ({ detailItems }) => detailItems.total,
        },
        {
          name: 'duedate',
          th: 'Due Date',
          render: ({ detailItems }) => detailItems.duedate,
        },
        { name: 'status', th: ' Status' },
        
      ],
    },
    modalDetail: false,
    detail: {},
    }
    },
    components: {
      Card,
      ArgonSwitch,
      DataTabel,
    },
    computed : {
    ...mapState(d$DashboardAdmin, ["g$list","g$overview"]), 
    },
    methods:{
      ...mapActions(d$DashboardAdmin, ["a$list",
"a$update",
"a$getById",]),
  async getList() {
    try {
     let a = await this.a$list();
     console.log("ASASSA", a)
    } catch (e) {
      console.error("methods getList error", e);
    }
  },
},
async created() {
  await this.getList();
},
  };
</script>