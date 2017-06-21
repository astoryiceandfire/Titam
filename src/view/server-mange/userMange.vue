<template>
  <div class="registration-wrapper"> 
  
 <el-form ref="form"  :model="form"  :rules="rules" label-width="100px">
            <el-form-item label="管理操作" prop=" blockType">
              <el-select v-model="form.blockType" placeholder="请选择类型">
                <el-option
                v-for="item in  blockTypes"
                :label="item.label"
                :key="item.label"
                :value="item.value">
              </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用户名单" prop="playerIdArr">
              <el-col :span="10">
                <el-input type="textarea"  placeholder="多个用户名用逗号(,)分开" v-model="form.playerIdArr"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="">
                      <el-button type="primary" @click="submitForm('form')">确认</el-button>
                      <el-button type="primary" @click="resetForm('form')">重置</el-button>
              </el-form-item>


  </el-form>



  </div>
</template>

<script>



import {dateUtil} from '@/utils'


export default{
    beforeRouteEnter (to, from, next) {
        next(vm =>{
         
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
    
          
           blockTypes:[
          {
            value:'1',
            label:'踢人'
           },
          //  {
          //   value:'2',
          //   label:'封禁'
          // },
          //  {
          //   value:'3',
          //   label:'解禁'
          // },
          
          //  {
          //   value:'4',
          //   label:'禁言'
          // },
          ],
          form:{
             blockType:'1',
            playerIdArr:'',
          },
         
           rules: {
          blockType: [
            { required: true, message: '请选择操作类型', trigger: 'blur' }, 
          ],
           playerIdArr: [
            { required: true, message: '请填写名单', trigger: 'blur' }, 
          ],
         
        }
        }
      },
      methods:{
         
        lockplayAction(){
             let option ={}
             Object.assign(option,this.form) 
             option.playerIdArr =  option.playerIdArr.split(',') 
           this.$confirm('是否确认?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.API.APIkickOff(option).then((res)=>{
                    this.$message(`${res.data.retmsg}`)
                    if (res.data.retcode==1) {
                      
                    }
                })
                
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消'
                });          
              })
        },
        submitForm(formName) {//表单确定

            this.$refs[formName].validate((valid) => {
              if (valid) {
                  this.lockplayAction()
               
              } else {
                console.log('error submit!!');
                return false;
              }
            });
      },
       
         resetForm(formName) {//表单重置

        this.$refs[formName]?this.$refs[formName].resetFields():'';
      
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

 
  .el-button {
    height: 25px;
    line-height: 25px;
    margin-left: 10px;
    span{
      font-size: 12px;
    }
    padding: 0px 10px;
  }


}
</style>

