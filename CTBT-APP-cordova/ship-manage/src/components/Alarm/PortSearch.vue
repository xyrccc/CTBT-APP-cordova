<template>
    <div>
        <div class="title" style="font-size: 23px;padding-left: 20px; margin-bottom: 20px;float:left">
              <span class="el-icon-phone-outline"></span>
              港口查询
        </div>
        <br>
       <el-card style="margin-top:50px">
            <el-col :span="5">
                <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
            </el-col>
            <el-col :span="3" :offset="1"><el-button type="primary" width="200px">清除</el-button> </el-col>
            <div style="margin-top:60px">
                <el-tree class="filter-tree" :data="data" :props="defaultProps" default-expand-all :filter-node-method="filterNode" ref="tree"></el-tree>
            </div>
       </el-card>
    </div>
</template>
<script>
  export default {
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },

    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      }
    },

    data() {
      return {
        filterText: '',
        data: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    }
  };
</script>
<style scoped>
.el-card{
    margin-top: 50px;
}
</style>
