import { Button, Container, Nav, Navbar as NavBarBs } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { CartSVG } from '../assets/CartSVG'
import { useShoppingCart } from '../context/ShoppingCartContext'

export function Navbar() {
  const {openCart, cartQuantity} = useShoppingCart()

  return (
    <NavBarBs sticky='top' className='bg-white shadow-sm mb-3'>
      <Container>
        <Nav className='me-auto'>
          <Nav.Link
            as={NavLink}
            to='/'
          >
            Home
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to='/store'
          >
            Store
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to='/about'
          >
            About
          </Nav.Link>
        </Nav>

        {cartQuantity > 0 && <Button
          style={{ width: '3rem', height: '3rem', position: 'relative' }}
          variant='outline-primary'
          className='rounded-circle'
          onClick={openCart}
        >
          <CartSVG />
          <div
            className='rounded-circle bg-danger justify-content-center align-items-center'
            style={{ color: 'white', width: '1.5rem', height: '1.5rem', position: 'absolute', bottom: -8, right: -8 }}
          >
            {cartQuantity}
          </div>
        </Button>}
      </Container>
    </NavBarBs>
  )
}
