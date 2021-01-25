import React from 'react';
import { useState } from 'react'
import { IntlProvider } from "react-intl";
import { addLocaleData } from "react-intl";
import locale_fi from 'react-intl/locale-data/fi';
import locale_en from 'react-intl/locale-data/en';
import messages_fi from "./translations/fi.json";
import messages_en from "./translations/en.json";
import { App } from './App';

addLocaleData([...locale_en, ...locale_fi]);

const messages = {
    'fi': messages_fi,
    'en': messages_en
};

const InitialLanguage = navigator.language.split(/[-_]/)[0];

function AppIntlWrapper() {

    const [kieli, setKieli] = useState(InitialLanguage)

    const vaihdaKieli = () => {

        if (kieli === "en") {
            setKieli("fi")
        }
        else {
            setKieli("en")
        }
    }

    return (

        <IntlProvider locale={kieli} messages={messages[kieli]} >
            <App vaihdaKieli={vaihdaKieli} />
        </IntlProvider>

    );

}

export default AppIntlWrapper