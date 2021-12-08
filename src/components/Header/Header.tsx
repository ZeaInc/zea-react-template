import './Header.css'

import logoZea from './logo-zea.svg'

const Header = () => (
  <header className="Header">
    <img className="Header__logo" src={logoZea} alt="Zea Inc." />
  </header>
)

export { Header }
