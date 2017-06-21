<!-- 菜单为：用户管理 - 管理员、群组设定、主播管理。房间收益 - 收益查询、贡献排行。结算中心 - 结算详情、账户信息。直播 - 设置管理、添加/管理禁言
 -->
<template>

   <aside class="sidebar">

     <div class="btn-group-vertical" :class="[isPackup ? 'packup' :'']"  role="group" aria-label="...">
     <button type="button" class="btn btn-toggle" @click="togglePackUp">
       <i class="fa fa-bars fa-lg " :class="[isPackup ? '' :'fa-rotate']" aria-hidden="true"></i>
     </button>

     <button type="button" class="btn btn-default"  @click="enterSidebar(item)" v-for="item in mainsidebar" :class="mainindex==item.id ?'active':''" >
       <el-tooltip v-if="isPackup" class="item" effect="dark" :content="item.name" placement="right">
         <el-button>
           <span class="glyphicon" :class="['glyphicon-' + icons[item.id]]" aria-hidden="true"></span>
         </el-button>
       </el-tooltip>
       <span v-else class="glyphicon" :class="['glyphicon-' + icons[item.id]]" aria-hidden="true"></span>
       <span class="heading"> {{item.name}}</span>
     </button>
   </div>
      <!-- //子侧栏 -->
      <transition name="bounce">
      <div class="btn-group-vertical btn-group-vertical-one" v-show="isOpen" role="group" aria-label="...">
        <button type="button" class="btn btn-default btn-title">    {{curItem.name}}
        </button>


            <el-tree
              :data="catalog[mainindex]"
              :props="defaultProps"
              :accordion = true
              :indent=10
              :filter-node-method="filterNode"
              @node-click="handleNodeClick"
              ref="tree2">
            </el-tree>



      </div>
         </transition>

       <div class="icon_img" v-if="isHidden" @click ="toogleDate" :class="{icon_show:isShow}">
        </div>
   </aside>




</template>

<script>
import {getStore} from '@/utils'

export default {
   
  name: 'sidebar',

  data () {
    return {
      menuOper:[],
      curItem:[],
     mainsidebar:[
                
                 {name:"后台用户管理",id:0,opCode:'01'},
                  {name:"服务器管理",id:1,opCode:'02'},
                  {name:"游戏用户管理",id:2,opCode:'03'},
                  {name:"订单管理",id:3,opCode:'04'},
                  {name:"运营管理",id:4,opCode:'05'},
                  {name:"德州扑克",id:5,opCode:'06'},
                   {name:"德州扑克",id:5,opCode:'08'}],
      icons:["user","home","paperclip","folder-close","record","tags"],

        defaultProps: {
            children: 'children',
            label: 'label'
          },
        catalog:[
                   
                   [//后台用户管理
                        {   routename:'admin',
                            label:'用户管理',
                            opCode:'0101',
                           
                        },
                         {   routename:'anchor',
                            label:'角色管理',
                            opCode:'0102',
                           
                        }
                        
                  ],
                   [//后台用户管理
                        {   routename:'serverMange',
                            label:'服务器',
                            opCode:'0201',
                           
                        },
                         {   routename:'userMange',
                            label:'用户管理',
                            opCode:'0201',
                           
                        },
                         {   routename:'propresource',
                            label:'发放资源',
                            opCode:'0201',
                            children:[{label:"道具资源记录",routename:"propresource",opCode:'0201'}]
                           
                        },
                        
                  ],
                  [//游戏用户管理
                        {   routename:'regisinfoquery',
                            label:'用户注册信息查询',
                             opCode:'0301',
                           
                        },
                        {  routename:'balanceQuery',
                            label:'用户余额查询',  
                              opCode:'0302',   
                        },
                         {  routename:'gagMange',
                            label:'用户禁言管理',  
                             opCode:'0303',     
                        },
                         {  routename:'freezeMange',
                            label:'用户封号管理', 
                             opCode:'0304',      
                        },
                 ],
                   [//订单管理
                        {   routename:'rechargeMange',
                            label:'充值订单管理',
                             opCode:'0401',
                           
                        },
                        {  routename:'recordsConsumption',
                            label:'消费记录查询', 
                              opCode:'0402',    
                        },
                        
                 ],
                 [//运营管理
                    {label:"公告管理",routename:'noticeMange',opCode:'0501',},
                     
                    {label:"商城管理",routename:'shoppingMange',opCode:'0502',},
                    {label:"活动管理",routename:'activityMange',opCode:'0503',},
                     {label:"本周精选",routename:'pickedContent',opCode:'0504',},
                   {label:"广告管理",routename:"advertisementMange",opCode:'0505',children:[{label:"广告界面管理",routename:"advertisementMange",opCode:'050501'},
                     {label:"广告内容管理",routename:"advertConMange",opCode:'050502'}]},
                    {label:"邮件管理",routename:'mailMange',opCode:'0506'},
                    {label:"签到奖励管理",routename:'signMange',opCode:'0507',},
                    {label:"Vip管理",routename:'vipRedeployMange',opCode:'0508'},
                    // {label:"成长指引系统配置",routename:'growUpMange'},
                     {label:"道具配置",routename:"propDeploy",opCode:'0509',children:[{label:"道具属性",routename:"propDeploy",opCode:'050901'},
                              {label:"道具美术资源",routename:"propArtDeploy",opCode:'050902'}, {label:"礼包道具",routename:"propPackDeploy",opCode:'050903'}]},
                
                     {label:"其他配置",routename:'otherMange',opCode:'0510'},

                  ],
                  [ 
                        {label:"夺宝场",routename:"teShopManage",opCode:'0601',children:[{label:"商品管理",routename:"teShopManage",opCode:'060101'},
                              {label:"夺宝管理",routename:"teIndianaManage",opCode:'060102'}, {label:"房间管理",routename:"teInromeManage",opCode:'060103'}]},
                        {label:"排位赛",routename:"quaBasis",opCode:'0602',children:[{label:"排位赛基础属性",routename:"quaBasis",opCode:'060201'},
                                {label:"排位赛房间属性配置",routename:"quaRomConfigure",opCode:'060202'},
                                {label:"赛季头衔奖励配置",routename:"avatarReward",opCode:'060203'},
                                {label:"赛季排名奖励",routename:"seasonRanking",opCode:'060203'},
                                {label:"周头衔排名",routename:"weeklyTitleRanking",opCode:'060203'},
                                {label:"日头衔奖励",routename:"daylyTitleRanking",opCode:'060203'}]},
                         {label:"主播赛场",routename:"matchActManage",opCode:'0603',children:[{label:"比赛活动管理",routename:"matchActManage",opCode:'060301'},
                                // {label:"主播管理",routename:"anchorsManage"},
                                 {label:"奖池管理",routename:"jackpotManage",opCode:'060302'},
                                  {label:"奖励预告配置",routename:"rewardNotice",opCode:'060303'},
                                   {label:"活动规则配置",routename:"rewardRules",opCode:'060304'}]},

                  ],
            ], 
        mainindex:0,
        sideindex:0,
        secondindex:0,
        filterText:'',
        isOpen:false,
        // hasSecond:false,
        isPackup:false,
        isShow:false,
        isHidden:false,//默认不显示
       
      }


    },
    mounted:function(){
      let parsedata = JSON.parse(getStore('MENUOPER'))
      let arr = []
      parsedata.forEach(function(item){
        let str = item.opCode.substr(0,2)
            arr.push(str)
         
      })

      this.mainsidebar = this.mainsidebar.filter((item)=>{

          let isTrue = arr.some((itemr)=>{
                return itemr === item.opCode
            })
         
          return isTrue

      })


    },


  methods:{
     filterNode(value, data) {//tree过滤
      let isTrue = value.some(function(item){
          return item.opCode == data.opCode
      })
        return isTrue;
      },

      handleNodeClick(item) {
        this.togglePackUp()
       this.$router.push({name:item.routename,
        query: {
        t: + new Date()
    }
  })
    },
    togglePackUp(){//收缩/放大
      let vm = this,
      btn = document.querySelector(".btn-toggle")
      this.isPackup = !this.isPackup
      if (vm.isPackup) {
          btn.style.width = '46px';//


      }else{
          btn.style.width = '140px';//

      }


    },
      enterSidebar(item){//主目录
        let vm = this,filterArr = [];
        vm.mainindex = item.id
        this.isOpen = true
        this.sideindex = 0
         this.isHidden = true
         this.isShow =false
         this.curItem = item
         if (this.menuOper.length>=1) {
            filterArr = this.menuOper
         }else{

            filterArr = JSON.parse(getStore('MENUOPER'))
            this.menuOper =filterArr
         }
    
         vm.$nextTick(function(){

             this.$refs.tree2.filter(filterArr);
         })
         

         
         
      },
      enteraSidebar(item){//子侧栏

       this.sideindex = item.sid
       
 
       // item.subview?this.hasSecond = true:this.hasSecond = false

      if (item.routename) {
        this.$router.push({name:item.routename})
      }


      },
     // enteraSidebarsub(item){//次子侧栏

     //   this.secondindex = item.subid
     //  if (item.routename) {
     //    this.$router.push({name:item.routename})
     //  }


     //  },
     toogleDate () {
      
       this.isShow = !this.isShow

       this.isOpen = !this.isOpen
      

       

     }
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" >
@import "~style/color.scss";
.sidebar{
    display: flex;
    min-height: 100%;
  
    z-index: 50;
    position:relative;
      box-shadow:none;
       .el-tree-node__label{
        font-size: 10px;
       }
    // .el-tree-node__expand-icon{
    //   display: none;
    // }

   .el-tree-node__children .el-tree-node__content{
        color:hsl(290,0%,50%);
        background:#EAEDF1;

       .el-tree-node__label{
        font-size: 10px;
       }
   }
    .el-tree-node__content{
      height: 50px;
      line-height: 50px;
       text-align: left;
       text-indent: 3px;
        background:#EAEDF1;

     
    }
    .el-tree-node .is-current{
         background:#FFFFFF;
    }
    .el-tree-node {
     
        .el-tree-node__content{
        
           height: 50px;
          line-height: 50px;
           text-align: left;
           text-indent: 3px;
            background:#EAEDF1;
            
        }
   
         &.is-expanded{
               
                .el-tree-node__content{
        
                   background:#EAEDF1;
            
                  }
                   .el-tree-node__content:hover{
                        background:hsla(120,65%,92%,0.3);

                }
            }
         &.is-current >.el-tree-node__content {
                
                        background:#FFFFFF;
           
            }

    }
.bounce-enter-active {
  animation: bounce-in .3s linear;
}
.bounce-leave-active {
  animation: bounce-out .3s linear;
}
@keyframes bounce-in {
  0% {
    width: 0px;
  }

  100% {
   width: 70px;
  }
}
@keyframes bounce-out {
  0% {
    width: 70px;
  }
 
  100% {
    width: 0px;
  }
}
    .icon_img {
        position: absolute;
        width: 17px;
        height: 49px;
        top: 150px;
        right: 0px;
         
        background: url("~assets/images/icon_all.png") no-repeat 0 0;
        cursor: pointer;
        z-index: 9999;
      }
    .icon_show {
       background: url("~assets/images/icon_all.png") no-repeat 0 bottom;
        right: -17px;
        z-index: 9999;
      }
   button{
    background: transparent;
    border:none;
    color:$color-white;
    height: 40px;
    font-size: 12px;
    padding:0px 0px;
    text-align: left;
    margin-top: 0px!important;
    box-shadow:none;

    // text-align: left;
    &:hover{
      background:#00C1DE;
      box-shadow:none;
    }
    &.active{
      background:#00C1DE;
        color: #FFFFFF;
        box-shadow:none;
    }
    &:focus,
      &:active:focus,
      &.active:focus,
      &.active,
      &:active.focus,
      &.active.focus {
          outline: none;
          color: #FFFFFF;
          box-shadow:none;
           background:#00C1DE;
      }

  }

.btn-group-vertical{
      width: 140px;
      /*position: relative;*/
          background-color: rgb(66, 72, 91);
            box-shadow:none;
      .glyphicon{
        width: 18px;
        height: 16px;
        margin:auto 14px;
        margin-right: 13px;
      }
      span.heading{
        display: inline-block;
        width: 50px;
        height: 40px;
        line-height: 40px;

        // margin: 15px 0;

      }
      &.packup{
        /*margin-right: -95px;*/
        width: 46px;
      }
 


}

.btn-group-vertical-one,.btn-group-vertical-last{
      width: 130px;
      z-index: 10;
      position: relative;
      background:#D9DEE4;
       box-shadow:none;
      button{
        color:#000;
        text-align: center;
          box-shadow:none;
          border-radius: none;

        &:hover{
          background:#00C1DE;
           color:#000;
             box-shadow:none;
        }
        &:focus{
          color:#000;
            box-shadow:none;
        }
         &.active{
          background:#00C1DE;
           color:#000;
             box-shadow:none;
        }
      }
      .btn-title{
        height: 100px;
        cursor:default;
           &:hover{
          background:#D9DEE4;
           color:#000;
             box-shadow:none;
        }
        &:focus{
          color:#000;
            box-shadow:none;
        }
         &.active{
          background:#00C1DE;
           color:#000;
             box-shadow:none;
              border-radius: none;
        }
      }

}
.btn-group-vertical-last{
  width: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // background:#ccc;
}
.btn-group-vertical>.btn{
    border-radius: 0px!important;
}
.btn-toggle{
  height: 30px;
  width: 100%;
  text-align: center;
  background:#4D5C6D;
  box-shadow:none;
  border-radius:0px;
  span{
    margin-left: -4px;
  }
  i.fa-rotate{
      transform: rotate(90deg);
  }
}
.btn:focus,
.btn:active:focus,
.btn.active:focus,
.btn.active,
.btn:active.focus,
.btn.active.focus {
    outline: none;

}


}



</style>
