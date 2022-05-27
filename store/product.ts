export const state = () => ({
    product: [],
    idCategory: 0,
    search: ""
})


export const mutations = {
    setProductos(state: any, producto: any) {
        state.product = producto
    },
    setSearch(state: any, search: string) {
        state.search = search
    },
    addQuantity(state: any, producto: any) {
        const findProd = state.product.findIndex((item: any) => item.id === producto.id);
        if (findProd > -1) {
            const prod = state.product[findProd]
            prod.quantity = prod.quantity + 1
            state.product.splice(findProd, 1, prod)

        }
  
    },
    subQuantity(state: any, producto: any) {
        const findProd = state.product.findIndex((item: any) => item.id === producto.id);
        if (findProd > -1) {
            const prod = state.product[findProd]
            if (prod.quantity !== 1) {
                prod.quantity = prod.quantity - 1
                state.product.splice(findProd, 1, prod)
            }
        }
        // state.product = producto  
    },
    idCategory(state: any, item: any) {
        state.idCategory = item
    }

}