<template>
  <div>
    <el-card>
      <el-descriptions class="margin-top" title="个人信息登记" :column="2" border>
        <template slot="extra">
          <el-button type="primary" size="small" @click="dialogFormVisible = true">操作</el-button>
        </template>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            学号
          </template>
          {{ stuInfo.stuId }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-s-custom"></i>
            姓名
          </template>
          {{ stuInfo.name}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-odometer"></i>
            年龄
          </template>
          {{ stuInfo.age }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-male"></i>
            <i class="el-icon-female"></i>
            性别
          </template>
          <el-tag size="small">{{ stuInfo.sex == '0' ? '男':'女' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            手机号码
          </template>
          {{ stuInfo.phone }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            学院
          </template>
          {{ stuInfo.xueyuanName }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-basketball"></i>
            班级
          </template>
          {{ stuInfo.className }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-dialog title="修改个人信息" :visible.sync="dialogFormVisible">
      <el-form :model="stuInfo">
        <el-form-item label="学号" :label-width="formLabelWidth">
          <el-input v-model="stuInfo.stuId" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="stuInfo.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="stuInfo.age" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio-group v-model="stuInfo.sex" style="margin-bottom: 0">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号码" :label-width="formLabelWidth">
          <el-input v-model="stuInfo.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="学院" :label-width="formLabelWidth">
          <el-input v-model="stuInfo.xueyuanName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="班级" :label-width="formLabelWidth">
          <el-input v-model="stuInfo.className" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
  
</template>

<script>
export default {
  name: "StuInfo",
  data() {
    return{
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
      stuInfo:{},
      dialogFormVisible: false,
      formLabelWidth: '120px'
    }
  },
  
  created() {
    this.query();
  },
  methods: {
    query(){
      this.request.get("/user/queryStu/" + this.user.username).then(res => {
        if(res.code === '200') {
          this.stuInfo = res.data
          this.user.name = res.data.name
          localStorage.setItem("user",JSON.stringify(this.user))
        }
      })
    },
    cancel(){
      this.dialogFormVisible = false;
      this.query();
    },
    edit(){
      // console.log(this.stuInfo)
      this.request.post("/user/updateStu",this.stuInfo).then(res => {
        if(res.code === '200'){
          this.$message.success("信息修改成功!")
        }else{
          this.$message.error(res.msg);
        }
      })
      this.dialogFormVisible = false;
      this.query();
      location.reload()
    },
  }

}

</script>

<style scoped>
</style>