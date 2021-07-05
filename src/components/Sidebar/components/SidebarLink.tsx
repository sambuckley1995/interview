import { Link, useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { motion } from "framer-motion";

import { useTheme } from 'themes/themeManager';
import { sidebarTransitions } from "utils/Animations";

interface ISidebarLink {
    title: string,
    url: string
    icon: IconProp
}

export const SidebarLink: React.FC<ISidebarLink> =  ({title, url, icon}) => {
    const theme = useTheme();
    const routeMatch = useRouteMatch(url)

    const swapOpacity = theme.mode === 'dark' 

    return (
        <motion.div variants={sidebarTransitions}>
            <li>
            <Link to={url} className={`sidebar-link ${routeMatch ? "sidebar-link-active" : null}`}>
                <FontAwesomeIcon className='sidebar-icon' icon={icon} swapOpacity={swapOpacity} />
                {title}
            </Link>
            </li>
        </motion.div>
    )
}