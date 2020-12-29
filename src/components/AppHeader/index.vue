<template>
  <div class="header">
    <a href="#/">
      <img src alt class="logo" />
      <span class="coompany">金丰会员管理系统</span>
    </a>

    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        个人中心
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="edit">修改密码</el-dropdown-item>
        <el-dropdown-item command="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <!-- 修改密码的对话框 -->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" class="demo-ruleForm" ref="ruleForm">
        <el-form-item label="旧密码" prop="oldpsw" type="password">
          <el-input
            v-model="ruleForm.oldpsw"
            autocomplete="off"
            placeholder="请输入您的旧密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newpsw">
          <el-input
            v-model="ruleForm.newpsw"
            autocomplete="off"
            placeholder="请输入您的新密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkpsw">
          <el-input
            v-model="ruleForm.checkpsw"
            autocomplete="off"
            placeholder="请输入您的确认密码"
            type="password"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editPsw">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import usersApi from "@/api/usersApi";
import { logOut, getUser } from "@/utils/auth";
export default {
  data() {
    //验证旧密码是否正确
    var validatePsw = (rule, value, callback) => {
      let psw = this.$md5(value);
      usersApi
        .login(this.userinf1.username, psw)
        .then((res) => {
          // console.log(res);
          if (res.data.flag) {
            //旧密码是正确的
            callback();
          } else {
            //旧密码不对
            callback(new Error("您的旧密码错误"));
          }
        })
        .catch((err) => {
          callback(new Error("服务器繁忙。稍后再试"));
        });
    };

    //验证新密码
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkpsw !== "") {
          this.$refs.ruleForm.validateField("checkpsw");
        }
        callback();
      }
    };

    //验证确认密码
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newpsw) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      dialogFormVisible: false, //这个是显示修改密码的弹框，true是显示，false是不显示
      ruleForm: {
        oldpsw: "", //旧密码
        newpsw: "", //新密码
        checkpsw: "", //确认密码
      },
      userinf1: {},
      // formLabelWidth: '120px'
      rules: {
        oldpsw: [
          { required: true, message: "就密码不能为空", trigger: "blur" },
          { validator: validatePsw, trigger: "blur" },
        ],
        newpsw: [{ validator: validatePass, trigger: "blur" }],
        checkpsw: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" },
          { min: 3, max: 15, message: "长度在3到15个字符", trigger: "blur" },
        ],
      },
    };
  },
  components: {},

  methods: {
    handleCommand(command) {
      console.log(command);
      if (command == "edit") {
        //修改密码
        this.dialogFormVisible = true;
      } else if (command == "logout") {
        //退出功能
        console.log("退出了");
        logOut();
        this.$message({
          message: "正在退出",
          type: "success",
          duration: 3000,
        });
        //跳转到登录页
        setTimeout(() => {
          this.$router.push("/login");
          this.$message({
            message: "退出成功",
            type: "success",
          });
        }, 3000);
      }
    },

    //修改密码
    editPsw() {
      // console.log(1);
      this.$refs.ruleForm.validate(async (res) => {
        //这个代码是表示修改密码弹窗是否点击确定或者取消，确定是true，取消是false
        if (res) {
          //表单正则校验通过，发送ajax
          try {
            let psw = this.$md5(this.ruleForm.checkpsw);
            let p = await usersApi.editPsw(
              this.userinf1.username,
              psw,
              this.userinf1.uid
            );
            console.log(p.data);
            if(p.data.flag){
              this.dialogFormVisible = false;
              this.$message({
                message: "密码修改成功",
                type: "success"
              });
              this.$router.push("/login");
              logOut();

            }else{
              this.$message({
                message: "修改失败",
                type: "error"
              })
            }
          } catch (err) {
            console.log(err);
          }
        } else {
          return;
        }
      });
    },
  },

  created() {
    let userkey = "jinfeng-user";
    var str = document.cookie;
    var arr = str.split(";");
    for (var ele of arr) {
      var arr2 = ele.split("=");
      if (userkey == arr2[0]) {
        return arr2[1];
      }
    }
    this.userinf1 = JSON.parse(arr2[1]);
    console.log(this.userinf1);
  },
};
</script>

<style scoped>
.logo {
  vertical-align: middle;
  padding: 0 10px 0 40px;
}
.coompany {
  position: absolute;
  color: white;
}

.el-dropdown-link {
  cursor: pointer;
  color: black;
  border: 1px solid white;
  background-color: white;
  border-radius: 10%;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.el-dropdown {
  float: right;
  padding-right: 20px;
}
</style>