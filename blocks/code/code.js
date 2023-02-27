import { loadScript } from '../../scripts/scripts.js';
import { loadCSS } from '../../scripts/lib-franklin.js';

let prismLoaded = false;

export default function decorate($block) {
  const language = $block.querySelector('pre').nextElementSibling?.textContent?.toLowerCase();
  $block.querySelector('pre').nextElementSibling?.remove();

  if (language) {
    if (!prismLoaded) {
      prismLoaded = true;
      loadScript('/scripts/prism.js');
      loadCSS('/styles/prism.css');
    }

    const codeElement = $block.querySelector('code');
    codeElement.classList.add(`language-${language}`);
    if (codeElement.textContent.startsWith(language)) {
      codeElement.textContent = codeElement.textContent.substring(language.length);
    }
  }
}
