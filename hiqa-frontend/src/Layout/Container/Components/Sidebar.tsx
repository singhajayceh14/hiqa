import React from 'react';

import SidebarItem from './SidebarItem';
const sideBarRoutes = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    iconName: 'fa fa-tachometer',
  },
  {
    title: 'Address',
    url: '/address',
    iconName: 'fa fa-map-marker',
  },
  {
    title: 'Profile',
    url: '/profile',
    iconName: 'fa fa-user',
  },
];
function Sidebar() {
  return (
    <div className="layoutMenuFixed">
      <div className="menuList">
        <ul>
          {sideBarRoutes.map((item, idx) => (
            <SidebarItem key={idx} title={item.title} url={item.url} iconName={item.iconName} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
