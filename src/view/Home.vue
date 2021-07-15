<template>
    <div>
        <h3>English日記</h3>
        <label for="title">title</label><br>

        <input class="titletext"
          id="title" 
          type="text"
          v-model="title"
        >
        <br><br>
        <label class="label" for="comment">コメント</label><br>
        <textarea class="contenttext"
          id="comment"
          v-model="comment"
        >
        </textarea>
        <br><br>
        <v-btn @click="createComment" class="createbtn">投稿</v-btn>
        <h2>掲示板</h2>
        
      <div>
        <div class="text-center d-flex pb-4">
          <v-btn @click="all">
            all
          </v-btn>
          <div>{{ panel }}</div>
          <v-btn @click="none">
            none
          </v-btn>
        </div>
        
        <v-expansion-panels v-model="panel" multiple>
          <v-expansion-panel v-for="post in posts" :key="post.id">
            <v-expansion-panel-header> 
              {{ post.fields.title.stringValue }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              {{ post.fields.comment.stringValue }}
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>

        <div v-for="post in posts" :key="post.id">
          <!-- <a :href="'/show/' + post.id ">{{ post.title }}</a> -->
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      // 空string,文字列
      title: "",
      comment: "",
      // 空配列
      post: {},
      // {}はオブジェクト
      posts: [],
      inputData: {},
      panel: [],
    };
  }, 
  
  
  methods: {
    all() {
      this.panel = [...Array(this.posts.length).keys()].map((k, i) => i)
    },
    none() {
      this.panel = []
    },
    createComment(){
      // let formData = new FormData();
      // formData.append("post[comment]", this.comment);
      // formData.append("post[title]", this.title);
      // console.log('formData is', formData)
      // postは第一引数はURL、第二引数は送りたいデータ、第三引数を書く場合は設定を書ける
      axios.post(
        '/comments',
          // formData,
          {
            fields:{
              title: {
                stringValue: this.title
              },
              comment: {
                stringValue: this.comment
              },
              created_at: {
                timestampValue: new Date()
              }
            }
          }
        )
        .then(response =>{
            console.log(response.data.fields);
            // リロードしたい場合
            location.reload();
            // this.posts.push(response.data.fields)
          })  
        .catch(err => {
          console.log('error is', err)
        })
    }
  },
  mounted: function(){
     axios.get("comments")
      .then(res => {
        this.posts = res.data.documents;
      })
      .catch(err => {
        console.log(err)
      })
  },
  // computed: {
  //   // 配列の要素順番を逆順にする
  //   reverseposts() {
  //       return this.posts.slice().reverse();
  //   },
  // },
  



  // created() { 
  //     axios.get("http://127.0.0.1:3000/api/v1/posts/" + this.$route.params.id)
  //     .then(res => {
  //       this.post = res.data.data
  //       console.log('post is', this.post)
  //     })
  //     .catch(err => {
  //       console.log('error is ',err)
  //     })
  // }
  

};
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

.titletext{
  width: 30%;
  color: black;
  border: solid;
  border-color:black;
}

.contenttext{
  width: 30%;
  height: 100px;
  border: solid;
  border-color:black;
}

/* .text-center d-flex pb-4{
  width: 50%;
} */

</style>
