
import { computed, ref,useStore} from "@nuxtjs/composition-api";

export function useShop(){
    const {state,commit} = useStore();

    const addToCar =(payload:any)=>{        
        commit('shop/addProd',payload)
    }

    const getListCar =computed(()=>{     
        //@ts-ignore   
         return state.shop.list

    })

    const addQuantity = (payload:any)=>{   
        console.log("ssss");
             
        commit('shop/addQuantity',payload)
    }
    const subQuantity = (payload:any)=>{        
        commit('shop/subQuantity',payload)
    }
    
    return{
        getListCar,
        addToCar,
        addQuantity,
        subQuantity,
    }

}