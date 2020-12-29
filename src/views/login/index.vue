<template>
  <div class="main">
    <div class="login-form">
      <h2 class="login-title">金丰会员管理系统-登录</h2>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" >
        <el-input v-model="ruleForm.password" type= 'password'></el-input>
      </el-form-item>
      <el-form-item prop="keep">
        <el-checkbox v-model="ruleForm.checked" @click.native = 'keep($event )'>保留七天免登录</el-checkbox>
      </el-form-item>
      
      <el-button type="primary" @click="submitForm('ruleForm')" style="margin-left:100px">登录</el-button>
      <el-button @click="gotoReg">注册</el-button>
     
    </el-form>
  </div>
  </div>
</template>

<script>
import usersApi from '@/api/usersApi';
import {SetToken, setUser} from '@/utils/auth'
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        password: "", 
        checked: false,
      },
      rules: {
        name: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
        
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          try{
            let psw = this.$md5(this.ruleForm.password);
            let p = await usersApi.login(this.ruleForm.name, psw)
            if(p.data.flag){
              console.log(p.data);

              //登录成功
              this.$message({
                message: '登录成功',
                type: 'success'
              });
              console.log(1);

              //存储token和用户信息到本地
              let userinf = {
                username: this.ruleForm.name,
                uid: p.data.uid
              }
              if(this.ruleForm.checked){
                SetToken(p.data.token, 7)
                setUser(JSON.stringify(userinf), 7)
              }else{
                //存成会话级别：关闭浏览器就删除
                setToken(p.data.token)
                setUser(JSON.stringify(userinf))
              }

              //跳转首页
              this.$router.push('/home')
            }else{
              //登陆失败
              this.$message({
                message: '登录失败',
                type: 'error'
              })
            }
          }catch(err){
            console.log(err);
            this.$message({
                message: '服务器问题',
                type: 'error'
              })
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    gotoReg() {
      this.$router.push("/reg")
    },
    //解决复选框的bug
    keep(ev){
      // console.log(1);
      if(ev.target.tagName == 'INPUT') return;
      if(!this.ruleForm.checked){
        this.$message({
          message: "请不要在公共场合使用该功能",
          type: "error  "
        })
      }
    }
  },
  watch:{
    ruleForm:{
      deep: true,
      handler: function (newval, oldval) {
        if(newval.checked && oldval.checked != newval.checked){
          this.$message({
          message: "请不要在公共场合使用该功能",
          type:"warning"
          })
        }
      } 
    }
  },
  created(){
    console.log(this.$route);
    if(this.$route.query){
      this.ruleForm.name = this.$route.query.name
    }
    
  }
};
</script>

<style scoped>
  .main{
    position: absolute;
    width: 100%;
    height: 100%;
    background: url("../../assets/download.jpg") ;

    overflow: hidden;
  }
  .login-form{
    width: 350px;
    margin: 160px auto;
    background-color: rgb(225, 225, 225,0.8);
    padding:30px;
    border-radius: 20px;
  }
  .login-title{
    text-align: center;
    color: grey;
    margin-bottom: 20px;
  }
</style>>
