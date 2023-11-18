import React, { useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../../../lib/useLocalStorage";
import i18next from "i18next";

const languageMap = {
    en: { label: "English", dir: "ltr", active: true },
    ar: { label: "العربية", dir: "rtl", active: false },
    fr: { label: "Français", dir: "ltr", active: false }
  };
  
const LanguageSelect = () => {
    const selectedLanguage = getLocalStorage("selected_language") || 'en';
    console.log(selectedLanguage);
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [isLanPopup, setIsLanPopup] = useState(false);
    const [selected, setSelected] = useState(selectedLanguage);

    const handleOnClick = () => {
        setIsLanPopup(!isLanPopup);
    }

    const handleChangeLanguage = (item: any)  => {
        setSelected(item);
        setLocalStorage("selected_language", item);
        i18next.changeLanguage(item);
        setIsLanPopup(!isLanPopup);
    }

    useEffect(() => {
      document.body.dir = languageMap[selected].dir;
    }, [menuAnchor, selected]);

    return (
        <>
            <button onClick={handleOnClick}>
                {languageMap[selected].label}
                <i className="ml-2 fa fa-chevron-down"></i>
            </button>
            <div className={`z-20 ${isLanPopup ? 'shown' : 'hidden'} absolute bg-white rounded top-17 right-0 min-w-full divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}>
                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
                    {Object.keys(languageMap)?.map(item => (
                        <li key={item}>
                            <a onClick={() => handleChangeLanguage(item)} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">{languageMap[item].label}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default LanguageSelect;