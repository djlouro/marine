<template>
  <div>
    <CRow>
      <CCol>

          <CCard>
            <CCardHeader>
                <CRow>
                    <CCol align="left">
                        <CIcon name="cil-options"/>
                      {{$t('clients')}}
                    </CCol>
                    <CCol align="right">
                        
                    </CCol>
                </CRow>
            </CCardHeader>
            <CCardBody>
            <CDataTable
                sortable
                :items="clientList"
                :fields="fields"
                :sorter="true"  
                :column-filter="true">

              <template #actions="{item}">
                        <td>
                          <div class="d-flex">
                            <CButton variant="ghost"
                                     color="primary"
                                     size="sm"
                                     class="py-0 px-1 mr-3"
                                     @click="editClient(item)">
                                <CIcon name="cil-pencil"/>
                            </CButton>
                          </div>
                        </td>
                    </template>
              <template #address="{item}">
                        <td>
                          <div class="d-flex">
                            {{item.address}}
                          </div>
                        </td>
                    </template>

            <template #country="{item}">
                        <td>
                          <div class="d-flex">
                            {{item.country}}
                          </div>
                        </td>
                    </template>
            
            <template #fullName="{item}">
                        <td>
                          <div class="d-flex">
                            {{item.fullName}}
                          </div>
                        </td>
                    </template>
            </CDataTable>
            </CCardBody>
          </CCard>
      </CCol>
    </CRow>


    <CModal
      :title="selectedClient.username"
      color="primary"
      :show.sync="popup"
    >
      <CRow align-vertical="center" class="mb-2">
                    <CCol md="3">
                         {{$t('fullName')}}
                    </CCol>
                    <CCol md="9">
                        <CInput v-model="selectedClient.fullName" :placeholder="$t('fullName')">></CInput>
                    </CCol>
                </CRow>
                <CRow align-vertical="center" class="mb-2">
                    <CCol md="3">
                         {{$t('address')}}
                    </CCol>
                    <CCol md="4">
                        <CInput v-model="selectedClient.zip" :placeholder="$t('ZIP')"></CInput>
                    </CCol>
                    <CCol md="5">
                        <CInput v-model="selectedClient.address" :placeholder="$t('town')">></CInput>
                    </CCol>
                </CRow>
                <CRow align-vertical="center" class="mb-2">
                    <CCol md="3">
                        {{$t('country')}}
                    </CCol>
                    <CCol md="9">
                        <CInput v-model="selectedClient.country" :placeholder="$t('country')">></CInput>
                    </CCol>
                </CRow>
                <CRow align-vertical="center" class="mb-2">
                    <CCol md="3">
                        {{$t('note')}}
                    </CCol>
                    <CCol md="9">
                        <CInput v-model="selectedClient.note" :placeholder="$t('note')">></CInput>
                    </CCol>
                </CRow>

                <template #footer>
                       <CButton variant="ghost"
                                     color="primary"
                                     @click="popup = false">
                                {{$t('cancel')}}
                            </CButton>
                            <CButton color="primary"
                                     @click="saveClientInfo">
                                 {{$t('save')}}
                            </CButton>
                </template>
    </CModal>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios';

export default {
  name: 'Orders',
  data () {
    return {
      popup: false,
      selectedClient: {
        fullName: "",
        address: "",
        street: "",
        username: "",
        country: "",
        zip: "",
        note: ""
      },
      clientList: [
      ]
    }
  },
  computed: {
        fields() {
            return [
                {key: 'username', label: this.$t('username'), sortable: true},
                {key: 'fullName', label: this.$t('fullName'),sortable: true},
                {key: 'address', label: this.$t('address'),sortable: true},
                {key: 'country', label: this.$t('country'),sortable: true},
                {key: 'actions', label: this.$t('actions'), sortable: true, filter: false}
            ]
    },
  },
  methods: {
    editClient(item) {
        this.popup = true
        this.selectedClient = item
    },
   
    saveClientInfo() {

        for (const [key, value] of Object.entries(this.selectedClient)) {
          if (value == null) {
            this.selectedClient[key] = ""
          }
        }


        axios({
          method: 'PUT',
          url: 'http://localhost:3000/clients',
          data: this.selectedClient
    }).then(r => {
        this.popup = false
        this.getClients()
      })
    },

    getClients() {
      axios({
          method: 'GET',
          url: 'http://localhost:3000/clients'
    }).then(r => {
        this.clientList = r.data
      })
    }
  },
  created() {
    this.getClients()
  }
}
</script>
