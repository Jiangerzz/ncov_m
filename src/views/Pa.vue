<template>
<div>
  <div style="margin: 10px 0">
    <el-input style="width: 200px" placeholder="请输入标题" suffix-icon="el-icon-search" v-model="params.title"></el-input>
    <el-button class="ml-5" type="primary" style="margin-left: 10px" @click="query">搜索</el-button>
  </div>
  <div style="margin: 10px 0">
    <el-button type="primary" @click="addbnt" v-if="user.roleId === '1'">发布 <i class="el-icon-circle-plus-outline"></i> </el-button>
  </div>
  
  <el-table :data="tableData" style="width: 80%" border scripe>
    <el-table-column type="index" label="ID" width="70">
    </el-table-column>
    <el-table-column prop="id" v-if="false" label="id"></el-table-column>
    <el-table-column prop="title" label="标题" width="200">
    </el-table-column>
    <el-table-column prop="content" label="内容" width="240">
    </el-table-column>
    <el-table-column prop="fbsj" label="发布时间" width="240">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
<!--        <el-button type="success" @click="edit(scope.row)">编辑 <i class="el-icon-edit"></i></el-button>-->
        <el-button type="success" @click="xq(scope.row)" v-if="user.roleId != '1'">详情 <i class="el-icon-thumb"></i></el-button>
        <el-popconfirm
            style="margin-left: 5px"
            title="您确定要删除这行数据吗？"
            @confirm="del(scope.row.id)"
            v-if="user.roleId === '1'"
        >
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

  <el-dialog title="发布公告" :visible.sync="dialogFormVisible" width="30%">
    <el-form label-width="80px" size="small">
      <el-form-item label="标题">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="内容" >
        <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" v-model="form.content" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="add">确 定</el-button>
    </div>
  </el-dialog>
<!--  <el-dialog title="修改公告" :visible.sync="dialogFormVisible2" width="30%">-->
<!--    <el-form label-width="80px" size="small">-->
<!--      <el-form-item label="标题">-->
<!--        <el-input v-model="form.title" autocomplete="off"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="内容" >-->
<!--        <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" v-model="form.content" auto-complete="off"></el-input>-->
<!--      </el-form-item>-->
<!--    </el-form>-->
<!--    <div slot="footer" class="dialog-footer">-->
<!--      <el-button @click="cancel">取 消</el-button>-->
<!--      <el-button type="primary" @click="update">确 定</el-button>-->
<!--    </div>-->
<!--  </el-dialog>-->
  
  <el-dialog title="公告详情" :visible.sync="dialogFormVisible3" width="30%">
    <span style="text-align: center;display:block;">{{ form.title }}</span><br/>
    <p style="text-indent: 2em;">{{ form.content }}</p>
  </el-dialog>

  
</div>
</template>

<script>

import request from '../utils/request'

export default {
  name: "Pa",
  data() {
    return {
      tableData: [],
      params: {
        pageSize: 10,
        pageNum: 1,
        title: ''
      },
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      form: {},
      total: 0,
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
    }
  },
  
  created() {
    this.load()
  },
  
  methods: {
    query(){
     request.get("/pa/query/", {params: this.params}).then(res => {
       if(res.code === '200'){
         this.tableData = res.data.list
         this.total = res.data.total
       }else {
         this.$message.error(res.msg)
       }
     })
    },
    load(){
      request.get("/pa",{params: this.params}).then(res => {
        if(res.code === '200'){
          this.tableData = res.data.list
          this.total = res.data.total
        }else {
          this.$message.error(res.msg)
        }
      })
    },
    cancel(){
      this.form = {}
      this.dialogFormVisible = false
      this.dialogFormVisible2 = false
      this.dialogFormVisible3 = false
      this.load()
    },
    add(){
      request.post("/pa/add", this.form).then(res => {
        if(res.code === '200'){
          this.$message.success("添加成功!")
        }else {
          this.$message.error(res.msg)
        }
        this.query()
      })
      this.dialogFormVisible = false
      this.load()
    },
    update(){
      
    },
    edit(row){
      this.form = row
      this.dialogFormVisible2 = true
    },
    del(id){
      request.delete("/pa/delete/" + id).then(res => {
        if(res.code === '200'){
          this.$message.success("删除成功!")
        }else {
          this.$message.error(res.msg)
        }
      })
      location.reload()
    },
    xq(row){
      this.form = row
      this.dialogFormVisible3 = true
    },
    handelCurrentChange(newSize){
      this.params.pageNum = newSize
      this.load()
    },

    addbnt(){
      this.form = {}
      this.dialogFormVisible = true
    }
    
    
  }
  
}
</script>

<style scoped>

</style>