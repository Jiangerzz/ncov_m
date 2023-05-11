<template>
  <div>
    <div style="margin: 10px 0" v-if="user.roleId === '1'">
      <el-input style="width: 200px" placeholder="请输入账号" suffix-icon="el-icon-search" v-model="params.username"></el-input>
      <el-button class="ml-5" type="primary" style="margin-left: 10px" @click="query">搜索</el-button>
    </div>

    <div style="margin: 10px 0" v-if="user.roleId != '1'">
      <el-button type="primary" @click="addbnt">请假 <i class="el-icon-circle-plus-outline"></i> </el-button>
    </div>

    <el-table :data="tableData" style="width: 100%" border scripe>
      <el-table-column type="index" label="序号" width="50">
      </el-table-column>
      <el-table-column prop="id" label="ID" v-if="false">
      </el-table-column>
      <el-table-column prop="username" label="账号" width="100">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="100">
      </el-table-column>
      <el-table-column prop="qjsy" label="请假事宜" width="180">
      </el-table-column>
      <el-table-column prop="kssj" label="开始时间" width="160">
      </el-table-column>
      <el-table-column prop="jssj" label="结束时间" width="160">
      </el-table-column>
      <el-table-column label="审核状态" width="140">
        <template slot-scope="scope">
          <span v-if="scope.row.spzt === '1'"><el-tag type="info">待审核</el-tag></span>
          <span v-if="scope.row.spzt === '2'"><el-tag type="success">通过</el-tag></span>
          <span v-if="scope.row.spzt === '3'"><el-tag type="danger">驳回</el-tag></span>
        </template>
      </el-table-column>
      <el-table-column prop="czsj" label="提交时间" width="160">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="success" @click="edit(scope.row)" v-if="user.roleId != '1'">修改 <i class="el-icon-edit"></i>
          </el-button>
          <el-button type="success" @click="shenpi(scope.row)" v-if="user.roleId === '1'">审批 <i class="el-icon-edit"></i>
          </el-button>
          <el-popconfirm
              style="margin-left: 5px"
              title="您确定要删除这行数据吗？"
              @confirm="del(scope.row.id)">
            <el-button type="danger" slot="reference"
                       v-if="user.roleId != '1' && scope.row.spzt == '1'">删除 <i class="el-icon-remove-outline"></i></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="外出请假" :visible.sync="dialogFormVisible" width="30%">
      <el-form label-width="80px" size="small">
        <el-form-item label="账号">
          <el-input v-model="form.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" >
          <el-input v-model="form.name" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
              v-model="form.kssj"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
              v-model="form.jssj"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="请假事宜" >
          <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="form.qjsy">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="外出请假" :visible.sync="dialogFormVisible" width="30%">
      <el-form label-width="80px" size="small">
        <el-form-item label="账号">
          <el-input v-model="form.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" >
          <el-input v-model="form.name" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
              v-model="form.kssj"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
              v-model="form.jssj"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="请假事宜" >
          <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="form.qjsy">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改请假信息" :visible.sync="dialogFormVisible2" width="30%">
      <el-form label-width="80px" size="small">
        <el-form-item label="账号">
          <el-input v-model="form.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" >
          <el-input v-model="form.name" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
              v-model="form.kssj"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
              v-model="form.jssj"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="请假事宜" >
          <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="form.qjsy">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="审批请假信息" :visible.sync="dialogFormVisible3" width="30%">
      <el-form label-width="80px" size="small">
        <el-form-item label="账号">
          <el-input v-model="form.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" >
          <el-input v-model="form.name" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
              v-model="form.kssj"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间"
              disabled
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
              v-model="form.jssj"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间"
              disabled
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="请假事宜" >
          <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="form.qjsy"
              disabled
          >
          </el-input>
        </el-form-item>
        <el-form-item label="审批">
          <el-radio v-model="form.spzt" label="2">通过</el-radio>
          <el-radio v-model="form.spzt" label="3">驳回</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="sp">确 定</el-button>
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
  name: "QingJia",
  data(){
    return {
      tableData: [],
      total: 0,
      params: {
        pageSize: 10,
        pageNum: 1,
        username: '',
        roleId: ''
      },
      form: {},
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
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
      request.get("/wcqj", {params: this.params}).then(res => {
        if(res.code === '200'){
          this.tableData = res.data.list
          this.total = res.data.total
        }
      })
    },
    addbnt(){
      this.form = {
        username: this.user.username,
        name: this.user.name
      }
      this.dialogFormVisible = true
    },
    cancel(){
      this.dialogFormVisible = false
      this.dialogFormVisible2 = false
      this.dialogFormVisible3 = false
      this.form = {}
      this.query()
    },
    add(){
      request.post("/wcqj/add",this.form).then(res => {
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
      request.post("/wcqj/update",this.form).then(res => {
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
    del(id){
      request.delete('/wcqj/delete/' + id).then(res => {
        if(res.code === '200'){
          this.$notify.success('删除成功!')
          this.query()
        }else{
          this.$notify.error(res.msg)
        }
      })
    },
    shenpi(row){
      this.form = row
      this.dialogFormVisible3 = true
    },
    sp(){
      request.post("/wcqj/shenpi",this.form).then(res => {
        if(res.code === '200'){
          this.$notify.success('审批成功!')
        }else{
          this.$notify.error(res.msg)
        }
      })
      this.dialogFormVisible3 = false
      this.query()
    }
    
  }
}
</script>

<style scoped>

</style>