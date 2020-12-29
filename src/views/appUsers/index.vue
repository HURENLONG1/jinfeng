<template>
  <div class="main">
    <app-link></app-link>

    <!-- 搜索表单 -->
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchForm.name" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.sex" placeholder="性别">
          <el-option label="女" value="女"></el-option>
          <el-option label="男" value="男"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchall" icon="el-icon-search">查询</el-button>
        <el-button type="primary" @click="reset" icon="el-icon-refresh-left">重置</el-button>
        <el-button type="primary" @click="addUser" icon="el-icon-document">新增</el-button>
      </el-form-item>
    </el-form>

    <!-- 用户列表页 -->
    <el-table :data="list" style="width: 100%" border stripe>
      <!--里面的border是代表给表格添加边框，stripe是代表给表格添加隔行变色  -->
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="username" label="账号" width="120"></el-table-column>
      <el-table-column prop="name" label="真实姓名" width="120"></el-table-column>
      <el-table-column prop="sex" label="性别" width="50"></el-table-column>
      <el-table-column prop="phone" label="手机号码" width="140"></el-table-column>
      <el-table-column prop="birthday" label="出生日期" width="100"></el-table-column>
      <el-table-column label="头像" width="60">
        <template slot-scope="scope">
          <img :src="scope.row.pic" alt style="width:50px;height:50px" />
        </template>
      </el-table-column>
      <el-table-column prop="adderss" label="地址" width="220"></el-table-column>
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" @click="editUser(scope.row)">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="delUser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 修改密码的弹窗 -->
    <el-dialog :title="isAdd?'添加用户':'编辑用户'" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" class="demo-ruleForm" ref="ruleForm">
        <el-form-item label="真实姓名" prop="name">
          <el-input v-model="ruleForm.name" autocomplete="off" placeholder="请输入您的真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="ruleForm.sex" placeholder="性别">
            <el-option label="女" value="女"></el-option>
            <el-option label="男" value="男"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model.trim="ruleForm.phone" autocomplete="off" placeholder="请输入您的手机号码"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
          <el-date-picker
            v-model="ruleForm.birthday"
            format="yyyy 年   MM 月 dd 日"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item prop="adderss" label="地址">
          <el-input v-model="ruleForm.adderss" autocomplete="off" placeholder="请输入您的地址"></el-input>
        </el-form-item>
        <el-form-item prop="pic" label="上传头像">
          <el-upload
            class="upload-demo"
            action="/dev-pai/user/add"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-change="onChange"
            :before-remove="beforeRemove"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :auto-upload="false"
          >
            <el-button size="small" type="primary" ref="upload">点击上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="isAdd?add():edit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import appLink from "@/components/link";
import usersApi from "@/api/usersApi";
export default {
  data() {
    var validateName = (rule, value, callback) => {
      let reg = /1[3-9]\d{9}/;
      if (reg.test(value) && value.length == 11) {
        callback();
      } else {
        callback(new Error("请输入真确的手机号码"));
      }
    };
    return {
      searchForm: {},
      list: [],
      // currentPage4: 4,
      page: 1, //当前页
      pagesize: 10, //一页多少条
      total: 0, //总条数
      dialogFormVisible: false, //开关，控制新增按钮弹窗的开关
      rules: {
        //表单验证规则
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        phone: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          { validator: validateName, trigger: "blur" },
        ],
      },
      ruleForm: {},
      fileList: [],
      isAdd: true, //弹窗类别初始值，如果为true就显示为添加用户
    };
  },
  components: {
    appLink,
  },
  methods: {
    async fetchall() {
      try {
        let p = await usersApi.getList(
          this.page,
          this.pagesize,
          this.searchForm
        );
        console.log(p.data);
        if (p.data.data.length) {
          //查询到了数据
          this.list = p.data.data;
          this.total = p.data.total; //总条数
        } else {
          this.$message({
            message: "找不到该数据哦，换个条件试试",
            type: "warnning",
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    reset() {
      this.searchForm = {};
    },

    //点击打开新增弹窗
    addUser() {
      this.isAdd = true; //添加用户，弹窗开关设置为true
      this.dialogFormVisible = true;
      this.ruleForm = {}; //每次关闭弹窗后都应该清空表单
      this.fileList = []; //每次关闭弹窗的时候都应该清空表单
      // this.$refs["ruleForm"].resetFields()//关闭表单后清空错误的信息提示
      // this.$nextTick(()=>{
      //   this.$refs["ruleForm"].resetFields()
      // })
    },

    //点击打开编辑的弹窗
    editUser(row) {
      this.isAdd = false; //编辑弹窗设置为false
      this.fileList = [];
      console.log(row);
      this.dialogFormVisible = true; //点击打开弹窗
      usersApi.getuser(row._id).then((res) => {
        console.log(res.data);
        this.ruleForm = res.data.data;
        let obj = {
          name: this.ruleForm.fileNames,
          url: this.ruleForm.pic,
        };
        this.fileList.push(obj); //设置已经上传照片的回显
      });
    },

    //点击弹窗内的确定按钮，修改用户信息
    edit() {
      // console.log("修改用户信息 ");
      // this.$refs.upload.submit();
      let form = new FormData();
      form.append("name", this.ruleForm.name);
      form.append("sex", this.ruleForm.sex);
      form.append("phone", this.ruleForm.phone);
      form.append("birthday", this.ruleForm.birthday);
      form.append("adderss", this.ruleForm.adderss);
      form.append("_id", this.ruleForm._id);
      form.append("pic", this.ruleForm.pic);

      console.log(this.fileList);
      this.fileList.forEach((file) => {
        form.append("files", file.raw);
        form.append("fileNames", file.name);
      });
      console.log(form);

      usersApi.editUser(form).then((res) => {
        // console.log(res.data);
        if (res.data.flag) {
          //修改成功
          this.$message({
            message: "修改成功",
            type: "success",
          });

          //关闭弹窗并刷新页面
          this.dialogFormVisible = false;
          this.fetchall();
        } else {
          //修改失败
          this.$message({
            message: "修改失败",
            type: "error",
          });
        }
      });
    },
    delUser(row) {
      console.log(row);
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
                usersApi.delUser(row._id).then((res) => {
        if (res.data.flag) {
          //修改成功
          this.$message({
            message: "删除成功",
            type: "success",
          });

          //刷新页面
          this.fetchall();
        } else {
          //修改失败
          this.$message({
            message: "删除失败",
            type: "error",
          });
        }
      });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });

    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val; //每页多少条
      this.page = 1; //如果切换每页多少条，回到第一条开始看
      this.fetchall();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.fetchall();
    },

    //添加新用户:确定的时候把内容提交给后台
    add() {
      console.log(1);
      this.$refs.ruleForm.validate(async (res) => {
        console.log(res);
        if (res) {
          // this.$refs.upload.submit();
          //校验通过
          let form = new FormData();
          form.append("name", this.ruleForm.name);
          form.append("sex", this.ruleForm.sex);
          form.append("phone", this.ruleForm.phone);
          form.append("birthday", this.ruleForm.birthday);
          form.append("adderss", this.ruleForm.adderss);

          console.log(this.fileList);
          this.fileList.forEach((file) => {
            form.append("files", file.raw);
            form.append("fileNames", file.name);
          });
          console.log(form);
          try {
            let p = await usersApi.addUser(form);
            console.log(p.data);
            if (p.data.flag) {
              this.$message({
                message: "添加成功",
                type: "success",
              });
              // this.dialogFormVisible = false
              this.dialogFormVisible = false;
            }
          } catch (err) {
            console.log(err);
          }
        } else {
          //校验不通过不能提交
          this.$message({
            message: "注意书写条件哦",
            type: "error",
          });
        }
      });
    },

    //上传文件（上传头像）
    httpRequest(file) {},
    onChange(file, fileList) {
      this.fileList = fileList;
    },

    //删除已经上传的图片
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      let url = file.url;
      usersApi.delpic(this.ruleForm._id, url).then((res) => {
        if (res.data.flag) {
          this.$message({
            message: "删除成功",
            type: "success",
          });
        } else {
          this.$message({
            message: "删除失败",
            type: "error",
          });
        }
      });
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
  },

  created() {
    this.fetchall(); //进入页面就发起请求
  },
};
</script>

<style >
.el-form {
  margin-top: 20px;
}
.el-pagination .el-pager li {
  width: 40px;
  height: 30px;
  background-color: #cccccc;
  margin-right: 5px;
}
</style>