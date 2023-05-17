import noImg from '../images/noImage/noImage-desk@1x.png';
import imgAmaz1x from '../images/modal/image-1@1x.png';
import imgAmaz2x from '../images/modal/image-1@2x.png';
import imgApBooks1x from '../images/modal/image-2@1x.png';
import imgApBooks2x from '../images/modal/image-2@2x.png';
import imgBarnAndNob1x from '../images/modal/image-3@1x.png';
import imgBarnAndNob2x from '../images/modal/image-3@2x.png';

export function createBookMarkup(
  bookImg,
  title,
  author,
  description,
  urlAmaz,
  urlApBooks,
  urlBarnAndNob
) {
  return `<div class="popup-box-img"><img src="${
    bookImg || noImg
  }" alt="book cover: ${title || 'No title'}" class="popup-img"></div>
<div class="popup-text">
    <h2 class="popup-title">${title || 'No title'}</h2>
    <p class="popup-author">${author || 'No author'}</p>
    <p class="popup-description">${description || 'No description'}</p>
    <div class="popup-img-links">
        <a href="${
          urlAmaz || 'https://www.kualo.co.uk/404'
        }" class="popup-link" target="_blank" rel="noreferrer noopener">
            <img srcset="${imgAmaz1x} 1x, ${imgAmaz2x} 2x" src="${imgAmaz1x}" alt="Amazon shop" width="62"
                height="19" loading="lazy"/>
        </a>
        <a href="${
          urlApBooks || 'https://www.kualo.co.uk/404'
        }" class="popup-link" target="_blank" rel="noreferrer noopener"><img
                srcset="${imgApBooks1x} 1x, ${imgApBooks2x} 2x" src="${imgApBooks1x}" alt="Apple Books shop" width="33"
                height="32" loading="lazy"/></a>
        <a href="${
          urlBarnAndNob || 'https://www.kualo.co.uk/404'
        }" class="popup-link" target="_blank" rel="noreferrer noopener"><img
                srcset="${imgBarnAndNob1x} 1x, ${imgBarnAndNob2x} 2x" src="${imgBarnAndNob1x}"
                alt="Barnes and Noble shop" width="38" height="36" loading="lazy"/></a>
    </div>
</div>`;
}
