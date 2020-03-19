<template>
  <div>
    <div v-for="task in tasks" :key="task.id">
      <TaskItem
        :taskId="task.id"
        :taskName="task.name"
        :complete="task.complete"
        @complete:task="$emit('complete:task',$event)"
        @clear:task="$emit('clear:task',$event)"
        @update:task="$emit('update:task',$event)"
      ></TaskItem>
    </div>
    <div v-if="!hasTasks" class="noMessage">
      <p>{{message}}</p>
    </div>
  </div>
</template>
<script>
import TaskItem from "./TaskItem";

export default {
  components: {
    TaskItem
  },
  props: {
    tasks: {
      type: Array,
      default: function() {
        return [];
      }
    },
    message: {
      type: String,
      default: "No tasks"
    }
  },
  computed: {
    hasTasks() {
      return this.tasks.length > 0;
    }
  }
};
</script>
<style lang="postcss" scoped>
/* .noMessage {
  @apply my-4 text-orange-500 italic text-xl;
} */
</style>