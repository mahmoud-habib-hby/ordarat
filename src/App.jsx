
import './App.css'
import { Provider } from './context/provider'
import { Products } from './customer/products'
import { Frist } from './pages/frist'
import { Login } from './pages/login'

function App() {

  return (
    <>
    <Provider>

    {/* <Frist /> */}
    {/* <Login /> */}
    <Products />
    </Provider>
    </>
  )
}

export default App
