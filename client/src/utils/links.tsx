import React from 'react';

import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { TiShoppingCart } from 'react-icons/ti';
import { ImProfile } from 'react-icons/im';
import { IoBarChartSharp } from 'react-icons/io5';
import { MdAdminPanelSettings } from 'react-icons/md';
import { FaCubes } from 'react-icons/fa';

interface Links {
  text: string;
  path: string;
  icon: React.JSX.Element;
}

const links: Links[] = [
  { text: 'add product', path: '.', icon: <AiOutlineAppstoreAdd /> },
  { text: 'all products', path: 'all-products', icon: <TiShoppingCart /> },
  { text: 'my products', path: 'user-products', icon: <FaCubes /> },
  { text: 'stats', path: 'stats', icon: <IoBarChartSharp /> },
  { text: 'profile', path: 'profile', icon: <ImProfile /> },
  { text: 'admin', path: 'admin', icon: <MdAdminPanelSettings /> },
];

export default links;
