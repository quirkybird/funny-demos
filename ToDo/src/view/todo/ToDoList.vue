<template>
  <div class="todo-list">
    <input type="text" v-model="inputValue" placeholder="Enter what you want to do" maxlength="10">
    <button @click="addToDo"  v-if="inputValue">按钮</button>
    <button @click="addToDo" disabled="disabled" v-else>按钮</button>
    <template v-for="(item, index) in toDoList.data" v-key="item">
        <div class="list-item">
            <div :class="{ done: item.done }" @click="doneClick(index)">
           <span>{{ item.value }}</span>
        </div>
        <button @click="removeToDo(index)">移除</button>
        </div>
    </template>
  </div>
</template>

<script setup>
    import { reactive, ref } from "vue"
    const inputValue = ref()
    const toDoList = reactive({
       data: [
        {value: "洗衣服", done:false},
        {value: "学英语", done:false},
        {value: "吃饭", done:false},
       ]
    })
    const data =  JSON.parse(localStorage.getItem("data"))
    if(data != []) {
        toDoList.data = data
    }
    function addToDo() {
        toDoList.data.unshift({value: inputValue.value, done: false})
        localStorage.setItem("data", JSON.stringify(toDoList.data))
        inputValue.value = undefined
    }
    function removeToDo(index) {
        toDoList.data.splice(index, 1)
        localStorage.setItem("data", JSON.stringify(toDoList.data))
    }
    function doneClick(index) {
        toDoList.data[index].done = !toDoList.data[index].done 
        localStorage.setItem("data", JSON.stringify(toDoList.data))
    }
</script>

<style scoped>
    .todo-list {
        position: absolute;
        top: 25%;
        left: 50%;
        transform: translateX(-50%);
    }
    .list-item {
        display: flex;
    }
    .done {
        text-decoration: line-through;
    }

</style>