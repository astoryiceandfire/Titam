<template>
  <div class="advertconMange-wrapper">
  <nav>     
        <div class="nav-item">
             <el-button type="primary" size="small" @click="addAdvconent">添加广告</el-button>
        </div>        
    </nav>
<!-- 上导航栏 -->
<!-- table -->
   <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="contentId" label="广告ID" width="120">
        </el-table-column>
         <el-table-column prop="xadvertId" label="显示页面" width="120">
        </el-table-column>
         <el-table-column prop="xurlType" label="广告类型" width="120">
        </el-table-column>
         <el-table-column prop="xmodule" label="显示模块" width="120">
        </el-table-column>
         <el-table-column prop="xaddTime" label="创建时间" width="200">
        </el-table-column>
        <!--  <el-table-column prop="xupdTime" label="修改时间" width="200">
        </el-table-column> -->
           <el-table-column prop="adminName" label="操作人"width="120" >
        </el-table-column>
         <el-table-column label="操作" >
          <template scope="scope">
            <el-button size="small"  type="primary" @click="editrAction(scope.$index,scope.row)">编辑</el-button>
          <el-button size="small"  type="primary" @click="deleteAction(scope.$index,scope.row)">{{scope.row.isEnable==1?'关闭':'开启'}}</el-button>
            </template>
          </el-table-column>    
      </el-table>
<!-- table -->

<!--   //添加广告 -->
    <el-dialog title="添加广告" v-model="dialogAddpage" size="small" :modal-append-to-body = false>
      <div class="content">
        <div class="header">
        <el-form ref="form"  :model="form" :rules="rules" label-width="80px">
            <el-form-item label="显示页面" >
              <el-select v-model="form.advertId"  placeholder="请选择页面"  @change="changeValue">
                <el-option   v-for="item in optiona"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"></el-option>
                
              </el-select>
            </el-form-item>
             <el-form-item label="模块值" prop="module" >
                <el-col :span="12">
                <el-input type="number" v-model="form.module" placeholder="值越小越靠前"></el-input>
                </el-col>
              </el-form-item>
           <!--   <el-form-item label="显示模块" prop="module">

              <el-select v-model="form.module"  placeholder="请选择模块">
                <el-option   v-for="item in layoutsoption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                :disabled="item.disabled"></el-option>
                
              </el-select>
            </el-form-item> -->
          
              
        
              <el-form-item label="首图" prop="coverImg">
               <el-col :span="14">
                    <el-upload
                      class="avatar-uploader"
                       :action="API.UPLOADURL"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      >
                      <img v-if="form.coverImg" :src="form.coverImg"   class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                     </el-upload>

                </el-col>
              
             
            </el-form-item>

            <el-form-item label="广告类型">
              <el-select v-model="form.urlType" placeholder="请选择广告类型">
                <el-option label="H5广告" value="1"></el-option>
                <el-option label="APP跳转" value="3"></el-option>
                 <el-option label="内容弹窗" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="显示规则" v-if="form.urlType=='2'">
               <el-select v-model="form.displayRule"  placeholder="请选择页面">
                <el-option   v-for="item in displayRules"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"></el-option>
                
              </el-select>
            </el-form-item>
             <el-form-item label="链接配置" prop="url" v-if="form.urlType!=='2'">
                <el-input type="textarea" v-model="form.url"></el-input>
              </el-form-item>
                <el-form-item label="内容文本" prop="contentText" v-if="form.urlType=='2'" >
                  <el-col :span="24">
                <el-input type="textarea" v-model="form.contentText"></el-input>
                <!--  <ueditor :value= 'form.contentText' :config='config' @input="changeInput"></ueditor> -->
                    </el-col>
              </el-form-item>
            <el-form-item label="内容图片" prop="contentImage" v-if="form.urlType=='2'">
                    <el-col :span="14">
                    <el-upload
                      class="avatar-uploader"
                      :action="API.UPLOADURL"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccessContentImage"
                     >
                      <img v-if="form.contentImage" :src="form.contentImage" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                     </el-upload>

                </el-col>
            </el-form-item>


           <!--  //上传视频 -->
                <!--  <el-form-item label="上传视频" prop="contentVideo" v-if="form.urlType=='2'">
                    <el-col :span="14">
                    <el-upload
                      class="avatar-uploader"
                      :action="API.UPLOADURLOVIDE"
                      :on-remove="deleteContentVideo"
                      :on-success="contentVideoSuccess"
                     >

                      <el-button size="small" type="primary">点击上传</el-button>
                     </el-upload>

                </el-col>
            </el-form-item> -->
          <!--   //上传视频 -->
        
         

          
              
                <!-- </el-form-item> -->
          </el-form>
                   
          
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
       
        <el-button type="primary" @click="submitForm('form')">确定</el-button>
        <el-button type="primary" @click="resetForm('form')">取消</el-button>
       
      </span>
    </el-dialog>
<!--   //添加广告 -->
  </div>
</template>

<script>
import {dateUtil} from '@/utils'
import ueditor from '@/ueditor.vue';

export default{
    beforeRouteEnter (to, from, next) {
        next(vm =>{
          vm.queryAdvert()
          vm.queryAdvertContent()
        })
      },
    beforeRouteUpdate (to, from, next) {
        next()
      },
    beforeRouteLeave (to, from, next) {
      next()
      },
      components: {
      ueditor,
    },
     
      data(){

        return {
          defaultMsg: ' ',  
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 220,
           maximumWords:500 ,  //允许的最大字符数
          
        },
         tableData: null,
           totaloption:[],
          optiona:null,//显示页面
          dialogAddpage:false,
           pageNo:1,
       
          layoutsoption:null,
          layouts:[{value:'1',label:'模块1'},
                  {value:'2',label:'模块2'},
                  {value:'3',label:'模块3'},
                  {value:'4',label:'模块4'}],
          displayRules:[
          {value:'1',label:'纯文字'},
          {value:'2',label:'纯图片'},
          {value:'3',label:'上图下文'},
          {value:'4',label:'上文下图'},
          ],
            //表单
          form: {
            contentId:'',
            advertId:"",
           pagingImg:'',
           urlType:'1',
            displayRule:'1',
            module:'',
            coverImg:'',
            contentImage:"",
           contentText:'',
           contentVideo:'',
            url: '',
           
          },
          //表单
          //表单验证
          rules: {
          advertId: [
            { required: true, message: '请选择页面', trigger: 'blur' },
           
          ],
           module: [
            { required: true, message: '请选择显示模块', trigger: 'blur' },
           
          ],
          
           coverImg: [
            { required: true, message: '请选择首图', trigger: 'blur' },
           
          ],
           url: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
           
          ],
          contentText: [
            { required: true, message: '请输入内容文本', trigger: 'blur' },
           
          ],
          contentImage: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
           
          ],
         contentVideo: [
            { required: true, message: '请上传视频', trigger: 'blur' },
           
          ],
          
         
        },
          //表单验证
        }
      },

      methods:{
        changeInput({ wordCount,  content,  plainTxt }){
         this.form.contentText = content

        },

    addAdvconent(){
      this.dialogAddpage=true
      this.form.contentId=''
        
    },
        editrAction(index,row){
          this.dialogAddpage = true
           for(let key in row){
               row[key] = (row[key]||'').toString()
            }

           Object.assign(this.form,row)


        },
        deleteAction(index,row){
          let option ={
            contentIds:row.contentId,
            isEnable:row.isEnable==1?0:1

          }

                this.$confirm('修改广告状态, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.API.ApideleteAdvertContent(option).then((res)=>{
                        this.$message(`${res.data.retmsg}`)
                        if (res.data.retcode==1) {
                          this.queryAdvertContent()
                          this.queryAdvert()
                        }
                  })
                 
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消修改'
                  });          
                });

        },

        changeValue(val){
                this.form.layout = ''
                let x = this.optiona.filter((item)=>{
                          return item.value == val
                        })
                       this.layoutsoption = this.layouts.slice(0,x[0].layout)
                       this.layoutsoption.forEach((item)=>{
                         let isHas =  x[0].module.some((item1)=>{
                            return item1==item.value
                          })
                        isHas?item.disabled=true:item.disabled=false

                       })
                    
        },
       queryAdvertContent(){
        let option = {}
        
        this.API.ApiqueryAdvertContent(option).then((res)=>{
               res.data.rows.forEach((item)=>{
                    let contrast  = item.urlType
                    item.xaddTime = item.addTime?dateUtil.format(item.addTime,'yyyy-MM-dd HH:mm:ss'):''
                    item.xupdTime = item.updTime?dateUtil.format(item.updTime,'yyyy-MM-dd HH:mm:ss'):''
                    item.xadvertId = `页面${item.advertId}`
                    item.xurlType = contrast==1?"H5广告":contrast==3?"APP跳转":contrast==2?"内容弹窗":''
                    item.xmodule = `模块值${item.module}`

               })

               this.tableData = res.data.rows

        })

       },
        queryAdvert(){
             let option = {}
           
             let optionb = []
             let vm =this

             this.API.ApiqueryAdvertContentByAid(option).then((res)=>{
                    let option = []
                 res.data.data.forEach((item,index)=>{
                   let advertId = Number(item.advertId)
                        if (option[advertId-1]) {
                           option[advertId-1].module .push(item.module)

                         }else{
                            option[advertId-1] = item
                            option[advertId-1].module =  [option[advertId-1].module]
                          } 

                    })
                  option.forEach((item)=>{
                      
                        let yitem = {
                          label:`页面${item.advertId}`,
                          value:item.advertId.toString(),
                          layout:item.layout,
                          module:item.module,
                        }
                        optionb.push(yitem)
                       
                       
                   
                  })

                   vm.optiona = optionb
                 

             })
          
           
        },
        contentVideoSuccess(res,file,fileList){
          
          (fileList.length>=2) ?fileList.splice(0,1):''
          this.form.contentVideo = res.data
        },
        deleteContentVideo(file, fileList){
          this.form.contentVideo =''
        },

      handleAvatarSuccess(res, file) {

      
          this.form.coverImg = res.data;
      },
       handleAvatarSuccessContentImage(res, file) {
    
          this.form.contentImage = res.data;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传图片只能是 PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
       //上传图片
         ensureAction(){
          let option = {}
          Object.assign(option,this.form)
          // option.contentId = this.contentId
        
         
          this.API.ApisaveAdvertContent(option).then((res)=>{
              this.$message(`${res.data.retmsg}`)
                if (res.data.retcode==1) {
                    this.dialogAddpage=false
                    this.queryAdvert()
                    this.queryAdvertContent()
                }
          })

         },
         handleCurrentChange(){

         },
          submitForm(formName) {//表单确定
            this.$refs[formName].validate((valid) => {
              if (valid) {
               this.ensureAction()
              } else {
                console.log('error submit!!');
                return false;
              }
            });
      },
      resetForm(formName) {//表单重置
        this.$refs[formName].resetFields();
        this.dialogAddpage=false
      },
       
        
         
      },
     


} 
</script>

<style lang="scss">
@import "~style/color.scss";
.advertconMange-wrapper{
  width: 100%;
  height: 100%;
  text-align: left;
  position: relative;
 .block{//分页
    margin-top: 80px;
    text-align:center;
  }
  .el-dialog__footer{
  text-align: center;
}
   .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 108px;
    height: 108px;
    line-height: 108px;
    text-align: center;
  }
  .el-upload__input{
      display: none;
  }
  .avatar {
    width: 108px;
    height: 108px;
    display: block;
  }
  nav{
  // height: 25px;
  line-height: 25px;
  display: flex;
  flex-wrap: wrap;
  align-items:center;
  font-size: 12px;
  margin: 20px auto;
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

