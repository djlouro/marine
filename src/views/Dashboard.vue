<template>
  <div>
    <div v-if="$store.state.userGroup === 'ADMIN'">
    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetProgress
          :header="$t('allMoorings')"
          :text="(moorings.all).toString()"
          color="info"
          inverse
          :value="100"
        />
      </CCol>
      <CCol sm="6" lg="3">
        <CWidgetProgress
          :header="$t('avalibleMoorings')"
          :text="(moorings.avalible).toString()"
          color="success"
          inverse :value="moorings.avalible / moorings.all * 100"
        />
      </CCol>
      <CCol sm="6" lg="3">
        <CWidgetProgress
          :header="$t('takenMoorings')"
           :text="(moorings.taken).toString()"
          color="danger"
          inverse :value="moorings.taken / moorings.all * 100 "
        />
      </CCol>
      <CCol sm="6" lg="3">
        <CWidgetProgress
          :header="$t('repairRequired')"
           :text="(moorings.repair).toString()"
          color="warning"
          inverse :value="moorings.repair / moorings.all * 100 "
        />
        
      </CCol>
    </CRow>
    <CRow>
      <CCol col="6">
          <CCard>
            <CCardHeader>
              {{$t('mooringMap')}}
            </CCardHeader>
            <CCardBody>
                <GmapMap
              :center="center"
              :zoom="19"
              style="height: 600px"
            >
              <GmapMarker
                :key="index"
                v-for="(m, index) in mooringList"
                :position="getPosition(m)"
                :title="m.code"
                :clickable="false"
                :draggable="m.draggable"
                :icon="{ url: 'https://icons.iconarchive.com/icons/iconsmind/outline/24/Ship-2-icon.png'}"
              />
            </GmapMap>
            </CCardBody>
          </CCard>
      </CCol>
      <CCol COL=6>
          <CCard>
            <CCardHeader>{{$t('mooringList')}}</CCardHeader>
            <CCardBody>
            <CDataTable
                :items="repairMoorings"
                :fields="fields">
              <template #status="{item}">
                <td>
                  <CBadge v-if="item.conditionM === 'repair'" color="warning">{{$t('REPAIR')}}</CBadge>
                </td>
              </template>
              <template #price="{item}">
                <td>
                  {{item.price}}€
                </td>
              </template>
              <template #note="{item}">
                <td>
                  <CButton
                    v-c-tooltip="{
                      content: item.note || $t('noNote'),
                       placement: 'left'
                      }"

                    color="primary"
                    size=sm
                  >
                    {{$t('note')}}
                  </CButton>
                </td>
              </template>
            </CDataTable>
            </CCardBody>
          </CCard>
      </CCol>
    </CRow>
    </div>
    <div v-else>
      <h1>{{$t('yourMooringInfo')}}</h1>
      <CDropdownDivider/>
      
        <div v-if="userMooring[0]">
          <div v-for="element in userMooring" :key="element.index" style="margin-bottom: 40px;">
            <h2>{{$t('code')}}</h2>
          <h4 class="text-muted">{{element.code}}</h4>
          <CDropdownDivider/>
          <h2>{{$t('w&l')}}</h2>
          <h4 class="text-muted">{{element.width}}
          {{element.length}}</h4>
          <CDropdownDivider/>
          <h2>{{$t('watherDepth')}}</h2>
          <h4 class="text-muted">{{element.watherDepth}}</h4>
          <CDropdownDivider/>
          <h2>{{$t('price')}}</h2>
          <h4 class="text-muted">{{element.price}}</h4>
          <CDropdownDivider/>
          <h4 class="text-muted">
          <CBadge v-if="element.conditionM === 'avalible'" color="success">{{$t(element.conditionM.toUpperCase())}}</CBadge>
                    <CBadge v-else-if="element.conditionM === 'taken'" color="danger">{{$t(element.conditionM.toUpperCase())}}</CBadge>
                    <CBadge v-else color="warning">{{$t(element.conditionM.toUpperCase())}}</CBadge></h4>
        </div>
        </div>
        <div v-else>
          <CAlert color="danger" closeButton>
            {{$t('noMooring')}}
          </CAlert>
        </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import * as VueGoogleMaps from 'vue2-google-maps'
import TheSidebarVue from '../containers/TheSidebar.vue'
 
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB1sB2py3ww1fAiwpi7xyEtmYlovmPZiEk',
  }})

export default {
  name: 'Dashboard',
  components: {
    VueGoogleMaps
  },
  data () {
    return {
      center: {lat: 45.547511, lng: 13.724488},
      mooringList: [],
      moorings: {
        all: 0,
        avalible: 0,
        taken: 0,
        repair: 0
      },
      repairMoorings: [],
      userMooring: [],
      group: null
    }
  },
  computed: {
        fields() {
            return [
                {key: 'code', label: this.$t('code'), sortable: false},
                {key: 'length', label: this.$t('length'),sortable: true},
                {key: 'width', label: this.$t('width'),sortable: true},
                {key: 'status', label: this.$t('status'), sortable: false},
                {key: 'price', label: this.$t('price'), sortable: false},
                {key: 'note', label: this.$t('note'), sortable: false}
            ]
    },  
  },
  methods: {
    getPosition(item) {
      return {lat: Number(item.lat), lng: Number(item.lng)}
    },
    setData() {
      for (let i = 0; i < this.mooringList.length; i++) {
        if (this.mooringList[i].conditionM === 'taken') {
          this.moorings.taken ++
        }
        if (this.mooringList[i].conditionM === 'avalible') {
          this.moorings.avalible ++
        }
        if (this.mooringList[i].conditionM === 'repair') {
          this.moorings.repair ++
        }
        this.moorings.all++
      }
    },
    getMooringsInfo() {
      axios({
          method: 'GET',
          url: 'http://localhost:3000/moorings?client='+this.$store.state.username
    }).then(r => {
        console.log(r.data)
        this.userMooring = r.data
        this.$store.state.hasMooring = r.data.length > 0
        console.log(this.userMooring)
      }).catch(err => {
      })
    },
    getMoorings() {
      axios({
          method: 'GET',
          url: 'http://localhost:3000/moorings'
    }).then(r => {
        if (this.$store.state.userGroup == "ADMIN") {
          this.mooringList = r.data
          this.setData()
        } else if (this.$store.state.userGroup == "USER") {
          console.log(r.data)
          this.userMooring = r.data
          console.log(this.userMooring)
        }
        
      })
    },
    getRepairMoorings() {
      axios({
          method: 'GET',
          url: 'http://localhost:3000/moorings?conditionM=repair'
    }).then(r => {
        this.repairMoorings = r.data
      })
    }
  },
  created() {
    if (this.$store.state.userGroup == "ADMIN") {
       this.getMoorings()
      this.getRepairMoorings()
    } else if (this.$store.state.userGroup == "USER") {
      this.getMooringsInfo()
    }
  }
}
</script>

<style>
.gm-style-mtc {
  display: none;
}
</style>
