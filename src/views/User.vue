<template>
  <div>
    <div style="margin: 10px 0">
      <el-input style="width: 200px" placeholder="请输入账号" suffix-icon="el-icon-search" v-model="params.username"></el-input>
      <el-input style="width: 200px; margin-left: 10px" placeholder="请输入类型" suffix-icon="el-icon-s-custom" class="ml-5" v-model="params.roleId"></el-input>
      <el-button class="ml-5" type="primary" style="margin-left: 10px" @click="load">搜索</el-button>
    </div>
    
    <div style="margin: 10px 0">
      <el-button type="primary" @click="addbnt">新增 <i class="el-icon-circle-plus-outline"></i> </el-button>
    </div>
    
    <el-table :data="tableData" style="width: 100%" border scripe>
      <el-table-column type="index" label="ID" width="140">
      </el-table-column>
      <el-table-column prop="username" label="账号" width="240">
      </el-table-column>
      <el-table-column prop="password" label="密码" width="240">
      </el-table-column>
      <el-table-column label="角色" width="240">
        <template slot-scope="scope">
          <span v-if="scope.row.roleId === '1'">管理员</span>
          <span v-if="scope.row.roleId === '2'">学生</span>
          <span v-if="scope.row.roleId === '3'">教职工</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="success" v-if="scope.row.roleId != '1'" @click="edit(scope.row)">编辑 <i class="el-icon-edit"></i></el-button>
          <el-popconfirm
              style="margin-left: 5px"
              title="您确定要删除这行数据吗？"
              @confirm="del(scope.row.id)">
            <el-button type="danger" slot="reference" v-if="scope.row.roleId != '1'">删除 <i class="el-icon-remove-outline"></i></el-button>
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

    <el-dialog title="新增账户" :visible.sync="dialogFormVisible" width="30%">
      <el-form label-width="80px" size="small">
        <el-form-item label="账号">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" >
          <el-input v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.roleId" placeholder="请选择">
              <el-option label="管理员" value="1"></el-option>
            <el-option label="学生" value="2"></el-option>
            <el-option label="教职工" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改账户" :visible.sync="dialogFormVisible2" width="30%">
      <el-form label-width="80px" size="small">
        <el-form-item label="账号">
          <el-input v-model="form.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码" >
          <el-input v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.roleId" placeholder="请选择">
<!--            <el-option label="管理员" value="1"></el-option>-->
<!--            <el-option label="学生" value="2"></el-option>-->
<!--            <el-option label="教职工" value="3"></el-option>-->
            <el-option v-for="item in roleItem" :key="item.name" :label="item.name" :value="item.flag"></el-option>
          </el-select>
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
import request from '../utils/request'
export default {
  name: "User",
  
  data(){
    return{
      formLabelWidth: '120px',
      tableData: [],
      form: {},
      roleItem: [{
        value: '1',
        label: '管理员'
      },
        {
          value: '2',
          label: '学生'
        },
        {
          value: '3',
          label: '教职工'
        }],
      dialogFormVisible: false,
      dialogFormVisible2: false,
      params: {
        pageSize: 10,
        pageNum: 1,
        username: '',
        roleId: ''
      },
      total: 0,
    }
  },
  
  created() {
    this.load()
  },

  methods: {
    load(){
      request.get('/user/list',{params: this.params}).then(res => {
        if(res.code === '200'){
          // console.log(res)
          this.tableData = res.data.list
          this.tableData.forEach(item => {
            this.$set(item,'showPassword',false)
          })
          // console.log(this.tableData)
          this.total = res.data.total
        }
      })

      this.request.get("/role/page").then(res => {
        this.roleItem = res.data
      })
    },
    reset(){
      this.params = {
        pageSize: 10,
        pageNum: 1,
        username: '',
        roleId: ''
      }
      this.load()
    },
    del(id){
      request.delete('/user/delete/' + id).then(res => {
        if(res.code === '200'){
          this.$notify.success('删除成功!')
          this.load()
        }else{
          this.$notify.error(res.msg)
        }
      })
    },
    add(){
      request.post('/user',this.form).then(res => {
        if(res.code === '200'){
          this.$notify.success('添加成功!')
        }else{
          this.$notify.error(res.msg)
        }
        this.dialogFormVisible = false
        this.form = {}
        this.load()
      })

    },
    cancel(){
      this.form = {}
      this.dialogFormVisible = false
      this.dialogFormVisible2 = false
      this.load()
    },
    edit(row){
      this.form = row
      this.dialogFormVisible2 = true
    },
    update(){
      request.post('/user/update',this.form).then(res => {
        if(res.code === '200'){
          this.$notify.success('修改成功!')
        }else {
          this.$notify.error(res.msg)
        }
        this.dialogFormVisible2 = false
        this.form = {}
        this.load()
      })
    },
    addbnt(){
      this.form = {}
      this.dialogFormVisible = true
    },
    handelCurrentChange(pageNum){
      this.params.pageNum = pageNum
      this.load()
    },
    
  }
}

</script>

