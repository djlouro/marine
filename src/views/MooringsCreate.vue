<template>
  <div>
    <CRow>
      <CCol col="6">
          <CCard>
            <CCardHeader>
                <CIcon name="cil-lock-locked"/>
                {{$t('mooringInformation')}}
            </CCardHeader>
            <CCardBody>
                <CRow align-vertical="center" class="mb-2">
                    <CCol md="3">
                      {{$t('code')}}
                    </CCol>
                    <CCol md="9">
                        <CInput v-model="mooring.code" :placeholder="$t('code')">></CInput>
                    </CCol>
                </CRow>
                <CRow align-vertical="center" class="mb-2">
                    <CCol md="3">
                        {{$t('dimensions')}}
                    </CCol>
                    <CCol md="4">
                        <CInput v-model="mooring.length" :placeholder="$t('length')"></CInput>
                    </CCol>
                    <CCol md="5">
                        <CInput v-model="mooring.width" :placeholder="$t('width')">></CInput>
                    </CCol>
                </CRow>
                <CRow align-vertical="center" class="mb-2">
                    <CCol md="3">
                        {{$t('watherDepth')}}
                    </CCol>
                    <CCol md="9">
                        <CInput v-model="mooring.watherDepth" :placeholder="$t('watherDepth')">></CInput>
                    </CCol>
                </CRow>
                <CRow align-vertical="center" class="mb-2">
                    <CCol md="3">
                         {{$t('type')}}
                    </CCol>
                    <CCol md="9">
                        <CSelect
                          v-model="mooring.type"
                          :options="['Wather','Land']"
                        >
                        </CSelect>
                    </CCol>
                </CRow>
                <CRow align-vertical="center" class="mb-2">
                    <CCol md="3">
                          {{$t('priceM')}}
                    </CCol>
                    <CCol md="9">
                        <CInput v-model="mooring.price" :placeholder="$t('priceM')">></CInput>
                    </CCol>
                </CRow>
                <CRow align-vertical="center" class="mb-2">
                    <CCol md="3">
                        {{$t('condition')}}
                    </CCol>
                    <CCol md="9">
                        <CSelect
                          :value.sync="mooring.conditionM"
                          :options="['avalible','taken','repair']"
                        >
                        </CSelect>
                    </CCol>
                </CRow>
                <CRow align-vertical="center" class="mb-2">
                    <CCol md="3">
                         {{$t('position')}}
                    </CCol>
                    <CCol md="4">
                        <CInput v-model="mooring.lat" placeholder="Latitude"></CInput>
                    </CCol>
                    <CCol md="5">
                        <CInput v-model="mooring.lng" placeholder="Langitude">></CInput>
                    </CCol>
                </CRow>
                <CRow align-vertical="center" class="mb-2">
                    <CCol md="3">
                        {{$t('additionalNotes')}}
                    </CCol>
                    <CCol md="9">
                        <CInput v-model="mooring.note" :placeholder="$t('additionalNotes')">></CInput>
                    </CCol>
                </CRow>
            </CCardBody>
          </CCard>
      </CCol>
      <CCol col="6">
          <CCard>
            <CCardHeader>
                <CIcon name="cil-lock-locked"/>
                {{$t('clientInfo')}}
            </CCardHeader>
            <CCardBody>
                <CRow align-vertical="center" class="mb-2">
                    <CCol md="3">
                      {{$t('username')}}
                    </CCol>
                    <CCol md="9">
                        <CInput @input="setNewClient" v-model="mooring.client" :placeholder="$t('usernme')">></CInput>
                    </CCol>
                </CRow>
                <div v-if="!newClient">
                <CRow align-vertical="center" class="mb-2">
                    <CCol md="3">
                         {{$t('fullName')}}
                    </CCol>
                    <CCol md="9">
                        <CInput readonly v-model="client.fullName" placeholder="Name and surname">></CInput>
                    </CCol>
                </CRow>
                <CRow align-vertical="center" class="mb-2">
                    <CCol md="3">
                         {{$t('address')}}
                    </CCol>
                    <CCol md="4">
                        <CInput v-model="client.zip" readonly :placeholder="$t('ZIP')"></CInput>
                    </CCol>
                    <CCol md="5">
                        <CInput v-model="client.address" readonly :placeholder="$t('town')">></CInput>
                    </CCol>
                </CRow>
                <CRow align-vertical="center" class="mb-2">
                    <CCol md="3">
                        {{$t('country')}}
                    </CCol>
                    <CCol md="9">
                        <CInput v-model="client.country" readonly :placeholder="$t('country')">></CInput>
                    </CCol>
                </CRow>
                </div>
                <div v-if="newClient">
                    <CAlert color="warning">
                        {{$t('clientChanged')}}
                    </CAlert>
                </div>
            </CCardBody>
          </CCard>
      </CCol>
    </CRow>
    <CRow>
      <CCol align="right" cols="6" class="pr-0">
          <CButton color="link" to="/moorings">{{$t('cancel')}}</CButton>
      </CCol>
      <CCol align="left" cols="6" class="pl-0">
          <CButton color="primary" @click="saveMooring">{{$t('save')}}</CButton>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
export default {
  name: 'Moorings',
  data () {
    return {
      editUser: false,
      client: {
          username: "",
          fullName: "",
          address: "",
          street: "",
          zip: "",
          country: "",
          note: ""
      },
      mooring: {
            id: "",
            code: "",
            width: "",  
            length: "",
            watherDepth: "",
            type: "",
            price: "",
            conditionM: "",
            client: "",
            lat: null,
            lng: null,
            note: ""
          },

          newClient: false
    }
  },
  computed: {
  },
  methods: {
      setNewClient() {
        this.newClient = true
      },
    saveMooring() {
      this.mooring.lat = parseFloat(this.mooring.lat)
      this.mooring.lng = parseFloat(this.mooring.lng)
      this.mooring.price = this.mooring.price === "" ? 0 : parseInt(this.mooring.price)
      if (this.editUser) {
        axios({
        method: "PUT",
        url: "http://localhost:3000/moorings/",
        data: this.mooring
        }).then(r => {
          this.$router.push({name: 'Moorings'})
        }) 
      } 
      else {
        axios({
          method: "POST",
          url: "http://localhost:3000/moorings",
          data: this.mooring
        }).then(r => {
          this.$router.push({name: 'Moorings'})
        })
      }
    },

    getClient(username) {
axios({
          method: 'GET',
          url: 'http://localhost:3000/clients/mooring/'+username
    }).then(r => {
        if (r.data[0]) {
            for (const [key, value] of Object.entries(r.data[0])) {
                console.log(value)
                console.log(value == null || value == "null")
                if (value == null || value == "null") {
                    this.client[key] = "";
                } else {
                    this.client[key] = value;
                }
            }

            this.mooring.client = this.client.username
        }
      })
    }
    
  },
  created() {
    if (this.$route.name === 'MooringsEdit') {
      this.mooring = this.$store.state.selectedMooring
      this.getClient(this.mooring.client)
      this.editUser = true
    }
  }
}
</script>
