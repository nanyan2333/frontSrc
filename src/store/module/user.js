import { defineStore } from "pinia";

const useUserStore = defineStore(
    'userinfo',
    {
        state: ()=>({
            username: "",
            role: ""
        }),
    }
)

export default useUserStore;