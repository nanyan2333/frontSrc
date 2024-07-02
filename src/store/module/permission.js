import { defineStore } from "pinia";

const usePermissionStore = defineStore(
    'permisson',
    {
        state: ()=>({
            routes: [],
            menuName:[]
        }),
        actions:{
            setStates(route,name){
                this.routes = route;
                this.menuName = name;
            },
            hasPermission(route){
                return this.routes.includes(route);
            }
        }
    }
)

export default usePermissionStore;