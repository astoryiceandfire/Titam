
const API_URL = '/TitanGameCMS'


 const APIKEYS ={
   Apilogin: `${API_URL}/admin/in`,
 //用户成功进入主界面
ApiSuccessMain :`${API_URL}/admin/main`,
 //后台用户退出
  Apiadminout  :`${API_URL}/admin/out`,
  //查询所有用户
    ApiQueryUserList : `${API_URL}/admin/user/queryUserList`,
//添加用户
  ApiaddUser : `${API_URL}/admin/user/addUser`,
 //重置密码
   ApiresetUserPassword : `${API_URL}/admin/user/resetUserPassword`,
  //用户账号禁用/解禁
   ApiuserStatus : `${API_URL}/admin/user/userStatus`,
   //根据用户id 返回用户角色信息
     ApiuserRoleById :`${API_URL}/admin/user/userRoleById`,
    //设置用户角色
     ApiuserSetUserRole :`${API_URL}/admin/user/setUserRole`,


     
    //查询游戏用户列表
     ApiqueryGameUserList:  `${API_URL}/gameUser/queryGameUserList`,
    //查询用户余额
     ApiqueryGameUserWallet : `${API_URL}/gameUser/queryGameUserWallet`,
    //查询游戏用户禁言状态列表
     ApiqueryGameUserGagList :`${API_URL}/gameUser/gag/queryGameUserGagList`,
    //游戏用户禁言
     ApigameUserGag : `${API_URL}/gameUser/gag/gameUserGag`,
    //游戏用户解禁
     ApiupdateGameUserGag : `${API_URL}/gameUser/gag/updateGameUserGag`,
    //查询游戏用户账号状态列表
    ApiqueryGameUserSealList: `${API_URL}/gameUser/seal/queryGameUserSealList`,
     //游戏用户账号封号
     ApigameUserSeal : `${API_URL}/gameUser/seal/gameUserSeal`,
     //游戏用户账号解封
     ApiupdateGameUserSeal : `${API_URL}/gameUser/seal/updateGameUserSeal`,
// 订单管理接口!!!!!!!!!!

     //查询充值订单
     ApiqueryRechargeOrder : `${API_URL}/order/queryRechargeOrder`,
     //查询消费记录
     ApiqueryCustomdata : `${API_URL}/order/queryCustomdata`,
//----------------------------------运营管理接口------------
    //添加公告/公告修改
     ApisaveAnnouncement : `${API_URL}/gameOperation/bulletin/saveBulletin`,
        //公告查询
     ApiqueryAnnouncement : `${API_URL}/gameOperation/bulletin/queryBulletin`,
        //公告删除
     ApideleteAnnouncement : `${API_URL}/gameOperation/bulletin/deleteBulletin`,
      //公告推送
     ApipushBulletin : `${API_URL}/gameOperation/bulletin/pushBulletin`,

        //添加商品
     ApicsaveCommodity : `${API_URL}/gameOperation/mall/saveMall`,
        //查询商品列表
     ApiqueryCommodity : `${API_URL}/gameOperation/mall/queryMall`,
        //商品上架下架
       ApiupdCommodityState : `${API_URL}/gameOperation/mall/updateGoodsState`,
        //--------------------------图片上传----------------
       ApiuploadImg : `${API_URL}/upload/uploadImg`,
        //删除商品
      ApideleteCommodity : `${API_URL}/gameOperation/mall/deleteGoods`,
        //查询活动
      ApiqueryActive : `${API_URL}/gameOperation/active/queryActive`,
        //删除活动
     ApideleteActive : `${API_URL}/gameOperation/active/deleteActive`,
        //修改活动
      ApisaveActive : `${API_URL}/gameOperation/active/saveActive`,

        //增加轮播式活动
      ApiaddActive : `${API_URL}/gameOperation/active/saveActive`,
        //选择任务类型
      ApisaveTaskActive : `${API_URL}/gameOperation/active/selectTaskType`,
           //查询id
      ApiActivequeryById : `${API_URL}/gameOperation/active/queryById`,

   //签到奖励接口 -查询活动
      ApiqueryReport : `${API_URL}/gameOperation/signAward/querySignAward`,
        //增加活动
      ApisaveReport : `${API_URL}/gameOperation/signAward/saveSignAward`,
        //修改活动
      ApissaveReport : `${API_URL}/gameOperation/signAward/saveSignAward`,
        //删除活动
      ApideleteReport: `${API_URL}/gameOperation/signAward/deleteSignAward`,

      //广告管理-增加界面
      ApisaveUi: `${API_URL}/gameOperation/advert/saveAdvert`,
      //查询界面
      ApiqueryUi: `${API_URL}/gameOperation/advert/queryAdvert`,
      //添加/修改广告内容配置
      ApisaveAdvertContent: `${API_URL}/gameOperation/advert/saveAdvertContent`,
        //查询页面id 模块
      ApiqueryAdvertContentByAid: `${API_URL}/gameOperation/advert/queryAdvertContentByAid `,
     

      ////根据id查询广告
      ApiqueryAdvertContentById: `${API_URL}/gameOperation/advert/queryAdvertContentById`,
      //查询广告
      ApiqueryAdvertContent: `${API_URL}/gameOperation/advert/queryAdvertContent`,
      //广告开启
      ApideleteAdvertContent: `${API_URL}/gameOperation/advert/isEnableAdvertContent `,
      ////
     // ApisaveContent: `${API_URL}/gameOperation/saveContent`,

      //邮件管理
      //发送邮件
      ApiaddEmail: `${API_URL}/gameOperation/email/addEmail`,
      //查询邮件
      ApiemailQueryList: `${API_URL}/gameOperation/email/emailQueryList`,
         //邮件发送给玩家
      ApiupdEmailStatus: `${API_URL}/gameOperation/email/updEmailStatus`,


      //VIP- 管理 /vip配置修改
      ApiupdateMember: `${API_URL}/gameOperation/vip/updateVip`,
       //VIP查询
      ApimemberQuery: `${API_URL}/gameOperation/vip/vipQuery`,
      //vip权限增加
      ApisaveMemberManage: `${API_URL}/gameOperation/vip/saveVipManage`,
      ///vip配置修改
      ApimemberManageQueryList: `${API_URL}/gameOperation/vip/vipManageQueryList`,
      //vip配置删除
      ApidelMemberManage: `${API_URL}/gameOperation/vip/delVipManage`,


      //敏感词增加/修改
      ApisaveSensitiveWord: `${API_URL}/gameOperation/other/saveSensitiveWord`,
      //敏感词删除
      ApidelWord: `${API_URL}/gameOperation/other/delSensitiveWord`,
       //敏感词查询
      ApiquerySensitiveWord: `${API_URL}/gameOperation/other/querySensitiveWord`,
      //5.9.2tip管理
       //添加提示/tips修改
      ApisaveTips: `${API_URL}/gameOperation/other/saveTips`,
       ///tips查询
      ApitipsQueryList: `${API_URL}/gameOperation/other/tipsQueryList`,
        ///tips删除
      ApidelTips: `${API_URL}/gameOperation/other/delTips`,


      //5102道具美术资源配置
      
       //增加道具/道具修改
      ApisaveProp: `${API_URL}/gameOperation/props/saveProps`,
       //道具查询
      ApipropQueryList: `${API_URL}/gameOperation/props/propsQueryList`,
       //道具删除
      ApidelProp: `${API_URL}/gameOperation/props/delProps`,
      //5.10.2道具美术资源配置
       //美术道具增加/修改
      ApisavePropArt: `${API_URL}/gameOperation/props/savePropsArt`,
       //删除美术道具
      ApideletePropArt: `${API_URL}/gameOperation/props/deletePropsArt`, 

       //美术道具查询???
      ApiqueryPropArt: `${API_URL}/gameOperation/props/queryPropsArt`,
      //5.10.3礼包道具属性
      //礼包道具增加/修改
      ApisaveAward: `${API_URL}/gameOperation/props/saveGiftBagProps`,
       //礼包道具删除
      ApidelAward: `${API_URL}/gameOperation/props/delGiftBagProps`,
       //礼包道具查询
      ApiqueryAward: `${API_URL}/gameOperation/props/queryGiftBagProps`,
    
    
    
    
     // <----------------游戏管理接口------------------->
      //夺宝场 
      //添加/修改房间
      ApisaveRoom: `${API_URL}/gameConfig/snatchSite/saveRoom`,
      //删除房间
      ApidelRoom: `${API_URL}/gameConfig/snatchSite/delRoom`,
      //查询所有房间
      ApiroomQueryPage: `${API_URL}/gameConfig/snatchSite/roomQueryPage`,


     ApiroomBySynopsisAll :`${API_URL}/gameConfig/snatchSite/roomBySynopsisAll`,
     //添加/修改商品
     ApisaveCommodity : `${API_URL}/gameConfig/snatchSite/saveGoods`,
     //删除商品
     ApidelCommodity : `${API_URL}/gameConfig/snatchSite/delGoods`,
    
    //查询所有商品信息
     ApicommodityQueryPage :`${API_URL}/gameConfig/snatchSite/goodsQueryPage`,

    //查询所有商品名称
     ApicommodityByNameAll : `${API_URL}/gameConfig/snatchSite/goodsNameAll`,


    //添加/修改夺宝活动
     ApisaveActivity :`${API_URL}/gameConfig/snatchSite/saveActivity`,

    //删除夺宝活动
     ApidelActivity : `${API_URL}/gameConfig/snatchSite/delActivity`,

    //查询夺宝活动
     ApiactivityQueryPage: `${API_URL}/gameConfig/snatchSite/activityQueryPage`,
   
   
    //---------主播赛场-----------------
    //添加/修改比赛活动
     ApisaveAnchorActivity: `${API_URL}/gameConfig/anchorMatch/saveAnchorActivity`,

    //删除比赛活动
     ApidelAnchorActivity  :`${API_URL}/gameConfig/anchorMatch/delAnchorActivity`,

    //查询比赛活动
     ApianchorActivityQueryPage : `${API_URL}/gameConfig/anchorMatch/anchorActivityQueryPage`,


    //修改活动状态
     ApisetAnchorStatus : `${API_URL}/gameConfig/anchorMatch/setActivityStatus`,
   
     //----------------奖池管理------------------------
     ///
     //监控主播赛场的每场比赛列表
     ApiqueryAnchorList : `${API_URL}/gameConfig/anchorMatch/queryAnchorList`,
     //监控主播赛场的每场比赛列表
     ApianchorStatistics : `${API_URL}/gameConfig/anchorMatch/anchorStatistics`,
      //操作奖池设置
     ApioperationJackpot : `${API_URL}/gameConfig/anchorMatch/operationJackpot`,

      //查询奖池调整记录
     ApijackpotQueryList : `${API_URL}/gameConfig/anchorMatch/jackpotQueryList`,
   
   
      //添加奖励
     ApisaveReward : `${API_URL}/gameConfig/season/saveReward`,
      //删除奖励
     ApidelReward : `${API_URL}/gameConfig/season/delReward`,
      //查询奖励
     ApirewardQueryPage : `${API_URL}/gameConfig/season/rewardQueryPage`,
      //-------排位赛-------------
      //添加/修改排位信息
     APIsaveSeason : `${API_URL}/gameConfig/season/saveSeason`,
          //删除排位赛
     APIdelSeason : `${API_URL}/gameConfig/season/delSeason`,
          //查询排位赛
     APIseasonQueryPage  :`${API_URL}/gameConfig/season/seasonQueryPage`,
   
   
     //-------------------每周精选--------------------
      ////获取每周精选列表
     APIgetWeekHandpickList : `${API_URL}/gameOperation/handpick/getWeekHandpickList`,
         //添加/修改每周精选
     APIsaveWeekHandpick : `${API_URL}/gameOperation/handpick/saveWeekHandpick`,
         //根据id获取每周精选
     APIgetWeekHandpickById : `${API_URL}/gameOperation/handpick/getWeekHandpickById`,
        ////根据id修改每周精选是否启用
     APIupdWeekHandpickById : `${API_URL}/gameOperation/handpick/updWeekHandpickById`,

     
           ////服务器 - 踢人
     APIkickOff : `${API_URL}/gameServer/kickOff `,
           ////查询服务器状态
     APIcheckServerState : `${API_URL}/gameServer/checkServerState`,
           //重载基础数据
     APIclearCache : `${API_URL}/gameServer/clearCache`,
           //关闭服务器
     APIshutdownServer : `${API_URL}/gameServer/shutdownServer`,
           //封禁用户
     APIblockPlayer : `${API_URL}/gameServer/blockPlayer`,
                 //解封用户
     APIunblockPlayer : `${API_URL}/gameServer/unblockPlayer`,
        //设置服务器标示 开启或者关闭
     APIopenServerAccess : `${API_URL}/gameServer/openServerAccess`,
   //添加
     APIaddPlayerProp : `${API_URL}/gameServer/addPlayerProp`,
 //发放
     APIsendPlayerProp : `${API_URL}/gameServer/sendPlayerProp`,
 //删除
     APIdelPlayerProp : `${API_URL}/gameServer/delPlayerProp`,
 //查询
     APIqueryPlayerProp : `${API_URL}/gameServer/queryPlayerProp`,




     //-----------------------[[添加角色-----------------

    //查询所有角色
     APIAdminRoleAll : `${API_URL}/admin/role/roleAll`,
 //查询单个角色包括权限
     APIAdminRoleByRid : `${API_URL}/admin/role/selOperationByRid`, //rid
      // 添加角色
     APIAdminARole : `${API_URL}/admin/role/addRole`, //AbRole role
           // 删除角色
     APIAdmindelRole : `${API_URL}/admin/role/delRole`, //rid
           // 查询所有权限
     APIAdminQueryAllOperation : `${API_URL}/admin/role/queryAllOperation`,
           // 添加权限
     APIAdminAddNoOperation : `${API_URL}/admin/role/addNoOperation`, //AbRole roleint roleId, int[] noOperationIds
    

    //-----------------------添加角色]]-----------------
    //押注赔率
     //查询押注赔率//gameType  Integer  游戏类型(1 德州扑克)
     APIqueryBetOddsPage : `${API_URL}/gameConfig/anchorMatch/queryBetOddsPage`,
    //添加/修改押注赔率
//           id  Integer  押注赔率id
// gameType  Integer  游戏类型(1 德州扑克)
// betOptions  Integer  押注选项(1 玩家,2 高牌,3 对子)
// odds  Double  赔率
     APIaddBetOdds : `${API_URL}/gameConfig/anchorMatch/addBetOdds`,
          //删除押注赔率
          //ids  Integer  押注赔率id
     APIdeleteBetOdds : `${API_URL}/gameConfig/anchorMatch/deleteBetOdds`,
//根据id查询押注赔率
//id  Integer  押注赔率id

     APIqueryBetOddsById : `${API_URL}/gameConfig/anchorMatch/queryBetOddsById`,
          //奖励预告配置
//           查询奖励预告
// creatorId  Integer  创建者
// startTime  Integer  开始时间
// endTime  Integer  结束时间
     APIqueryAwardPredictPage : `${API_URL}/gameConfig/anchorMatch/queryAwardPredictPage`,
// 添加奖励预告
// predictContent  String  奖励预告内容
// predictDate  String  预告日期
     APIaddAwardPredict : `${API_URL}/gameConfig/anchorMatch/addAwardPredict`,
          //查询活动规则
     APIqueryActivityRulePage : `${API_URL}/gameConfig/anchorMatch/queryActivityRulePage`,
          //添加活动规则
// ruleContent  String  规则内容
// ruleType  Integer  规则类型
     APIaddActivityRule : `${API_URL}/gameConfig/anchorMatch/addActivityRule`,
 }

import Vue from 'vue'
const  APIS = {}
Object.keys(APIKEYS).forEach((key)=>{
    APIS[key] = function(option){ 
      return axios.post(APIKEYS[key],option).catch(function(error){
 
          if (error.response.status==401) {
             
              Vue.prototype.$msgbox({
                title:'提示',
                message:"您没有操作权限!"
              })
             
          }
         
      })
    }
})

APIS.UPLOADURL = `${API_URL}/upload/uploadImg`
APIS.UPLOADURLOVIDE = `${API_URL}/upload/uploadVideo`


  // if (process.env.NODE_ENV =='development') {
  //         APIS.IP='http://10.1.1.222:8585'
  //       }else{
  //         APIS.IP=''
  //       }
        

const post = function(api,option={}){
  return  axios.post(api,option)
}
const get = function(api,option={}){

  return  axios.get(api,{'params':option})
}



export default APIS


