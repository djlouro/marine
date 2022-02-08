<template>
  <div>
                <CRow>
                    <CCol lg="3" md="3" class="border-right" style="min-width: 220px" xl="2">
                        <h2>{{$t('topics')}}</h2>
                        <div class="m-3 cursor-pointer" @click="currentCategory = 'general'; getForumData()" >
                            <CIcon name="cil-star" class="mb-1 text-info"/>
                           
                            {{$t('general')}}
                        </div>
                        <div class="m-3 cursor-pointer" @click="currentCategory = 'weather'; getForumData()" >
                            <CIcon name="cil-star" class="mb-1 text-primary"/>
                          
                            {{$t('weather')}}
                        </div>
                        <div class="m-3 cursor-pointer" @click="currentCategory = 'random'; getForumData()" >
                            <CIcon name="cil-star" class="mb-1 text-warning"/>
                           
                            {{$t('random')}}
                        </div>
                        <div class="m-3 cursor-pointer" @click="currentCategory = 'suggestions'; getForumData()">
                            <CIcon name="cil-star" class="mb-1 text-success"/>
                          
                            {{$t('suggestion')}}
                        </div>
                        <div class="m-3 cursor-pointer" @click="currentCategory = 'problems'; getForumData()">
                            <CIcon name="cil-star" class="mb-1 text-danger"/>
                          
                            {{$t('problems')}}
                        </div>
                    </CCol>
                    <CCol v-if="!questionOpened">
                      <div v-for="item in questions" :key="item.index">
                        <transition name="fade">
                            <CCard :accent-color="currentCategoryColor">
                              {{item.id}}
                                <CCardHeader class="cursor-pointer" @click="isCollapsed == item.idForum ? isCollapsed = 0 : isCollapsed = item.idForum">
                                    <span class="font-xl">{{item.topicTitle}}</span>
                                    <span class="mx-4 text-right text-muted">{{$t('postedBy')}} {{item.topicOwner}}</span>
                                </CCardHeader>
                                <CCollapse :show="isCollapsed == item.idForum" :duration="400">
                                    <CCardBody>
                                        <p>{{item.topicBody}}</p>
                                        <CButton size="sm" color="primary" @click="openQuestion(item)">{{$t('seeThisTopic')}}</CButton>
                                    </CCardBody>
                                </CCollapse>
                            </CCard>
                        </transition>
                      </div>
                      <CDropdownDivider />
                      <span>
                          {{$t('postTopic')}}
                      </span>
                      <CInput v-model="postTitle"></CInput>
                      <CTextarea v-model="postBody"></CTextarea>
                      <CButton size="sm" color="primary" @click="postNewTopic()">{{$t('postTopic')}}</CButton>
                    </CCol>
                    <CCol v-else> 
                      <span class="font-4xl">{{currentQuestion.topicTitle}}</span>
                      <span class="mx-4 text-muted">   {{$t('postedBy')}} {{currentQuestion.topicOwner}}</span>
                      <p class="font-lg my-3">{{currentQuestion.topicBody}}</p>
                      <CDropdownDivider />
                      <div class="text-danger font-xl" v-if="noComments">
                        {{$t('noComments')}}
                      </div>
                      <div v-for="item in comments" :key="item.index">
                            <CCard :accent-color="currentCategoryColor">
                                <CCardHeader class="cursor-pointer">
                                    <span class="mx-4 text-muted">{{$t('postedBy')}} {{item.commentOwner}}</span>
                                </CCardHeader>
                                    <CCardBody class="m-0 p-3">
                                        <p>{{item.commentBody}}</p>
                                    </CCardBody>
                            </CCard>
                      </div>
                      <CDropdownDivider />
                      <span>
                          {{$t('postComment')}}
                      </span>
                      <CTextarea v-model="commentBody"></CTextarea>
                      <CButton size="sm" color="primary" @click="postNewComment()">{{$t('postComment')}}</CButton>
                    </CCol>
                </CRow>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'

export default {
  name: 'Forum',
  data () {
    return {
        currentCategory: 'general',
        currentCategoryColor: 'info',
        forumData: [],
        questions: [],
        comments: [],
        currentQuestion: [],
        questionOpened: false,
        isCollapsed: false,
        postTitle: '',
        postBody: '',
        commentBody: ''
    }
  },
  computed: {
    noComments() {
      return this.comments.length < 1
    }
  },
  watch: {
    comments() {

    },
    currentCategory() {
      switch(this.currentCategory) {
        case 'general':
          this.currentCategoryColor = 'info'
          this.questionOpened = false
          break;
        case 'weather':
          this.currentCategoryColor = 'primary'
          this.questionOpened = false
          break;
        case 'random':
          this.currentCategoryColor = 'warning'
          this.questionOpened = false
          break;
        case 'suggestions':
          this.currentCategoryColor = 'success'
          this.questionOpened = false
          break;
        case 'problems':
          this.currentCategoryColor = 'danger'
          this.questionOpened = false
          break;
        default:
          this.currentCategoryColor = 'info'
          this.questionOpened = false
      } 
    }
  },
  methods: {
    postNewComment() {
        let data = 
          {
            "commentOwner": this.$store.state.username,
            "commentBody": this.commentBody,
            "idForum": this.idForum
          }
        
        axios({
          method: "POST",
          url: "http://localhost:3000/forum/comment",
          data: data
        }).then(r => {
          this.getComments()
        })
    },
    postNewTopic() {
      let dataToSend = {
          "topicTitle": this.postTitle,
          "topicBody": this.postBody,
          "topicOwner": this.$store.state.username,
          "topic": this.currentCategory
        }
      axios({
        method: "POST",
        url: "http://localhost:3000/forum",
        data: dataToSend
      }).then(r => {
        this.getForumData()
    })
    },
    openQuestion(item) {
      this.questionOpened = true
      this.idForum = item.idForum
      this.currentQuestion = item
      this.getComments()
    },
    getComments() {
      axios({
          method: 'GET',
          url: 'http://localhost:3000/forum/comments/'+this.idForum
    }).then(r => {
        this.comments = r.data || []
        //this.setQuestions()
      })
    },
    getForumData() {
      this.postTitle = ""
      this.postBody = ""
      this.questionOpened = false
      axios({
          method: 'GET',
          url: 'http://localhost:3000/forum/'+this.currentCategory
    }).then(r => {
        this.forumData = r.data
        this.questions=r.data
        //this.setQuestions()
      })
    },
    setQuestions(topic) {
      for (let i = 0; i < this.forumData.length; i++) {
        if (this.forumData[i].topic === topic) {
          this.questions = this.forumData[i].posts
        }
      }
    }
  },
  created() {
    this.getForumData()
  }
}
</script>

<style>
</style>