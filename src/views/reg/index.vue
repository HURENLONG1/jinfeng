<template>
  <div class="main">
    <div class="login-form">
      <h2 class="login-title">金丰会员管理系统-注册</h2>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="from"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      
      <el-button type="primary" @click="submitForm()" style="margin-left:100px">注册</el-button>
      <el-button @click="gotologin">登录</el-button>
     
    </el-form>
  </div>
  </div>
</template>

<script>
import usersApi from '@/api/usersApi'
export default {
  data() {
    var validateName = (rule, value, callback) => {
        usersApi.checkName(value).then(res =>{
          console.log(res);
          if(res.data.flag){
            //可以注册
            callback()
          }else{
            //已存在
            callback(new Error('该用户名已存在'))
          }
        }).catch(err=>{
          callback(new Error('服务器繁忙。稍后再试'))
        })
      };
    return {
      ruleForm: {
        name: "",
        password: "", 
        checked: false,
      },
      rules: {
        name: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { validator: validateName, trigger: 'blur' }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
        
      },
    };
  },
  methods: {
    submitForm(formName) {
      // this.$refs[formName].validate((valid) => {
      this.$refs.from.validate(async valid => {
        if (valid) {
          try {
            let psw = this.$md5(this.ruleForm.password)
            let p = await usersApi.reg(this.ruleForm.name, psw)
            console.log(p.data);
            if(p.data.flag){
              this.$message({
                message:"注册成功",
                type: "success"
              });
              console.log(1);

              //注册成功跳转到登录页面
              this.$router.push({
                path:"/login",
                query:{name: this.ruleForm.name}
              })
            }else{ 
              this.$message({
                message:"注册失败",
                type: "error"
              })
            }
          } catch(err){
            this.$message({
                message:"服务器异常",
                type: "error"
              })
          }
        } else {
          // console.log("error submit!!");
          // return false;
        }
      });
    },
    gotologin() {
      this.$router.push("/Login")
    },
  },
  watch:{
    ruleForm:{
      deep: true,
      handler: function (val) {
        if(val.checked){
          this.$message({
          message: "请不要在公共场合使用该功能",
          type:"warning"
          })
        }
      } 
    }
  },

  // created() {
  //   usersApi.checkName('malin').then(res =>{
  //     console.log(res);
  //   })
  // }
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
