<template>
  <div class="taskForm">
    <input
      type="text"
      v-model="name"
      placeholder="Task Name (i.e. Wash Dishes)"
      @input="$emit('update:taskName',$event.target.value)"
      @keyup.enter="$emit('save:changes',$event.target.value)"
      @keyup.esc="$emit('cancel:changes')"
    />
    <button type="button" @click.stop="$emit('cancel:changes')">
      <span class="mdi mdi-close-circle-outline"></span>
    </button>
  </div>
</template>
<script>
export default {
  props: {
    taskName: {
      type: String,
      default: ""
    }
  },
  data: function() {
    return {
      name: this.taskName
    };
  },
  watch: {
    taskName(newName) {
      this.name = newName;
    }
  }
};
</script>
<style lang="postcss" scoped>
.taskForm {
  @apply flex justify-center items-center;
}
input {
  @apply flex-grow p-1 rounded-md;
}

button {
  @apply p-1 rounded-md bg-red-800 ml-2;
  width: 32px;
  height: 32px;
}
button:active, button:focus {
  @apply outline-none;
}
button span {
  @apply text-red-200;
}
 input {
  @apply transition-all duration-150;
}
 input:focus,  input:active {
  @apply bg-blue-200 outline-none shadow-outline;
}
</style>