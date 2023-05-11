<template>
  <div>
    <div style="margin: 10px 0">
      <el-input style="width: 200px; margin-right: 10px" placeholder="请输入账号" suffix-icon="el-icon-search" 
                v-model="params.username"
                v-if="this.user.roleId === '1'"
      ></el-input>
      <el-date-picker
          v-model="params.tjsj"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
      </el-date-picker>
      <el-button class="ml-5" type="primary" style="margin-left: 10px" @click="query">搜索</el-button>
    </div>

    <div style="margin: 10px 0">
      <el-button type="primary" @click="daka" v-if="user.roleId != '1'">每日打卡 <i class="el-icon-circle-plus-outline"></i> </el-button>
    </div>

    <el-table :data="tableData" style="width: 100%" border scripe>
      <el-table-column type="index" label="ID" width="120">
      </el-table-column>
      <el-table-column prop="username" label="账号" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="tw" label="体温" width="180">
      </el-table-column>
      <el-table-column label="健康码" width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.jkm === '1'"><el-tag type="success">绿色</el-tag></span>
          <span v-if="scope.row.jkm === '2'"><el-tag type="warning">橙色</el-tag></span>
          <span v-if="scope.row.jkm === '3'"><el-tag type="danger">红色</el-tag></span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="身体状况" width="180">
      </el-table-column>
      <el-table-column prop="tjsj" label="提交时间" width="180">
      </el-table-column>
      <el-table-column label="操作" v-if="user.roleId != '1'">
        <template slot-scope="scope">
          <el-button type="success" @click="edit(scope.row)">重新打卡 <i class="el-icon-refresh"></i></el-button>
        </template>
      </el-table-column>
    </el-table>

  <el-dialog title="每日打卡" :visible.sync="dialogFormVisible" width="30%">
    <el-form label-width="80px" size="small">
      <el-form-item label="账号">
        <el-input v-model="form.username" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="姓名" >
        <el-input v-model="form.name" auto-complete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="体温" >
        <el-input v-model="form.tw" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="健康码">
        <el-select v-model="form.jkm" placeholder="请选择">
          <el-option label="绿色" value="1"></el-option>
          <el-option label="橙色" value="2"></el-option>
          <el-option label="红色" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="身体状况" >
        <el-input v-model="form.status" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="add">确 定</el-button>
    </div>
  </el-dialog>

    <el-dialog title="重新打卡" :visible.sync="dialogFormVisible2" width="30%">
      <el-form label-width="80px" size="small">
        <el-form-item label="账号">
          <el-input v-model="form.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" >
          <el-input v-model="form.name" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="体温" >
          <el-input v-model="form.tw" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="健康码">
          <el-select v-model="form.jkm" placeholder="请选择">
            <el-option label="绿色" value="1"></el-option>
            <el-option label="橙色" value="2"></el-option>
            <el-option label="红色" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身体状况" >
          <el-input v-model="form.status" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>

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
    
    
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Daka.Vue",
  
  data(){
    return {
      tableData: [],
      total: 0,
      params: { 
        pageSize: 10,
        pageNum: 1,
        tjsj: '',
        username: '',
        roleId: ''
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
    query(){
      this.params.roleId = this.user.roleId
      if(this.user.roleId != '1'){
          this.params.username = this.user.username 
      }
      request.get("/daka", {params: this.params}).then(res => {
        if(res.code === '200'){
          this.tableData = res.data.list
          this.total = res.data.total
        }
      })
    },
    daka(){
      this.form = {
        username: this.user.username,
        name: this.user.name
      }
      this.dialogFormVisible = true
    },
    cancel(){
      this.dialogFormVisible = false
      this.dialogFormVisible2 = false
      this.form = {}
      this.query()
    },
    add(){
      request.post("/daka/add",this.form).then(res => {
        if(res.code === '200'){
          this.$notify.success('添加成功!')
        }else {
          this.$notify.error(res.msg)
        }
        this.dialogFormVisible = false
        this.query()
      })
    },
    edit(row){
      this.form = row
      this.dialogFormVisible2 = true
    },
    update(){
      request.post("/daka/update",this.form).then(res => {
        if(res.code === '200'){
          this.$notify.success("修改成功")
        }else {
          this.$notify.error(res.msg)
        }
        this.dialogFormVisible2 = false
        this.query()
      })
    },
    
    handelCurrentChange(pageNum){
      this.params.pageNum = pageNum
      this.load()
    },
  }
}
</script>

<style scoped>

</style>