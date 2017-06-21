<template>
	<div class="balanceQuery-wrapper">
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
              <el-input v-model="nickName"  id = "nickName" size="small" placeholder=""></el-input>
        </div>  
          <div class="nav-item">
              <label for="mobile">手机号:</label>
              <el-input v-model="mobile" id = "mobile" :maxlength=11 size="small" placeholder=""></el-input>
        </div>  
       

        
          

     
    
      <el-button size="small"  type="primary" class="addbtn" @click="queryGameUserList">查询</el-button>
     
      

      
    </nav>

<!-- 上导航栏 -->
<!-- table -->
   <el-table :data="tableData" border align="center" style="width: 100%">
        <!-- <el-table-column type=index label="序号" width="40">
        </el-table-column> -->
        <el-table-column align="center" prop="gameUserid" label="用户ID" >
        </el-table-column>
         
         <el-table-column align="center" prop="nickname" label="昵称" >
        </el-table-column>
         <el-table-column align="center" prop="mobile" label="手机号" >
        </el-table-column>
         <el-table-column align="center" prop="userType" label="用户类型" >
        </el-table-column>
        <el-table-column align="center" prop="diamond" label="钻石" >
        </el-table-column>
         <el-table-column align="center" prop="chip" label="筹码" >
        </el-table-column>
          <el-table-column align="center" prop="integral" label="德州排位积分" >
        </el-table-column>
      </el-table>
<!-- table -->
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
      name:"balanceQuery",
  		data(){

  			return {
  				tipName:"管理员",
          pagtotal:0,//页数
          pageNo:1,
          userName:'',//用户名
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
           this.API.ApiqueryGameUserWallet(option).then((res)=>{
            this.pagtotal = res.data.total
            
            res.data.rows.forEach((item)=>{
              item.userType = item.userType==1?"普通":"主播"
            })
              this.tableData = res.data.rows
           },(res)=>{})
         },
         
         handleCurrentChange(val){
              this.pageON = val
              this.queryGameUserList()
               this.pageNo = 1
         }
        
        
         
      },
     


}	
</script>

<style lang="scss">
@import "~style/color.scss";
.balanceQuery-wrapper{
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

