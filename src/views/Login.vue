<template>
  <div class="c-app flex-row align-items-center bg-img">
      <CContainer>
            <CRow class="justify-content-center">
                <CCol lg="5" md="6" sm="8">
                    <CCardGroup>
                        <CCard class="p-4 shadow-lg">
                            <CCardBody>
                                <h1>{{$t("login")}}</h1>
                                <p class="text-muted">{{$t("loginNote")}}</p>
                                <CForm>
                                     <CInput v-model="username"
                                            :placeholder="$t('username')"
                                            @input="onInput()">
                                        <template #prepend-content>
                                            <CIcon name="cil-user"/>
                                        </template>
                                    </CInput>
                                    <CInput v-model="password"
                                            type="password"
                                            :placeholder="$t('passowrd')"
                                            @input="onInput()">
                                        <template #prepend-content>
                                            <CIcon name="cil-lock-locked"/>
                                        </template>
                                    </CInput>
                                    <div v-if="completeNewPassword">
                                        <p class="text-muted">
                                            {{$t('completeNewPassword')}}
                                        <p/>
                                        <CInput v-model="newPassword"
                                                type="password"
                                                :placeholder="$t('newPassowrd')"
                                                @input="onInput()">
                                            <template #prepend-content>
                                                <CIcon name="cil-user"/>
                                            </template>
                                        </CInput>
                                        <CInput v-model="newPassword2"
                                                type="password"
                                                :placeholder="$t('newPassowrdRepeate')"
                                                @input="onInput()">
                                            <template #prepend-content>
                                                <CIcon name="cil-lock-locked"/>
                                            </template>
                                        </CInput>
                                    </div>
                                    <span class="text-danger">
                                        {{errorMsg}}
                                    </span>
                                    <CRow>
                                        <CCol v-if="!completeNewPassword" col="6" class="text-left">
                                            <CButton color="primary" class="px-4" @click="signIn()">{{$t('login')}}</CButton>
                                        </CCol>
                                        <CCol v-if="completeNewPassword" col="6" class="text-left">
                                            <CButton color="primary" class="px-4" @click="signInNewPassword()">{{$t('saveNewPassword')}}</CButton>
                                        </CCol>
                                        <CCol col="6" class="text-right d-block">
                                            <CButton color="link" class="px-0" to="/password">{{$t('forgotPassword')}}</CButton><br>
                                            <CButton color="link" class="px-0" to="/register">{{$t('register')}}</CButton>
                                        </CCol>
                                    </CRow>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCardGroup>
                </CCol>
            </CRow>
      </CContainer>
  </div>
</template>

<script>
import Vue from 'vue'
import {Auth} from "aws-amplify";

export default {
  name: 'Login',
  data () {
    return {
        completeNewPassword: false,
        errorMsg: '',
        user: null,
        username: '',
        password: '',
        newPassword: '',
        newPassword2: '',
    }
  },
  computed: {
    
  },
  methods: {
      signIn() {
          Auth.signIn(this.username, this.password)
          .then(data => {
              if (data.challengeName === "NEW_PASSWORD_REQUIRED") {
                  this.user = data
                  this.completeNewPassword = true
              }
              else {
                this.$store.state.username=data.username
                this.$store.state.userGroup= data.signInUserSession.idToken.payload['cognito:groups'] ?
                data.signInUserSession.idToken.payload['cognito:groups'][0] : 'USER'
                this.$router.push({name: 'Dashboard'})
              }
          })
          .catch(err => {
              this.errorMsg = err
          })
      },
      signInNewPassword() {
        Auth.completeNewPassword(this.user, this.newPassword)
      },
      onInput() {

      }
  }
}
</script>

<style>
.bg-img {
    background-image: url('https://branding.ifas.ufl.edu/media/brandingifasufledu/virtual-backgrounds/Spiral.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
}
</style>