<template>
  <div class="warp">
       <div class="resulting">
          <h3>水松纸工段在线质量检测项目清单</h3>
          <div class="resulting_list">
            <label>产品名称：</label
            ><el-input
              class="edit_input"
              v-model="input"
              placeholder="请输入内容"
            ></el-input>
          </div>
          <div class="resulting_list">
            <label>生产日期：</label
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
          <div class="resulting_list">
            <label>班次：</label
            ><el-input
              class="edit_input"
              v-model="input"
              placeholder="请输入内容"
            ></el-input>
          </div>
          <div class="resulting_list">
            <label>检测人：</label
            ><el-input
              class="edit_input"
              v-model="input"
              placeholder="请输入内容"
            ></el-input>
          </div>
        </div>
        <div class="vxe_table">
          <vxe-table
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
              title="检验测试纸"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
            <vxe-table-column field="num1" title="工艺纪律执行情况" width="150">
              <vxe-radio-group v-model="value3">
                <vxe-radio name="n1" label="1" content="产品标示"></vxe-radio>
                <vxe-radio name="n1" label="2" content="工艺指导卡"></vxe-radio>
                <vxe-radio
                  name="n1"
                  label="3"
                  content="质量自检记录"
                ></vxe-radio>
                <vxe-radio name="n1" label="4" content="坚守岗位"></vxe-radio>
              </vxe-radio-group>
            </vxe-table-column>
            <vxe-table-column
              field="date12"
              title="备注信息"
              :edit-render="{ name: '$input', props: { type: 'text' } }"
            ></vxe-table-column>
          </vxe-table>
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
          name: "烫 金 工 序",
          index: "烫金颜色",
          date: "2019-05-01",
          address: "address abc123",
        },
        {
          id: 10002,
          name: "烫 金 工 序",
          index: "烫金组距（mm）",
          date: "2019-05-01",
          address: "address abc123",
        },
        {
          id: 10001,
          name: "烫 金 工 序",
          index: "烫金幅宽（mm）",
          date: "2019-05-01",
          address: "address abc123",
        },
        {
          id: 10001,
          name: "烫 金 工 序",
          index: "烫金（虚、糊）",
          date: "2019-05-01",
          address: "address abc123",
        },
        {
          id: 10001,
          name: "烫 金 工 序",
          index: "烫金纵横套印",
          date: "2019-05-01",
          address: "address abc123",
        },
        {
          id: 10002,
          name: "烫 金 工 序",
          index: "定量（g/m²）",
          date: "2019-05-01",
          address: "address abc123",
        },
        {
          id: 10001,
          name: "分 切 工 序",
          sex: "Man",
          date: "2019-05-01",
          address: "address abc123",
        },
        {
          id: 10001,
          name: "分 切 工 序",
          sex: "Man",
          date: "2019-05-01",
          address: "address abc123",
        },
        {
          id: 10001,
          name: "分 切 工 序",
          sex: "Man",
          date: "2019-05-01",
          address: "address abc123",
        },
        {
          id: 10002,
          name: "分 切 工 序",
          sex: "Man",
          date: "2019-05-01",
          address: "address abc123",
        },
        {
          id: 10001,
          name: "分 切 工 序",
          sex: "Man",
          date: "2019-05-01",
          address: "address abc123",
        },
        {
          id: 10001,
          name: "分 切 工 序",
          sex: "Man",
          date: "2019-05-01",
          address: "address abc123",
        },
        {
          id: 10001,
          name: "打 孔 工 序",
          sex: "Man",
          date: "2019-05-01",
          address: "address abc123",
        },
        {
          id: 10001,
          name: "打 孔 工 序",
          sex: "Man",
          date: "2019-05-01",
          address: "address abc123",
        },
        {
          id: 10001,
          name: "打 孔 工 序",
          sex: "Man",
          date: "2019-05-01",
          address: "address abc123",
        },
        {
          id: 10001,
          name: "打 孔 工 序",
          sex: "Man",
          date: "2019-05-01",
          address: "address abc123",
        },
        {
          id: 10001,
          name: "打 孔 工 序",
          sex: "Man",
          date: "2019-05-01",
          address: "address abc123",
        },
        {
          id: 10001,
          name: "打 孔 工 序",
          sex: "Man",
          date: "2019-05-01",
          address: "address abc123",
        },
        {
          id: 10001,
          name: "打 孔 工 序",
          sex: "Man",
          date: "2019-05-01",
          address: "address abc123",
        },
        {
          id: 10001,
          name: "打 孔 工 序",
          sex: "Man",
          date: "2019-05-01",
          address: "address abc123",
        },
        {
          id: 10001,
          name: "打 孔 工 序",
          sex: "Man",
          date: "2019-05-01",
          address: "address abc123",
        },
        {
          id: 10001,
          name: "复 卷 工 序",
          sex: "Man",
          date: "2019-05-01",
          address: "address abc123",
        },
        {
          id: 10001,
          name: "复 卷 工 序",
          sex: "Man",
          date: "2019-05-01",
          address: "address abc123",
        },
        {
          id: 10001,
          name: "复 卷 工 序",
          sex: "Man",
          date: "2019-05-01",
          address: "address abc123",
        },
        {
          id: 10001,
          name: "复 卷 工 序",
          sex: "Man",
          date: "2019-05-01",
          address: "address abc123",
        },
        {
          id: 10001,
          name: "复 卷 工 序",
          sex: "Man",
          date: "2019-05-01",
          address: "address abc123",
        },
        {
          id: 10001,
          name: "复 卷 工 序",
          sex: "Man",
          date: "2019-05-01",
          address: "address abc123",
        },
        {
          id: 10001,
          name: "成品标识",
          index: "甲",
          standard: "乙",
          sex2: "乙",
          date12: "丙",
        },
        {
          id: 10001,
          name: "交接班记录",
          index: "接班人",
        },
      ],
      mergeCells: [
        // 从第 row 行第 col 列开始合并 rowspan 行 colspan 列
        { row: 0, col: 0, rowspan: 5, colspan: 1 },
        { row: 0, col: 4, rowspan: 5, colspan: 1 },
        { row: 0, col: 5, rowspan: 5, colspan: 1 },

        { row: 5, col: 0, rowspan: 6, colspan: 1 },
        { row: 5, col: 4, rowspan: 6, colspan: 1 },
        { row: 5, col: 5, rowspan: 6, colspan: 1 },

        { row: 11, col: 0, rowspan: 6, colspan: 1 },
        { row: 11, col: 4, rowspan: 6, colspan: 1 },
        { row: 11, col: 5, rowspan: 6, colspan: 1 },

        { row: 17, col: 0, rowspan: 9, colspan: 1 },
        { row: 17, col: 4, rowspan: 9, colspan: 1 },
        { row: 17, col: 5, rowspan: 9, colspan: 1 },

        { row: 26, col: 0, rowspan: 6, colspan: 1 },
        { row: 26, col: 4, rowspan: 6, colspan: 1 },
        { row: 26, col: 5, rowspan: 6, colspan: 1 },

        { row: 32, col: 1, rowspan: 1, colspan: 2 },
        { row: 32, col: 3, rowspan: 1, colspan: 2 },
        // { row: 32, col: 4, rowspan: 1, colspan: 1 },
         { row: 33, col: 1, rowspan: 1, colspan: 5 },
      ],
    };
  },
  created() {},
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    // footerMethod({ columns, data }) {
    //   const footerData = [
    //     columns.map((column, _columnIndex) => {
    //       if (_columnIndex === 0) {
    //         return "成品标识";
    //       }
    //       // if (['name', 'rate'].includes(column.property)) {
    //       //   return XEUtils.mean(data, 'age')
    //       // }
    //       if (["index"].includes(column.property)) {
    //         console.log(column);
    //         // column.push({editRender: { name: 'input' }})
    //         return "甲";
    //       }
    //       if (["standard"].includes(column.property)) {
    //         return "乙";
    //       }
    //       if (["sex2"].includes(column.property)) {
    //         return "丙";
    //       }
    //       return null;
    //     }),
    //     columns.map((column, _columnIndex) => {
    //       if (_columnIndex === 0) {
    //         return "交接班记录";
    //       }
    //       if (["index"].includes(column.property)) {
    //         return "接班人：";
    //       }

    //       return null;
    //     }),
    //   ];
    //   return footerData;
    // },
    // footerColspanMethod({ _rowIndex, _columnIndex }) {
    //   if (_rowIndex === 0) {
    //     if (_columnIndex === 1) {
    //       return {
    //         rowspan: 1,
    //         colspan: 1,
    //       };
    //     } else if (_columnIndex === 2) {
    //       return {
    //         rowspan: 1,
    //         colspan: 2,
    //       };
    //     } else if (_columnIndex === 3) {
    //       return {
    //         rowspan: 1,
    //         colspan: 2,
    //       };
    //     }
    //   }
    //   if (_rowIndex === 1) {
    //     if (_columnIndex === 1) {
    //       return {
    //         rowspan: 1,
    //         colspan: 6,
    //       };
    //     }
    //   }
    // },
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
  /* margin-top: 15px; */
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