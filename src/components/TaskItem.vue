<template>
  <div class="taskItem" :class="{'done':complete}">
    <button type="button" @click.stop="onCompleteTask" v-if="!complete" :disabled="editMode"></button>
    <button type="button" @click.stop="onClearTask" v-else :disabled="editMode">
      <span class="mdi mdi-check"></span>
    </button>
    <div v-if="editMode" class="taskItemForm">
      <TaskForm
        :taskName="taskName"
        @cancel:changes="onCancelChanges"
        @save:changes="onSaveChanges"
        ref="taskForm"
      ></TaskForm>
    </div>
    <div v-else @click.stop="editMode=true" class="taskName">{{taskName}}</div>
  </div>
</template>
<script>
import TaskForm from "./TaskForm";

export default {
  components: {
    TaskForm
  },
  props: {
    taskId: {
      type: String,
      required: true
    },
    taskName: {
      type: String,
      required: true
    },
    complete: {
      type: Boolean,
      required: true
    }
  },
  data: function() {
    return {
      editMode: false
    };
  },
  watch: {
    editMode(newValue) {
      if (newValue) {
        this.$nextTick(function() {
          document.querySelector("input", this.$refs.taskForm.$el).select();
        });
      }
    }
  },
  methods: {
    onSaveChanges(newName) {
      this.editMode = false;
      this.$emit("update:task", {
        id: this.taskId,
        name: newName
      });
    },
    onCancelChanges() {
      this.editMode = false;
    },
    onCompleteTask() {
      this.$emit("complete:task", this.taskId);
    },
    onClearTask() {
      this.$emit("clear:task", this.taskId);
    }
  }
};
</script>
<style lang="postcss" scoped>
.taskItem {
  @apply flex items-center my-4;
}
button {
  @apply p-1 rounded-full bg-white border border-gray-400 mr-2;
  width: 32px;
  height: 32px;
}
button span {
  @apply text-green-500;
}
.taskItem.done .taskName {
  @apply text-gray-600;
  text-decoration: line-through;
}

.taskItem .taskName,
.taskItem .taskItemForm {
  @apply flex-grow;
}

</style>