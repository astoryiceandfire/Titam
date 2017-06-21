<template>
	<div class="regisinfoquery-wrapper">
	  <!-- <zs-tip :tiptext='tipName'></zs-tip>
      <button type="button" class="btn btn-danger addadmin" @click='dialogVisible =true,fromtype=fromtypes[0]'>添加后台用户</button> -->
    <!-- 导航栏 -->
 
           
    <nav>     
        <div class="nav-item">
              <label for="userName">用户ID:</label>
              <el-input v-model="userID" size="small" placeholder=""></el-input>
             
        </div>  
        <div class="nav-item">
            <label class="subtitle">渠道：</label>
            <el-select v-model="channelvalue" placeholder="请选择"  size="small" >
              <el-option
                v-for="item in options"
                :label="item.label"
                :key="item.label"

                :value="item.value">
              </el-option>
            </el-select>
        </div> 
          <div class="nav-item">
              <label for="nickName">昵称:</label>
              <el-input v-model="nickName" size="small" placeholder=""></el-input>
        </div>  
          <div class="nav-item">
              <label for="iphone">手机号:</label>
              <el-input v-model="iphone" :maxlength=11 size="small" placeholder=""></el-input>
        </div>  
        <div class="nav-item">
            <label class="subtitle">用户类型：</label>
            <el-select v-model="customerType" placeholder="请选择"  size="small" >
              <el-option
                v-for="item in customerTypes"
                :label="item.label"
                :key="item.label"

                :value="item.value">
              </el-option>
            </el-select>
        </div> 
        <div class="nav-item">
            <label class="subtitle">登陆状态：</label>
            <el-select v-model="loginstatu" placeholder="请选择"  size="small" >
              <el-option
                v-for="item in loginStaus"
                :label="item.label"
                :key="item.label"

                :value="item.value">
              </el-option>
            </el-select>
        </div> 
        <div class="nav-item">
            <label class="subtitle">禁言状态：</label>
            <el-select v-model="gagState" placeholder="请选择"  size="small" >
              <el-option
                v-for="item in gagStates"
                :label="item.label"
                :key="item.label"

                :value="item.value">
              </el-option>
            </el-select>
        </div> 
          <div class="nav-item">
            <div class="blocktime">
              <span class="demonstration">注册时间</span>
              <el-date-picker
                  v-model="startTime"
                  type="datetime"
                  placeholder="选择日期时间"
                  align="right"
                   @change="changStartTime"
                  >
                </el-date-picker>
              </div>
               <div class="blocktime">
               <span class="demonstration">至</span>
                <el-date-picker
                  v-model="endTime"
                  type="datetime"
                  placeholder="选择日期时间"
                  align="right"
                  @change="changEndTime"
                  >
                </el-date-picker>
              </div>
          </div> 
        
          

      <el-button size="small"  type="primary" class="addbtn" @click="queryGameUserList">查询</el-button>
 
      

      
    </nav>
<!-- 上导航栏 -->
<!-- table -->
   <el-table :data="tableData" border align="center"  style="width: 100%">
      <!--   <el-table-column type=index label="序号" width="40">
        </el-table-column> -->
        <el-table-column align="center" prop="id" label="用户ID" >
        </el-table-column>
         <el-table-column align="center" prop="channel" label="渠道" >
        </el-table-column>
         <el-table-column align="center" prop="nickname" label="昵称" >
        </el-table-column>
         <el-table-column align="center" prop="userType" label="用户类型" >
        </el-table-column>
        <el-table-column align="center" prop="sealStatus" label="登陆状态" >
        </el-table-column>
         <el-table-column align="center" prop="sealStatus" label="禁言状态" >
        </el-table-column>
          <el-table-column align="center" prop="registerTime" label="注册时间" min-width="180">
        </el-table-column>
          <el-table-column align="center" prop="loginTime" label="上次登陆时间">
        </el-table-column>
        
          <el-table-column align="center" prop="loginIp" label="上次登陆IP" >
        </el-table-column>
        <!--   <el-table-column prop="name" label="登陆记录" width="150">
        </el-table-column> -->
        <!-- <el-table-column label="操作" width="120">
      <template scope="scope">
        <el-button size="small"  type="danger" @click="handleQuery(scope.$index, scope.row)">查询</el-button>
       
      </template>
    </el-table-column> -->
   
      </el-table>
<!-- table -->
    <!--  //分页 -->
     <div class="block">
      <!-- <span class="demonstration">完整功能</span> -->
          <el-pagination
            @current-change="handleCurrentChange"
            layout="total, prev, pager, next, jumper"
            :total="pagData.total">
          </el-pagination>
      </div>
     <!-- 分页 -->

	</div>
</template>

<script>

// import zsTip from 'components/tip-header'
import {ApiqueryAdmin} from '@/api.js'
import {dateUtil} from '@/utils'


export default{
 	  beforeRouteEnter (to, from, next) {
  			next(vm =>{
          vm.queryGameUserList()
  			})
  		},
   	beforeRouteUpdate (to, from, next) {
        next()
  		},
  	beforeRouteLeave (to, from, next) {
      next()
  		},
      name:"regisinfoquery",
  		data(){

  			return {
  				tipName:"管理员",
          pagData:{
            total:0
          },
          value:'',
           options: [{
                  value: '1',
                  label: '手机号'
                  }, 
                 {
                   value: '2',
                   label: 'QQ'
                  },{
                    value: '3',
                   label: '微信'
                  },{
                    value: '4',
                   label: '邮箱'
                  }],
          customerTypes:[{
            value:'1',
            label:'普通'
          },
          {
             value:'2',
            label:'主播'
          }],//用户类型
          loginStaus:[{
            value:'1',
            label:'正常',
          },{
            value:'2',
            label:'封号',
          }],//登陆状态
          gagStates:[
          {
             value:'1',
            label:'正常'
          },{
            value:'2',
            label:'禁言',
          }],//禁言状态

          startTime: '',//注册时间
          endTime: '',//结束时间
          userID:'',//用户ID
          nickName:"",//昵称
          iphone:'',//手机号
          channelvalue:"",//渠道
          customerType:"",//用户类型
          loginstatu:null,//登陆状态选中
          gagState:"",//禁言状态
          pageNo:1,//查询页码
           tableData:null,//列表table
                        
                       

  		  }
      },
      methods:{
          changStartTime(val){
            this.startTime = val

         },
         changEndTime(val){
            this.endTime = val

         },
        
         queryGameUserList(){//查询用户列表
          let option = {};
              option.pageNo = this.pageNo
              option.id = this.userID
              option.nickname = this.nickName
              option.mobile = this.iphone
              option.userType = this.customerType
              option.sealStatus = this.loginstatu
              option.gagStatus = this.gagState
              option.channel = this.channelvalue
              option.startTime = this.startTime
              option.endTime = this.endTime






              this.API.ApiqueryGameUserList(option).then((res)=>{
                this.pagData = res.data

               res.data.rows.forEach((item)=>{
                   
                     item.userType = item.userType==1?"普通":"主播"
                     item.sealStatus = item.sealStatus==1?"正常":"封号"
                     item.gagStatus = item.gagStatus==1?"正常":"禁言"
                     switch(item.channel){
                      case 1:
                      item.channel = "手机号"
                      break;
                       case 2:
                        item.channel = "QQ"
                      break;
                       case 3:
                        item.channel = "微信"
                      break;
                       case 4:
                        item.channel = "邮箱"
                      break;
                      default:

                     }
                   item.registerTime = item.registerTime?dateUtil.format(item.registerTime,'yyyy-MM-dd HH:mm:ss'):''


                 })
                 this.tableData =  res.data.rows
              },(res)=>{})
         },
        
         handleCurrentChange(val){

            this.pageNo = val
            this.queryGameUserList()
            this.pageNo = 1
         }
        
         
      },
      


}	
</script>

<style lang="scss">
@import "~style/color.scss";
.regisinfoquery-wrapper{
  width: 100%;
  height: 100%;
  text-align: left;
  position: relative;
    .block{//分页
      position:absolute;
      width: 100%;
      bottom:50px;
   
    text-align:center;
  }
  nav{
  // height: 25px;
  line-height: 25px;
  display: flex;
  flex-wrap: wrap;
  align-items:center;
  font-size: 12px;
  margin: 20px auto;
   .addbtn{
       border:none;
      border-radius:0px;
      margin-left: 25px;
      height: 25px;
     font-size: 12px;
    }
  .nav-item{
    display: flex;
     align-items:center;
     min-width: 150px;
     margin-left: 10px;
      font-size: 12px;
      margin-top: 10px;
        .blocktime{
            .demonstration{
              display: inline-block;
              margin:auto 10px;
              font-size: 12px;
              font-weight: bold;
            }
       }
        label{
          margin-bottom: 0px;
          min-width: 40px;
        }
        .subtitle{
          height: 25px;
        
         
          
          margin-bottom: 0px;
            
        }
        .form-control{
          width: 100px;
          // margin-left: 10px;
          height: 25px;
        }
    
        .el-input--small{
          height: 25px;
          width: 120px;
        }
        .el-input__inner{
          height: 25px;
        } 

  }
  
  }

}
</style>

