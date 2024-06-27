import { defineStore } from "pinia";

const usePermissionStore = defineStore(
    'permisson',
    {
        state: ()=>({
            routes: []
        })
    }
)

export default usePermissionStore;