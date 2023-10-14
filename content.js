function extractActualUrl(href) {
  const startIndex = href.indexOf("adres=") + 6; // 6 karakter uzunluğundaki adres= kelimesinin sonundan başla
  const endIndex = href.indexOf("&token="); // &token= kelimesinin başına kadar al
  if (startIndex >= 6 && endIndex >= 0) {
    return decodeURIComponent(href.slice(startIndex, endIndex));
  }
  return null;
}

function modifyLinks() {
  const links = document.querySelectorAll("a");
  links.forEach((link) => {
    const href = link.getAttribute("href");

    if (href && href.includes("r10.net")) {
      // target="_blank" silme
      link.removeAttribute("target");

      // hedef urlyi düzenleme
      if (href.includes("https://www.r10.net/yonlendir/?adres=")) {
        const actualUrl = extractActualUrl(href);
        if (actualUrl) {
          link.setAttribute("href", actualUrl);
        }
      }
    }
  });
}

// sayfa yüklendikten sonra linkleri düzenle
window.addEventListener("load", modifyLinks);
