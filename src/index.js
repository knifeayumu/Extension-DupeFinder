/* global SillyTavern */
/* global toastr */
import './style.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import PanelHeader from './PanelHeader';
import PanelBody from './PanelBody';
import { eventEmitter, EVENT_NAMES } from './events';

// Choose the root container for the extension's main UI
const rootContainer = document.getElementById('movingDivs');
const rootElement = document.createElement('div');
rootElement.id = 'dupeFinderPanel';
rootElement.classList.add('drawer-content', 'inline-drawer', 'flexGap5');
rootContainer.appendChild(rootElement);

const openButton = document.createElement('div');
openButton.id = 'dupeFinderOpen';
openButton.classList.add('menu_button', 'fa-solid', 'fa-chart-bar', 'faSmallFontSquareFix');
openButton.dataset.i18n = '[title]Find similar characters';
openButton.title = 'Find similar characters';
openButton.addEventListener('click', () => {
    const { characters } = SillyTavern.getContext();
    const hasShallow = characters.some(c => c.shallow);
    if (hasShallow) {
        toastr.warning('All character definitions will be loaded before calculating the similarity.', 'Lazy loading is enabled');
    }

    eventEmitter.emit(EVENT_NAMES.OPEN_PANEL);
});
const buttonContainer = document.getElementById('rm_buttons_container');
if (buttonContainer) {
    buttonContainer.append(openButton);
} else {
    const searchForm = document.getElementById('form_character_search_form');
    const searchBar = document.getElementById('character_search_bar');
    searchForm.insertBefore(openButton, searchBar);
}

const root = ReactDOM.createRoot(rootElement);
root.render(
    <React.StrictMode>
        <PanelHeader />
        <PanelBody />
    </React.StrictMode>
);

eventEmitter.on(EVENT_NAMES.CLOSE_PANEL, () => {
    rootElement.classList.remove('open');
});

eventEmitter.on(EVENT_NAMES.OPEN_PANEL, () => {
    rootElement.classList.add('open');
});
