
import { atom } from "recoil";

export const gisData = atom({
    key: 'gisData', 
    default: null,
  });

export const shareGisData = atom({
    key: 'shareGisData', 
    default: null,
});

export const userData = atom({
    key: 'userData', 
    default: null,
  });

export const gisProject = atom({
    key: 'gisProject', 
    default: [],
  });
  
export const logData = atom({
    key: 'logData', 
    default: [],
  });
  
export const assetData = atom({
    key: 'assetData', 
    default: null,
  });

  export const PageLoader = atom({
    key: 'PageLoader', 
    default: false,
  });
  export const SidebarState = atom({
    key: 'SidebarState', 
    default: false,
  });