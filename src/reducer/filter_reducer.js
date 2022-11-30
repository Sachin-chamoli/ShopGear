const filterReducer = (state ,action) =>{
    switch (action.type) {

        case "LOAD_FILTER_PRODUCTS":
            let priceArr = action.payload.map((curElem)=> curElem.price);
            
            // 1st way 
            // console.log(Math.max.apply(Math , priceArr))

            // 2nd way
            // let maxprice = priceArr.reduce((initialVal, curVal) =>
            //     Math.max(initialVal, curVal)
            // ,0);
            // console.log(maxprice);
            
            // 3rd way 
            let maxPrice = Math.max(...priceArr);
            console.log(maxPrice);

            return  {
                ...state,
                filter_products : [...action.payload],
                all_products : [...action.payload],
                filters: {...state.filters , maxPrice , price : maxPrice}
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

                const {text, category, company, color, price} = state.filters;
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

                if(color !== "all"){
                    tempFilterProducts = tempFilterProducts.filter((curElem)=>
                        curElem.colors.includes(color)
                    );
                }

                if(price === 0){
                    tempFilterProducts = tempFilterProducts.filter((curElem) => 
                        curElem.price == price
                    );
                }
                else{
                    tempFilterProducts = tempFilterProducts.filter((curElem) => 
                        curElem.price <= price
                    );
                }
                return {
                    ...state,
                    filter_products :tempFilterProducts,
                }

                case "CLEAR_FILTERS" :
                    return {
                        ...state,
                        filters : {
                            ...state.filters,
                            text : "",
                            category : "all",
                            company : "all",
                            color : "all",
                            maxPrice : 0,
                            price : state.filters.maxPrice,
                            minPrice : state.filters.maxPrice,
                        }
                    }

        default : return state
    }
}

export default filterReducer;