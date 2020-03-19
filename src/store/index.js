import Vue from 'vue'
import Vuex from 'vuex'
import shortid from 'shortid';
import * as Mutation from './mutationTypes';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: []
  },
  mutations: {
    [Mutation.ADD_TASK](state, payload) {
      // payload should be the full task, including an id
      state.tasks.push(payload);
    },
    [Mutation.UPDATE_TASK](state, payload) {
      // payload should include the index and the updated task
      state.tasks.splice(payload.index, 1, payload.updatedTask);
    },
    [Mutation.REMOVE_TASK](state, payload) {
      // payload should include the index of the task to remove
      state.tasks.splice(payload.index, 1);
    },
    [Mutation.COMPLETE_TASK](state, payload) {
      let task = state.tasks[payload.index];
      task.complete = true;
    },
    [Mutation.CLEAR_TASK](state, payload) {
      let task = state.tasks[payload.index];
      task.complete = false;
    },
    [Mutation.REMOVE_COMPLETED_TASKS](state) {
      let filteredTasks = state.tasks.filter(t => !t.complete);
      Vue.set(state, 'tasks', filteredTasks);
    }
  },
  getters: {
    completedTasks: (state) => {
      return state.tasks.filter(t => t.complete);
    },
    activeTasks: (state) => {
      return state.tasks.filter(t => !t.complete);
    }
  },
  actions: {
    addTask({ commit }, payload) {
      return new Promise((resolve, reject) => {
        try {
          var newTask = { ...payload, id: shortid() };
          commit(Mutation.ADD_TASK, newTask);
          resolve();
        } catch (e) {
          reject(e);
        }
      })
    },
    updateTask({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        try {
          var taskIndex = state.tasks.findIndex(t => t.id === payload.id);
          if (taskIndex === -1) {
            reject(new Error(`Task id ${payload.id} was not found`));
          } else {
            commit(Mutation.UPDATE_TASK, { index: taskIndex, updatedTask: payload });
            resolve();
          }
        } catch (e) {
          reject(e);
        }
      });
    },
    removeTask({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        try {
          var taskIndex = state.tasks.findIndex(t => t.id === payload);
          if (taskIndex === -1) {
            reject(new Error(`Task id ${payload} was not found`));
          } else {
            commit(Mutation.REMOVE_TASK, { index: taskIndex });
            resolve();
          }
        } catch (e) {
          reject(e);
        }
      });
    },
    completeTask({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        try {
          var taskIndex = state.tasks.findIndex(t => t.id === payload);
          if (taskIndex === -1) {
            reject(new Error(`Task id ${payload} was not found`));
          } else {
            commit(Mutation.COMPLETE_TASK, { index: taskIndex });
            resolve();
          }
        } catch (e) {
          reject(e);
        }
      });
    },
    clearTask({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        try {
          var taskIndex = state.tasks.findIndex(t => t.id === payload);
          if (taskIndex === -1) {
            reject(new Error(`Task id ${payload} was not found`));
          } else {
            commit(Mutation.CLEAR_TASK, { index: taskIndex });
            resolve();
          }
        } catch (e) {
          reject(e);
        }
      });
    },
    removeCompletedTasks({ commit }) {
      return new Promise((resolve, reject) => {
        try {
          commit(Mutation.REMOVE_COMPLETED_TASKS);
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    }
  },
  modules: {
  }
})
