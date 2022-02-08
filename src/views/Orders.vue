<template>
  <div>
    <CRow>
      <CCol>

          <CCard>
            <CCardHeader>
                <CRow>
                    <CCol align="left">
                        <CIcon name="cil-options"/>
                      {{$t('Orders')}}
                    </CCol>
                    <CCol align="right">
                        
                    </CCol>
                </CRow>
            </CCardHeader>
            <CCardBody>
            <CDataTable
                sortable
                :items="orderList"
                :fields="fields"
                :sorter="true"  
                :column-filter="true">
              <template #status="{item}">
                <td>
                  <CBadge v-if="item.status === 'accepted'" color="success">{{$t(item.status.toUpperCase())}}</CBadge>
                  <CBadge v-else-if="item.status === 'declined'" color="danger">{{$t(item.status.toUpperCase())}}</CBadge>
                  <CBadge v-else color="warning">{{$t(item.status.toUpperCase())}}</CBadge>
                </td>
              </template>
              <template #price="{item}">
                <td>
                  {{item.price}}€
                </td>
              </template>
              <template #actions="{item}">
                        <td>
                          <div class="d-flex">
                            <CButton :disabled="item.status != 'pending'" 
                                     color="success"
                                     size="md"
                                     class="py-0 px-1 mr-3"
                                     @click="processOrder(item, true)">
                                <b>{{$t('ACCEPT')}}</b>
                            </CButton>
                            <CButton :disabled="item.status != 'pending'" 
                                     color="danger"
                                     size="md"
                                     class="py-0 px-1 mr-3"
                                     @click="processOrder(item, false)">
                                  <b>{{$t('DECLINE')}}</b>
                            </CButton>
                          </div>
                        </td>
                    </template>
            </CDataTable>
            </CCardBody>
          </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios';

export default {
  name: 'Orders',
  data () {
    return {
      orderList: [
      ]
    }
  },
  computed: {
        fields() {
            return [
                {key: 'code', label: this.$t('code'), sortable: true},
                {key: 'username', label: this.$t('username'), sortable: true},
                {key: 'email', label: this.$t('email'),sortable: true},
                {key: 'status', label: this.$t('status'),sortable: true},
                {key: 'price', label: this.$t('price'),sortable: true},
                {key: 'actions', label: this.$t('actions'), sortable: true, filter: false}
            ]
    },
  },
  methods: {
    editMooring(item) {
        this.$store.state.selectedMooring = item
        this.$router.push({name: 'MooringsEdit'})
    },
    processOrder(item, status) {
      axios({
          method: 'PUT',
          url: status ?'http://localhost:3000/orders/accept' : 'http://localhost:3000/orders/decline',
          data: item
    }).then(r => {
      this.getOrders()
    })
    },
    getOrders() {
      axios({
          method: 'GET',
          url: 'http://localhost:3000/orders'
    }).then(r => {
        this.orderList = r.data
      })
    }
  },
  created() {
    this.getOrders()
  }
}
</script>
