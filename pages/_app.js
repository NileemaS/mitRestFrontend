import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import {ApolloProvider,ApolloClient,HttpLink, InMemoryCache} from '@apollo/client'
import { useContext, useState} from 'react'
import Layout from "../components/Layout";
import '../styles/globals.css'
import AppContext from "../components/context";


function MyApp({ Component, pageProps }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";    
  const link = new HttpLink({ uri: `${API_URL}/graphql`})
  const cache = new InMemoryCache()
  const client = new ApolloClient({link,cache}); //initialize apollo-client

  var {cart, addItem, removeItem, restaurantID, setRestaurantID} = useContext(AppContext)
  const [state,setState] = useState({cart:cart, restaurantID:restaurantID});

  setRestaurantID = (newresid) => {
    setState( {restaurantID:newresid });
  };

  addItem = (item) => {
    let items  = state.cart === undefined || state.cart === null ? null : state.cart; 
   
    let foundItem = true;
    if(items !== null) {
      foundItem = items.items.find((i) => i.id === item.id);
     
      if(!foundItem) foundItem = false;
    }
    else{
      foundItem = false;
    } 
    
    if (!foundItem) {
      //set quantity property to 1
    
      let temp = JSON.parse(JSON.stringify(item));
      temp.quantity = 1;
      var newCart = {
          items: items !== null ? [...state.cart.items,temp] : [temp],
          total: items !== null ? (state.cart.total + item.attributes.price).toFixed(2) * 1
            : (item.attributes.price).toFixed(2) * 1,
      }
      setState({cart:newCart})
     
    } else {
      // we already have it so just increase quantity ++
    
      newCart= {
          items: items.items.map((item) =>{
            if(item.id === foundItem.id){
              return Object.assign({}, item, { quantity: item.quantity + 1 })
             }else{
            return item;
          }}),
          total: (state.cart.total + item.attributes.price).toFixed(2) * 1,
        }
    }
    setState({cart: newCart});  
    
  };
  removeItem = (item) => {
    let items  = state.cart;
    //check for item already in cart
    const foundItem = items.items.find((i) => i.id === item.id);
    if (foundItem.quantity > 1) {
      var newCart = {
        items: items.items.map((item) =>{
        if(item.id === foundItem.id){
          return Object.assign({}, item, { quantity: item.quantity - 1 })
         }else{
        return item;
      }}),
      total: (state.cart.total - item.attributes.price).toFixed(2) * 1,
      }
     
    } else { // only 1 in the cart so remove the whole item
      
      const index = items.items.findIndex((i) => i.id === foundItem.id);
      items.splice(index, 1);
      var newCart= { items: items, total: (state.cart.total - item.attributes.price).toFixed(2) * 1 } 
    }
    setState({cart:newCart});
  }

  return (
    <ApolloProvider client={client}>

      <AppContext.Provider value={{cart: state.cart, addItem: addItem, 
               removeItem: removeItem,
               restaurantID: state.restaurantID,
               setRestaurantID: setRestaurantID
                   }}>
      <Layout>
            <Component {...pageProps} />
      </Layout>
      </AppContext.Provider>
    </ApolloProvider>
  )
}

export default MyApp
