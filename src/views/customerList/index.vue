<script setup lang="ts" name="Tools">
import CustomerTable from "./component/CustomerTable.vue";
import { ref, onMounted } from "vue";
import { isNameValid, isPhoneNumberValid } from "@/utils/utils";
import { showFailToast, showToast } from "vant";
import { createCustomer, getManager, searchCustomer } from "@/api";
import headBg from "@/assets/head-bg.png";
import { useUser } from "@/store/user";
import { getToken } from "@/utils/token";

const useInfo = useUser();
const allData: any[] = ref([]); // 列表数据
const overlayShow: boolean = ref(false);
const addBtnState: boolean = ref(true);
const formUser = ref({
  customer_name: "", // 姓名
  mobile: "", // 手机号码
  userBranch: "",
  act_id: 39 // 活动id
});

const pageData = ref({
  total_count: 0, //记录总数
  current_page: 0, //当前页
  per_page: 0,//页大小
  last_page: 0 // 最后页
});

const searchData = ref({
  obtain_status: "", // 领取状态
  keyword: ""  // 姓名或手机号码
});

const columns = ref([
  { value: "0", text: "未领取" },
  { value: "1", text: "发放中" },
  { value: "2", text: "领取成功" },
  { value: "5", text: "领取失败" }
]);
const fieldValue = ref("");
const showPicker = ref(false);

const activityList = ref("新客有礼券包80元");

onMounted(() => {
  getCustomerList({});
  handleGetManager()
});

// 客户名单列表
const getCustomerList = (data) => {
  searchCustomer(data).then(res => {
    allData.value = res.data.data;
    pageData.value.total_count = res.data.total_count;
    pageData.value.current_page = res.data.current_page;
    pageData.value.per_page = res.data.per_page;
    pageData.value.last_page = res.data.last_page;
  }).catch(error => {
    showFailToast(error);
  });
};

const onConfirm = ({ selectedOptions }) => {
  console.log(688, selectedOptions);
  showPicker.value = false;
  fieldValue.value = selectedOptions[0].text;
  searchData.value.obtain_status = selectedOptions[0].value; // 列表的领取状态
};

const handlePageChanged = (value) => {
  pageData.value.current_page = value;
  getCustomerList({ page: pageData.value.current_page });
};

// 列表搜索
const handleInquire = () => {
  getCustomerList(searchData.value);
};

// 新增客户白名单
const onSubmit = () => {
  if (!isNameValid(formUser.value.customer_name)) {
    return;
  }
  //验证手机号码是否正确
  if (!isPhoneNumberValid(formUser.value.mobile)) {
    return;
  }
  if (!formUser.value.userBranch) return showToast("请选择网点支行");
  if (!formUser.value.act_id) return showToast("请选择活动");
  createCustomer(formUser.value).then(res => {
    if (res.code !== 0) {
      showFailToast(res.msg);
    } else {
      showToast(res.msg);
      overlayShow.value = false;
      getCustomerList({});
    }
  });
};

const handleGetManager = async () =>{
  const token = getToken()
  if (token){
    await getManager().then(res=>{
      if (res.code !== 0){
        showFailToast(res.msg)
      }else{
        useInfo.userInfo = res.data
        formUser.value.userBranch = res.data.branch_name;
      }
    })
  }
}
</script>

<template>
  <div class="customer-con">
    <div class="w-full h-full">
      <van-image
        width="100%"
        height="100%"
        :src="headBg"
      />
    </div>
    <div class="px-[26px] py-[40px] overflow-hidden">
      <div class="flex items-center justify-between">
        <van-field
          class="select-con"
          v-model="fieldValue"
          is-link
          readonly
          placeholder="选择状态"
          @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" round position="bottom">
          <van-picker
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="onConfirm"
          />
        </van-popup>

        <van-cell-group>
          <van-field
            class="input-info"
            v-model="searchData.keyword"
            center
            clearable
            placeholder="输入姓名或手机号"
            @focus="addBtnState = false"
            @blur="addBtnState = true"
          ></van-field>
        </van-cell-group>
        <van-button
          type="danger"
          class="w-[100px] !h-[70px] !rounded-[10px] !text-[24px]"
          @click="handleInquire"
        >搜索
        </van-button>
      </div>
      <CustomerTable :allData="allData" :total_count="pageData.total_count" :current_page="pageData.current_page"
                     :per_page="pageData.per_page" :last_page="pageData.last_page" @pageChanged="handlePageChanged" />
      <div v-if="addBtnState"
           class="addBtn w-[380px] px-[20px] py-[18px] text-center rounded-[40px] text-[32px] text-[#ffffff] bg-[#ec0e07]"
           @click="overlayShow = true;"
      >
        新增客户
      </div>
    </div>
  </div>
  <van-overlay class="!z-10" :show="overlayShow">
    <div class="wrapper p-[40px] text-[28px]" @click.stop>
      <div class="icon-cross" @click="overlayShow = false">
        <van-icon name="cross" />
      </div>
      <div class="mt-[30px] text-[42px] text-[#333333] font-bold text-center">
        新增白名单
      </div>
      <van-form class="!mt-[20px] overflow-hidden">
        <div class="flex items-center my-[30px]">
          <div class="w-[170px] text-right box-border text-[#333333]">
            姓名:
          </div>
          <input
            class="flex-auto ml-[20px] py-[10px] px-[20px] bg-[#f2f2f2] border-[2px] border-[#e0e0e0] border-solid rounded-[10px] text-[#333333]"
            v-model="formUser.customer_name"
            name="姓名"
            placeholder="请输入姓名"
          />
        </div>
        <div class="flex items-center my-[30px]">
          <div class="w-[170px] text-right box-border text-[#333333]">
            手机号:
          </div>
          <input
            class="flex-auto ml-[20px] py-[10px] px-[20px] bg-[#f2f2f2] border-[2px] border-[#e0e0e0] border-solid rounded-[10px] text-[#333333]"
            v-model="formUser.mobile"
            name="手机号"
            maxlength="11"
            placeholder="请输入手机号"
          />
        </div>
        <div class="flex items-center my-[30px]">
          <div class="w-[170px] text-right box-border text-[#333333]">
            网点支行:
          </div>
          <input
            class="flex-auto ml-[20px] py-[10px] px-[20px] bg-[#ffffff] border-[2px] border-[#e0e0e0] border-solid rounded-[10px] text-[#333333]"
            v-model="formUser.userBranch" readonly
          />
        </div>
        <div class="flex items-center my-[30px]">
          <div class="w-[170px] text-right box-border text-[#333333]">
            参与活动:
          </div>
          <input
            class="flex-auto ml-[20px] py-[10px] px-[20px] bg-[#ffffff] border-[2px] border-[#e0e0e0] border-solid rounded-[10px] text-[#333333]"
            v-model="activityList" readonly
          />
          <!--          <select-->
          <!--            class="flex-auto ml-[20px] py-[10px] px-[20px] bg-[#ffffff] border-[2px] border-[#e0e0e0] border-solid rounded-[10px] text-[#333333]"-->
          <!--            name="pets"-->
          <!--            id="pet-select"-->
          <!--            v-model="formUser.act_id"-->
          <!--            placeholder="请选择活动"-->
          <!--          >-->
          <!--            <option-->
          <!--              v-for="pet in activityList"-->
          <!--              :key="pet.value"-->
          <!--              :value="pet.id"-->
          <!--            >-->
          <!--              {{ pet.value }}-->
          <!--            </option>-->
          <!--          </select>-->
        </div>
        <van-button
          class="!mt-[40px] !mx-auto !w-[360px] !h-[90px] !text-[34px]"
          round
          block
          type="danger"
          native-type="submit"
          @click="onSubmit"
        >
          确定
        </van-button>
      </van-form>
    </div>
  </van-overlay>
</template>

<style lang="less">

.input-info {
  width: 350px;
  padding: 12px 20px;
  font-size: 26px;
  color: #333333;
  border-radius: 10px;
  border: 2px solid #ccc;
  box-sizing: border-box;
}

.wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: 60%;
  background-color: #fff;
  border-radius: 16px;

  .icon-cross {
    position: absolute;
    top: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #f11b1b;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
  }
}

.addBtn {
  position: fixed;
  left: 50%;
  bottom: 140px;
  transform: translate(-50%, 0);
}

.select-con {
  width: 200px;
  padding: 10px 20px;
  font-size: 26px;
  color: #333333;
  border-radius: 10px;
  border: 2px solid #ccc;
  box-sizing: border-box;
}

.van-toast {
  --van-toast-font-size: 34px;
  --van-toast-text-padding: 10px 20px;
  --van-toast-line-height: 1.6em;
}

.van-field {
  --van-cell-vertical-padding: 18px;
  --van-cell-horizontal-padding: 18px;
  --van-cell-font-size: 28px;
  --van-cell-icon-size: 28px;
  --van-cell-line-height: 1.6em;
  --van-field-error-message-font-size: 22px;
}

.van-popup {
  --van-picker-action-font-size: 28px;
  --van-picker-action-padding: 10px 20px;
  --van-picker-toolbar-height: auto;
  --van-picker-option-font-size: 28px;
}
</style>
