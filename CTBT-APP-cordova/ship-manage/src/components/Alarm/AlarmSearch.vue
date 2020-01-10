<template>
  <div>
<el-button type="text" @click="dialogFormVisible_process = true">点击打开 Dialog</el-button>

    <el-dialog title="报警信息处理" :visible.sync="dialogFormVisible_process" width="60vw">
      <el-row>
        <el-col span="8">
          <div style="font-size: small">
            船舶名称:
          </div>
        </el-col>
        <el-col span="8">
          <div style="font-size: small">
            联系人:
          </div>
        </el-col>
        <el-col span="8">
          <div style="font-size: small">
            联系电话:
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="8">
          <div style="font-size: small">
            产品ID:
          </div>
        </el-col>
        <el-col span="8">
          <div style="font-size: small">
            北斗卡号:
          </div>
        </el-col>
        <el-col span="8">
          <div style="font-size: small">
            MMSI:
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="8">
          <div style="font-size: small">
            经度:
          </div>
        </el-col>
        <el-col span="8">
          <div style="font-size: small">
            纬度:
          </div>
        </el-col>
        <el-col span="8">
          <div style="font-size: small">
            报位时间:
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="8">
          <div style="font-size: small">
            报位设备:
          </div>
        </el-col>
        <el-col span="8">
          <div style="font-size: small">
            设备ID:
          </div>
        </el-col>
        <el-col span="8">
          <div style="font-size: small">
            船舶状态:
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="8">
          <div style="font-size: small">
            船舶类型:
          </div>
        </el-col>
        <el-col span="8">
          <div style="font-size: small">
            船舶长宽:
          </div>
        </el-col>
        <el-col span="8">
          <div style="font-size: small">
            核载人数:
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="8">
          <div style="font-size: small">
            省市区县:
          </div>
        </el-col>
        <el-col span="8">
          <div style="font-size: small">
            乡镇街道:
          </div>
        </el-col>
        <el-col span="8">
          <div style="font-size: small">
            村服务站:
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="8">
          <div style="font-size: small">
            报警类型:
          </div>
        </el-col>
        <el-col span="8">
          <div style="font-size: small">
            报警时间:
          </div>
        </el-col>
        <el-col span="8">
          <div style="font-size: small">
            报警ID:
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="8">
          <div style="font-size: small">
            报警经度:
          </div>
        </el-col>
        <el-col span="8">
          <div style="font-size: small">
            报警纬度:
          </div>
        </el-col>
        <el-col span="8">
          <div style="font-size: small">
            报警航速:
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="8">
          <div style="font-size: small">
            报警设备:
          </div>
        </el-col>
        <el-col span="8">
          <div style="font-size: small">
            设备ID:
          </div>
        </el-col>
        <el-col span="8">
          <div style="font-size: small">
          </div>
        </el-col>
      </el-row>
      <el-form :model="form_process" label-width="120px">
        <el-form-item  label="处理人" label-width="80px">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="处理时间" label-width="80px">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible_process = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible_process=false">提交</el-button>
        <el-button type="primary" @click="dialogFormVisible_process=false">定位</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                dialogFormVisible_process: false
            };
        },
    };
</script>

