import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
// import admin from '../view/admin-manage/admin'
// import groupset from '../view/admin-manage/groupsetting'
// import one from '@/components/routeone'
// import two from '@/components/routetwo'
import login from '@/components/login'
import all from '../view/index.js'
Vue.use(Router)
let {
	admin,
	groupset,
	anchor,
	regisinfoquery,
	balanceQuery,
	gagMange,
	freezeMange,
	rechargeMange,
	recordsConsumption,
		activityMange,
		advertisementMange,
		growUpMange,
		mailMange,
		noticeMange,
		otherMange,
		propDeploy,
		shoppingMange,
		signMange,
		vipRedeployMange,
		advertConMange,
		propPackDeploy,
		propArtDeploy,
	// texasHoldem,//德州扑克
	// 	teActiveManage,
		teIndianaManage,
		teShopManage,
		avatarReward,
		daylyTitleRanking,
		quaBasis,
		quaRomConfigure,
		seasonRanking,
		weeklyTitleRanking,
		anchorsManage,
		jackpotManage,
		matchActManage,
		rewardNotice,
		rewardRules,
		teInromeManage,
		pickedContent,
		serverMange,
		propresource,
	userMange,
} = all




const  routes = [   
    		{
	    		path:'/login',
	    		name:'login',
	    		component:login,
	    		meta:{auth:false},
    		},
    		{ path: '',
		      redirect: '/home'
		 	},
		  
    		{
		     path: '/home',
		     name: 'home',
		     component:home,
		     children:[

		      {
		      	path:"admin",
		      	name:"admin",
		      	component:admin
		      	},
	
		      	 {
		      	path:"serverMange",
		      	name:"serverMange",
		      	component:serverMange
		      	},
		      	 {
		      	path:"propresource",
		      	name:"propresource",
		      	component:propresource
		      	},
		      	 {
		      	path:"userMange",
		      	name:"userMange",
		      	component:userMange
		      	},
		      	{
		      	path:"regisinfoquery",
		      	name:"regisinfoquery",
		      	component:regisinfoquery,
		     	 },
		     	 {
		      	path:"balanceQuery",
		      	name:"balanceQuery",
		      	component:balanceQuery,
		     	 },
		     	 {
		      	path:"gagMange",
		      	name:"gagMange",
		      	component:gagMange,
		     	 },
		     	 {
			      	path:"freezeMange",
			      	name:"freezeMange",
			      	component:freezeMange,
		     	 },
		     	 {
			      	path:"rechargeMange",
			      	name:"rechargeMange",
			      	component:rechargeMange,
		     	 },
		     	 {
			      	path:"recordsConsumption",
			      	name:"recordsConsumption",
			      	component:recordsConsumption,
		     	 },
		     	 //运营管理
		     	 {
			      	path:"activityMange",
			      	name:"activityMange",
			      	component:activityMange,
		     	 },
		     	 {
			      	path:"advertisementMange",
			      	name:"advertisementMange",
			      	component:advertisementMange,
		     	 },
		     	 {
			      	path:"growUpMange",
			      	name:"growUpMange",
			      	component:growUpMange,
		     	 },

		     	 {
			      	path:"mailMange",
			      	name:"mailMange",
			      	component:mailMange,
		     	 },

		     	 {
			      	path:"noticeMange",
			      	name:"noticeMange",
			      	component:noticeMange,
		     	 },
		     	 {
			      	path:"otherMange",
			      	name:"otherMange",
			      	component:otherMange,
		     	 },
		     	 {
			      	path:"propDeploy",
			      	name:"propDeploy",
			      	component:propDeploy,
		     	 },
		     	 		     	 {
			      	path:"propPackDeploy",
			      	name:"propPackDeploy",
		
			      	component:propPackDeploy,
		     	 },
		     	 		     	 {
			      	path:"propArtDeploy",
			      	name:"propArtDeploy",
			      	component:propArtDeploy,
		     	 },
		     	  {
			      	path:"pickedContent",
			      	name:"pickedContent",
			      	component:pickedContent,
		     	 },
		     	 {
			      	path:"shoppingMange",
			      	name:"shoppingMange",
			      	component:shoppingMange,
		     	 },

		     	 {
			      	path:"signMange",
			      	name:"signMange",
			      	component:signMange,
		     	 },
		     	  {
			      	path:"vipRedeployMange",
			      	name:"vipRedeployMange",
			      	component:vipRedeployMange,
		     	 },
		     	   {
			      	path:"advertConMange",
			      	name:"advertConMange",
			      	component:advertConMange,
		     	 },
		     	 // {
			      // 	path:"texasHoldem",
			      // 	name:"texasHoldem",
			      // 	component:texasHoldem,//德州扑克
			      	 
		     	 // },
		     	
						      	{
						      	path:"teIndianaManage",
						      	name:"teIndianaManage",
						      	component:teIndianaManage
						      	},	
						      	{
						      	path:"teInromeManage",
						      	name:"teInromeManage",
						      	component:teInromeManage
						      	},
						      	{
						      	path:"teShopManage",
						      	name:"teShopManage",
						      	component:teShopManage
						      	},
						      	{
						      	path:"weeklyTitleRanking",
						      	name:"weeklyTitleRanking",
						      	component:weeklyTitleRanking
						      	},
						      		{
						      	path:"seasonRanking",
						      	name:"seasonRanking",
						      	component:seasonRanking
						      	},
						      		{
						      	path:"quaRomConfigure",
						      	name:"quaRomConfigure",
						      	component:quaRomConfigure
						      	},
						      		{
						      	path:"quaBasis",
						      	name:"quaBasis",
						      	component:quaBasis
						      	},
						      		{
						      	path:"daylyTitleRanking",
						      	name:"daylyTitleRanking",
						      	component:daylyTitleRanking
						      	},	
						      		{
						      	path:"avatarReward",
						      	name:"avatarReward",
						      	component:avatarReward
						      	},
						      		{
						      	path:"rewardRules",
						      	name:"rewardRules",
						      	component:rewardRules
						      	},
						      		{
						      	path:"rewardNotice",
						      	name:"rewardNotice",
						      	component:rewardNotice
						      	},
						      		{
						      	path:"matchActManage",
						      	name:"matchActManage",
						      	component:matchActManage
						      	},

						      		{
						      	path:"jackpotManage",
						      	name:"jackpotManage",
						      	component:jackpotManage
						      	},
						      		{
						      	path:"anchorsManage",
						      	name:"anchorsManage",
						      	component:anchorsManage
						      	},
	
						      
	  	 //运营管理
		     	  {
		      	path:"anchor",
		      	name:"anchor",
		      	component:anchor,
		     	 },
		     	
		     	  	

		      ]
    		},
    	
 	]


const router = new Router({
	// mode: 'hash',
  	base: __dirname,
 	routes
})

 router.beforeEach((to,from,next)=>{
 	 var { auth = true } = to.meta
 	
 	  let isLogin = Boolean(sessionStorage.getItem("isLogin"))
 	  
 	
 	 
 	   if (auth && isLogin==false && to.path !== '/login') {
 	 
        return next({ path: '/login' })
    }
   
 	next()
 })

export default router
