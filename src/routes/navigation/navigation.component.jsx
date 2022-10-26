import {Fragment, useContext} from "react";
import {Outlet} from "react-router-dom";

import {UserContext} from "../../contexts/user.context";
import {CartContext} from "../../contexts/cart.context";

import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";

import {ReactComponent as CrwnLogo} from "../../assets/crown.svg";
import {signOutUser} from "../../utils/firebase.utils";

import {NavigationContainer, LogoContainer, NavLinks, NavLink} from './navigation.styles'

const Navigation = () => {
    const {currentUser, } = useContext(UserContext)
    const { isCartOpen } = useContext(CartContext)

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo className='logo'/>
                </LogoContainer>
                <NavLinks>
                    <NavLink to='/shop'>
                        Shop
                    </NavLink>
                    {/*If a user is signed in the span tag will run, else if no user is signed in, the Sign In will be displayed*/}
                    {currentUser ? (<NavLink as='span' onClick={signOutUser}>
                            {''}
                            Sign Out
                            {''}
                    </NavLink>)
                        : (
                            <NavLink to='/auth'>
                                Sign In
                            </NavLink>
                        )}
                    <CartIcon />
                </NavLinks>
                {isCartOpen && <CartDropDown/>}
            </NavigationContainer>
            <Outlet/>
        </Fragment>
    )
}

export default Navigation