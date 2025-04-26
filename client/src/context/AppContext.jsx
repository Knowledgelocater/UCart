import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();  // created context with the help hook createContext

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY; // importing currency from env file

    const navigate = useNavigate(); // to navigate to different routes
    const [user, setUser] = useState(null); // state to store user data
    const [isSeller, setIsSeller] = useState(false); // state to check if user is seller or not
    const [showUserLogin, setShowUserLogin] = useState(false); // state to show user login modal
    const [products, setProducts] = useState([]);

    const [cartItems, setCartItems] = useState({}); // state to store cart items
    const [searchQuery, setSearchQuery] = useState({}); // state to store cart items

    //Fetch Seller Status
    const fetchSeller = async () => {
        try {
            const { data } = await axios.get('/api/seller/is-auth')
            if (data.success) {
                setIsSeller(true)
            } else {
                setIsSeller(false)
            }
        } catch (error) {
            setIsSeller(false)
        }
    }

    //Fetch User Auth Status , User Data and cart items
    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/user/is-auth')
            if (data.success) {
                setUser(data.user)
                setCartItems(data.user.cartItems)
            }
        } catch (error) {
            setUser(null)
        }
    }

    //Fetch All Products
    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('/api/product/list')
            if (data.success) {
                setProducts(data.products)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    //Add product to cart
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems); // cloning cart items to avoid mutating state directly

        if (cartData[itemId]) {
            cartData[itemId] += 1; // if item already in cart increase quantity
        } else {
            cartData[itemId] = 1; // if item not in cart add it to cart
        }
        setCartItems(cartData); // setting cart items to updated cart data
        toast.success('Added to cart'); // showing success toast message
    }

    //Update Cart Item Quantity
    const updateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems); // cloning cart items to avoid mutating state directly
        cartData[itemId] = quantity; // updating cart item quantity
        setCartItems(cartData); // setting cart items to updated cart data
        toast.success('Cart updated'); // showing success toast message
    }

    //Remove Product from cart
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems); // cloning cart items to avoid mutating state directly
        if (cartData[itemId]) {
            cartData[itemId] -= 1; // if item already in cart decrease quantity
            if (cartData[itemId] === 0) {
                delete cartData[itemId]; // if quantity is 0 remove item from cart
            }
        }
        toast.success('Removed from cart'); // showing success toast message
        setCartItems(cartData); // setting cart items to updated cart data
    }

    // get cart items count
    const getCartCount = () => {
        let totalCount = 0; // initializing total count to 0
        for (const item in cartItems) {
            totalCount += cartItems[item]; // adding item quantity to total count
        }
        return totalCount; // returning total count
    }

    // get cart items total price
    const getCartAmount = () => {
        let totalAmount = 0; // initializing total amount to 0
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items); // finding item in products
            if (cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items]; // adding item price to total amount
            }
        }
        return Math.floor(totalAmount * 100) / 100; // returning total amount
    }

    useEffect(() => {
        fetchUser()
        fetchSeller()
        fetchProducts() // fetching products when component mounts
    }, [])

    // Update Database cartItems
    useEffect(() => {
        const updateCart = async () => {
            try {
                const { data } = await axios.post('/api/cart/update', { cartItems })
                if (!data.success) {
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error(error.message)
            }
        }
        if (user) {
            updateCart()
        }
    }, [cartItems])

    const value = {
        navigate, user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin, products,
        currency, addToCart, updateCartItem, removeFromCart, cartItems, searchQuery, setSearchQuery, getCartAmount, getCartCount, axios, fetchProducts, setCartItems
    }; // context value to be provided to children
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

//to export this context provider we will create fxn;
export const useAppContext = () => {
    return useContext(AppContext); // this will return the context value
}