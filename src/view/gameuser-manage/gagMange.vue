<template>
	<div class="gagMange-wrapper">
	  <!-- <zs-tip :tiptext='tipName'></zs-tip>
      <button type="button" class="btn btn-danger addadmin" @click='dialogVisible =true,fromtype=fromtypes[0]'>添加后台用户</button> -->
    <!-- 导航栏 -->
 
           
    <nav>     
        <div class="nav-item">
              <label for="userName">用户ID:</label>
              <el-input v-model="userName" size="small" placeholder=""></el-input>
             
        </div>  
      
          <div class="nav-item">
              <label for="nickName">昵称:</label>
              <el-input v-model="nickName" size="small" placeholder=""></el-input>
        </div>  
          <div class="nav-item">
              <label for="iphone">手机号:</label>
              <el-input v-model="mobile" :maxlength=11 size="small" placeholder=""></el-input>
        </div>  
        <div class="nav-item">
            <label class="subtitle">用户状态：</label>
            <el-select v-model="value" placeholder="请选择"  size="small" >
              <el-option
                v-for="item in options"
                :label="item.label"
                :key="item.label"

                :value="item.value">
              </el-option>
            </el-select>
        </div> 
       
      
        
          

     
  
     <el-button size="small"  type="primary" class="addbtn" @click="queryGameUserList">查询</el-button>
      

      
    </nav>
<!-- 上导航栏 -->
<!-- table -->
   <el-table :data="tableData"  border  style="width: 100%">
        <el-table-column  align="center" prop="gameUserid" label="用户ID" >
        </el-table-column>
         
         <el-table-column align="center" prop="nickname" label="昵称" >
        </el-table-column>
         <el-table-column align="center" prop="mobile" label="手机号" >
        </el-table-column>
         <el-table-column align="center" prop="xgagStatus" label="用户状态" >
        </el-table-column>
         <el-table-column align="center" label="操作" >
          <template scope="scope">
          <el-button size="small"  type="primary" @click="handleGag(scope.$index,scope.row)">{{scope.row.gagStatus=='1'?'禁用':'解禁'}}</el-button>
       
            </template>
          </el-table-column>
        <el-table-column align="center" prop="gagTime" label="上次禁言时间" >
        </el-table-column>
         <el-table-column align="center" prop="ausername" label="操作人" >
        </el-table-column>
         
      </el-table>
<!-- table -->
<!--   //禁言用户操作 -->
    <el-dialog title="禁言操作提示" v-model="dialogGag" size="tiny" :modal-append-to-body = false>
      <div class="content">
        <div class="header">
          <div class="input-item">
            <label class="inputname">用户ID</label>
            <el-input v-model="xuserName"  size="small" placeholder="请输入用户名,4-20个字符"></el-input>
          </div>
           <div class="input-item">
            <label class="subtitle">禁言期限：</label>
            <el-select v-model="gagTime" placeholder="请选择"  size="small" >
              <el-option
                v-for="item in gagOptions"
                :label="item.label"
                :key="item.label"

                :value="item.value">
              </el-option>
            </el-select>
          </div>
           
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
       <el-button type="primary" @click="confirmFun">确定</el-button>
    
        <el-button type="primary" @click="cancelFun">取消</el-button>
      </span>
    </el-dialog>
<!--   //禁言用户操作 -->
<!--   //解封操作 -->
    <el-dialog title="解封操作提示" v-model="dialogUnGag" size="tiny" :modal-append-to-body = false>
      <div class="content">
        <div class="header">
        {{ `确定要对${xuserName}用户进行解封操作,解封后该用户可重新发言聊天`}}
           
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
       <el-button type="primary" @click="confirmUngag">确定</el-button>
    
        <el-button type="primary" @click="cancelFun">取消</el-button>
      </span>
    </el-dialog>
<!--   //解封操作 -->
    <!--  //分页 -->
     <div class="block">
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
      name:"gagMange",
  		data(){

  			return {
  				tipName:"管理员",
           options: [{
                  value: '选项1',
                  label: '禁用'
                  }, 
                 {
                   value: '选项2',
                   label: '正常'
                  }],
          gagOptions: [{
                  value: '1',
                  label: '一天'
                  }, 
                 {
                   value: '2',
                   label: '七天'
                  },
                   {
                   value: '3',
                   label: '永久'
                  }
                  ],
          value:"",
          userName:"",//禁言用户ID
          gagTime:"1",//禁言时长
          gagid:0,//禁言id
          dialogGag:false,//禁言操作dialo
          dialogUnGag:false,//解封操作提示
          pagtotal:0,//总页数
          pageON:0,//查询页
          userName:'',//用户id
          xuserName:'',//用户id 禁言
          index:0,
          nickName:"",//昵称
          mobile:'',//手机号
          tableData: null,
  		  }
      },
      methods:{
         queryGameUserList(){
          let option = {}
          option.pageNo = this.pageNo
          option.id = this.userName
          option.nickname = this.nickName
          option.mobile = this.mobile
           this.API.ApiqueryGameUserGagList(option).then((res)=>{
            this.pagtotal = res.data.total
            
            res.data.rows.forEach((item)=>{
              item.xgagStatus = item.gagStatus==1?"正常":"禁言"
              item.gagTime =item.gagTime?dateUtil.format(item.gagTime,'yyyy-MM-dd'):''
              
            })
              this.tableData = res.data.rows
           },(res)=>{})
         },
         
         handleCurrentChange(val){
              this.pageON = val
              this.queryGameUserList()
               this.pageNo = 1
         },
        
         handleGag(index,row){//禁言
             this.xuserName = row.gameUserid
             this.gagid = row.gagid
             this.index = index
          if (row.gagStatus=="1") {//准备禁言
               
                this.dialogGag = true 
          }else{//准备解禁
                  this.dialogUnGag = true

          }
          
         
                    
         },
         confirmFun(){//禁言确定
            let option = {}
            option.gameUserid = this.xuserName
            option.gagDeadline = this.gagTime
            this.API.ApigameUserGag(option).then((res)=>{
              if (res.data.retcode==1) {
               
                 this.tableData[this.index].xgagStatus = "禁言"
                  this.tableData[this.index].gagStatus =2
              }
               this.$message(`${res.data.retmsg}`)
               this.dialogGag = false 
            })

         },
         cancelFun(){
          this.xuserName = 0
          this.gagid = 0
          this.dialogGag = false 
          this.dialogUnGag = false
         },
         confirmUngag(){//禁言解封
               let option = {}
            option.gameUserid = this.xuserName
            option.id =  this.gagid
            this.API.ApiupdateGameUserGag(option).then((res)=>{
               if (res.data.retcode==1) {
               
                 this.tableData[this.index].xgagStatus = "正常"
                  this.tableData[this.index].gagStatus =1
              }
               // this.$message(`${res.data.retmsg}`)
               // this.dialogGag = false 
              this.$message(`${res.data.retmsg}`)
               this.dialogUnGag = false
            })
         },
        
        
         
      },
     

}	
</script>

<style lang="scss">
@import "~style/color.scss";
.gagMange-wrapper{
  width: 100%;
  height: 100%;
  text-align: left;
  position: relative;
   .block{//分页
    margin-top: 80px;
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

      .el-dialog__footer{
      text-align: center;
    }
      .input-item{
       height: 30px;
       display: flex;
       justify-content: center;
       margin:20px auto;
     
        .inputname{
          height: 30px;
          width: 60px;
          line-height: 30px;
          font-size: 12px;
         
        }
        .el-input{
          // float: left;
          width: 180px;
         
        }

    }

}
</style>

