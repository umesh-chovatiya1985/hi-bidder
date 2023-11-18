import { useState, useEffect } from 'react';

export function setLocalStorage(key: string, Value: any) {
   if (typeof window !== 'undefined') {
      return window.localStorage.setItem(key, Value);
   }
}
export function getLocalStorage(key: string) {
   if (typeof window !== 'undefined') {
      return window.localStorage.getItem(key);
   }
}
export function removeLocalStorage(key: string) {
   if (typeof window !== 'undefined') {
      return window.localStorage.removeItem(key);
   }
}
export function getAPIUrl() {
   if (typeof window !== 'undefined') {
      return window.location.origin + "/api/";
   }
}

export function getQueryParams() {
   if (typeof window !== 'undefined') {
      let paramPath = window.location.href.split("/");
      paramPath.splice(0, 3);
      return "/"+paramPath.join("/");
   }
}