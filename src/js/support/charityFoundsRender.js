const markupCardFund = ({ title, url, img, img2 }, position) => {
  const imgSrcset = `${img} 1x, ${img2} 2x`;
  const imgAlt = title;
  const imgWidth = 129;

  return `
      <li class="support__list-item swiper-slide">
        <p class="support__number">${position}</p>
        <a class="support__link" href="${url}" target="_blank" rel="noopener noreferrer nofollow">
          <img srcset="${imgSrcset}" src="${img}" alt="${imgAlt}" width="${imgWidth}" loading="lazy" />
        </a>
      </li>
    `;
};

export { markupCardFund };
