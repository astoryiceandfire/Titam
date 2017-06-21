<template>
  <div class="rechargeMange-wrapper">
    <!-- <zs-tip :tiptext='tipName'></zs-tip>
      <button type="button" class="btn btn-danger addadmin" @click='dialogVisible =true,fromtype=fromtypes[0]'>添加后台用户</button> -->
    <!-- 导航栏 -->
 
           
    <nav>     
        <div class="nav-item">
              <label for="gameuserid">用户ID:</label>
              <el-input v-model="gameuserid" size="small" placeholder=""></el-input>
             
        </div>  
        <div class="nav-item">
            <label class="subtitle">渠道：</label>
            <el-select v-model="channel" placeholder="请选择"  size="small" >
              <el-option
                v-for="item in channels"
                :label="item.label"
                :key="item.label"

                :value="item.value">
              </el-option>
            </el-select>
        </div> 
          <div class="nav-item">
              <label for="nickname">昵称:</label>
              <el-input v-model="nickname" size="small" placeholder=""></el-input>
        </div>  
          <div class="nav-item">
              <label for="monile">手机号:</label>
              <el-input v-model="monile" :maxlength=11 size="small" placeholder=""></el-input>
        </div>  
        <div class="nav-item">
            <label class="subtitle">订单状态：</label>
            <el-select v-model="orderStatus" placeholder="请选择"  size="small" >
              <el-option
                v-for="item in orderStates"
                :label="item.label"
                :key="item.label"

                :value="item.value">
              </el-option>
            </el-select>
        </div> 
        <div class="nav-item">
            <label class="subtitle">充值类型：</label>
            <el-select v-model="rechargeType" placeholder="请选择"  size="small" >
              <el-option
                v-for="item in recharges"
                :label="item.label"
                :key="item.label"

                :value="item.value">
              </el-option>
            </el-select>
        </div> 
        <div class="nav-item">
              <label for="rechargeOrderno">充值订单号:</label>
              <el-input v-model="rechargeOrderno"  size="small" placeholder=""></el-input>
        </div>  
          <div class="nav-item">
              <label for="orderNumber">订单号:</label>
              <el-input v-model="orderNumber"  size="small" placeholder=""></el-input>
        </div>  
          <div class="nav-item">
            <div class="blocktime">
              <span class="demonstration">创建时间</span>
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
      
        
          

     
     
      <el-button size="small"  type="primary" class="addbtn" @click="queryRechargeOrder">查询</el-button>
      

      
    </nav>
<!-- 上导航栏 -->
<div class="billDetailed">
<div class="left">
   <span>当前钻石数目{{nowDiamondNumber}}</span>
  <span>当前充值总额 {{nowRechargeAmount}}</span>
</div>
<div class="right">
   <span>钻石数目{{allDiamondNumber}}</span>
  <span>充值总额 {{allRechargeAmount}}</span>
</div>
 
 

</div>
<!-- table -->
   <el-table :data="tableData" border style="width: 100%">
      
        <el-table-column align="center" prop="gameUserid" label="用户ID" >
        </el-table-column>
         <el-table-column align="center" prop="xchannel" label="渠道" >
        </el-table-column>
         <el-table-column align="center" prop="nickname" label="昵称" >
        </el-table-column>
         <el-table-column align="center" prop="mobile" label="手机号" min-width="120">
        </el-table-column>
          <el-table-column align="center" prop="xrechargeType" label="充值类型" >
        </el-table-column>
          <el-table-column align="center" prop="rechargeOrderno" label="充值订单号" min-width="160">
        </el-table-column>
         <el-table-column align="center" prop="orderNumber" label="订单号" min-width="160">
        </el-table-column>
          <el-table-column align="center" prop="rechargeAmount" label="充值金额" >
        </el-table-column>
          <el-table-column align="center" prop="diamondNumber" label="钻石数量" >
        </el-table-column>
         <el-table-column align="center" prop="xorderStatus" label="订单状态" min-width="120">
        </el-table-column>      
        <el-table-column align="center" prop="addTime" label="创建时间" min-width="160">
        </el-table-column>
         
         
      </el-table>
<!-- table -->
 <!--  //分页 -->
     <div class="block">
      <!-- <span class="demonstration">完整功能</span> -->
          <el-pagination
            @current-change="handleCurrentChange"
            layout="total,prev, pager, next, jumper"
            :total="pagtotal">
          </el-pagination>
      </div>
     <!-- 分页 -->
  </div>
</template>

<script>

import zsTip from 'components/tip-header'
import {ApiqueryAdmin} from '@/api.js'
import {dateUtil} from '@/utils'


export default{
    beforeRouteEnter (to, from, next) {
        next(vm =>{
          vm.queryRechargeOrder()
        })
      },
    beforeRouteUpdate (to, from, next) {
        next()
      },
    beforeRouteLeave (to, from, next) {
      next()
      },
    
      data(){

        return {
          tipName:"管理员",
          nowDiamondNumber:0,
          nowRechargeAmount:0,
          allDiamondNumber:0,
          allRechargeAmount:0,
          pagtotal:1,
           channels: [{
                  value: '1',
                  label: '手机号'
                  }, 
                 {
                   value: '2',
                   label: 'QQ'
                  },
                   {
                   value: '3',
                   label: '微信'
                  },
                   {
                   value: '4',
                   label: '邮箱'
                  }],
         tableData:null,
            value:"",
       
          gameuserid:'',//用户名
          nickname:"",//昵称
          monile:'',//手机号
          rechargeOrderno:"",//充值订单号
          orderNumber:"",//订单号
          channel:'',//渠道
          startTime:'',//开始时间
          endTime:'',//结束时间
          orderStatus:'',//订单状态
          rechargeType:'',//充值类型
          orderStates:[{
            value:'1',
            label:'支付成功'
          },
          {
            value:'2',
            label:'未支付'
          },
          {
            value:'3',
            label:'支付失败'
          }],//用户类型
          recharges:[{
            value:'1',
            label:'支付宝',
          },{
            value:'2',
            label:'微信',
          },
          {
            value:'3',
            label:'银行卡',
          }],//登陆状态

         
        }
      },
      methods:{
         queryRechargeOrder(){
          let option = {}
          option.pageNo = this.pageNo
          option.gameuserid =this.gameuserid
          option.channel =this.channel
          option.nickname =this.nickname
          option.monile =this.monile
          option.orderStatus =this.orderStatus
          option.rechargeType =this.rechargeType
          option.rechargeOrderno =this.rechargeOrderno
          option.orderNumber =this.orderNumber
          option.startTime =this.startTime
          option.endTime=this.endTime

           this.API.ApiqueryRechargeOrder(option).then((res)=>{
             this.pagtotal = res.data.data.list.total
             this.pageNo = 1

            if (res.data.retcode==1) {
                 res.data.data.list.rows.forEach((item)=>{
                this.pageNo = 1
                item.xrechargeType = item.rechargeType==1?'支付宝':item.rechargeType==2?'微信':item.rechargeType==3?'银行卡':''
                item.xchannel = item.channel==1?'手机号':item.channel==2?'QQ':item.channel==3?'微信':item.channel==4?'邮箱':''
                item.xorderStatus = item.orderStatus==1?'支付成功':item.orderStatus==2?"未支付":item.orderStatus==3?"支付失败":''
                item.addTime = item.addTime?dateUtil.format(item.addTime,'yyyy-MM-dd HH:mm:ss'):''

                 
             })
                 this.nowDiamondNumber = res.data.data.now[0].nowDiamondNumber
                 this.nowRechargeAmount = res.data.data.now[0].nowRechargeAmount
                 this.allRechargeAmount = res.data.data.all[0].allRechargeAmount
                 this.allDiamondNumber = res.data.data.all[0].allDiamondNumber
              this.tableData = res.data.data.list.rows
            }
           

           },(res)=>{})
         
         },
       
         handleCurrentChange(val){
          this.pageNo = val
          this.queryRechargeOrder()

         },
         changStartTime(val){
            this.startTime = val

         },
         changEndTime(val){
            this.endTime = val

         },
        
         
      },
     


} 
</script>

<style lang="scss">
@import "~style/color.scss";
.rechargeMange-wrapper{
  width: 100%;
  height: 100%;
  text-align: left;
  position: relative;
    .block{//分页
    margin-top: 80px;
    text-align:center;
  }
  .billDetailed{
    width: 100%;
    background: #ccc;
    height: 40px;
    line-height:40px;
    border-radius:5px;
    display: flex;
    justify-content: space-between;

    span{
      display: inline-block;
      margin-left: 20px;
       margin-right: 20px;
      font-size: 14px;
    }
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

