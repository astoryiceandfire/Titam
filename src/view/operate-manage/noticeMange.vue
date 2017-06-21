<template>
  <div class="registration-wrapper">   
    <nav>     
     <div class="nav-item nav-item-selects">
            <label class="subtitle">显示位置：</label>
          
            <el-select v-model="search.displayPlace" placeholder=""  size="small" >
             <el-option label="所有" value="" key='1000'></el-option>
              <el-option
                v-for="item in displayPlaces"
                :label="item.label"
                :key="item.label"
                :value="item.value">
              </el-option>
            </el-select>
           

        </div> 

        <div class="nav-item">
              <label for="id">ID查询:</label>
              <el-input v-model="search.id" size="small" placeholder=""></el-input>
             
        </div>  
     <el-button type="primary" @click="queryLists">查询</el-button>
     <el-button type="primary" @click="dialogNotice = true,form.id='' ">添加公告</el-button>
    </nav>
<!-- 上导航栏 -->
<!-- table -->
   <el-table :data="tableData" border style="width: 100%">
       
        <el-table-column prop="id" label="公告ID" width="80">
        </el-table-column>
         
         <el-table-column prop="xbulletinType" label="公告类型" width="120">
        </el-table-column>
         <el-table-column prop="xdisplayPlace" label="显示位置" width="120">
        </el-table-column>
         <el-table-column prop="xstartTime" label="播放起始时间" width="160">
        </el-table-column>
         <el-table-column prop="xendTime" label="播放结束时间" width="160">
        </el-table-column>
        <el-table-column prop="contents" label="公告文本" >
        </el-table-column>
        <el-table-column prop="xisDisplay" label="是否显示" >
        </el-table-column>
         <el-table-column prop="xaddtime" label="创建时间" width="120">
          </el-table-column>
         <el-table-column prop="xupdtime" label="修改时间" width="120">
        </el-table-column>
         <el-table-column prop="adminName" label="操作人"width="80" >
        </el-table-column>
         <el-table-column label="操作" width="220">
          <template scope="scope">
          <el-button size="small"  type="primary" @click="editOperation(scope.$index,scope.row)">编辑</el-button>
         
          <!--  <el-button size="small"  :disabled="scope.row.isDisplay==0" type="primary" @click="sendOperation(scope.$index,scope.row)">{{scope.row.bulletinStatus==0?'推送':scope.row.bulletinStatus==1?'再次推送(已推送)':scope.row.bulletinStatus==-1?'再次推送(推送失败)':scope.row.bulletinStatus==2?'再次推送(自动推送成功)':''}}</el-button>
 -->
  <el-button size="small"  type="primary" @click="sendOperation(scope.$index,scope.row)">手动推送</el-button>

           <el-button size="small"  type="primary" @click="deleteOperation(scope.$index,scope.row)">删除</el-button>

            </template>
          </el-table-column>
       
        
         
      </el-table>
<!-- table -->
<!--   //添加公告 -->
    <el-dialog :title="form.id?'编辑公告':'添加公告'" v-model="dialogNotice" size="tiny" :modal-append-to-body = false>
      <div class="content">
        <div class="header">
        <el-form ref="form"  :model="form" :rules="rules" label-width="100px">
          <el-form-item label="公告类型">
            <el-col :span="16">
           <el-select v-model="form.bulletinType" placeholder="请选择"  size="small" >
             
                <el-option
                  v-for="item in bulletinTypes"
                  :label="item.label"
                  :key="item.label"

                  :value="item.value">
                </el-option>
              </el-select>
        </el-col>
        </el-form-item>
         <el-form-item label="公告标题" prop="bulletionTitle">
            <el-col :span="16">
                  <el-input type="text" v-model="form.bulletionTitle"></el-input>
                  </el-col>
          </el-form-item>
                <el-form-item label="播放起始时间">
                  <el-col :span="16">
               
                    <el-date-picker type="datetime"  placeholder="选择日期"  @change="changStartTime" v-model="form.startTime" style="width: 100%;"></el-date-picker>
                 
                  </el-col>
                </el-form-item>
                <el-form-item label="播放结束时间" >
                  <el-col :span="16">
                    <el-date-picker type="datetime" placeholder="选择日期"  @change="changendTime" v-model="form.endTime" style="width: 100%;"></el-date-picker>
                  </el-col>
                </el-form-item>
               
               
                <el-form-item label="播放时间间隔" >
                 <el-col :span="16">
                    <el-input  v-model="form.playTime" placeholder="单位为秒" type="number" ></el-input>
                     </el-col>
                  </el-form-item>
                  <!--   <el-form-item label="播放次数" >
                 <el-col :span="16">
                    <el-input  v-model="form.playTime"  type="number" ></el-input>
                     </el-col>
                  </el-form-item> -->
                 <el-form-item label="显示位置" prop="displayPlace" v-if="form.bulletinType!=2">
                <!--  <el-checkbox-group v-model="form.displayPlace" @change="displayPlaceChange">
                    <el-checkbox label="平台主界面" name="displayPlace" ></el-checkbox>
                    <el-checkbox label="德州扑克" name="displayPlace" ></el-checkbox>
                    <el-checkbox label="中国麻将" name="displayPlace" ></el-checkbox>
                    <el-checkbox label="斗地主" name="displayPlace" ></el-checkbox>
                  </el-checkbox-group> -->
                   <el-col :span="16">
                     <el-select v-model="form.displayPlace" placeholder="请选择"  size="small" >
                       
                          <el-option
                            v-for="item in displayPlaces"
                            :label="item.label"
                            :key="item.label"

                            :value="item.value">
                          </el-option>
                        </el-select>
                  </el-col>
              </el-form-item>
                               
              
                <el-form-item label="公告内容" prop="contents">
                    <el-input type="textarea" v-model="form.contents"></el-input>
                  </el-form-item>

                <el-form-item label="是否显示" >
                 <el-col :span="16">
                 <el-radio-group v-model="form.isDisplay">
                     <el-radio :label="1">显示</el-radio>
                      <el-radio :label="0">不显示</el-radio>
                    </el-radio-group>
                     </el-col>
                  </el-form-item>
               
                <!-- </el-form-item> -->
          </el-form>
                   
          
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
       <el-button type="primary" @click="submitForm('form')">确定</el-button>
       <el-button type="primary" @click="cancelFun">取消</el-button>
    
       
      </span>
    </el-dialog>
<!--   //添加公告 -->
<!--   //删除操作 -->
    <el-dialog title="删除提示" v-model="dialogDelete" size="tiny" :modal-append-to-body = false>
      <div class="content">
        <div class="header">
        删除将无法恢复,是否确定删除?
           
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
       <el-button type="primary" @click="confirmDeleteFun">确定</el-button>
    
        <el-button type="primary" @click="cancelDeleteFun">取消</el-button>
      </span>
    </el-dialog>
<!--   //删除操作 -->
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



import {dateUtil} from '@/utils'


export default{
    beforeRouteEnter (to, from, next) {
        next(vm =>{
          vm.queryLists()
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
         
          dialogNotice:false,//添加公告
         
          dialogDelete:false,//删除dialog
          row:null,//删除编辑时传递item
          search:{
           displayPlace:'',
             id:'',
          },
            bulletinTypes: [
                   {
                  value: '2',
                  label: '系统紧急公告跑马灯'
                  }, 
              
                   {
                   value: '1',
                   label: '游戏系统公告'
                  }],   
          
            displayPlaces: [{
                  value: '0',
                  label: '平台公告'
                  }, 
                 {
                   value: '1',
                   label: '德州扑克公告'
                  },
                  {
                   value: '2',
                   label: '中国麻将公告'
                  },
                  {
                   value: '3',
                   label: '斗地主公告'
                  }],
         tableData: null,
          // id:'',//公告ID
           // id:"",//修改公告id临时参数
          pagtotal:0,
          pageNo:1,
          //表单
          form: {
            bulletinType:'1',
           id:'',
            startTime: '',
            endTime: '',
            playTime:1,
            bulletionTitle:'',
            displayPlace:'0',
            isDisplay:1,
            contents:'',
          },
          rules:{
             startTime: [{ type: 'date', required: true, message: '请选择播放起始日期', trigger: 'blur' }],
              endTime: [{ type: 'date', required: true, message: '请选择播放结束时间日期', trigger: 'blur' }],
            displayPlace:[{required:true,message:"请选择",trigger: 'blur'},],
             contents: [{ required: true, message: '请填写公告', trigger: 'blur' }],
              
          },
          //表单
        
        }
      },
      methods:{
        queryLists(){//查询table
           

             let option = {}
             Object.assign(option,this.search)
          // option.displayPlace = this.search.displayPlace
          // option.id =this.search.id
              option.pageNo = this.pageNo
           this.API.ApiqueryAnnouncement(option).then((res)=>{
             this.pagtotal = res.data.total
           
                res.data.rows.forEach((item)=>{
                 Object.assign(item,item.gameAnnouncement) 
                let contrast  = item.bulletinType
                 item.xbulletinType = contrast==1?'游戏系统公告':contrast==2?'系统紧急公告跑马灯':''
                  contrast = item.isDisplay
                  item.xisDisplay = contrast==1?'显示':contrast==0?'不显示':''
                    contrast = item.displayPlace
                  item.xdisplayPlace = contrast==0?'平台公告':contrast==1?'德州扑克公告' :contrast==2?'中国麻将公告': contrast==3?'斗地主公告':''

                item.xstartTime = item.startTime?dateUtil.format(item.startTime,'yyyy-MM-dd HH:mm:ss'):''
                item.xendTime = item.endTime?dateUtil.format(item.endTime,'yyyy-MM-dd HH:mm:ss'):''
                item.xaddtime = item.addTime?dateUtil.format(item.addTime,'yyyy-MM-dd HH:mm:ss'):''
                item.xupdtime = item.updTime?dateUtil.format(item.updTime,'yyyy-MM-dd HH:mm:ss'):''

                 
            })
              this.tableData = res.data.rows


           },(res)=>{})
         },
         editOperation(index,row){//编辑
       
          this.dialogNotice = true
         
          Object.assign(this.form,row)

         this.form.startTime = row.xstartTime
          this.form.endTime = row.xendTime
            this.form.bulletinType = this.form.bulletinType.toString()
          this.form.displayPlace = this.form.displayPlace.toString()
         },
         sendOperation(index,row){
           let option = {}
          option.id = row.id
         
           this.$confirm('您要推送该公告, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.API.ApipushBulletin(option).then((res)=>{
                    this.$message(`${res.data.retmsg}`)
                    if (res.data.retcode==1) {

                      this.queryLists()
                    }
                })
                
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消'
                });          
              })


         },
          deleteOperation(index,row){//删除
              this.row = row 
             this.dialogDelete = true
        },
         handleCurrentChange(val){
            this.pageNo = val
            this.queryLists()
            this.pageNo = 1
         },
        cancelFun(){//取消
          this.dialogNotice = false

        },
        changendTime(val){
           this.form.endTime = val
          if (this.form.startTime>val) {
              this.$message(`播放结束时间必须大于播放起始时间`)
              this.form.endTime = " "
          }
          
        },
        changStartTime(val){
         
          this.form.startTime = val
        },
        // displayPlaceChange(val){
        //     // console.log(val)
        // },
        submitForm(formName){//b
           this.$refs[formName].validate((valid) => {
              if (valid) {
               this.confirmFun()
              } else {
                
                return false;
              }
            });
        },
      resetForm(formName) {
        console.log(formName)
        this.$refs[formName].resetFields();
      },
        confirmFun(){//确定添加公告/修改
          let option = {}
     
          
           Object.assign(option,this.form)
          // option.displayPlace = this.form.displayPlace.join(",")

          // option.startTime = this.form.startTime||Date.now()
          // option.endTime = this.form.endTime
          // option.playTime= this.form.playTime
          // option.contents = this.form.contents
          // option.id = this.form.id//是否修改公告
          this.API.ApisaveAnnouncement(option).then((res)=>{
             this.$message(`${res.data.retmsg}`)
            if (res.data.retcode==1) {
              this.queryLists()
              this.dialogNotice = false
              this.resetForm("form")
              
            }
          },(res)=>{})
        },
        confirmDeleteFun(){//删除确定
          let option = {}
           option.ids = this.row.id 
          this.API.ApideleteAnnouncement(option).then((res)=>{
            if (res.data.retcode==1) {
                 this.dialogDelete = false
                  this.queryLists()
            }
             this.$message(`${res.data.retmsg}`)
          })
           
        },
        cancelDeleteFun(){//删除取消
            this.dialogDelete = false
        },
         resetForm(formName) {

        this.$refs[formName].resetFields();
        this.form.startTime = ""
          this.form.endTime = ""
           this.form.playTime = ""
      }
         
      },
    


} 
</script>

<style lang="scss">
@import "~style/color.scss";
.registration-wrapper{
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
  .el-button {
    height: 25px;
    line-height: 25px;
    margin-left: 10px;
    span{
      font-size: 12px;
    }
    padding: 0px 10px;
  }
  .cell .el-button--primary{
    margin-top: 10px;
    margin-bottom: 10px;
  }
  nav{
  // height: 25px;
  // line-height: 25px;
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
        line-height: 25px;
         
          
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
  .nav-item-selects{
    .el-input--small{
        width: 150px;
        .el-input__inner{
          height: 25px!important;
          padding:0px;
        } 
    }

  }
  
  }

}
</style>

