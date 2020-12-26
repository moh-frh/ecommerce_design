import React, {useState, useEffect} from 'react'
import Products from './components/Products/Products'
import NavbarComp from './components/Navbar/Navbar'
import Checkout from './components/CheckoutForm/Checkout'
import {commerce} from './lib/commerce'
import Cart from './components/Cart/Cart'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
    const [products, setproducts] = useState([])
    const [cart, setCart] = useState({})
    const [Order, setOrder] = useState({})
    const [ErrorMessage, setErrorMessage] = useState('')




    const fetchProducts = async () => {
        const {data} = await commerce.products.list();

        setproducts(data);
    }

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    }

    const HandleAddCart = async(productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity)
        setCart(item.cart)
    }

    const HandleUpdateCartQty = async(productId, quantity) => {
        const {cart} = await commerce.cart.update(productId, {quantity})
        setCart(cart)
    }

    const HandleRemoveCart = async(productId) => {
        const {cart} = await commerce.cart.remove(productId)
        setCart(cart)
    }

    const emptyTheCart = async () => { 
        const { cart } = await commerce.cart.empty()
        setCart(cart)
    }

    const refreshCart = async () => { 
        const newCart  = await commerce.cart.refresh()
        setCart(newCart)
    }

    const handleCaptureCheckout = async (checkoutTokenId, NewOrder) => { 
        try{
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, NewOrder)
            setOrder(incomingOrder)
            refreshCart();
        }
        catch(error){
            setErrorMessage(error.data.error.messsage);
        }
    }

    // like did mount
    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, [])

    console.log(cart)

    return (
        <Router>
        <div>
            <NavbarComp totalItems={cart.total_items}/>
            <Switch>
                <Route exact path='/'>
                    <Products products={products}
                    onAddToCart={HandleAddCart}
                     />
                </Route>

                <Route exact path='/cart'>
                    <Cart cart={cart} emptyTheCart={emptyTheCart}
                                      HandleRemoveCart = {HandleRemoveCart}
                                      HandleUpdateCartQty = {HandleUpdateCartQty} />
                </Route>

                <Route exact path='/checkout'>
                    <Checkout
                        cart={cart}
                        order={Order}
                        onCaptureCheckout={handleCaptureCheckout}
                        error={ErrorMessage}

                    />
                </Route>
            </Switch>
             
        </div>
        </Router>
    )
}

export default App
