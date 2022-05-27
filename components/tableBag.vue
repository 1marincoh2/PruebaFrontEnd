<template>
 <div>
          <h3 class="ml-2 mb-3">Resumente de Compra</h3>
          <v-divider></v-divider>
          <v-simple-table>
            <template v-slot:default>
              <tbody>
                <tr v-for="item in getListCar" :key="item.name">
                  <td>{{ item.name }} <br />Price:{{ item.price }}</td>
                  <td>
                    <div style="display: flex">
                      <strong>Cantidad</strong>
                      <div
                        class="ml-5"
                        style="border: black solid 1px; width: 80px"
                      >
                        <v-btn
                          @click="subQuantity(item)"
                          icon
                          dark
                          small
                          color="primary"
                        >
                          <v-icon dark> mdi-minus </v-icon>
                        </v-btn>
                        <span>{{ item.quantity }}</span>
                        <v-btn
                          @click="addQuantity(item)"
                          icon
                          small
                          dark
                          color="indigo"
                        >
                          <v-icon dark> mdi-plus </v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </td>
                  <td>subtotal: {{ item.price * item.quantity }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2">Sum</td>
                  <td>{{ getTotal }}</td>
                </tr>
              </tfoot>
            </template>
          </v-simple-table>
     </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
    onMounted,
} from '@nuxtjs/composition-api'
import ProductService from '../common/service/category.service'
import { usePrudctos } from '~/Hooks/useProductos'
import { useShop } from '~/Hooks/useShop'

const index = defineComponent({
  setup() {
 

   
    const { addToCar, addQuantity, subQuantity, getListCar } = useShop()
 
 

   

  

    

    return {
     
      getListCar, 
      addQuantity,
      subQuantity,
     
    }
  },
})
export default index
</script>

