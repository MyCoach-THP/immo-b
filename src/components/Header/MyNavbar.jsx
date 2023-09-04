import { Fragment, useEffect, useState } from 'react'
import { useAtom } from 'jotai';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { authAtom } from '../atoms';
import './MyNavbar.css'
import Cookies from 'js-cookie';


export default function MyNavbar() {
  const [currentNavItem, setCurrentNavItem] = useState('Accueil');
  const location = useLocation();
  const navigate = useNavigate();
  const [authState, setAuthState] = useAtom(authAtom);

  const navigation = [
    { name: 'Accueil', to: '/', current: false },
    { name: 'Propriétés', to: '/properties', current: false },
    { name: 'Mes biens', to: '/owner', current: false },
    { name: 'Bouton3', to: '/bouton3', current: false },
  ]

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  function performLogout() {
    const newAuthState = {
      isLoggedIn: false,
      token: null,
      user_id: null
    }
    setAuthState(newAuthState)
    Cookies.remove('authTokenCookie')
    console.log(authState)
  }

  useEffect(() => {
    const matchingNavItem = navigation.find(item => item.to == location.pathname);
    if (matchingNavItem) {
      setCurrentNavItem(matchingNavItem.name);
    }
  }, [location]);

  return (
    <Disclosure className="navbar" as="nav">
      {({ open }) => (
        <>
          <div className="navbar-container">
            <div className="relative flex h-16 items-center justify-between">
              <div className="menu-mobile">
                <Disclosure.Button className="menu-mobile-button">
                  <span className="menu-mobile-button-icon" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="menu-mobile-icon" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="menu-mobile-icon" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="navbar-buttons">
                <div className="navbar-logo">
                  <img
                    className="navbar-logo-img"
                    src="https://tailwindui.com/img/logos/mark.svg?color=red&shade=500"
                    alt="Your Company"
                  />
                </div>
                <div className="navbar-navigation">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link to={item.to}
                        key={item.name}
                        onClick={() => setCurrentNavItem(item.name)}
                        className={classNames(
                          'navbar-links',
                          item.name === currentNavItem ? 'navbar-link-active' : 'navbar-link-inactive'
                        )}
                        aria-current={item.name === currentNavItem ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="navbar-dropdown">
                <Menu as="div" className="navbar-dropdown-menu">
                  <div>
                    <Menu.Button className="navbar-dropdown-button">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="navbar-dropdown-image"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="navbar-dropdown-items">
                      {!authState.isLoggedIn ? (
                        <>
                          <Menu.Item className="navbar-dropdown-item">
                            <Link to="/login" className="navbar-dropdown-link">
                              Login
                            </Link>
                          </Menu.Item>
                          <Menu.Item>
                            <Link to="/register" className="navbar-dropdown-link">
                              Register
                            </Link>
                          </Menu.Item>
                        </>
                      ) : (
                        <Menu.Item>
                          <a
                            className="navbar-dropdown-link"
                            onClick={performLogout}
                          >
                            Sign out
                          </a>
                        </Menu.Item>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  to={item.to}
                  key={item.name}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}