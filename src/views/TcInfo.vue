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
            教职工号
          </template>
          {{ tcInfo.tcId }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-s-custom"></i>
            姓名
          </template>
          {{ tcInfo.name}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-odometer"></i>
            年龄
          </template>
          {{ tcInfo.age }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-male"></i>
            <i class="el-icon-female"></i>
            性别
          </template>
          <el-tag size="small">{{ tcInfo.sex == '0' ? '男':'女' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            手机号码
          </template>
          {{ tcInfo.phone }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
           职称
          </template>
          {{ tcInfo.zc }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-dialog title="修改个人信息" :visible.sync="dialogFormVisible">
      <el-form :model="tcInfo">
        <el-form-item label="教职工" :label-width="formLabelWidth">
          <el-input v-model="tcInfo.tcId" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="tcInfo.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="tcInfo.age" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio-group v-model="tcInfo.sex" style="margin-bottom: 0">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="职称" :label-width="formLabelWidth">
          <el-input v-model="tcInfo.zc" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" :label-width="formLabelWidth">
          <el-input v-model="tcInfo.phone" auto-complete="off"></el-input>
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
  name: "TcInfo",
  data() {
    return{
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
      tcInfo:{},
      dialogFormVisible: false,
      formLabelWidth: '120px'
    }
  },

  created() {
    this.query();
  },
  methods: {
    query(){
      this.request.get("/user/queryTc/" + this.user.username).then(res => {
        if(res.code === '200') {
          this.tcInfo = res.data
        }
      })
    },
    cancel(){
      this.dialogFormVisible = false;
      this.query();
    },
    edit(){
      this.request.post("/user/updateTc",this.tcInfo).then(res => {
        if(res.code === '200'){
          this.$message.success("信息修改成功!")

        }else{
          this.$message.error(res.msg);
        }
      })
      this.dialogFormVisible = false;
      this.query();
      location.reload()
    }
  }

}

</script>

<style scoped>
</style>