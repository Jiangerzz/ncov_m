<template>
<div>

  <div style="margin: 10px 0" v-if="user.roleId === '1'">
    <el-input style="width: 200px" placeholder="请输入账号" suffix-icon="el-icon-search" v-model="params.username"></el-input>
    <el-button class="ml-5" type="primary" style="margin-left: 10px" @click="query">搜索</el-button>
  </div>
  
  <div style="margin: 10px 0">
    <el-button type="primary" @click="addbnt" v-if="this.user.roleId != '1'">新增核酸检测记录 <i class="el-icon-circle-plus-outline"></i> </el-button>
  </div>
  
  <el-table :data="tableData" style="width: 100%" border scripe>
    <el-table-column type="index" label="序号" width="130">
    </el-table-column>
    <el-table-column prop="id" label="ID" v-if="false">
    </el-table-column>
    <el-table-column prop="username" label="账号" width="150">
    </el-table-column>
    <el-table-column prop="cjsj" label="采集时间" width="180">
    </el-table-column>
    <el-table-column prop="jcsj" label="检测时间" width="180">
    </el-table-column>
    <el-table-column label="检测结果" width="180">
      <template slot-scope="scope">
        <el-image
          :src="require('@/assets/images/'+ scope.row.jcjg)"
          style="width: 100px;height: 100px"></el-image>
      </template>
    </el-table-column>
    <el-table-column prop="bz" label="备注" width="180">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="success" @click="edit(scope.row)">编辑 <i class="el-icon-edit"></i></el-button>
        <el-popconfirm
            style="margin-left: 5px"
            title="您确定要删除这行数据吗？"
            @confirm="del(scope.row.id)">
          <el-button type="danger" slot="reference">删除 <i class="el-icon-remove-outline"></i></el-button>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>

  <!--分页-->
  <div style="margin-top: 20px">
    <el-pagination background
                   :current-page="params.pageNum"
                   :page-size="params.pageSize"
                   layout="prev, pager, next"
                   :total="total"
                   @current-change="handelCurrentChange">
    </el-pagination>
  </div>
  
  <el-dialog title="新增核酸检测记录" :visible.sync="dialogFormVisible" width="30%">
    <el-form label-width="80px" size="small">
      <el-form-item label="账号">
        <el-input v-model="form.username" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="采集时间">
        <el-date-picker
            v-model="form.cjsj"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="检测时间">
        <el-date-picker
            v-model="form.jcsj"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      
      
      <el-form-item label="备注" >
        <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="form.bz">
        </el-input>
      </el-form-item>
      
      <el-form-item label="检测结果">
        <el-upload
            class="avatar-uploader"
            action="http://localhost:8081/hesuan/uploadImage"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="add">确 定</el-button>
    </div>
  </el-dialog>

  <el-dialog title="修改核酸检测记录" :visible.sync="dialogFormVisible2" width="30%">
    <el-form label-width="80px" size="small">
      <el-form-item label="账号">
        <el-input v-model="form.username" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="采集时间">
        <el-date-picker
            v-model="form.cjsj"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="检测时间">
        <el-date-picker
            v-model="form.jcsj"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>


      <el-form-item label="备注" >
        <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="form.bz">
        </el-input>
      </el-form-item>

      <el-form-item label="检测结果">
        <el-upload
            class="avatar-uploader"
            action="http://localhost:8081/hesuan/uploadImage"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
          <img v-if="this.form.jcjg" :src="require('@/assets/images/'+ this.form.jcjg)" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="update">确 定</el-button>
    </div>
  </el-dialog>
  
</div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Hesuan",
  
  data(){
    return {
      tableData: [],
      total: 0,
      imageUrl: '',
      params: {
        pageSize: 10,
        pageNum: 1,
        username: ''
      },
      form: {},
      dialogFormVisible: false,
      dialogFormVisible2: false,
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
    }
  },
  created() {
    this.query()
  },
  methods: {
    query() {
      this.params.roleId = this.user.roleId
      if(this.user.roleId != '1'){
        this.params.username = this.user.username
      }
      request.get("/hesuan/list", {params: this.params}).then(res => {
        if (res.code === '200') {
          this.tableData = res.data.list
          this.total = res.data.total
        }
      })
    },
    addbnt() {
      this.form = {}
      this.form.username = this.user.username
      this.dialogFormVisible = true
    },
    cancel(){
      this.dialogFormVisible = false
      this.dialogFormVisible2 = false
      this.form = {}
      this.query()
    },
    
    add(){
      console.log(this.form)
      request.post("/hesuan/add",this.form).then(res => {
        if(res.code === '200'){
          this.$message.success("添加成功!")
        }else {
          this.$message.error(res.msg)
        }
      })
      this.dialogFormVisible = false
      location.reload()
    },
    
    edit(row){
      this.form = row
      this.dialogFormVisible2 = true
    },
    
    update(){
      request.post("/hesuan/update",this.form).then(res => {
        if(res.code === '200'){
          this.$message.success("修改成功!")
        }else {
          this.$message.error(res.msg)
        }
        this.dialogFormVisible2 = false
      })
    },
    
    del(id){
      request.delete('/hesuan/delete/' + id).then(res => {
        if(res.code === '200'){
          this.$notify.success('删除成功!')
          this.query()
        }else{
          this.$notify.error(res.msg)
        }
      })
      this.query()
    },
    
    handelCurrentChange(pageNum){
      this.params.pageNum = pageNum
      this.query()
    },
    handleAvatarSuccess(res, file){
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.jcjg = res.data.title;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>