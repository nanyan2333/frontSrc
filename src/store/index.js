import { createPinia } from "pinia";
import persistedStatePlugin from '@/plugins/persistedState'

const store = createPinia();
store.use(persistedStatePlugin)

export default store;