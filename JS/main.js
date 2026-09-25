/* ==========================================================================
   MÓDULO: main.js  ← PONTO DE ENTRADA DA APLICAÇÃO
   Responsabilidade: Orquestração. Importa e inicializa todos os módulos.
   Carregado com type="module" em todas as páginas HTML.
   ========================================================================== */

import { initMobileMenu }             from './menu.js';
import { initAnimatedCounters }       from './counters.js';
import { initScrollToTop, initScrollSpy } from './scrolls.js';
import { initProjectFilters, initProjectModals } from './projects.js';
import { initFormValidationAndMasks } from './form.js';
import { initFormAutoSave }           from './storage.js';
import { showToast }                  from './toast.js';

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initAnimatedCounters();
    initScrollToTop();
    initScrollSpy();
    initProjectFilters();
    initProjectModals();
    initFormValidationAndMasks();
    initFormAutoSave(showToast); // injeta showToast para evitar acoplamento circular
});
