<template>
  <div class="about">
    <div id="curtain" class="clear-both">
      <div id="curtain-bg">
        <img :src="filmData.pic" >
      </div>
      <a href="/" id="logo"> 简易电影</a>
      <div id="iframe-wrap">
        <iframe 
          id="iframe" allowfullscreen="true" 
          webkitallowfullscreen="true" 
          mozallowfullscreen="true" 
          oallowfullscreen="true" 
          msallowfullscreen="true"
          frameborder="0"
          :src="filmseturl[set]" >
        </iframe>
      </div>
      <div id="list-wrap">
        <p class="list-wrap-p film-content-position">共{{filmseturl.length}}集</p>
        <ul id="film-content" class="film-content-position">
          <li v-for="(item,index) in filmseturl" :key="index" :class="{'playing':index==$route.params.set}">
            <a :href="'/flim/'+ filmData.videoId + '/' + index">{{index+1}}</a>
          </li>
        </ul>
      </div>
    </div>
    <div id="film-info">
      <h2>{{filmData.videoName}}</h2>
      <span class="film-actor">{{filmData.note}}</span>
      <span class="film-actor">
        年份：{{filmData.year}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        国家：{{filmData.area}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        语言：{{filmData.language}}
      </span>
      <span class="film-actor">导演：{{filmData.director}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;演员：{{filmData.actor}}</span>
      <span class="film-description"><b>简介：</b>{{filmData.description}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "about",
  data() {
    return {
      screenWidth: '',
      videoid: '',
      filmData: "",
      filmseturl: [],
      set: this.$route.params.set,
      iframhight: '',
    };
  },
  created() {
    this.$axios
      .get("/api/video", {
        params: {
          id: this.$route.params.videoid
        }
      })
      .then(res => {
        this.filmData = res.data;
        this.processData(res);
        console.log(this.filmData);
      })
      .catch(error => {
        console.log(error);
      });
  },
  mounted() {
    var that = this;
    document.title = "简易电影";

    window.onresize = function() {
      that.setiframHight();
    }

    this.setiframHight();
  },
  watch: {

  },
  methods: {
    processData: function(res) {
      if (res.data) {
        console.log(res.data, "有数据");
        var allurl = res.data.url.split("#");
        for (let i = 0; i < allurl.length; i++) {
          let start = allurl[i].indexOf("$") + 1;
          this.filmseturl.push(allurl[i].substring(start, allurl[i].length));
        }
        
        document.title = res.data.videoName + " - 简易电影";
        console.log(allurl);
        console.log(this.filmseturl);
      } else {
        console.log(res.data, "无数据");
      }
    },
    setiframHight: function() {
      window.screenWidth = document.body.clientWidth;
      this.screenWidth = window.screenWidth;
      var iframe = document.getElementById("iframe");
      var listwrap = document.getElementById("list-wrap");
      this.iframhight = iframe.clientWidth*0.6;
      iframe.style.height = this.iframhight + "px";
      if(this.screenWidth>768){
        listwrap.style.height = this.iframhight + "px";
      }else{
        listwrap.style.height = "auto";
      }
    },
  }
};
</script>

<style scoped lang="less">
#curtain{
  position: relative;
  padding: 20px 80px;
  background: rgba(46, 46, 54, 0.5);
}

#logo {
  display: inline-block;
}

#curtain-bg{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
}

#curtain-bg img{
  width: 100%;
  min-height: 100%;
  filter: blur(20px);
}

#iframe-wrap{
  float: left;
  width: 100%;
  padding-right: 300px;
  box-sizing: border-box;
}

#iframe {
  display: block;
  margin: 0 auto;
  width: 100%;
  background: rgba(38, 38, 43, 0.4);
}

#list-wrap{
  position: absolute;
  right: 80px;
  width: 300px;
  overflow:hidden;
  box-sizing: border-box;
}

.film-content-position{
  position: relative;
  margin: 0 auto;
  right: -20px;
  width: 100%;
  color: #eee;
  background: rgba(38, 38, 43, 0.4);
  box-sizing: border-box;
}

.list-wrap-p{
  padding: 5px 10px;
  height: 30px;
  line-height: 20px;
}

#film-content{
  padding-right: 20px;
  padding-bottom: 30px;
  height: auto;
  max-height: 100%;
  overflow-y:auto;
}

#film-content>li{
  display: inline-block;
  margin: 8px;
  padding: 0px 14px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background: rgba(136, 136, 136, 0.5);
  border-radius: 4px;
  box-sizing: border-box;
}

#film-content>li:hover{
  background: rgba(136, 136, 136, 1);
}

#film-content>li.playing{
  background: rgb(101, 160, 34);
}

#film-content>li>a{
  display: inline-block;
  width: 100%;
  height: 100%;
  font-size: 14px;
  color: #eee;
}

#film-content p{
  padding: 5px;
  margin: 0 10px;
  color: #fff;
  background: rgba(55, 158, 158, 0.5);
  border-radius: 4px;
}

#film-info{
  padding: 20px 80px;
  box-sizing: border-box;
  background: #fff;
}

#film-info h2{
  margin-bottom: 10px;
  color: #000;
  font-weight: 400;
}

#film-info span{
  display: block;
  margin-bottom: 10px;
  font-size: 14px;
}

.film-actor{
  color: #888;
}

.film-description{
  color: #000;
  line-height: 1.8em;
}

@media screen and (max-width: 980px) {
  #curtain{
    padding: 20px 20px;
  }

  #iframe-wrap{
    padding-right: 220px;
  }

  #list-wrap{
    right: 20px;
    width: 220px;
  }

}

@media screen and (max-width: 768px) {
  #iframe-wrap{
    float: none;
    display: block;
    width: 100%;
    padding-right: 0;
  }
  
  #list-wrap{
    position: relative;
    margin-top: 20px;
    right: 10px;
    width: 100%;
    overflow:hidden;
    // background: red;
  }

  .film-content-position{
    right: -20px;
    width: 100%;
  }

  #film-content{
    padding-bottom: 10px;
    max-height: 140px;
  }

  #film-info{
    padding: 20px;
  }
}

</style>
