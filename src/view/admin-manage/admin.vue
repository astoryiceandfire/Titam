<template>
  <div class="admin-wrapper">
    <zs-tip :tiptext='tipName'></zs-tip>
     
       <el-button size="small"  type="primary" class="addadmin" @click='dialogVisible=true,isDisabled=false,isAddUser=true,name="",fromtype=fromtypes[0]'>添加后台管理员</el-button>
    <!-- 导航栏 -->
 
           
    <nav>       
          <label for="username">用户名</label>
          <input type="text" class="form-control" id="username" placeholder=""  v-model="selname">
           <label class="subtitle">用户状态：</label>
     
          <el-select v-model="selectValue" placeholder="请选择"  size="small" >
          <el-option
            v-for="item in statusOptions"
            :label="item.label"
            :key="item.label"

            :value="item.value">
          </el-option>
        </el-select>
     <div class="blocktime">
        <span class="demonstration">创建时间</span>
        <el-date-picker
          v-model="startTime"
          type="datetime"
           @change="changStartTime"
          placeholder="选择日期时间"
          align="right"
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
 
      <el-button size="small"  type="primary" class="addbtn" @click="queryUser">查询</el-button>
     <!--  <button type="button" class="btn btn-danger addborder" disabled="disabled">修改权限</button> -->
     
      

      
    </nav>
<!-- 上导航栏 -->
   <!--  <router-link :to="{ name: 'groupset' }">/groupset</router-link> -->
  
     <el-table :data="tableData" border style="width: 100%">
        <el-table-column type=index label="序号" width="40">
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="120">
        </el-table-column>
         <el-table-column prop="user_status" label="用户状态" width="120">
        </el-table-column>
         <el-table-column prop="loginIp" label="最近登录IP" width="120">
        </el-table-column>
         <el-table-column prop="loginTime" label="最近登录时间" width="220">
        </el-table-column>
        <el-table-column prop="creatorName" label="创建者" width="150">
        </el-table-column>
         <el-table-column prop="addTime" label="创建时间" width="220">
        </el-table-column>
        <el-table-column label="操作" width="210">
      <template scope="scope">
        <el-button size="small" :disabled="scope.row.username=='admin'" type="primary" @click="handleDisable(scope.$index, scope.row)">{{scope.row.userStatus==1?'禁用':'解禁'}}</el-button>
        <el-button size="small" type="primary" @click="handleReseting(scope.$index, scope.row)">重置密码</el-button>
      </template>
    </el-table-column>
    </el-table-column>
         <el-table-column prop="name" label="权限管理" >
          <template scope="scope">
        <el-button size="small"  :disabled="scope.row.username=='admin'" type="primary" @click="handleEdit(scope.$index, scope.row)">分配角色</el-button>
        
      </template>
       </el-table-column>
      </el-table>
     <!--  //分页 -->
     <div class="block">
      <!-- <span class="demonstration">完整功能</span> -->
          <el-pagination    
            @current-change="handleCurrentChange"  
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="pagData.total">
          </el-pagination>
      </div>
     <!-- 分页 -->
<!--   //添加用户 -->
    <el-dialog :title="isAddUser?'添加后台用户':'重置密码'" v-model="dialogVisible" size="tiny" :modal-append-to-body = false>
      <div class="content">
        <div class="header">
          <div class="input-item">
            <label class="inputname">{{fromtype.name}}</label>
            <el-input v-model="name"  size="small" :disabled="isDisabled" placeholder="请输入用户名,4-20个字符"></el-input>
          </div>
           <div class="input-item">
            <label class="inputname">{{fromtype.name1}}</label>
            <el-input v-model="password"  size="small" placeholder="请输入密码,6-16个字符"></el-input>
          </div>
           <div class="input-item">
            <label class="inputname">{{fromtype.name2}}</label>
            <el-input v-model="passwordagain" size="small" placeholder="请确认密码,6-16个字符"></el-input>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
       <el-button type="primary" @click="confirmFun">{{fromtype.confirm}}</el-button>
    
        <el-button  @click="cancelFun">{{fromtype.cancel}}</el-button>
      </span>
    </el-dialog>
<!--   //添加用户 -->
<!-- //权限设置 -->
    <el-dialog title="权限设置" v-model="AuthorizationVisible" size="tiny" :modal-append-to-body = false>
      <div class="contents">
       <el-table :data="tablepower" ref="table"  border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="rolename" label="角色名" >
            </el-table-column>
            <el-table-column  prop="roledesc" label="角色描述" >
            </el-table-column>

           
      </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
       <el-button type="primary" @click="authorizationConfirm">确定</el-button>
    
        <el-button  @click="AuthorizationVisible=false">取消</el-button>
      </span>
    </el-dialog>
<!-- //权限设置 -->
  </div>
</template>

<script>

import zsTip from 'components/tip-header'
import {setStore,getStore,trim,format} from '@/utils'



export default{
    beforeRouteEnter (to, from, next) {
        next(vm =>{
              //vm.successMain()
              vm.getAllAdmin()
             
           next()
        })
      },
    beforeRouteUpdate (to, from, next) {

        next()
      },
    beforeRouteLeave (to, from, next) {
      next()
      },
      name:"admin",
      data(){

        return {
          pagData:{
            total:0
          },//分页数据
          tipName:"管理员",
          userState:"正常",
          selname:'',//查询用户名
          selectValue:'',
          isAddUser:true,//true添加后台用户 false //重置密码
          dialogVisible:false,
          selectlrow:null,
          checkList: ['复选框 B','复选框 A'],//权限设置
          AuthorizationVisible:false,//权限设置dialog
          fromtype:{title:'添加后台用户',name:'用户名',name1:'密码',name2:'确认密码',confirm:"添加",cancel:'取消'},
          fromtypes:[{title:'添加后台用户',name:'用户名',name1:'密码',name2:'确认密码',confirm:"添加",cancel:'取消'},
                    {title:'重置密码',name:'用户名',name1:'新密码',name2:'确认密码',confirm:"确定",cancel:'取消'}],
          statusOptions: [{
          value: '2',
          label: '禁用'
           }, {
           value: '1',
           label: '正常'
            }],
           value:"",
           tableData:null,
          

           tablepower: null,
        multipleSelection:[],
      
            isDisabled:false,//input是否禁止输入
            startTime: '',
            endTime: '',
            name:'',//表单用户名
            password:"123456",//表单密码
            passwordagain:"123456",//表单重置密码
            pageNo:1,
            restrow:{//重置密码row
              userid:'',
              newpassword:'',
            },
                        
        }
      },
      methods:{
          changStartTime(val){
            this.startTime = val

         },
         changEndTime(val){
            this.endTime = val

         },
          successMain(){
              //this.API.ApiSuccessMain()
        },
          queryUser(){//查询后台用户
            
              // this.timeleft= new Date(this.timeleft).getTime()
              // this.timeright= new Date(this.timeright).getTime()
              this.getAllAdmin()

          },

          getAllAdmin(){//获取管理员所有用户
            let vm = this;
            let option = {
               username:vm.selname,
                pageNo:vm.pageNo,
                userStatus:vm.selectValue,
                startTime:vm.startTime,
                endTime:vm.endTime,
              }
              // 用户状态( 1:正常 2:禁用)
            
          this.API.ApiQueryUserList(option).then((res)=>{
            if (res.data.rows.length>0) {
              vm.tableData = res.data.rows
              vm.pagData =  res.data
              vm.tableData.forEach((item)=>{
                  item.user_status = item.userStatus==1?"正常":"禁用"
              })
            }
               

          },(res)=>{

          })

         

          },
       
          handleCurrentChange(val) {

            this.pageNo = val
            this.getAllAdmin()
            this.pageNo = 1
           
          },
          confirmFun(index,row){//表单确认
            let vm = this
                vm.name = trim(vm.name)
                vm.password = trim(vm.password)
                vm.passwordagain = trim(vm.passwordagain)
               

             let option = {
                  username:vm.name,
                  password:vm.password,
                }

                if (!option.username||!option.password||!vm.passwordagain) {
                    vm.$message('请检查输入是否为空');
                    return 
                }

                if (option.password!=vm.passwordagain) {
                  vm.$message(`密码不一致`);
                  return 
                }

               
              if (option.username.length>=4&&option.username.length<=20&&6<=option.password.length&&option.password.length<=16) {

                }else{
                        vm.$message(`请检查字符串长度`);
                  return 
                }

              switch(vm.fromtype.title){
                case '添加后台用户':
                console.log("添加后台用户")

                vm.API.ApiaddUser(option).then((res)=>{
                  if (res.data.retcode==1) {
                    vm.$message(`添加成功`);
                  }else{
                    vm.$message(`添加失败`);
                  }
                     
                  
                },(res)=>{
                     vm.$message(`${res.data.retmsg}`);
                })
                break;
                 case '重置密码':
                  console.log("重置密码")
                  option.userid = vm.restrow.userid
                  option.newpassword = option.password
                  vm.API.ApiresetUserPassword(option).then((res)=>{
                       if (res.data.retcode==1) {
                            vm.$message(`添加成功`);

                          }else{
                            vm.$message(`添加失败`);
                          }
                  },(res)=>{})
                break;
                default:

                
              }
              vm.dialogVisible = false;
          },
          cancelFun(){//表单取消
             let vm = this
              vm.dialogVisible = false;
          },
        
          handleReseting(index,row){//重置密码
            // let vm =  this,option = {};
            let vm =this
            console.log(index,row)
            vm.isAddUser = false
            vm.fromtype=vm.fromtypes[1];
            vm.dialogVisible = true;
            vm.name = row.username;
            vm.isDisabled = true//input禁用
            vm.restrow.userid = row.id
            // option.userid = row.id
            // option.newpassword = vm.password
            // if (vm.password!=''&&vm.passwordagain!==vm.password) {

            // }

            // vm.API.ApiresetUserPassword().then((res)=>{

            // },(res)=>{})
            // this.confirmFun(index,row)





          },
          handleDisable(index,item) {//禁用/解禁
           let vm = this
              this.$confirm(`确定要对${item.username}用户进行${item.userStatus==1?'禁用操作,禁用后该用户无法登陆!':'解禁操作,解禁后该用户可重新登陆!'}操作?`, '禁用操作提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                  let option = {
                    userid :item.id,
                    status:item.userStatus
                  }
                vm.API.ApiuserStatus(option).then((res)=>{
                    if (res.data.retcode==1) {
                     
                           this.$message({
                              type: 'success',
                              message: `${item.userStatus==2?'解禁成功':'封禁成功'}`
                            });
                            item.userStatus = item.userStatus==2?1:2;
                         }else{
                             this.$message({
                              type: 'success',
                              message: `${res.data.retmsg}`
                            });

                         }
                },(res)=>{})







               
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '取消操作'
                });          
              });
          },
          checked(roles){
                      //首先el-table添加ref="table"引用标识
                      this.tablepowerr = this.tablepower.filter((item)=>{
                         let isTrue = roles.some((items)=>{
                              return items.id == item.id
                         })
                         return isTrue
                      }) 
                    

                      this.tablepowerr.forEach((value)=>{
                          this.$refs.table.toggleRowSelection(value);
                      })
                    
                    
                  },
          handleEdit(index,row){//权限设置
            let vm = this ,option = {};
            // console.log(index,row)
            this.AuthorizationVisible = true
            option.userid = row.id
            this.selectlrow = row
            vm.API.ApiuserRoleById(option).then((res)=>{
               if (res.data.retcode==1) {
                 vm.tablepower = res.data.data.roles

                vm.$nextTick(function(){
                        vm.checked(res.data.data.userRoles);//每次更新了数据，触发这个函数即可。
                     })
                
               }else{

               }
            },(res)=>{})
          },
           handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(this.multipleSelection)
           
          },
          authorizationConfirm(){//权限管理确定
             let option = {}
             option.userid = this.selectlrow.id
             option.roleIds = []
             console.log(this.multipleSelection)
             this.multipleSelection.forEach((value)=>{
              option.roleIds.push(value.id)
             })
              this.API.ApiuserSetUserRole(option).then((res)=>{
                    this.AuthorizationVisible = false
                    this.$message(`${res.data.retmsg}`);
                
              },(res)=>{})
          }
      },
      components: {
          zsTip
  },


} 
</script>

<style lang="scss">
@import "~style/color.scss";
.admin-wrapper{
  width: 100%;
  height: 100%;
  text-align: left;
  position: relative;
  nav{
  height: 25px;
  line-height: 25px;
  display: flex;
  align-items:center;
  font-size: 12px;
  margin: 20px auto;
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
    }
    .subtitle{
      height: 25px;
      width: 70px;
      font-size: 12px;
      margin-left: 25px;
      margin-bottom: 0px;
        
    }
    .form-control{
      width: 120px;
      margin-left: 10px;
      height: 25px;
    }
    .addbtn{
       border:none;
      border-radius:0px;
      margin-left: 25px;
      height: 25px;
     font-size: 12px;
    }
    .addborder{
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
  .addadmin{
    margin: 10px auto; 
    margin-bottom: 0px;
    border:none;
    border-radius:0px;
  }
  .block{
    margin-top: 80px;
    text-align:center;
  }
.el-dialog__footer{
  text-align: center;
}
  .content{
      width:100%;;
     
   .header{
   
    width:100%;
    .input-item{
       height: 30px;
       display: flex;
       justify-content: center;
       margin:20px auto;
        // display: inline-block;
        .inputname{
          // float: left;
          height: 30px;
          width: 60px;
          line-height: 30px;
          font-size: 12px;
         
        }
        .el-input{
          // float: left;
          width: 200px;
         
        }

    }
   }
  

  }

}
</style>

