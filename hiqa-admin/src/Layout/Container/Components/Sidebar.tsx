import React from 'react';

import SidebarItem from './SidebarItem';
const sideBarRoutes = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    iconName: 'fa fa-tachometer',
  },
  {
    title: 'User',
    url: '/user',
    iconName: 'fa fa-user',
  },
  {
    title: 'Course',
    url: '/course',
    iconName: 'fa fa-book',
  },
  {
    title: 'Front',
    url: '/front-page',
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
