
import { computed, ref, useStore } from "@nuxtjs/composition-api";

export function usePrudctos() {
    const { state, commit } = useStore();

    const setProducto = (allProduc: any) => {
        commit('product/setProductos', allProduc)
    }

    const setCategoryID = (id: any) => {
        commit('product/idCategory', id)
    }
    const addQuantity = (payload: any) => {
        commit('product/addQuantity', payload)
    }
    const subQuantity = (payload: any) => {
        commit('product/subQuantity', payload)
    }

    const getProducto = computed(() => {
        //@ts-ignore   
        return state.product.product
    })
    const getCategoryId = computed(() => {
        //@ts-ignore   
        return state.product.idCategory
    })
    const search = computed(() => {
        //@ts-ignore   
        return state.product.search
    })
    const productfilt = computed(() => {
        const productxCategoria = getProducto.value
            .filter((value: any) => value.category.id === getCategoryId.value.id)
            .filter((value: any) => !search.value && search.value.length === 0 ? true : value.name.toLowerCase().includes(search.value))
        return productxCategoria

    })
    const setSearch = (payload: string) => {
        commit('product/setSearch', payload)
    }
    return {
        addQuantity,
        subQuantity,
        setSearch,
        setProducto,
        getProducto,
        setCategoryID,
        getCategoryId,
        productfilt
    }

}