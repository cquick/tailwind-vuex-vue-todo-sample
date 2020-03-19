<template>
  <div id="app">
    <h1>Tailwind Todo</h1>
    <div id="tabs">
      <div class="tab" :class="{'active':activeTab==='all'}" @click.stop="activeTab='all'">All Tasks</div>
      <div
        class="tab"
        :class="{'active':activeTab==='active'}"
        @click.stop="activeTab='active'"
      >Active Tasks</div>
      <div
        class="tab"
        :class="{'active':activeTab==='closed'}"
        @click.stop="activeTab='closed'"
      >Completed Tasks</div>
    </div>
    <div id="list">
      <h2 v-if="activeTab==='active'||activeTab==='all'">Tasks</h2>
      <h2 v-else>Completed Tasks</h2>
      <TaskList
        :tasks="visibleTasks"
        @complete:task="onCompleteTask"
        @clear:task="onClearTask"
        @update:task="onSaveChanges"
      ></TaskList>
    </div>
    <div id="newForm">
      <h2>New Task</h2>
      <TaskForm
        @save:changes="onAddTask"
        @cancel:changes="onCancelAddTask"
        :taskName.sync="taskName"
        :addMode="true"
      ></TaskForm>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

export default {
  name: "App",
  components: {
    TaskList,
    TaskForm
  },
  data: function() {
    return {
      activeTab: "all",
      taskName: ""
    };
  },
  computed: {
    ...mapState(["tasks"]),
    ...mapGetters(["activeTasks", "completedTasks"]),
    visibleTasks() {
      if (this.activeTab === "active") return this.activeTasks;
      if (this.activeTab === "closed") return this.completedTasks;
      return this.tasks;
    }
  },
  mounted() {
    this.addTask({ name: "Sample Task 1", complete: false });
    this.addTask({ name: "Sample Task 2", complete: false });
    this.addTask({ name: "Sample Task 3", complete: true });
  },
  methods: {
    onCompleteTask(taskId) {
      this.completeTask(taskId);
    },
    onClearTask(taskId) {
      this.clearTask(taskId);
    },
    onSaveChanges(e) {
      let task = this.tasks.find(t => t.id === e.id);
      this.updateTask({ ...task, name: e.name });
    },
    onAddTask(newName) {
      this.addTask({ name: newName, complete: false }).then(() => {
        this.taskName = "";
      });
    },
    onCancelAddTask() {
      this.taskName = "";
    },
    ...mapActions([
      "addTask",
      "updateTask",
      "removeTask",
      "completeTask",
      "clearTask",
      "removeCompletedTasks"
    ])
  }
};
</script>
<style lang="postcss">
body {
    @apply bg-blue-800 flex justify-center content-center h-screen items-center;
}
#app {
  @apply rounded bg-gray-200 p-8 border border-blue-900 shadow-md flex flex-col flex-grow;
  min-width: 320px;
  max-width: 800px;
}
#app h1 {
  @apply text-3xl text-blue-700 font-bold mb-3 self-center;
  text-shadow: 3px 3px 7px rgba(0, 0, 0, 0.3);
}
#app h2 {
  @apply text-xl text-gray-600 font-medium mb-3;
}
#tabs {
  @apply flex justify-between mb-4;
}
#tabs .tab {
  @apply bg-gray-400 p-2 rounded flex-grow mr-10 text-center;
}
#tabs .tab:last-child {
  @apply mr-0;
}
#tabs .tab.active {
  @apply bg-blue-700 text-gray-300;
}
</style>
