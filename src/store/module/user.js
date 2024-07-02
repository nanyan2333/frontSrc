import { defineStore } from "pinia";

const useUserStore = defineStore(
    'userinfo',
    {
        state: ()=>({
            id: "",
            role: "",
        }),
        actions: {
            setId(_id){
                this.id = _id;
            },
            setRole(_role){
                this.role = _role;
            },
            isPatient(){
                return this.role == "patient" || this.role == "admin";
            },
            isDocter(){
                return this.role == "doctor" || this.role == "admin";
            }
        }
    }
)

export default useUserStore;