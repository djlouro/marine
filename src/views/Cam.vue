<template>
  <div>
    <CRow>
      <CCol>

          <CCard>
            <CCardHeader>
                <CRow>
                    <CCol align="left">
                        <CIcon name="cil-options"/>
                      {{$t('liveCamera')}}
                    </CCol>
                    <CCol align="right">
                        
                    </CCol>
                </CRow>
            </CCardHeader>
            <CCardBody>
                <LazyYoutubeVideo src="https://www.youtube.com/embed/Xo83-t5eS4s?autoplay=1&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0&origin=http://youtubeembedcode.com" />
            </CCardBody>
          </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import Vue from 'vue'
import LazyYoutubeVideo from 'vue-lazy-youtube-video'

export default {
  name: 'Cam',
  components: {
    LazyYoutubeVideo
  },
  data () {
    return {
      
    }
  },
  computed: {
    
  },
  methods: {
    
  },
  created() {
  }
}
</script>
