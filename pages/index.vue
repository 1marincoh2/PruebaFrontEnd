<template>
  <v-row>
     <div class="title">
       {{getCategoryId.name}}
    </div>
    <v-col
      v-for="(item, index) in productfilt"
      :key="index"
      cols="12"
      sm="12"
      md="4"
    >
      <v-card class="mx-auto my-12"  max-width="374">
       
        <v-img @click="setCurrent(item)" height="250" :src="item.photo"></v-img>

        <v-card-title @click="setCurrent(item)" >{{ item.name }}</v-card-title>

        <v-card-text @click="setCurrent(item)" >
          <div class="my-4 text-subtitle-1">${{ item.price }}</div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-actions>
          <div style="display:flex">
                <div class="ml-5" style="border: black solid 1px; width: 80px;">
                <v-btn icon @click="subQuantity(item)" dark small color="primary">
                  <v-icon dark> mdi-minus </v-icon>
                </v-btn>
                <span>{{item.quantity}}</span>
                <v-btn icon @click="addQuantity(item)" small dark color="indigo">
                  <v-icon dark> mdi-plus </v-icon>
                </v-btn>
                
                </div>
                </div>
          <v-btn class="mx-2" @click="addToCar(item)" dark small color="primary">
            <v-icon dark> mdi-cart-plus </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Producto {{currentPro.name}}
        </v-card-title>

        <v-card-text>
          <v-container class="grey lighten-5">
            <v-row>
              <v-col cols="6">
                <v-img :src="currentPro.photo"></v-img>  
              </v-col>
              <v-col cols="6"> 
                <p><strong>Name:</strong> {{currentPro.name}}</p>
                <p><strong>Code:</strong> {{currentPro.code}}</p>
                <p><strong>Price:</strong> {{currentPro.price}}</p>
                <div style="display:flex">
                <strong>Cantidad</strong>
                <div class="ml-5" style="border: black solid 1px; width: 80px;">
                <v-btn @click="subQuantity(currentPro)" icon dark small color="primary">
                  <v-icon dark> mdi-minus </v-icon>
                </v-btn>
                <span>{{currentPro.quantity}}</span>
                <v-btn @click="addQuantity(currentPro)" icon small dark color="indigo">
                  <v-icon dark> mdi-plus </v-icon>
                </v-btn>
                
                </div>
                </div>
                subtotal
              </v-col>
              <v-col cols="12"> 
                <p>
                   {{currentPro.description}}
                </p>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
           <v-btn color="primary" text @click="dialog = false"> Seguir Comprando </v-btn>
         <v-spacer></v-spacer>
          <v-btn color="primary" @click="dialog = false">Agregar al Carro </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
} from '@nuxtjs/composition-api'
import ProductService from '../common/service/category.service'
import { usePrudctos } from '~/Hooks/useProductos'
import { useShop } from '~/Hooks/useShop'
const index = defineComponent({
  setup() {
    const dialog = ref(false)
    const { setProducto, getProducto, getCategoryId, productfilt, subQuantity,addQuantity } = usePrudctos()
    const {addToCar, getListCar} = useShop()
    const currentPro = ref({
       "id": 0,
       "attributes":[],
        "category": {
            "id": 0,
            "name": "",
            "order": 0
        },
        "name": "",
        "code": "",
        "stock": 0,
        "abstract": "",
        "description": "",
        "price":0,
        quantity: 1,
        "photo": ""
    })
    const productos = async () => {
      try {
        const serviceUse = new ProductService()
        const response = await serviceUse.productGet()
        if (response.length > 0 ){
          setProducto(response.map((item: any)=>({...item, quantity: 1})))
        }
      } catch (e) {}
    }
    const setCurrent = (item: any) => {
      currentPro.value = item
      dialog.value = true
    }
    onMounted(() => {
      productos()
    })

    const addQuantityLocal = ()=> {      
       
            currentPro.value.quantity = currentPro.value.quantity + 1
        // state.product = producto  
    }
    const subQuantityLocal = ()=> {      
            if (currentPro.value.quantity!==1) {
            currentPro.value.quantity = currentPro.value.quantity - 1
            }
        
        // state.product = producto  
    }
    return {
      subQuantityLocal,
      addQuantityLocal,
      currentPro,
      setCurrent,
      setProducto,
      getProducto,
      getCategoryId,
      productfilt,
      dialog,
      subQuantity,addQuantity,
      addToCar
    }
  },
})
export default index
</script>
