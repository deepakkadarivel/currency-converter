import { createApp } from 'vue'
import App from './App.vue'

import BaseInput from "./components/ui/BaseInput.vue";
import BaseSelect from "./components/ui/BaseSelect.vue";

createApp(App)
  .component('base-input', BaseInput)
  .component('base-select', BaseSelect)
  .mount('#app')
