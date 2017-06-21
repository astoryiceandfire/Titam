<template>
  <div class="registration-wrapper"> 
  

<!-- 上导航栏 -->
<!-- 上导航栏 -->
 <el-table :data="tableData" border style="width: 100%">
       
        <el-table-column prop="id" label="服务器ip" width="200">
        </el-table-column>
         
         <el-table-column prop="xbulletinType" label="服务器允许ip" width="200">
        </el-table-column>
   
       
         <el-table-column label="操作">
          <template scope="scope">
          <el-button size="small"  type="primary" @click="lockServer(scope.$index,scope.row)">关闭服务器</el-button>
  <el-button size="small"  type="primary" @click="clearCache(scope.$index,scope.row)">重载基础属性</el-button>

           <el-button size="small"  type="primary" @click="setServer(scope.$index,scope.row)">设置服务器标示</el-button>

            </template>
          </el-table-column>
       
        
         
      </el-table>
<!-- table -->

    <el-dialog title="设置服务器标示" v-model="dialogServer" size="small" :modal-append-to-body = false>
      
        <el-form ref="forms" :model="forms" :rules="rules" label-width="100px">
              <el-form-item label="开启状态">
                     <el-col :span="14">
                      <el-select v-model="forms.open" placeholder="请选择类型">
                            <el-option
                            v-for="item in opens"
                            :label="item.label"
                            :key="item.label"
                            :value="item.value">
                          </el-option>
                          </el-select>
                      </el-col>
                </el-form-item>
                   <el-form-item label="ips" prop="ip">
                  <el-col :span="14">
                    <el-input type ='textarea' placeholder="多个ip用逗号隔开" v-model="forms.ip"></el-input>
                  </el-col>
                </el-form-item>
          </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('forms')">确定</el-button>
        <el-button type="primary" @click="resetForm('forms')">返回</el-button>
      </span>
    </el-dialog>
<!--   //dialog -->

  </div>
</template>

<script>



import {dateUtil} from '@/utils'


export default{
    beforeRouteEnter (to, from, next) {
        next(vm =>{
          vm.checkServerState()
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
          serverStatus:'',
          dialogServer:false,
          tableData:[1],
           opens:[
          {
            value:true,
            label:'是'
           },
            {
            value:false,
            label:'否'
           },
           ],
         
          forms:{
             open:true,
            ip:'',
          },
           rules: {
         
           ip: [
            { required: true, message: '请填写ip', trigger: 'blur' }, 
          ],
        }
          //表单
         
          //表单
        
        }
      },
      methods:{
          checkServerState(){
          let option ={}
          this.API.APIcheckServerState(option).then((res)=>{
            let data = res.data
            this.serverStatus = res.data.data.openVist
             this.$message(`${res.data.retmsg}`)


          },(res)=>{})

        },
        lockServer(){
          let option ={}
          this.API.APIshutdownServer(option).then((res)=>{
             this.$message(`${res.data.retmsg}`)
          },(res)=>{})

        },
        setServer(index,row){
          this.dialogServer = true 
        },
         setServerAccess(){
          let option ={}
          Object.assign(option,this.forms)

          this.API.APIopenServerAccess(option).then((res)=>{
             this.$message(`${res.data.retmsg}`)
             this.dialogServer = false
          },(res)=>{
             
          })
         

        },
         clearCache(){
          let option ={}
          this.API.APIclearCache(option).then((res)=>{
             this.$message(`${res.data.retmsg}`)
          },(res)=>{})

        },
       
        submitForm(formName) {//表单确定

            this.$refs[formName].validate((valid) => {
              if (valid) {

              

                  this.setServerAccess()
              
               
              } else {
                console.log('error submit!!');
                return false;
              }
            });
      },
       
         resetForm(formName) {//表单重置

        this.$refs[formName]?this.$refs[formName].resetFields():'';
            this.dialogServer = false
      
      },
        
        
      
    
     
     
      
      
      },
    


} 
</script>

<style lang="scss">
@import "~style/color.scss";
.registration-wrapper{
  width: 100%;
  height: 100%;
 
  position: relative;
   // .formpost{
   //  display: flex;
   //  justify-content: center;

   // margin-top:150px; 
   //    .el-form {
   //       width: 500px;;
   //    }
       

   // }
 
  .el-button {
    height: 25px;
    line-height: 25px;
    margin-left: 10px;
    span{
      font-size: 12px;
    }
    padding: 0px 10px;
  }
  // .cell .el-button--primary{
  //   margin-top: 10px;
  //   margin-bottom: 10px;
  // }
  nav{
  // height: 25px;
  // line-height: 25px;
  display: flex;
  flex-wrap: wrap;
  align-items:center;
  font-size: 12px;
  margin: 20px auto;
  // justify-content: center;
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
        line-height: 25px;
         
          
          margin-bottom: 0px;
            
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

