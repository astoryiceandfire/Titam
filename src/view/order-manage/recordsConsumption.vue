<template>
  <div class="recordsMange-wrapper">
    <!-- <zs-tip :tiptext='tipName'></zs-tip>
      <button type="button" class="btn btn-danger addadmin" @click='dialogVisible =true,fromtype=fromtypes[0]'>添加后台用户</button> -->
    <!-- 导航栏 -->
 
           
    <nav>     
        <div class="nav-item">
              <label for="gameuserid">用户ID:</label>
              <el-input v-model="gameuserid" size="small" placeholder=""></el-input>
             
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
            <label class="subtitle">消费方式：</label>
            <el-select v-model="pattern" placeholder="请选择"  size="small" >
              <el-option
                v-for="item in consumeds"
                :label="item.label"
                :key="item.label"

                :value="item.value">
              </el-option>
            </el-select>
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
      <el-button size="small"  type="primary" class="addbtn" @click="queryCustomdata">查询</el-button>
    </nav>
<!-- 上导航栏 -->
<div class="billDetailed">
  <span>消费总额 {{now}}</span>
   <span>消费总额 {{all}}</span>
</div>
<!-- table -->
   <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="gameUserid" label="用户ID" width="120">
        </el-table-column>
         <el-table-column prop="nickname" label="昵称" width="120">
        </el-table-column>
         <el-table-column prop="mobile" label="手机号" width="150">
        </el-table-column>
          <el-table-column prop="xpattern" label="消费方式" width="120">
        </el-table-column>
          <el-table-column prop="quantity" label="消费数量" width="120">
        </el-table-column>
        <el-table-column prop="addTime" label="创建时间">
        </el-table-column>
         
         
      </el-table>
<!-- table -->
 <!--  //分页 -->
     <div class="block">
      <!-- <span class="demonstration">完整功能</span> -->
          <el-pagination
            @current-change="handleCurrentChange"
            layout="total, prev, pager, next, jumper"
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
          vm.queryCustomdata()
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
         now:0,
         all:0,
         tableData: null,
         pagtotal:0,
         pageNo:1,
          gameuserid:'',//用户id
          pattern:'1',
          nickname:"",//昵称
          monile:'',//手机号
          // rechargeOrderno:"",//充值订单号
          // orderNumber:"",//订单号
          // channel:'',//渠道
          startTime:'',//开始时间
          endTime:'',//结束时间
          consumeds:[{
            value:'1',
            label:'购买筹码',
          }],//登陆状态
        
        }
      },
      methods:{
         queryCustomdata(){
             let option = {}
          option.pageNo = this.pageNo
          option.gameuserid =this.gameuserid
          option.pattern =this.pattern
          option.nickname =this.nickname
          option.monile =this.monile
          option.startTime =this.startTime
          option.endTime=this.endTime

           this.API.ApiqueryCustomdata(option).then((res)=>{
            if (res.data.retcode==1) {
                   this.pagtotal = res.data.data.list.total
                this.pageNo = 1
                res.data.data.list.rows.forEach((item)=>{
                this.pageNo = 1
                item.xpattern = item.pattern==1?'购买筹码':''
            
                item.addTime = item.addTime?dateUtil.format(item.addTime,'yyyy-MM-dd HH:mm:ss'):''

                 
            })
              this.tableData = res.data.data.list.rows
              this.now = res.data.data.now
              this.all = res.data.data.all

            }


          

           },(res)=>{})
         },
          handleCurrentChange(val){
          this.pageNo = val
          this.queryCustomdata()

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
.recordsMange-wrapper{
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
     margin-bottom: 40px;
    span{
      display: inline-block;
      margin-left: 20px;
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
        .querybtn{
           border:none;
          border-radius:0px;
          margin-left: 25px;
          height: 25px;
         font-size: 12px;
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

