import React, { useState }  from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAltFast, faNewspaper, faSearch, faChartNetwork, faUserCog, faUserChart, faSun, faSpaceStationMoonAlt, faPortalEnter } from '@fortawesome/pro-duotone-svg-icons';
import { GiHamburgerMenu } from 'react-icons/gi';

import { useTheme } from 'themes/themeManager';
import { secondaryGrey, sidebarBackgroundColor, sidebarTextColor } from "themes/theme";
import "./Sidebar.css";
import logoLight from "images/interview-light.svg";
import logoDark from 'images/interview-dark.svg';

import { useAppContext } from "hooks/useAppContext";
import { sidebarTransitions, staggerTransitions } from "utils/Animations";
import { url } from "utils/constants";
import { SidebarLink } from "./components/SidebarLink";


const SidebarContainer = styled.div`
  background-color: ${sidebarBackgroundColor};
  color: ${sidebarTextColor};
  transition: var(--transition);
`;

const LinkContainer = styled.ul`
  background-color: ${sidebarBackgroundColor};
  color: ${sidebarTextColor};
  transition: var(--transition);
`;

const SignoutContainer = styled.div`
  background-color: ${secondaryGrey};
`;

export const Sidebar: React.FC<{}> = (): React.ReactElement => {
  const { signOut } = useAppContext();
  // const urlLocation = useLocation();
  const theme = useTheme();

  // React.useEffect(() => {
  //   const toggleButton = document.getElementsByClassName('toggle-button')[0];
  //   const sidebarLinks = document.getElementsByClassName('sidebar-links')[0];

  //   toggleButton.addEventListener('click', () => {
  //     sidebarLinks.classList.toggle('active');
  //   });
  //   sidebarLinks.addEventListener('click', () => {
  //     sidebarLinks.classList.toggle('active');
  //   });
  // }, []);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <motion.div initial='initial' animate='animate' exit={{ opacity: 0 }}>
      <nav className="sidebar">
        <motion.div variants={staggerTransitions}>
          <SidebarContainer className="sidebar-container">
           
            <button className={`toggle-button ${menuOpen ? 'active' : null}`} onClick={handleMenuToggle}>
              <GiHamburgerMenu className='sidebar-icon' />
            </button>

            <motion.img
              className="sidebar-logo"
              src={theme.mode === 'dark' ? logoDark: logoLight}
              alt="Interview Logo"
              variants={sidebarTransitions}
            />

            <LinkContainer className={`sidebar-links ${menuOpen ? 'active' : null}`}>
             
              <SidebarLink url={url.dashboard} title={'Dashboard'} icon={faTachometerAltFast}/>
              <SidebarLink url={url.jobs} title={'Job Vacancies'} icon={faNewspaper}/>
              <SidebarLink url={url.candidates} title={'Candidate Search'} icon={faSearch}/>
              <SidebarLink url={url.studio} title={'Reports'} icon={faChartNetwork}/>
              <SidebarLink url={url.settings} title={'User Settings'} icon={faUserCog}/>
              <SidebarLink url={url.account} title={'Account Settings'} icon={faUserChart}/>
              
              <motion.div variants={sidebarTransitions}>
                <li>
                  <button className="sidebar-link" onClick={() => theme.toggle()}>
                    <FontAwesomeIcon className='sidebar-icon' icon={theme.mode === 'dark' ? faSun: faSpaceStationMoonAlt} />{theme.mode === 'dark' ? 'LIGHT' : 'NIGHT'} MODE
                  </button>
                </li>
              </motion.div>
              
              <motion.div variants={sidebarTransitions}>
                <SignoutContainer onClick={() => signOut()} className='sidebar-signout'>
                  <p>User Name</p>
                  <FontAwesomeIcon className='sidebar-icon' icon={faPortalEnter} />
                </SignoutContainer>
              </motion.div>
           
            </LinkContainer>
          </SidebarContainer>
        </motion.div>
      </nav>
    </motion.div>
  );
}
