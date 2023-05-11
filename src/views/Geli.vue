<template>
  <div>
    <div style="margin: 10px 0" v-if="this.user.roleId === '1'">
      <el-input style="width: 200px" placeholder="请输入账号" suffix-icon="el-icon-search" v-model="params.username"></el-input>
      <el-button class="ml-5" type="primary" style="margin-left: 10px" @click="query">搜索</el-button>
    </div>

    <div style="margin: 10px 0" v-if="this.user.roleId === '1'">
      <el-button type="primary" @click="addbnt">新增隔离记录 <i class="el-icon-circle-plus-outline"></i> </el-button>
    </div>

    <el-table :data="tableData" style="width: 100%" border scripe>
      <el-table-column type="index" label="序号" width="130">
      </el-table-column>
      <el-table-column prop="id" label="ID" v-if="false">
      </el-table-column>
      <el-table-column prop="username" label="账号" width="150">
      </el-table-column>
      <el-table-column prop="kssj" label="开始时间" width="180">
      </el-table-column>
      <el-table-column prop="jssj" label="结束时间" width="180">
      </el-table-column>
      <el-table-column prop="remark" label="备注" width="180">
      </el-table-column>
      <el-table-column prop="czsj" label="操作时间" width="180">
      </el-table-column>
      <el-table-column label="操作" v-if="this.user.roleId === '1'">
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

    <el-dialog title="新增隔离记录" :visible.sync="dialogFormVisible" width="30%">
      <el-form label-width="80px" size="small">
        <el-form-item label="账号">
          <el-input v-model="form.username" autocomplete="off"></el-input>
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
        <el-form-item label="备注" >
          <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="form.remark">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改隔离记录" :visible.sync="dialogFormVisible2" width="30%">
      <el-form label-width="80px" size="small">
        <el-form-item label="账号">
          <el-input v-model="form.username" autocomplete="off" disabled></el-input>
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
        <el-form-item label="备注" >
          <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="form.remark">
          </el-input>
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
  name: "Geli",
  
  data() {
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
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
    }
  },
  created() {
    this.query()
  },
  methods: {
    
    query(){
      if(this.user.roleId != '1'){
        this.params.username = this.user.username
      }
      request.get("/geli/list", {params: this.params}).then(res => {
        if(res.code === '200'){
          this.tableData = res.data.list
          this.total = res.data.total
        }
      })
      
    },
    
    addbnt() {
      this.form = {
      }
      this.dialogFormVisible = true
    },
    
    add(){
      request.post("/geli/add",this.form).then(res => {
        if(res.code === '200'){
          this.$notify.success('添加成功!')
        }else {
          this.$notify.error(res.msg)
        }
        this.dialogFormVisible = false
        this.query()
      })
    },

    cancel(){
      this.dialogFormVisible = false
      this.dialogFormVisible2 = false
      this.form = {}
    },
    edit(row){
      this.form = row
      this.dialogFormVisible2 = true
    },
    del(id){
      request.delete('/geli/delete/' + id).then(res => {
        if(res.code === '200'){
          this.$notify.success('删除成功!')
          this.query()
        }else{
          this.$notify.error(res.msg)
        }
      })
    },
    update() {
      request.post("/geli/update",this.form).then(res => {
        if(res.code === '200'){
          this.$notify.success('修改成功!')
        }else {
          this.$notify.error(res.msg)
        }
        this.dialogFormVisible2 = false
        this.query()
      })
    },
    handelCurrentChange(){
      this.params.pageNum = pageNum
      this.load()
    },
  }
}
</script>

<style scoped>

</style>