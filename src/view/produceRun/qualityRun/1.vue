<template>
  <div class="warp">
    <el-page-header @back="goBack" content="编辑"> </el-page-header>
    <div class="resulting">
      <h3>水松纸工段在线质量检测项目清单</h3>

      <div class="resulting_list">
        <label>检测人：</label
        ><el-input
          class="edit_input"
          v-model="input"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div class="resulting_list">
        <label>温度：</label
        ><el-input
          class="edit_input"
          v-model="input"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div class="resulting_list">
        <label>湿度：</label
        ><el-input
          class="edit_input"
          v-model="input"
          placeholder="请输入内容"
        ></el-input>
      </div>
    </div>
    <div class="vxe_table">
      <table>
        <tr>
          <td @click="changeEditable">
            <input
              v-show="editable"
              v-model="label"
              @keyup.enter="changeEditable"
            />
            <span v-show="!editable" v-model="label">显示内容</span>
          </td>
        </tr>
      </table>
      <!-- <vxe-table
        border
        resizable
        :data="tableData"
        :span-method="rowspanMethod"
        show-footer
        :edit-config="{ trigger: 'click', mode: 'cell' }"
      >
        <vxe-table-column
          field="name"
          title="工序"
          :edit-render="{
            name: 'input',
            immediate: true,
            attrs: { type: 'text' },
          }"
        ></vxe-table-column>
        <vxe-table-column
          field="index"
          title="指标名称"
          :edit-render="{
            name: 'input',
            immediate: true,
            attrs: { type: 'text' },
          }"
        ></vxe-table-column>
        <vxe-table-column
          field="standard"
          title="工艺标准"
          :edit-render="{
            name: 'input',
            immediate: true,
            attrs: { type: 'text' },
          }"
        ></vxe-table-column>
        <vxe-table-column
          field="sex2"
          title="判定"
          :edit-render="{
            name: 'input',
            immediate: true,
            attrs: { type: 'text' },
          }"
        >
          <vxe-radio-group v-model="value3">
            <vxe-radio name="n1" label="1" content="合格"></vxe-radio>
            <vxe-radio name="n1" label="2" content="不合格"></vxe-radio>
          </vxe-radio-group>
        </vxe-table-column>
        <vxe-table-column field="num1" title="工艺纪律执行情况" width="150">
          <vxe-radio-group v-model="value3">
            <vxe-radio name="n1" label="1" content="产品标示"></vxe-radio>
            <vxe-radio name="n1" label="2" content="工艺指导卡"></vxe-radio>
            <vxe-radio name="n1" label="3" content="质量自检记录"></vxe-radio>
            <vxe-radio name="n1" label="4" content="坚守岗位"></vxe-radio>
          </vxe-radio-group>
        </vxe-table-column>
      </vxe-table> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value3: "3",
      input: "",
      textarea: "",
      activeName: "first",
      radio: "1",
      map: "",
      tableData: [
        {
          id: 10001,
          name: "印 刷 工 序",
          index: "色相、色差、味",
          standard: "2019-05-01",
          address: "address abc123",
        },
        {
          id: 10001,
          name: "印 刷 工 序",
          index: "印刷组距（mm）",
          standard: "2019-05-01",
          address: "address abc123",
        },
        {
          id: 10002,
          name: "印 刷 工 序",
          index: "印刷幅宽（mm）",
          standard: "2019-05-01",
          address: "address abc123",
        },
        {
          id: 10001,
          name: "印 刷 工 序",
          index: "水分（%）",
          standard: "2019-05-01",
          address: "address abc123",
        },
        {
          id: 10001,
          name: "印 刷 工 序",
          index: "定量（g/m²）",
          standard: "2019-05-01",
          address: "address abc123",
        },

        {
          id: 10001,
          name: "备注",
        },
      ],
      mergeCells: [
        // 从第 row 行第 col 列开始合并 rowspan 行 colspan 列
        { row: 0, col: 0, rowspan: 5, colspan: 1 },
        { row: 0, col: 4, rowspan: 5, colspan: 1 },
        { row: 0, col: 5, rowspan: 5, colspan: 1 },

        { row: 5, col: 1, rowspan: 1, colspan: 5 },
        { row: 6, col: 1, rowspan: 1, colspan: 5 },
        { row: 7, col: 1, rowspan: 1, colspan: 5 },
      ],
    };
  },
  created() {},
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    onSubmit() {},
    rowspanMethod({ rowIndex, columnIndex }) {
      const { mergeCells } = this;
      for (let mIndex = 0; mIndex < mergeCells.length; mIndex++) {
        const { row, col, rowspan, colspan } = mergeCells[mIndex];
        if (row === rowIndex && col === columnIndex) {
          return { rowspan, colspan };
        }
        if (
          rowIndex >= row &&
          rowIndex < row + rowspan &&
          columnIndex >= col &&
          columnIndex < col + colspan
        ) {
          return { rowspan: 0, colspan: 0 };
        }
      }
      return { rowspan: 1, colspan: 1 };
    },
  },
};
</script>

<style>
.resulting,
.resulting2 {
  overflow: hidden;
}
.resulting_list {
  width: 33%;
  float: left;
  margin-bottom: 15px;
/* 
  margin-top: 15px; */
}
.resulting_list2 {
  margin-top: 15px;
}
.resulting_list label {
  display: inline-block;
  /* width: 100px;
  text-align: right; */
}
.resulting_list2 label {
  display: inline-block;
  width: 100px;
  text-align: right;
}
.picklistbtn {
  margin-top: 40px;
  width: 100%;
  text-align: center;
}
h3 {
  text-align: center;
}
table.gridtable {
  font-family: verdana, arial, sans-serif;
  font-size: 11px;
  color: #333333;
  border-width: 1px;
  border-color: #666666;
  border-collapse: collapse;
  width: 100%;
  margin-top: 15px;
}
table.gridtable th {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #dedede;
  background-color: #fff;
}
table.gridtable td {
  border-width: 1px;
  padding: 8px;
  width: 18%;
  border-style: solid;
  border-color: #dedede;
  background-color: #ffffff;
}
.vxe_table {
  margin-top: 20px;
}
</style>