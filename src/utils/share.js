import base64 from 'base-64';
import utf8 from 'utf8';

// Android deteccion
const ua = navigator.userAgent.toLowerCase();
const flagIsAndroid = ua.indexOf('android') > -1;

// iOS deteccion

const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;


function utf8Base64Encode(str) {
  return base64.encode(utf8.encode(str));
}

function getChromeVersion() {
  const raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);

  return raw ? parseInt(raw[2], 10) : false;
}


export function canShare() {
  const chromeVersion = getChromeVersion();

  return ((flagIsAndroid && chromeVersion && chromeVersion >= 61) || iOS);
}

export function isAndroid() {
  return flagIsAndroid;
}

export function isAndroidWebView() {
  return flagIsAndroid && !navigator.share;
}

export function isIOS() {
  return iOS;
}

export function shareOnAndroid({ title, text, url }) {
  if (navigator.share) {
    navigator.share({ title, text, url });
  } else {
    // eslint-disable-next-line
    alert('Error al intentar compartir');
  }
}

export function getShareURL({ title, text, url }) {
  if (typeof title === 'undefined') return '';

  try {
    const shareURL = `${window.location.origin}/share#${utf8Base64Encode(url)}#${utf8Base64Encode(title)}#${utf8Base64Encode(text)}`;
    return shareURL;
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
    // eslint-disable-next-line
    console.error({ title, text, url });
    return url;
  }
}
