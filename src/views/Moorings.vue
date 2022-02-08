<template>
  <div>
    <CRow>
      <CCol>
         <div v-if="$store.state.userGroup == 'USER' && $store.state.hasMooring">
          <CAlert color="primary" closeButton>
                {{$t('mooringAlert')}}
          </CAlert>
        </div>
          <CCard>
            <CCardHeader>
                <CRow>
                    <CCol align="left">
                        <CIcon name="cil-options"/>
                         {{$t('mooringList')}}
                    </CCol>
                    <CCol align="right">
                        <CButton  v-if="$store.state.userGroup === 'ADMIN'" color="primary" size="sm" to="/moorings/create">
                          <CIcon name="cil-plus"/>
                         {{$t('addMooring')}}
                          </CButton>
                    </CCol>
                </CRow>
            </CCardHeader>
            <CCardBody>
            <CDataTable
                sortable
                :items="mooringList"
                :fields="fields"
                :sorter="true"
                :column-filter="true">
              <template #conditionM="{item}">
                <td>
                  <CBadge v-if="item.conditionM === 'avalible'" color="success">{{$t(item.conditionM.toUpperCase())}}</CBadge>
                  <CBadge v-else-if="item.conditionM === 'taken'" color="danger">{{$t(item.conditionM.toUpperCase())}}</CBadge>
                  <CBadge v-else color="warning">{{$t(item.conditionM.toUpperCase())}}</CBadge>
                </td>
              </template>
              <template #price="{item}">
                <td>
                  {{item.price}}€
                </td>
              </template>
              <template #edit="{item}">
                        <td>
                            <CButton variant="ghost"
                                     color="primary"
                                     size="sm"
                                     class="py-0 px-1 mr-3"
                                     @click="editMooring(item)">
                                <CIcon name="cil-pencil"/>
                            </CButton>
                            <CButton variant="ghost"
                                     color="primary"
                                     size="sm"
                                     class="py-0 px-1 mr-3"
                                     @click="deleteMooring(item)">
                                <CIcon name="cil-trash"/>
                            </CButton>
                        </td>
                    </template>
                    <template #order="{item}">
                        <td>
                            <CButton variant="ghost"
                                     color="success"
                                     size="md"
                                     :disabled="$store.state.hasMooring"
                                     class="py-0 px-1 mr-3"
                                     @click="orderMooring(item)">
                               <b>{{$t('order').toUpperCase()}}</b>
                            </CButton>
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
  name: 'Moorings',
  data () {
    return {
      mooringList: [
      ]
    }
  },
  computed: {
        fields() {
            let admin = [
                {key: 'code', label: this.$t('code'), sortable: true},
                {key: 'length', label: this.$t('length'),sortable: true},
                {key: 'width', label:  this.$t('width'),sortable: true},
                {key: 'conditionM', label:  this.$t('status'), sortable: true},
                {key: 'price', label:  this.$t('priceM'), sortable: true},
                {key: 'edit', label:  this.$t('editDelete'), sortable: false, filter: false}
            ]
            let user = [
                {key: 'code', label: this.$t('code'), sortable: true},
                {key: 'length', label: this.$t('length'),sortable: true},
                {key: 'width', label: this.$t('width'),sortable: true},
                {key: 'price', label: this.$t('priceM'), sortable: true},
                {key: 'order', label: this.$t('order'), sortable: false, filter: false}
            ]
            return this.$store.state.userGroup === 'ADMIN' ? admin : user
    },
  },
  methods: {
    orderMooring(item) {
        axios({
          method: "POST",
          url: "http://localhost:3000/orders",
          data: item
        }).then(r => {
          this.$router.push({name: 'Moorings'})
        })
    },
    editMooring(item) {
        this.$store.state.selectedMooring = item
        this.$router.push({name: 'MooringsEdit'})
    },
    deleteMooring(item) {
      axios({
          method: 'DELETE',
          url: 'http://localhost:3000/moorings/'+item.id
    }).then(r => {
      this.getMoorings()
    })
    },
    getMoorings() {
      axios({
          method: 'GET',
          url: 'http://localhost:3000/moorings'
    }).then(r => {
        this.mooringList = r.data
      })
    }
  },
  created() {
    this.getMoorings()
  }
}
</script>
