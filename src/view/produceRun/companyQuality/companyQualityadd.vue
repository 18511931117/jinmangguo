<template>
  <div class="warp">
    <el-page-header @back="goBack" content="公司质检"> </el-page-header>
    <div class="xd_top">
      <!-- <div class="addbtn">
        <label>质检单名称：</label>
        <el-input
          v-model="name"
          placeholder="请输入"
          style="width: 200px"
        ></el-input>
      </div>
      <div class="addbtn">
        <el-button type="primary" @click="onSearch" size="small"
          >查询</el-button
        >
      </div> -->
    </div>
    <div class="xd_table">
      <vxe-table
        border
        :align="allAlign"
        show-overflow
        :edit-config="{ trigger: 'click', mode: 'cell' }"
        :data="tableData"
        ref="xTable"
        @edit-closed="editClosedEvent"
      >
        <vxe-table-column
          type="seq"
          width="60"
          title="序号"
          fixed="left"
        ></vxe-table-column>
        <vxe-table-column
          field="name"
          title="Name"
          width="80"
          fixed="left"
        ></vxe-table-column>
        <vxe-table-column
          field="qualityDate"
          title="日期"
          width="80"
          fixed="left"
        ></vxe-table-column>
        <vxe-table-column
          field="name3"
          title="班组"
          width="80"
          fixed="left"
        ></vxe-table-column>
        <vxe-table-column
          field="nam4"
          title="牌号"
          width="80"
          fixed="left"
        ></vxe-table-column>
        <vxe-table-column
          field="name5"
          title="编号"
          width="80"
          fixed="left"
        ></vxe-table-column>
        <vxe-table-colgroup title="外观">
          <vxe-table-colgroup title="色差">
            <vxe-table-column
              field="exteriorChromatismTest"
              title="检测值"
              width="80"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
            <vxe-table-column
              field="exteriorChromatismTestPoints"
              title="扣分"
              width="80"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
            <vxe-table-column
              field="exteriorChromatismBatch"
              title="批内不一致(10分)"
              width="80"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
            <vxe-table-column
              field="exteriorChromatismBatchtPoints"
              title="扣分"
              width="80"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
          </vxe-table-colgroup>
          <vxe-table-column
            field="exteriorWire"
            title="拉线(10分)"
            width="80"
            :edit-render="{
              name: 'input',
              immediate: true,
              attrs: { type: 'text' },
            }"
          ></vxe-table-column>
          <vxe-table-column
            field="exteriorColorBlock"
            title="色块(10分)"
            width="80"
            :edit-render="{
              name: 'input',
              immediate: true,
              attrs: { type: 'text' },
            }"
          ></vxe-table-column>
          <vxe-table-column
            field="exteriorPrintingPaste"
            title="印刷糊版(10分)"
            width="80"
            :edit-render="{
              name: 'input',
              immediate: true,
              attrs: { type: 'text' },
            }"
          ></vxe-table-column>
          <vxe-table-column
            field="exteriorOutOfPrint"
            title="脱版(30分)"
            width="80"
            :edit-render="{
              name: 'input',
              immediate: true,
              attrs: { type: 'text' },
            }"
          ></vxe-table-column>
          <vxe-table-column
            field="exteriorWhiteDot"
            title="白点(5分)"
            width="80"
            :edit-render="{
              name: 'input',
              immediate: true,
              attrs: { type: 'text' },
            }"
          ></vxe-table-column>
          <vxe-table-column
            field="exteriorIroningDeviation"
            title="套烫偏差(10分)"
            width="80"
            :edit-render="{
              name: 'input',
              immediate: true,
              attrs: { type: 'text' },
            }"
          ></vxe-table-column>
          <vxe-table-column
            field="exteriorGoldStamp"
            title="烫金糊版(10分)"
            width="80"
            :edit-render="{
              name: 'input',
              immediate: true,
              attrs: { type: 'text' },
            }"
          ></vxe-table-column>
          <vxe-table-column
            field="exteriorJinxu"
            title="金虚(5分)"
            width="80"
            :edit-render="{
              name: 'input',
              immediate: true,
              attrs: { type: 'text' },
            }"
          ></vxe-table-column>
          <vxe-table-column
            field="exteriorIndentation"
            title="压痕(5分)"
            width="80"
            :edit-render="{
              name: 'input',
              immediate: true,
              attrs: { type: 'text' },
            }"
          ></vxe-table-column>
          <vxe-table-column
            field="exteriorUnclearEmbossing"
            title="压纹不清(5分)"
            width="80"
            :edit-render="{
              name: 'input',
              immediate: true,
              attrs: { type: 'text' },
            }"
          ></vxe-table-column>
          <vxe-table-column
            field="exteriorDropGoldPowder"
            title="掉金粉(5分)"
            width="80"
            :edit-render="{
              name: 'input',
              immediate: true,
              attrs: { type: 'text' },
            }"
          ></vxe-table-column>
          <vxe-table-column
            field="exteriorLeveling"
            title="流平(10分)"
            width="80"
            :edit-render="{
              name: 'input',
              immediate: true,
              attrs: { type: 'text' },
            }"
          ></vxe-table-column>
          <vxe-table-column
            field="exteriorCreaseScratch"
            title="折痕划痕(10分)"
            width="80"
            :edit-render="{
              name: 'input',
              immediate: true,
              attrs: { type: 'text' },
            }"
          ></vxe-table-column>
          <vxe-table-column
            field="exteriorUnclean"
            title="重线(5分)"
            width="80"
            :edit-render="{
              name: 'input',
              immediate: true,
              attrs: { type: 'text' },
            }"
          ></vxe-table-column>
          <vxe-table-column
            field="exteriorHeavyLine"
            title="不洁净(5分)"
            width="80"
            :edit-render="{
              name: 'input',
              immediate: true,
              attrs: { type: 'text' },
            }"
          ></vxe-table-column>
          <vxe-table-colgroup title="平整度(5分)">
            <vxe-table-column
              field="exteriorPlanenessDisk"
              title="盘面"
              width="80"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
          </vxe-table-colgroup>
          <vxe-table-colgroup title="平整度(5分)">
            <vxe-table-column
              field="exteriorPlanenessPaper"
              title="纸张"
              width="80"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
          </vxe-table-colgroup>
          <vxe-table-column
            field="exteriorPlanenessScaldLeakage"
            title="漏烫(30分)"
            width="80"
            :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
          ></vxe-table-column>
          <vxe-table-column
            field="exteriorTangentialBias"
            title="切偏(10分)"
            width="80"
            :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
          ></vxe-table-column>
        </vxe-table-colgroup>

        <vxe-table-colgroup title="物理指标">
          <vxe-table-colgroup title="宽度mm(30分)">
            <vxe-table-column
              field="physicsWidthTest"
              title="检测值"
              width="80"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
            <vxe-table-column
              field="physicsWidthPoints"
              title="扣分"
              width="80"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
          </vxe-table-colgroup>
          <vxe-table-colgroup title="定量g/㎡(5分)">
            <vxe-table-column
              field="physicsRationTest"
              title="检测值"
              width="80"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
            <vxe-table-column
              field="physicsRationPoints"
              title="扣分"
              width="80"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
          </vxe-table-colgroup>
          <vxe-table-colgroup title="厚度mm(5分)">
            <vxe-table-column
              field="physicsThicknessTest"
              title="检测值"
              width="80"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
            <vxe-table-column
              field="physicsThicknessPoints"
              title="扣分"
              width="80"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
          </vxe-table-colgroup>
          <vxe-table-colgroup title="组距mm(25分)">
            <vxe-table-column
              field="physicsClassWidthTest"
              title="检测值"
              width="80"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
            <vxe-table-column
              field="physicsClassWidthPoints"
              title="扣分"
              width="80"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
          </vxe-table-colgroup>
          <vxe-table-colgroup title="墨层耐高温(5分)">
            <vxe-table-column
              field="physicsThermostabilityTest"
              title="检测值"
              width="80"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
            <vxe-table-column
              field="physicsThermostabilityPoints"
              title="扣分"
              width="80"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
          </vxe-table-colgroup>
          <vxe-table-colgroup title="接触角(10分)">
            <vxe-table-column
              field="physicsContactAngleJustTest"
              title="正面检测值"
              width="80"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
            <vxe-table-column
              field="physicsContactAngleJustPoints"
              title="扣分"
              width="80"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
            <vxe-table-column
              field="physicsContactAngleBackTest"
              title="反面检测值"
              width="80"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
            <vxe-table-column
              field="physicsContactAngleBackPoints"
              title="扣分"
              width="80"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
          </vxe-table-colgroup>
          <vxe-table-column
            field="physicsMissed"
            title="漏打(30分)"
            :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
          ></vxe-table-column>
          <vxe-table-colgroup title="透气度(10分)">
            <vxe-table-column
              field="physicsSecLeft"
              title="左侧检测值"
              width="80"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
            <vxe-table-column
              field="physicsSecRight"
              title="右侧检测值"
              width="80"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
            <vxe-table-column
              field="physicsSecPoints"
              title="扣分"
              width="80"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
          </vxe-table-colgroup>
          <vxe-table-colgroup title="变异系数(10分)">
            <vxe-table-column
              field="physicsCVLeft"
              title="左侧检测值"
              width="80"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
            <vxe-table-column
              field="physicsCVRight"
              title="右侧检测值"
              width="80"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
            <vxe-table-column
              field="physicsCVPoints"
              title="扣分"
              width="80"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
          </vxe-table-colgroup>
          <vxe-table-colgroup title="孔密度(10分)">
            <vxe-table-column
              field="physicsPorosityTest"
              title="检测值"
              width="80"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
            <vxe-table-column
              field="physicsPorosityPoints"
              title="扣分"
              width="80"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
          </vxe-table-colgroup>
          <vxe-table-colgroup title="孔带宽度(10分)">
            <vxe-table-column
              field="physicsBandWidthLeft"
              title="左侧检测值"
              width="80"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
            <vxe-table-column
              field="physicsBandWidthRight"
              title="右侧检测值"
              width="80"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
            <vxe-table-column
              field="physicsBandWidthPoints"
              title="扣分"
              width="80"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
          </vxe-table-colgroup>
          <vxe-table-colgroup title="孔线剧边(10分)">
            <vxe-table-column
              field="physicsPoreLineLeft"
              title="左侧检测值"
              width="80"
            ></vxe-table-column>
            <vxe-table-column
              field="physicsPoreLineRight"
              title="右侧检测值"
              width="80"
            ></vxe-table-column>
            <vxe-table-column
              field="physicsPoreLinePoints"
              title="扣分"
              width="80"
            ></vxe-table-column>
          </vxe-table-colgroup>
          <vxe-table-colgroup title="纵向抗张强度(5分)">
            <vxe-table-column
              field="physicsTensileStrengthTest"
              title="检测值"
              width="80"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
            <vxe-table-column
              field="physicsTensileStrengthPoints"
              title="扣分"
              width="80"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
          </vxe-table-colgroup>
          <vxe-table-colgroup title="纵向伸长率(5分)">
            <vxe-table-column
              field="physicsElongationTest"
              title="检测值"
              width="80"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
            <vxe-table-column
              field="physicsElongationPoints"
              title="扣分"
              width="80"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
          </vxe-table-colgroup>
          <vxe-table-colgroup title="白度(5分)">
            <vxe-table-column
              field="physicsWhitenessTest"
              title="检测值"
              width="80"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
            <vxe-table-column
              field="physicsWhitenessPoints"
              title="扣分"
              width="80"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
          </vxe-table-colgroup>
          <vxe-table-colgroup title="荧光白度(5分)">
            <vxe-table-column
              field="physicsFluorescentWhitenessTest"
              title="检测值"
              width="80"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
            <vxe-table-column
              field="physicsFluorescentWhitenessPoints"
              title="扣分"
              width="80"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
          </vxe-table-colgroup>
          <vxe-table-column
            field="physicsFade"
            title="褪色(10分)"
            width="80"
            :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
          ></vxe-table-column>
          <vxe-table-colgroup title="水分(5分)" width="80">
            <vxe-table-column
              field="physicsWaterContentTest"
              title="检测值"
              width="80"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
            <vxe-table-column
              field="physicsWaterContentPoints"
              title="扣分"
              width="80"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
          </vxe-table-colgroup>
        </vxe-table-colgroup>
        <vxe-table-colgroup title="接头">
          <vxe-table-column
            field="jointNotSecure"
            title="接头不牢固(10分)"
            width="80"
            :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
          ></vxe-table-column>
          <vxe-table-column
            field="jointLabeling"
            title="接头无明显标志(10分)"
            width="80"
            :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
          ></vxe-table-column>
          <vxe-table-column
            field="jointQuantityExceeds"
            title="接头数量超(5分)"
            width="80"
            :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
          ></vxe-table-column>
        </vxe-table-colgroup>
        <vxe-table-colgroup title="卷芯">
          <vxe-table-column
            field="rollCoreWallThickness"
            title="卷芯壁厚不合格(5分)"
            width="80"
            :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
          ></vxe-table-column>
          <vxe-table-column
            field="rollCoreInternalDiameter"
            title="卷芯内径不合格(5分)"
            width="80"
            :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
          ></vxe-table-column>
        </vxe-table-colgroup>
        <vxe-table-colgroup title="标识">
          <vxe-table-column
            field="identificationNothing"
            title="无标识(30分)"
            width="80"
            :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
          ></vxe-table-column>
          <vxe-table-column
            field="identificationNonstandard"
            title="标识无规范盘数(5分)"
            width="80"
            :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
          ></vxe-table-column>
          <vxe-table-column
            field="identificationErrorNum"
            title="标识错误盘数(30分)"
            width="80"
            :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
          ></vxe-table-column>
        </vxe-table-colgroup>
        <vxe-table-column
          field="diskRoundness"
          title="盘面圆度(5分)"
          width="80"
          :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
        ></vxe-table-column>
        <vxe-table-column
          field="peculiarSmell"
          title="异味(5分)"
          width="80"
          :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
        ></vxe-table-column>
        <vxe-table-column
          field="length"
          title="长度(5分)"
          width="80"
          :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
        ></vxe-table-column>
        <vxe-table-column
          field="other"
          title="其他(5分)"
          width="80"
          :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
        ></vxe-table-column>
        <vxe-table-column field="sumPoints" title="得分" width="80">
        
            <template v-slot="{ row }">
             <span>{{ countAmount(row) }} 分</span>
            </template>
       
        </vxe-table-column>
        <vxe-table-column
          field="recheck"
          title="复检"
          width="80"
          :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
        ></vxe-table-column>
        <vxe-table-column
          field="recheckReason"
          title="复检原因"
          width="80"
          :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
        ></vxe-table-column>
        <vxe-table-column
          field="remarks"
          title="备注"
          width="80"
          :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
        ></vxe-table-column>
      </vxe-table>
    </div>
  </div>
</template>

<script>
import { qualityCompanyFinishDetailsgetAll ,qualityCompanyFinishDetailsupdate} from "../../../api";
export default {
  data() {
    return {
      name: "",
      allAlign: "center",
      tableData: [
        {
          qualityDate: "1",
          exteriorChromatismTest: "",
          exteriorChromatismTestPoints: "",
          exteriorChromatismBatch: "",
          exteriorChromatismBatchtPoints: "",
          exteriorColorBlock:"",
          exteriorPrintingPaste:"",
          exteriorWire:"",
          exteriorOutOfPrint:"",
          exteriorWhiteDot:"",
          exteriorIroningDeviation:"",
          exteriorGoldStamp:"",
          exteriorJinxu:"",
          exteriorUnclean:'',
          exteriorIndentation:"",
          exteriorUnclearEmbossing:"",
          exteriorDropGoldPowder:"",
          exteriorLeveling:"",
          exteriorCreaseScratch:"",
          exteriorHeavyLine:"",
          exteriorPlanenessDisk:"",
          exteriorPlanenessPaper:"",
          exteriorPlanenessScaldLeakage:"",
          exteriorTangentialBias:"",
          physicsWidthTest:"",
          physicsWidthPoints:"",
          physicsRationTest:"",
          physicsRationPoints:"",
          physicsThicknessTest:"",
          physicsThicknessPoints:"",
          physicsClassWidthTest:"",
          physicsClassWidthPoints:"",
          physicsThermostabilityTest:"",
          physicsThermostabilityPoints:"",
          physicsContactAngleJustTest:"",
          physicsContactAngleJustPoints:"",
          physicsContactAngleBackTest:"",
          physicsContactAngleBackPoints:"",
          physicsMissed:"",
          physicsSecLeft:"",
          physicsSecRight:"",
          physicsSecPoints:"",
          physicsCVLeft:"",
          physicsCVRight:"",
          physicsCVPoints:"",
          physicsPorosityTest:"",
          physicsPorosityPoints:"",
          physicsBandWidthLeft:"",
          physicsBandWidthRight:"",
          physicsBandWidthPoints:"",
          physicsTensileStrengthTest:"",
          physicsTensileStrengthPoints:"",
          physicsElongationTest:"",
          physicsElongationPoints:"",
          physicsWhitenessTest:"",
          physicsWhitenessPoints:"",
          physicsPoreLineLeft:"",
          physicsPoreLinePoints:"",
          physicsPoreLineRight:"",
          physicsFade:"",
          physicsFluorescentWhitenessTest:"",
          physicsFluorescentWhitenessPoints:"",
          physicsWaterContentTest:"",
          physicsWaterContentPoints:"",
          jointNotSecure:"",
          jointLabeling:"",
          jointQuantityExceeds:"",
          rollCoreWallThickness:"",
          rollCoreInternalDiameter:"",
          identificationNothing:"",
          identificationNonstandard:"",
          identificationErrorNum:"",
          diskRoundness:"",
          peculiarSmell:"",
          length:"",
          other:"",
          
        },
      ],
      Total:100
    };
  },
  created(){
    //   this.init()
  },
  methods: {
    init() {
      qualityCompanyFinishDetailsgetAll().then((res) => {
  
        this.tableData = res.data.data;
      });
    },
     editClosedEvent ({ row, column }) {
              qualityCompanyFinishDetailsupdate({
                exteriorChromatismTest:row.exteriorChromatismTest,
                exteriorChromatismTestPoints:row.exteriorChromatismTestPoints,
                exteriorChromatismBatch:row.exteriorChromatismBatch,
                exteriorChromatismBatchtPoints:row.exteriorChromatismBatchtPoints,
                exteriorWire:row.exteriorWire,
                exteriorColorBlock:row.exteriorColorBlock,
                exteriorPrintingPaste:row.exteriorPrintingPaste,
                exteriorOutOfPrint:row.exteriorOutOfPrint,
                exteriorWhiteDot:row.exteriorWhiteDot,
                exteriorUnclean:row.exteriorUnclean,
                exteriorIroningDeviation:row.exteriorIroningDeviation,
                exteriorGoldStamp:row.exteriorGoldStamp,
                exteriorJinxu:row.exteriorJinxu,
                exteriorIndentation:row.exteriorIndentation,
                exteriorUnclearEmbossing:row.exteriorUnclearEmbossing,
                exteriorDropGoldPowder:row.exteriorDropGoldPowder,
                exteriorLeveling:row.exteriorLeveling,
                exteriorCreaseScratch:row.exteriorCreaseScratch,
                exteriorHeavyLine:row.exteriorHeavyLine,
                exteriorPlanenessDisk:row.exteriorPlanenessDisk,
                exteriorPlanenessPaper:row.exteriorPlanenessPaper,
                exteriorPlanenessScaldLeakage:row.exteriorPlanenessScaldLeakage,
                exteriorTangentialBias:row.exteriorTangentialBias,
                physicsWidthTest:row.physicsWidthTest,
                physicsWidthPoints:row.physicsWidthPoints,
                physicsRationTest:row.physicsRationTest,
                physicsRationPoints:row.physicsRationPoints,
                physicsThicknessTest:row.physicsThicknessTest,
                physicsThicknessPoints:row.physicsThicknessPoints,
                physicsClassWidthTest:row.physicsClassWidthTest,
                physicsClassWidthPoints:row.physicsClassWidthPoints,
                physicsThermostabilityTest:row.physicsThermostabilityTest,
                physicsThermostabilityPoints:row.physicsThermostabilityPoints,
                physicsContactAngleJustTest:row.physicsContactAngleJustTest,
                physicsContactAngleJustPoints:row.physicsContactAngleJustPoints,
                physicsContactAngleBackTest:row.physicsContactAngleBackTest,
                physicsContactAngleBackPoints:row.physicsContactAngleBackPoints,
                physicsMissed:row.physicsMissed,
                physicsSecLeft:row.physicsSecLeft,
                physicsSecRight:row.physicsSecRight,
                physicsSecPoints:row.physicsSecPoints,
                physicsCVLeft:row.physicsCVLeft,
                physicsCVRight:row.physicsCVRight,
                physicsCVPoints:row.physicsCVPoints,
                physicsPorosityTest:row.physicsPorosityTest,
                physicsPorosityPoints:row.physicsPorosityPoints,
                physicsBandWidthLeft:row.physicsBandWidthLeft,
                physicsBandWidthRight:row.physicsBandWidthRight,
                physicsBandWidthPoints:row.physicsBandWidthPoints,
                physicsTensileStrengthTest:row.physicsTensileStrengthTest,
                physicsTensileStrengthPoints:row.physicsTensileStrengthPoints,
                physicsElongationTest:row.physicsElongationTest,
                physicsElongationPoints:row.physicsElongationPoints,
                physicsWhitenessTest:row.physicsWhitenessTest,
                physicsWhitenessPoints:row.physicsWhitenessPoints,
                physicsFluorescentWhitenessTest:row.physicsFluorescentWhitenessTest,
                physicsFluorescentWhitenessPoints:row.physicsFluorescentWhitenessPoints,
                physicsFade:row.physicsFade,
                physicsWaterContentTest:row.physicsWaterContentTest,
                physicsWaterContentPoints:row.physicsWaterContentPoints,
                jointNotSecure:row.jointNotSecure,
                jointLabeling:row.jointLabeling,
                jointQuantityExceeds:row.jointQuantityExceeds,
                rollCoreWallThickness:row.rollCoreWallThickness,
                rollCoreInternalDiameter:row.rollCoreInternalDiameter,
                identificationNothing:row.identificationNothing,
                identificationNonstandard:row.identificationNonstandard,
                identificationErrorNum:row.identificationErrorNum,
                diskRoundness:row.diskRoundness,
                peculiarSmell:row.peculiarSmell,
                length:row.length,
                other:row.other,
              }).then(res => {
               
              })
              // let xTable = this.$refs.xTable
              // console.log(xTable)
              // let field = column.property
              // let cellValue = row[field]
              // // 判断单元格值是否被修改
              // if (xTable.isUpdateByRow(row, field)) {
              //   setTimeout(() => {
              //     this.$XModal.message({
              //       message: `局部保存成功！ ${field}=${cellValue}`,
              //       status: 'success'
              //     })
              //     // 局部更新单元格为已保存状态
              //     this.$refs.xTable.reloadRow(row, null, field)
              //   }, 300)
              // }
            },
    countAmount (row) {
      return this.Total -( Number(row.exteriorChromatismTest) + Number(row.exteriorChromatismTestPoints)+ Number(row.exteriorUnclean) + Number(row.exteriorChromatismBatch) + Number(row.exteriorChromatismBatchtPoints)+Number(row.exteriorWire)+Number(row.exteriorColorBlock)+Number(row.exteriorPrintingPaste)+Number(row.exteriorOutOfPrint)+Number(row.exteriorWhiteDot)+Number(row.exteriorIroningDeviation)+Number(row.exteriorGoldStamp)+Number(row.exteriorJinxu)+Number(row.exteriorIndentation)+Number(row.exteriorUnclearEmbossing)+Number(row.exteriorDropGoldPowder)+Number(row.exteriorLeveling)+Number(row.exteriorCreaseScratch)+Number(row.exteriorHeavyLine)+Number(row.exteriorPlanenessDisk)+Number(row.exteriorPlanenessPaper)+Number(row.exteriorPlanenessScaldLeakage)+Number(row.exteriorTangentialBias)+Number(row.physicsWidthTest)+Number(row.physicsWidthPoints)+Number(row.physicsRationTest)+Number(row.physicsRationPoints)+Number(row.physicsThicknessTest)+Number(row.physicsThicknessPoints)+Number(row.physicsClassWidthTest)+Number(row.physicsClassWidthPoints)+Number(row.physicsThermostabilityTest)+Number(row.physicsThermostabilityPoints)+Number(row.physicsContactAngleJustTest)+Number(row.physicsContactAngleJustPoints)+Number(row.physicsContactAngleBackTest)+Number(row.physicsContactAngleBackPoints)+Number(row.physicsMissed)+Number(row.physicsSecLeft)+Number(row.physicsSecRight)+Number(row.physicsSecPoints)+Number(row.physicsCVLeft)+Number(row.physicsCVRight)+Number(row.physicsCVPoints)+Number(row.physicsPorosityTest)+Number(row.physicsPorosityPoints)+Number(row.physicsBandWidthLeft)+Number(row.physicsBandWidthRight)+Number(row.physicsBandWidthPoints)+Number(row.physicsTensileStrengthTest)+Number(row.physicsTensileStrengthPoints)+Number(row.physicsElongationTest)+Number(row.physicsElongationPoints)+Number(row.physicsWhitenessTest)+Number(row.physicsWhitenessPoints)+Number(row.physicsFluorescentWhitenessTest)+Number(row.physicsFluorescentWhitenessPoints)+Number(row.physicsFade)+Number(row.physicsWaterContentTest)+Number(row.physicsWaterContentPoints)+Number(row.jointNotSecure)+Number(row.jointLabeling)+Number(row.jointQuantityExceeds)+Number(row.rollCoreWallThickness)+Number(row.rollCoreInternalDiameter)+Number(row.identificationNothing)+Number(row.identificationNonstandard)+Number(row.identificationErrorNum)+Number(row.diskRoundness)+Number(row.peculiarSmell)+Number(row.length)+Number(row.other)+Number(row.physicsPoreLineLeft)+Number(row.physicsPoreLinePoints)+Number(row.physicsPoreLineRight))
    },
    goBack() {
      this.$router.go(-1);
    },
    onSearch() {},
    
  },
};
</script>

<style>
/* .xd_top{
  margin-top: 15px;
} */
</style>