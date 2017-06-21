<template>
  <div class="home" v-cloak>

    <nav class="navbar navbar-default navbar-static-top">
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" href="#">
              <img class="brand" alt="Brand" src="~assets/images/taitang.png">

            </a>
             <a class="navbar-brand navbar-name" href="#">
             <!--  <img class="brand" alt="Brand" src="~assets/images/1.1.png"> -->
             <span class="iconword">泰坦德州运营系统</span>
           
            
            </a>
            </div>
             <div class="nav-right">
              <div class="btn-group dropdown">
                      <button type="button" class="btn btn-default" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                       {{username}} <!-- <span class="caret"></span> -->
                      </button>
                      <!-- <ul class="dropdown-menu pull-right">
                        <li>系统信息</li>
                        <li>个人信息</li>
                        <li>修改密码</li>
                      </ul> -->
                    </div>
                  <div class="btn-group" role="group" aria-label="...">
                    <button type="button" class="btn btn-default" @click="showDialog">
                    <i class="fa fa-circle-o-notch"></i>退出</button>
                  </div>
                  
                 
             </div>
          </div>
      </nav>
     <!--   //退出 -->
     <el-dialog title="提示" v-model="dialogVisible" size="tiny">
      <span>您将退出当前用户</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmExit">确 定</el-button>
      </span>
    </el-dialog>
     <!--  //退出  -->
   <main>
     <div class="leftsidebar">
       <zb-Sidebar></zb-Sidebar>
     </div>
      <div class="main">
              <router-view></router-view>

      </div>
   </main>

  </div>
</template>

<script>
import zbSidebar from "./sidebar"
import {setStore,getStore,removeStore} from '@/utils'
 
export default {
    beforeRouteEnter (to, from, next) {
        next(vm =>{
             vm.username = getStore("username")
             
           next()
        })
      },
    beforeRouteUpdate (to, from, next) {

        next()
      },
    beforeRouteLeave (to, from, next) {
      next()
      },
  name: 'home',
  data () {
    return {
     dialogVisible:false,
     username:"",
    }
  },
  methods:{
    showDialog(){//显示退出对话框
      this.dialogVisible=true
    },
    confirmExit(){//确认退出
      this.dialogVisible=false
      let option = {}
      this.API.Apiadminout(option).then((res)=>{
        
      },(res)=>{})
      removeStore('isLogin username')

      this.$router.push({name:"login"})

    }
  },
  components: {
    zbSidebar
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../style/color.scss";
 .navbar{
        border: none;

     }
.container-fluid{
     background: #373D41;
     height: 50px;
     padding: 0px;

     .navbar-header{
     }

     a {
          /*color: #42b983;*/
       color: #42b983;
        }

     .navbar-brand{
      display: flex;
      // padding: 5px 20px;
       width: 155px;
       padding-top:5px;
       padding-left:60px;
      text-align: center;
        cursor:default;
    // background-color:hsl(240,50%,80%);
       img{
        width: 40px;
        height: 40px;
      }
    }
    .navbar-name{
      width: 300px;
      .iconword{
         display: inline-block;
            background-color: transparent;
            padding: 0 5px;
            height: 50px;
            line-height: 50px;
            font-size: 14px;
            color: #fff;
            border-radius: 4px;
           
            box-sizing: border-box;
            border: 1px solid transparent;
            margin-top: -5px;
                text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    letter-spacing: 0.02em;

      }
      img{
        width: 100%;
      }
    }
    .nav-right{
          position: absolute;
          right: 60px;
          top:0px;
          height: 100%;
          .btn-group{
            border:none;

          }
          .btn{
            height: 50px;
            background:transparent;
            border: none;
            box-shadow:none;
            color:#ffffff;
            font-size: 12px;
          }
                .btn:focus,
                .btn:active:focus,
                .btn.active:focus,
                .btn.active,
                .btn:active.focus,
                .btn.active.focus {
                    outline: none;
                     border: none;
                     box-shadow:none;
                    background:transparent;
                }

    }

}
.home{
  height: 100%;
  width: 100vw;

  min-width:1400px;
    main{
      width: 100%;
      height: 100%;
      min-width: 950px;
      display: flex;
      
     
      .leftsidebar{
        // width: 280px;
        height: 100%;
        // min-height: 1000px;
        background:$color-asdebar;
         flex-grow:0;
          z-index: 1;
      }
      .main{

        background:$color-white;
        padding:15px 20px;
        flex-grow:1;
         z-index: 10;
         padding-left:0px;
          margin-left:20px;

      }
    }
}






</style>
