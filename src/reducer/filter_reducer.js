const filterReducer = (state ,action) =>{
    switch (action.type) {

        case "LOAD_FILTER_PRODUCTS":
            return  {
                ...state,
                filter_products : [...action.payload],
                all_products : [...action.payload],
            }
        
        case "SET_GRIDVIEW" :
            return {
                ...state,
                grid_view : true,
            }
        
        case "SET_LISTVIEW" :
            return {
                    ...state,
                    grid_view : false,
            }
        
        case "GET_SORT_VALUE" :
            // let userSortValue = document.getElementById('sort');
            // let sort_value = userSortValue.options[userSortValue.selectedIndex].value;
            
            return {
                ...state, 
                sorting_value: action.payload,
            }
        
        case "SORTING_PRODUCTS" :
            let newSortData;
            // let tempSortProduct = [...action.payload] ;

            const {filter_products} = state;
            let tempSortProduct = [...filter_products] ;
            
            const sortingProducts = (a ,b) =>{
                if(state.sorting_value === "a-z"){
                    return a.name.localeCompare(b.name);
                }
                
                if(state.sorting_value === "z-a"){
                    return b.name.localeCompare(a.name)
                 }

                if(state.sorting_value === "lowest"){
                    return a.price - b.price; 
                }

                if(state.sorting_value === "highest"){
                return b.price - a.price;
                }
            }
            newSortData = tempSortProduct.sort(sortingProducts)   
            return {
                ...state,
                filter_products :newSortData,
            }


            case "UPDATE_FILTERS_vALUE" :
                const {name, value} = action.payload;
                return{
                    ...state,
                    filters: {
                        ...state.filters,
                        [name] : value,
                    }
                }

            case "FILTER_PRODUCTS":
                let {all_products} = state;
                let tempFilterProducts = [...all_products];

                const {text, category, company} = state.filters;
                if(text){
                    tempFilterProducts = tempFilterProducts.filter((curElem)=>{
                        return curElem.name.toLowerCase().includes(text);
                    })
                }
                if(category !== "all"){
                    tempFilterProducts = tempFilterProducts.filter((curElem)=>{
                        return curElem.category === category;
                    })
                }

                if(company !== "all"){
                    tempFilterProducts = tempFilterProducts.filter((curElem)=>{
                        return curElem.company.toLowerCase() === company.toLowerCase();
                    })
                }
                return {
                    ...state,
                    filter_products :tempFilterProducts,
                }

        default : return state
    }
}

export default filterReducer;