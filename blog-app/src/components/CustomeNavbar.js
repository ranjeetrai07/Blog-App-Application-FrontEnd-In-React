import { NavLink as ReactLink, useNavigate } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { doLogout, getCurrentUserDetail, isLoggedIn } from '../auth';

const CustomeNavbar = () => {

    let navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    const [login, setLogin] = useState(false)
    const [user, setUser] = useState(undefined)

    useEffect(() => {
      setLogin(isLoggedIn())
      setUser(getCurrentUserDetail())
    }, [login]);

    const logout = () => {
        doLogout(() => {
            //logged out
            setLogin(false)
            navigate("/")
        })
    }

    return(
    <div>
        <Navbar color="dark" dark expand="md" fixed="" className='px-5'>
            
        <NavbarBrand tag= {ReactLink} to= "/">MyBlogs</NavbarBrand>
        <NavbarToggler onClick={()=>setIsOpen(!isOpen)}/>
        <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink tag= {ReactLink} to= "/">New Feed</NavLink>
          </NavItem>  
          <NavItem>
            <NavLink tag= {ReactLink} to= "/about">About</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag= {ReactLink} to= "/services">Service</NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              More
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Contact Us</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Facebook</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Youtube</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Instagram</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Linkedin</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <Nav navbar>
            {
                login && (
                    <>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/user/profile-info">
                                Profile Info
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/user/dashboard">
                                {user.email}
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={logout}>
                                Logout
                            </NavLink>
                        </NavItem>
                    </>
                )
            }
            {
                !login && (
                    <>
                        <NavItem>
                            <NavLink tag= {ReactLink} to= "/signup">Signup</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag= {ReactLink} to= "/login">Login</NavLink>
                        </NavItem>
                    </>
                )
            }
        </Nav>
        </Collapse>
        
        </Navbar>
        
    </div>
    );
};

export default CustomeNavbar;    