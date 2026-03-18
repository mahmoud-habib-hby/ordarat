
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Provider } from './context/provider'
import { Cart } from './customer/cart'
import { Products } from './customer/products'
import { Frist } from './pages/frist'
import { Login } from './pages/login'
import { Orders } from './customer/ordars'
import { Home_delivery } from './delivery/home'
import { Details } from './delivery/details'
import { Work } from './delivery/work'
import { History } from './delivery/history'
import { Dashboard } from './admin/dashboard'
import { All_delivery } from './admin/delivery'
import { Prodcuts } from './admin/products'
import { Order_admin } from './admin/orders'
import { OrderDetails_admin } from './admin/orderDetails'
import { UpdateProduct } from './admin/updateProduct'
import { Delivery_details } from './admin/deliveryDetails'
import { CustomerInformation } from './customer/information'
import { Register } from './pages/register'

function App() {

  return (
    <>
    <Provider>
    <Routes >
    <Route path='/' element={<Frist />} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
    <Route path='/customer' element={<Products />} />
    <Route path='/cart' element={<Cart />} />
    <Route path='/orders' element={<Orders/>} />
    <Route path='/delivery' element={<Home_delivery/>} />
    <Route path='/details/:id' element={<Details/>} />
    <Route path='/Now' element={<Work/>} />
    <Route path='/history' element={<History/>} />
    <Route path='/admin' element={<Dashboard/>} />
    <Route path='/AllDelivery' element={<All_delivery/>} />
    <Route path='/product_admin' element={<Prodcuts/>} />
    <Route path='/update/:id' element={<UpdateProduct/>} />
    <Route path='/orders_admin' element={<Order_admin/>} />
    <Route path='/orderDetails_admin/:id' element={<OrderDetails_admin/>} />
    <Route path='/delivery_details/:id' element={<Delivery_details/>} />
    <Route path='/customer-information' element={<CustomerInformation/>} />
    {/* <Route path='/register' element={<Register />} /> */}
    {/* <Frist /> */}
    {/* <Login /> */}
    {/* <Products />/
    <Cart />
    </Provider> */}
    </Routes>
    </Provider>
    </>
  )
}

export default App
