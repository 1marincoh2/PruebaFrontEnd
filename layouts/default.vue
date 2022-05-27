<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-img
              height="205"
              alt="Logo"
              src="https://c8.alamy.com/compes/jetg95/logotipo-de-tienda-de-mascotas-jetg95.jpg"
            />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list>
        <v-list-item
          v-for="(item, index) in productCategory"
          :key="index"
          router
          exact
          class="focusSelect text--white"
          
          
        >
          <v-list-item-content  @click="page(item)">
            <v-list-item-title v-text="item.name" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="#900C3F" :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon color="#FFFFFF" @click.stop="drawer = !drawer" />

      <v-toolbar-title style="color: white">I love Animal</v-toolbar-title>
      <v-spacer />
      <v-text-field
        style="margin-top: 25px"
        dense
        solo
        outlined
        v-model="search"
        @input="setSearch"
        label="Search"
        prepend-inner-icon="mdi-magnify"
      ></v-text-field>

      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="400"
        offset-x
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="  secondary" dark v-bind="attrs" v-on="on" icon>
            <v-icon color="#FFFFFF"> mdi-shopping</v-icon>
          </v-btn>
        </template>

        <v-card>
          <TableBag />
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
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
import tableBag from '../components/tableBag.vue'
import TableBag from '../components/tableBag.vue'

const index = defineComponent({
  components: { tableBag },
  setup() {
    const search = ref('')

    const { setCategoryID, setSearch } = usePrudctos()
    const { addToCar, addQuantity, subQuantity, getListCar } = useShop()
    const clipped = ref(true)
    const drawer = ref(false)
    const productCategory = ref([])
    const menu = ref(false)

    const getCatergoryProductos = async () => {
      try {
        const serviceUse = new ProductService()
        const response = await serviceUse.productCategoryGet()
        console.log(response, 'catergorias')
        productCategory.value = response
        if (response.length > 0) {
          setCategoryID(productCategory.value[0])
        }
      } catch (e) {}
    }

    const page = (id: number) => {
      setCategoryID(id)
    }

    const getTotal = computed(() => {
      const total = getListCar.value.reduce((prev: any, current: any) => {
        return prev + current.price * current.quantity
      }, 0)
      return total
    })

    onMounted(() => {
      getCatergoryProductos()
    })

    return {
      page,
      clipped,
      drawer,
      productCategory,
      menu,
      getListCar,
      getTotal,
      addQuantity,
      subQuantity,
      search,
      setSearch,
    }
  },
})
export default index
</script>
<style scoped>
.focusSelect {
  border-radius: 10px;
  border: solid;
  background: #66e867 !important;
}
</style>
