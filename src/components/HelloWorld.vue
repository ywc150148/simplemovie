<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1> -->
    <div id="header-wrap">
      <div class="header-wrap-bg"></div>
      <div id="header" class="clear-both">
            <a href="/" id="logo">简易电影</a>
            <div id="search">
                <input type="text" id="search-input" @keyup.enter="searchStrings">
                <i class="serch-btn" @click="searchStrings"></i>
                <span id="serch-error">
                  <span id="serch-error-h"></span>
                  勿输入特殊字符、空格
                </span>
            </div>
      </div>
      <div id="nav">
        <ul id="nav-all" class="nav-ul" @click="ulClick(0)">
          <li v-for="(type,index) in type1" :key="index" :class="[index?'':'active']">{{type}}</li>
        </ul>
        <ul id="nav-type" class="nav-ul" @click="ulClick(1)">
          <li v-for="(type,index) in type2" :key="index" :class="[index?'':'active']">{{type}}</li>
        </ul>
        <ul id="nav-areas" class="nav-ul" @click="ulClick(2)">
          <li v-for="(type,index) in type3" :key="index" :class="[index?'':'active']">{{type}}</li>
        </ul>
        <ul id="nav-years" class="nav-ul" @click="ulClick(3)">
          <li v-for="(type,index) in type4" :key="index" :class="[index?'':'active']">{{type}}</li>
        </ul>
      </div>
    </div>
    <div id="content-wrap"  class="clear-both">
      <ul id="content-loading" v-if="loading">
        <li class="loading" v-show="nodata!=true">Loading...</li>
        <img src="../assets/img/httperror.png" v-show="httperror" alt="error">
        <li id="nodata" class="loading" v-show="nodata">没有数据</li>
        <li id="httperror" v-show="httperror"></li>
      </ul>
      <ul id="content" class="clear-both" v-else>
        <!-- <li class="state">加载成功...</li> -->
        <!-- <router-link to="/home">Home</router-link> -->
        <li v-for="(item,index) in videoData" :key="index">
          <a :href="'/flim/'+item.videoId + '/0'" class="pic">
            <img :src="item.pic" class="videopic">
          </a>
          <a :href="'/flim/'+item.videoId + '/0'">
            <span class="videoname">{{item.videoName}}</span>
            <span class="videonode">{{item.note}}</span>
          </a>
        </li>
      </ul>
      <div v-if="totalpages>3" class="paging clear-both">
        <div class="page-box" v-show="loading != true">
          <button :class="{'not-allowed':page==0}" @click="lastPage">上一页</button>
          <span class="firstpage" :class="{'cur':page==0}" @click="setPage(0)">1</span>
          <i :class="{'firstpage-i':page>3}">...</i>
          <span v-show="page<3" v-for="(item,index) in 3" :key="index+'a'" :class="{'cur':item==page}" @click="setPage(item)">{{item+1}}</span>
          <span v-show="page>=3&&page+3<totalpages" v-for="(item,index) in [page-2,page-1,page,page+1,page+2]" :key="index+'b'" :class="{'cur':item==page}" @click="setPage(item)">{{item+1}}</span>
          <span v-show="page+3>=totalpages" v-for="(item,index) in [totalpages-4,totalpages-3,totalpages-2,totalpages-1]" :key="index+'c'" :class="{'cur':item==page}" @click="setPage(item)">{{item+1}}</span>
          <i :class="{'firstpage-i':page+3<totalpages}">...</i>
          <span class="lastpage" :class="{'cur':page==totalpages}" @click="setPage(totalpages)">{{totalpages+1}}</span>
          <button :class="{'not-allowed':page==totalpages}" @click="nextPage">下一页</button>
        </div>

        <div class="page-box" v-show="nodata!=false">
          <span :class="{'not-allowed':page==0}" @click="lastPage">上一页</span>
          <span :class="{'not-allowed':page==totalpages}" @click="nextPage">下一页</span>
        </div>
      </div>

      <div v-if="totalpages<=3" class="paging clear-both">
        <div class="page-box" v-show="loading != true">
          <button :class="{'not-allowed':page==0}" @click="lastPage">上一页</button>
          <span class="firstpage" :class="{'cur':page==0}" @click="setPage(0)">1</span>
          <span v-for="(item,index) in totalpages" :key="index" :class="{'cur':item==page,'lastpage':item==totalpages+1}" @click="setPage(item)">{{item+1}}</span>
          <button :class="{'not-allowed':page==totalpages}" @click="nextPage">下一页</button>
        </div>

        <div class="page-box" v-show="nodata!=false">
          <span :class="{'not-allowed':page==0}" @click="lastPage">上一页</span>
          <span :class="{'not-allowed':page==totalpages}" @click="nextPage">下一页</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Paging from "@/components/Paging.vue";
export default {
  name: "HelloWorld",
  components: {
  },
  props: {
    msg: String
  },
  data() {
    return {
      videoData: null,
      loading: true,
      nodata: false,
      httperror: false,
      type1: ["最近更新", "电影", "电视剧", "综艺", "动漫"],
      type2: [
        "全部",
        "动作片",
        "喜剧片",
        "爱情片",
        "科幻片",
        "恐怖片",
        "剧情片",
        "战争片",
        "记录片",
        "伦理片",
        "犯罪片",
        "奇幻片",
        "惊悚片",
        "传记片",
        "悬疑片"
      ],
      type3: [
        "最新",
        "大陆剧",
        "香港剧",
        "韩国剧",
        "欧美剧",
        "台湾剧",
        "日本剧",
        "海外剧"
      ],
      type4: ["不限", 2018, 2017, 2016, 2015, 2014],
      typeIds: ["", 1, 2, 3, 4],
      films: [1, 5, 6, 7, 8, 9, 10, 11, 19, 21, 22, 24, 25, 27, 28],
      tvplay: [2, 12, 13, 14, 15, 16, 17, 18],
      variety: [3],
      comic: [4],
      videoyears: ["", 2018, 2017, 2016, 2015, 2014],
      api: "/api/video/list?",
      apisearch: "/api/video/search/advanced?",
      apiUrl: "/api/video/list?",
      page: 0,
      pageSize: 30,
      totalelements: '',
      totalpages: '',
      number: '',
      size: '',
      firstpage: '',
      lastpage: '',
      pageable: [],
      ordernumber: "",
      orderI: "",
      historyTypeid: "",
      historyYear: "",
    };
  },
  created() {
    // this.getData();
  },
  mounted() {
    let that = this;
    
    that.useCookie();

    that.getData();

    document.getElementById("nav-all").addEventListener("click", function(e) {
      let ev = e;
      let target = e.target;
      that.changeActive(ev, target);
    });

    document.getElementById("nav-areas").addEventListener("click", function(e) {
      let ev = e;
      let target = e.target;
      that.changeActive(ev, target);
    });

    document.getElementById("nav-type").addEventListener("click", function(e) {
      let ev = e;
      let target = e.target;
      that.changeActive(ev, target);
    });

    document.getElementById("nav-years").addEventListener("click", function(e) {
      let ev = e;
      let target = e.target;
      that.changeActive(ev, target);
    });

    window.onresize = function() {
      // 设置电影海报高度
      that.changepicHeight();
    };

  },
  watch: {},
  updated: function() {
    this.changepicHeight();
  },
  methods: {
    getData: function() {
      this.loading = true;
      this.$axios
        .get(this.apiUrl + "&page=" + this.page)
        .then(res => {
          this.videoData = res.data.content;
          console.log(res)
          this.getdataSuccess(res);
        })
        .catch(error => {
          this.getdataError(error);
        });
      console.log("getadata=>" + this.apiUrl + "&page=" + this.page);
    },
    getdataSuccess: function(res) {
      var that = this;
      // console.log(this.videoData.status);
      if (res.data.content.length > 0) {
        that.loading = false;
        that.nodata = false;
        that.httperror = false;

        that.totalelements = res.data.totalElements;// 总数据
        that.totalpages = res.data.totalPages - 1;// 总页数
        that.number = res.data.number;// 第几页
        that.size = res.data.size;// 此页数据数量
        that.firstpage = res.data.first;// 是否首页
        that.lastpage = res.data.last;// 是否尾页
        that.pageable = res.data.pageable;// 分页参数
        console.log(that.pageable)
      } else {
        that.loading = true;
        that.nodata = true;
        document.getElementById("nodata").innerHTML = "没有数据...";
      }
    },
    getdataError: function(error) {
      var that = this;
      that.nodata = true;
      that.httperror = true;
      document.getElementById("nodata").innerHTML = "请求失败";
      var li = document.getElementById("httperror");
      li.innerHTML = error;
    },
    ulClick: function(order) {
      this.ordernumber = order;
    },
    changeActive: function(ev, target) {
      let that = this;
      if (target.nodeName.toLowerCase() == "li") {
        let nodeList = ev.target.parentNode.children;
        for (let i = 0; i < nodeList.length; i++) {
          if (target === nodeList[i]) {
            nodeList[i].classList.add("active");
            // console.log(target.innerHTML);
            that.orderI = i;
            that.judgeType(i);
          } else {
            nodeList[i].classList.remove("active");
          }
        }
      }
    },
    judgeType: function(i) {
      let that = this;
      var type;
      // var page = "page=" + that.page + "&pageSize=" + that.pageSize;
      var page = "&pageSize=" + that.pageSize;

      switch (that.ordernumber) {
        case 0:
          type = that.typeIds;
          break;
        case 1:
          type = that.films;
          break;
        case 2:
          type = that.tvplay;
          break;
        case 3:
          type = that.videoyears;
          break;
      }

      function assembleUrl() {
        that.page = 0;
        var typeid, years;
        if (that.ordernumber != 3) {
          // !=3 非年份点击
          that.historyTypeid = type[i];
          typeid = that.historyTypeid > 0 ? "&typeIds=" + that.historyTypeid : "";
          years = that.historyYear > 0 ? "&years=" + that.historyYear : "";
          that.apiUrl = typeid != " " || years != "" ? idFn() : that.api + page;
          function idFn() {
            that.setCookie("typeul",that.ordernumber,'1');
            that.setCookie("typeli",that.orderI,'1');
            that.setCookie("historyid",that.historyTypeid,'1');
            return that.apisearch + page + typeid + years;
          }
        } else {
          that.historyYear = type[i];
          typeid =
            that.historyTypeid > 0 ? "&typeIds=" + that.historyTypeid : "";
          years = that.historyYear > 0 ? "&years=" + that.historyYear : "";
          that.apiUrl =
            typeid != " " || years != " " ? yearFn() : that.api + page;

          function yearFn() {
            that.setCookie("yearul",that.ordernumber,'1');
            that.setCookie("yearli",that.orderI,'1');
            that.setCookie("historyyear",that.historyYear,'1');
            return that.apisearch + page + typeid + years;
          }
        }
        // console.log(document.cookie)
        // 跨域
        that.getData();
        that.clearCookie("search");
      }
      assembleUrl();
    },
    searchStrings: function() {
      let that = this;
      // var page = "&page=" + that.page + "&pageSize=" + that.pageSize;
      var page = "&pageSize=" + that.pageSize;
      var searchinput = document.getElementById("search-input");
      var sercherror = document.getElementById("serch-error");
      searchinput.setAttribute(
        "placeholder",
        "请输入关键字、演员、导演(๑˙ー˙๑)"
      );
      var val = searchinput.value.replace(/\s+/g, " ");
      var re = /select|update|delete|exec|count|’|"|=|;|>|<|他妈的|%/i;
      if (re.test(val.toLowerCase()) || val == " ") {
        // 非法字符，显示警告，清空输入框，隐藏警告
        sercherror.style.display = "block";
        searchinput.value = "";
        setTimeout(function() {
          sercherror.style.display = "none";
        }, 3000);
      } else {
        // 隐藏警告，组装Url，跨域
        sercherror.style.display = "none";
        that.apiUrl = that.apisearch + "searchStrings=" + val + page;
        console.log(that.apiUrl);
        that.getData();

        that.setCookie("search",val,'1');
        that.clearCookie("typeul");
        that.clearCookie("typeli");
        that.clearCookie("historyid");
        that.clearCookie("yearul");
        that.clearCookie("yearli");
        that.clearCookie("historyyear");
        console.log("搜索，cookie："+document.cookie)
      }
    },
    changepicHeight: function() {
      console.log("窗口变化");
      var content = document.getElementById("content");
      var pic = document.getElementsByClassName("pic");
      var picheight;
      for (let i = 0; i < pic.length; i++) {
        picheight = pic[i].clientWidth / 0.7;
        pic[i].style.height = picheight + "px";
      }
    },
    setCookie: function(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + "; " + expires;
    },
    clearCookie: function(name) {
      this.setCookie(name, "", -1);
    },
    getCookie: function(key) {
      var res = document.cookie.split(";");

      for (var i = 0; i < res.length; i++) {
        var temp = res[i].split("=");

        if (temp[0].trim() === key) {
          return temp[1];
        }
      }
    },
    setNav: function(ul, li) {
      var ularray = ["nav-all", "nav-type", "nav-areas", "nav-years"];

      if (ul != undefined) {
        var nodeList = document
          .getElementById(ularray[ul])
          .getElementsByTagName("li");

        for (var i = 0; i < nodeList.length; i++) {
          if (i == li) {
            nodeList[i].classList.add("active");
          } else {
            nodeList[i].classList.remove("active");
          }
        }
      }
    },
    useCookie: function() {
      var that = this;
      var orderul = this.getCookie("typeul");
      var orderli = this.getCookie("typeli");
      var historyid = this.getCookie("historyid");
      var yearorderul = this.getCookie("yearul");
      var yearorderli = this.getCookie("yearli");
      var historyyear = this.getCookie("historyyear");
      var searchstring = this.getCookie("search");
      var historypage = this.getCookie("historypage");
      this.historyTypeid = historyid;
      this.historyYear =  historyyear;

      this.setNav(orderul, orderli);
      this.setNav(yearorderul, yearorderli);
      this.page = historypage != undefined? historypage : 0;
      // this.page = page;

      // var page = "page=" + this.page + "&pageSize=" + this.pageSize;
      var page = "&pageSize=" + this.pageSize;
      var typeid,years;
      if(historyid != undefined || historyyear != undefined){
        typeid = historyid>0 ? "&typeIds=" + historyid : "";
        years = historyyear>0 ? "&years=" + historyyear : "";
        this.apiUrl = historyid >0 || historyyear >0 ? returnUrl() : this.api + page;

        function returnUrl() {
          return that.apisearch + page + typeid + years;
        }

      }else if(searchstring != undefined){
        this.apiUrl = this.apisearch + "searchStrings=" + searchstring + page;
        var searchinput = document.getElementById("search-input");
        searchinput.value = searchstring;
        this.searchStrings();
      }
      
      console.log("获取cookie设置apiurl:" + this.apiUrl)
    },
    lastPage: function() {
      var that = this;
      this.page = this.page>0? last(): this.page;

        function last() {
          that.page -= 1;
          that.getData();
          return that.page;
        }
      document.cookie = "historypage=" + this.page + ";";
    },
    nextPage: function() {
      var that = this;
      this.page = this.page < this.totalpages ? next() : this.page;

        function next() {
          that.page += 1;
          that.getData();
          return that.page;
        }
      document.cookie = "historypage=" + this.page + ";";
    },
    setPage: function(number) {
      var that = this;
      that.setCookie("page",number,'');
      this.page = number;
      this.getData();
      document.cookie = "historypage=" + this.page + ";";
    },

  }
};
</script>

<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
a {
  text-decoration: none;
}

#header-wrap {
  position: relative;
  background: rgba(75, 74, 74, 0.6);
}

.header-wrap-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("../assets/img/2.png");
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(0px);
  z-index: -1;
}

#header {
  padding: 20px 20px;
  height: 50px;
  font-size: 20px;
  line-height: 50px;
  font-weight: 500;
}

#logo {
  float: left;
}

#search {
  position: relative;
  float: right;
  margin-top: 10px;
  height: 30px;
  line-height: 30px;
  background: rgba(182, 182, 182, 0.2);
  box-sizing: border-box;
}

#search > input {
  display: inline-block;
  padding: 5px;
  width: 220px;
  height: 30px;
  color: #eee;
  border: none;
  background: none;
  outline: none;
  vertical-align: top;
  box-sizing: border-box;
}

#search input::-webkit-input-placeholder {
  color: #eee;
  font-size: 12px;
}

#search > i {
  display: inline-block;
  width: 30px;
  height: 30px;
  background-image: url("../assets/img/search1.png");
  background-repeat: no-repeat;
  background-size: 22px;
  background-position: center;
  vertical-align: top;
  cursor: pointer;
}

#serch-error {
  display: none;
  position: absolute;
  left: 0;
  bottom: -40px;
  padding: 0 10px;
  height: 24px;
  font-size: 12px;
  line-height: 24px;
  background: #fff;
  box-sizing: border-box;
  animation: serchanimate 1s;
  animation-fill-mode: forwards;
}

@keyframes serchanimate {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

#serch-error-h {
  position: absolute;
  top: -8px;
  width: 0px;
  height: 0px;
  border-top: 0px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #fff;
  border-left: 10px solid transparent;
}

#nav {
  display: block;
  padding: 0 20px;
  margin-top: 80px;
}

#nav ul {
  padding: 0px 0 15px 0;
}

.nav-ul > li {
  display: inline-block;
  padding: 2px 4px;
  margin-right: 12px;
  margin-bottom: 10px;
  font-size: 14px;
  color: rgb(255, 250, 250);
  cursor: pointer;
}

.nav-ul .active {
  background: rgb(52, 188, 254);
  border-radius: 5px;
}

#nav-years .active {
  background: rgb(101, 160, 34);
}

#content-wrap {
  margin: 40px auto 0;
  width: 100%;
  box-sizing: border-box;
  // background: lawngreen;
}

#content-loading {
  padding: 20px;
  height: 300px;
  color: #888;
  font-size: 20px;
  text-align: center;
}

#content-loading li {
  margin-bottom: 20px;
}

#content-loading li.loading {
  animation: loading 1.5s ease-in-out infinite alternate;
}

@keyframes loading {
  from {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
}

#content-loading img {
  width: 128px;
  display: block;
  margin: 0 auto;
}

#content li {
  float: left;
  width: 20%;
  box-sizing: border-box;
}

#content li > a {
  display: block;
  width: 100%;
}

.pic {
  background: #eee;
}

#content li > a > img.videopic {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}

.videopic::after {
  content: "";
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: url("../assets/img/lazyload.png") no-repeat;
  background-size: 100% 100%;
}

#content li > a > span {
  display: block;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.videoname {
  margin: 10px 0;
  height: 20px;
  font-size: 16px;
  line-height: 20px;
  color: #000;
  font-weight: bold;
  // background: rgb(118, 139, 0);
}

.videonode {
  color: #666;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  // background: darkblue;
}

.paging{
    margin-bottom: 160px;
    text-align: center;
}

.page-box{
    float: right;
}

.page-box span,i,button{
  padding: 0 10px;
  margin-left: 5px;
  margin-bottom: 10px;
  height: 30px;
  line-height: 30px;
  color: #888;
  font-size: 14px;
  text-align: center;
  border-radius: 2px;
  box-sizing: border-box;
}

.page-box span,button{
    display: inline-block;
    border: 1px solid #eee;
    border-radius: 2px;
    background: #fff;
    cursor: pointer;
}

.page-box>i{
  display: none;
}

.page-box span.cur{
    color: #fff;
    background: rgb(101, 160, 34);
}

.page-box span:hover{
    color: #fff;
    background: rgb(101, 160, 34);
}

.page-box button:hover{
    color: #fff;
    background: rgb(101, 160, 34);
}

.page-box .not-allowed{
  cursor:not-allowed;
  color: #ddd;
}

.page-box .not-allowed:hover{
  color: #888;
  background: #fff;
}

.page-box .firstpage-i{
  display: inline-block;
}

@media screen and (min-width: 1200px) {
  #content-wrap {
    padding: 0 100px 0 140px;
  }

  #content li {
    padding-right: 40px;
    margin-bottom: 40px;
    width: 20%;
  }  

  .paging{
      padding-right: 40px;
  }

}

@media screen and (max-width: 1200px) {
  #content-wrap {
    padding: 0 50px 0 70px;
  }

  #content li {
    padding-right: 20px;
    margin-bottom: 20px;
    width: 25%;
  }

  .paging{
      padding-right: 20px;
  }

}

@media screen and (max-width: 768px) {
  #content-wrap {
    padding: 0 20px 0 30px;
    margin-top: 30px;
  }

  #content li {
    padding-right: 10px;
    margin-bottom: 20px;
    width: 25%;
  }

  .videoname {
    margin-bottom: 0;
    font-size: 14px;
  }

  .paging{
      padding-right: 0px;
  }

  .page-box{
      float: none;
      margin: 0 auto;
      display: inline-block;
      text-align: left;
  }
}

@media screen and (max-width: 588px) {
  #header {
    padding: 10px 20px;
    height: auto;
  }

  #search {
    float: none;
    display: block;
    padding-right: 30px;
    width: 100%;
  }

  #search > input {
    width: 100%;
  }

  #search > i {
    position: absolute;
    top: 0;
    right: 0;
  }

  #nav {
    padding: 0 20px;
    margin-top: 20px;
  }

  #content-wrap {
    padding: 0 0 0 10px;
    margin-top: 10px;
  }

  #content li {
    padding-right: 10px;
    margin-bottom: 20px;
    width: 33.3%;
  }

  .videoname {
    font-size: 14px;
  }
}
</style>
