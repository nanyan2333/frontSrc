import { defineStore } from "pinia";
import { getToken } from "../../utils/auth";

const useUserStore = defineStore(
    'userinfo',
    {
        state: ()=>({
            id: "",
            role: "",
            token: getToken()
        }),
        actions: {
            setId(_id){
                this.id = _id;
            },
            setRole(_role){
                this.role = _role;
                console.log(this.role);
            },
            isPatient(){
                return this.role == "patient";
            },
            isDocter(){
                return this.role == "doctor";
            },
            isAdmin(){
                return this.role == "admin";
            }
        }
    }
)

export default useUserStore;