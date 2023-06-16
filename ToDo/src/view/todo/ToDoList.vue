<template>
  <div class="todo-list">
    <h2>我的一天</h2>
    <!-- 添加栏 -->
    <div class="add-bar">
      <input
        type="text"
        v-model="inputValue"
        placeholder="Enter what you want to do"
        maxlength="20"
        ref="inputBox"
      />
      <div class="add" @click="addToDo">Add</div>
    </div>
    <!-- 清单展示栏 -->
    <div class="list-bar">
      <template v-for="(item, index) in toDoList.data" v-key="item">
        <!-- 每条任务 -->
      <div class="list-item">
        <div :class="{ done: item.done }" @click="doneClick(index)">
          <span>{{ item.value }}</span>
        </div>
        <div class="remove-btn" @click="removeToDo(index)">remove</div>
      </div>
    </template></div>
  </div>
</template>

<script setup>
  import { onMounted, reactive, ref } from "vue";
  const inputValue = ref();
  const inputBox = ref(null);
  const toDoList = reactive({
    data: [
      { value: "洗衣服", done: false },
      { value: "学英语", done: false },
      { value: "吃饭", done: false },
    ],
  });
  const data = JSON.parse(localStorage.getItem("data"));
  if (data != []) {
    toDoList.data = data;
  }
  function addToDo() {
    if(inputValue.value) {
      toDoList.data.unshift({ value: inputValue.value, done: false });
      localStorage.setItem("data", JSON.stringify(toDoList.data));
      inputValue.value = undefined;
    }
  }
  function removeToDo(index) {
    toDoList.data.splice(index, 1);
    localStorage.setItem("data", JSON.stringify(toDoList.data));
  }
  function doneClick(index) {
    toDoList.data[index].done = !toDoList.data[index].done;
    localStorage.setItem("data", JSON.stringify(toDoList.data));
  }
  onMounted(() => {
    inputBox.value.addEventListener("keypress", (e) => {
      if (e.keyCode === 13) {
          addToDo();
      }
    });
  });
</script>

<style scoped>
  .todo-list {
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
  }
  .add-bar {
    display: flex;
  }
  .add {
    border: 1px solid rgb(23, 129, 181);
    border-radius: 4px;
    background-color: rgb(23, 129, 181);
    /* padding: 0 4vw; */
    width: 8vw;
    height: 3rem;
    text-align: center;
    line-height: 3rem;
    color: #fff;
    margin-left: 10px;
  }
  .disabled {
    color: darkgray;
  }
  input {
    border-radius: 4px;
    border: 1px solid #fff;
    outline: 0;
    height: 3rem;
    width: 40vw;
    font-size: 1.5rem;
    border: 1px solid rgb(23, 129, 181);
  }
  input:hover,
  input:focus {
    border: 1px solid rgb(23, 129, 181);
  }
  /* ------------- */
  .list-bar {
    height: 40vh;
    width: 49.5vw;
    background-color: #fff8dc;
    margin-top: 50px;
    border-radius: 10px;
    overflow: auto;
  }
  .list-item {
    display: flex;
    justify-content: space-between;
    padding: 10px 6vw;
    padding-left: 0;
    border-bottom: 1px solid grey;
  }
  .remove-btn {
    color: #fff;
    background-color: rgb(23, 129, 181);
    padding: 2px 4px;
    border-radius: 4px;
  }
  .done {
    text-decoration: line-through;
    color: darkgray;
  }

  /* 隐藏 Chrome、Safari 和 Opera 的滚动条 */
  .list-bar::-webkit-scrollbar {
    display: none;
  }

/* 隐藏 IE、Edge 和 Firefox 的滚动条 */
  .list-bar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  }
  
</style>
