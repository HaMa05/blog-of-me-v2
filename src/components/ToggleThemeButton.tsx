import React, {useEffect, useState} from 'react';
import {IoSunny, IoMoon} from 'react-icons/io5/index'

const themes = ['light', 'dark']

export default function ThemeToggle() {
  const [isMounted, setIsMounted] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (import.meta.env.SSR) {
      return undefined
    }
    if(localStorage && localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    }

    if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light'
  })

  const toggleTheme = () => {
    console.log(theme)
    const t = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', t);
    setTheme(t);
  }

  useEffect(() => {
    const root = document.documentElement;
    if(theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  return isMounted ? (
  <div className="inline-flex dark:bg-zinc-500 bg-orange-300 rounded-full">
    {themes.map(t => {
      const checked = t === theme
      return (
        <button 
          key={t} 
          className={`${
            checked ? 'bg-white text-black' : ''
          } cursor-pointer rounded-3xl p-2`}
          onClick={toggleTheme}
          aria-label="Toggle theme">
          {t === 'light' ? <IoSunny /> : <IoMoon />}
        </button>
      )
    })}
  </div>
  ) : (<div />)
}