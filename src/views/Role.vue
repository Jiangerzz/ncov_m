<template>
  <div>
    <div>
      <el-input v-model="params.name" placeholder="请输入名称" style="width: 200px"/>
      <el-button type="primary" @click="load" style="margin-left: 10px">
       <span style="vertical-align: middle"> 搜索 </span>
      </el-button>
      <el-button type="warning" class="ml5" @click="reset">
        <span style="vertical-align: middle"> 重置 </span>
      </el-button>
      <div style="margin: 10px 0">
        <el-button type="success" @click="handleAdd">
         <span style="vertical-align: middle"> 新增 </span>
        </el-button>
      </div>
    </div>
    <div style="margin: 10px 0">
      <el-table :data="tableData" stripe border>
<!--        <el-table-column type="selection" width="55" />-->
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="flag" label="唯一标识"></el-table-column>

        <el-table-column label="操作" width="180">
          <template #default="scope">
            <el-button type="info" @click="selectMenu(scope.row)">分配菜单 <i class="el-icon-menu"></i></el-button>
            <el-popconfirm title="您确定删除吗？" @confirm="del(scope.row.id)">
              <template #reference>
                <el-button type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="菜单分配" :visible.sync="menuDialogVis" width="30%">
      <el-tree
          :props="props"
          :data="menuData"
          show-checkbox
          node-key="id"
          ref="tree"
          :default-expanded-keys="expends"
          :default-checked-keys="checks">
         <span class="custom-tree-node" slot-scope="{ node, data }">
            <span><i :class="data.icon"></i> {{ data.name }}</span>
         </span>
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="menuDialogVis = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleMenu">确 定</el-button>
      </div>
    </el-dialog>
    
    <div style="margin: 10px 0">
      <el-pagination
          @current-change="load"
          @size-change="load"
          v-model:current-page="params.pageNum"
          v-model:page-size="params.pageSize"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
      />
    </div>

    <el-dialog :visible.sync="dialogFormVisible" title="信息" width="40%">
      <el-form ref="ruleFormRef" :model="form" label-width="80px" style="padding: 0 20px" status-icon>
        <el-form-item prop="name" label="名称" >
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="flag" label="唯一标识" >
          <el-input v-model="form.flag" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
      <span>
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="save">
          保存
        </el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>

import request from "@/utils/request";

export default {
  name: "Role",
  data(){
    return{
      total: 0,
      tableData: [],
      params: {
        pageSize: 10,
        pageNum: 1,
        name: '',
      },
      dialogFormVisible: false,
      form: {},
      menuDialogVis: false,
      multipleSelection: [],
      menuData: [],
      props: {
        label: 'name',
      },
      expends: [],
      checks: [],
      roleId: 0,
      roleFlag: '',
      ids: []
    }
  },
  created() {
    this.load()
  },
  methods: {
    // handleEdit(row){
    //   this.form = row
    //   this.dialogFormVisible = true
    // },
    handleAdd(){
      this.form = {}
      this.dialogFormVisible = true
    },
    
    del(id){
      request.delete('/role/delete/' + id).then(res => {
        if(res.code === '200'){
          this.$notify.success('删除成功!')
          this.load()
        }else{
          this.$notify.error(res.msg)
        }
      })
    },
    load(){
      request.get("/role/page",{params: this.params}).then(res => {
        if(res.code === '200'){
          this.tableData = res.data.list
          this.total = res.data.total
        }
      })
      this.request.get("/menu/ids").then(r => {
        this.ids = r.data
      })
    },
    
    reset(){
      this.params.name = ""
      this.load()
    },
    save(){
      request.post("/role/save",this.form).then(res => {
        if(res.code === '200'){
          this.$notify.success('添加成功!')
        }else {
          this.$notify.error(res.msg)
        }
        this.dialogFormVisible = false
        this.load()
      })
    },
    saveRoleMenu() {
      this.request.post("/role/roleMenu/" + this.roleId, this.$refs.tree.getCheckedKeys()).then(res => {
        if (res.code === '200') {
          this.$message.success("绑定成功")
          this.menuDialogVis = false

          // 操作管理员角色后需要重新登录
          if (this.roleFlag === 'ROLE_ADMIN') {
            this.$store.commit("logout")
          }

        } else {
          this.$message.error(res.msg)
        }
      })
    },
    async selectMenu(role) {
      this.roleId = role.id
      this.roleFlag = role.flag

      // 请求菜单数据
      this.request.get("/menu").then(res => {
        this.menuData = res.data

        // 把后台返回的菜单数据处理成 id数组
        this.expends = this.menuData.map(v => v.id)
      })

      this.request.get("/role/roleMenu/" + this.roleId).then(res => {
        this.checks = res.data
        this.ids.forEach(id => {
          if (!this.checks.includes(id)) {
            // 可能会报错：Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'setChecked')
            this.$nextTick(() => {
              this.$refs.tree.setChecked(id, false)
            })
          }
        })
        this.menuDialogVis = true
      })
    },
    
  }
}
</script>

<style scoped>

</style>