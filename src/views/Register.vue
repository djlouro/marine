<template>
  <div class="c-app flex-row align-items-center bg-img">
      <CContainer>
            <CRow class="justify-content-center">
                <CCol lg="5" md="6" sm="8">
                    <CCardGroup>
                        <CCard class="p-4 shadow-lg">
                            <CCardBody>
                                <h1>{{$t('register')}}</h1>
                               
                                <CForm>
                                    <CInput v-model="email"
                                            :disabled="confirm"
                                            :placeholder="$t('email')"
                                            @input="onInput()">
                                        <template #prepend-content>
                                            <CIcon name="cil-user"/>
                                        </template>
                                    </CInput>
                                     <CInput v-model="username"
                                     :disabled="confirm"
                                              :placeholder="$t('username')"
                                            @input="onInput()">
                                        <template #prepend-content>
                                            <CIcon name="cil-user"/>
                                        </template>
                                    </CInput>
                                        <CInput v-model="newPassword"
                                                type="password"
                                                :disabled="confirm"
                                                   :placeholder="$t('newPassword')"
                                                @input="onInput()">
                                            <template #prepend-content>
                                                <CIcon name="cil-lock-locked"/>
                                            </template>
                                        </CInput>
                                        <CInput v-model="newPassword2"
                                                type="password"
                                                :disabled="confirm"
                                                   :placeholder="$t('newPasswordRepeate')"
                                                @input="onInput()">
                                            <template #prepend-content>
                                                <CIcon name="cil-lock-locked"/>
                                            </template>
                                        </CInput>
                                        <div v-if="confirm">
                                            <p>{{$t('registerInfo')}}</p>
                                            <CInput v-model="code"
                                            :placeholder="$t('code')"
                                            @input="onInput()">
                                        <template #prepend-content>
                                            <CIcon name="cil-user"/>
                                        </template>
                                    </CInput>
                                        </div>
                                    <span class="text-danger">
                                        {{errorMsg}}
                                    </span>
                                    <CRow>
                                        <CCol col="6" v-if="!confirm" class="text-left">
                                            <CButton color="primary" class="px-4" @click="register()">{{$t('register')}}</CButton>
                                        </CCol>
                                        <CCol col="6" v-else class="text-left">
                                            <CButton color="primary" class="px-4" @click="confirmRegister()">{{$t('confirm')}}</CButton>
                                        </CCol>
                                        <CCol class="text-right">
                                            <CButton color="link" class="px-0" to="/login">{{$t('backToLogin')}}</CButton>
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
  name: 'Register',
  data () {
    return {
        email: '',
        errorMsg: '',
        confirm: false,
        user: null,
        code: '',
        username: '',
        password: '',
        newPassword: '',
        newPassword2: '',
    }
  },
  computed: {
    
  },
  methods: {
      register() {
          let username = this.username
          let password = this.newPassword
          let email = this.email
          Auth.signUp({
                username,
                password,
                attributes: {
                    email,
                }
            })
          .then(data => {
              this.confirm = true
          })
          .catch(err => {
              this.errorMsg = err
          })
      },
      confirmRegister() {
        Auth.confirmSignUp(this.username, this.code)
        .then(data => {
              this.$router.push({name: 'Login'})
          })
          .catch(err => {
              this.errorMsg = err
          })
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