import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Menu } from 'antd';

import { mapMenuData } from '../../utils';
import { getMenuData } from '../../api';

export default function Aside() {
  const history = useHistory();
  const location = useLocation();

  const [menu, setMenu] = useState([]);
  const [openKeys, setOpenKeys] = useState([]);
  const [selectedKeys, setSelectKeys] = useState([]);

  useEffect(() => {
    getMenuData().then(res => {
      const datas = mapMenuData(res);
      delete datas[0].children;
      setMenu(datas);
    });
    const currentMenu = JSON.parse(window.localStorage.getItem('currentMenu') || '[]');
    setOpenKeys(currentMenu);
  }, []);

  useEffect(() => {
    const keys = JSON.parse(window.localStorage.getItem('currentSelectMenu')) || location.pathname;
    setSelectKeys(keys);
  }, [location]);

  const menuClick = menu => {
    history.push(menu.key);
    const currentMenu = JSON.stringify([menu.keyPath[menu.keyPath.length - 1]]);
    window.localStorage.setItem('currentMenu', currentMenu);
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      items={menu}
      onClick={menuClick}
      onOpenChange={data => setOpenKeys(data)}
    />
  );
}
