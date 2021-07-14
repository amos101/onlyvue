<template>
  
  <div id="app">
    <nav>
      <router-link to="/"></router-link><br>
    </nav>
    <router-view></router-view>  
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      title: "",
      comment: "",
      post: [],
      posts: [],
      inputData: {},
      panel: [],
    };
  }, 

  created() {
    // 第一引数は取得したいURL、第二引数は設定
      axios.get(        
        '/comments',
      )
      .then(response => {
        this.posts = response.data.documents;
        
      });
    },
    
  methods: {
    // all() {
    //   this.panel = [...Array(this.posts.length).keys()].map((k, i) => i)
    // },
    // none() {
    //   this.panel = []
    // },
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
              }
            }
          }
        )
        
    }
  },
  // mounted: function(){
  //    axios.get("http://127.0.0.1:3000/api/v1/posts/")
  //     .then(res => {
  //       this.posts = res.data.data
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // },
  computed: {
    // 配列の要素順番を逆順にする
    reverseposts() {
        return this.posts.slice().reverse();
    },
  },



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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}




</style>
