/* eslint-disable */

const userAgent = navigator.userAgent || navigator.vendor || window.opera;

window.onIPhone = () => {
  try {
    if (/iPhone/.test(userAgent) && !window.MSStream && window.webkit) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

window.onIOS = () => {
  try {
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream && window.webkit) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

window.onAndroid = () => {
  try {
    if (/android/i.test(userAgent)) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

window.isCompatibleWithExposure = () => {
  if (onAndroid()) return true;

  if (onIPhone()) {
    try {
      const OSV = userAgent.split('iPhone OS ')[1].split(' ')[0];
      let vNumber = OSV.split('_');
      vNumber = `${vNumber[0]}.${vNumber[1]}`;
      vNumber = parseFloat(vNumber);

      if (vNumber >= 13.5) return true;
    } catch (error) {
      // console.error(error);
      return false;
    }
  }

  return false;
}

window.sendUserIdentifier = (userId, userToken) => {
  try {
    if (/android/i.test(userAgent)) {
      Android.postData(`id:${userId},token:${userToken}`);
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream && window.webkit) {
      window.webkit.messageHandlers.scriptHandler.postMessage(`id:${userId},token:${userToken}`);
    }
  } catch (error) {
    // console.error(error);
  }
}

window.onMobileDevice = () => {
  try {
    if (/android/i.test(userAgent)) {
      return true;
    } if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream && window.webkit) {
      return true;
    } else if (window.location.hostname === 'localhost') {
      // return true;
    }
    return false;
  } catch (error) {
    // console.error(error);
    return false;
  }
}

window.nativeShareApp = () => {
  try {
    if (/android/i.test(userAgent)) {
      Android.shareApp();
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream && window.webkit) {
      window.webkit.messageHandlers.scriptHandler.postMessage('share_app');
    }
  } catch (error) {
    // console.error(error);
  }
}

window.nativeShareMessage = (params) => {
  try {
    if (typeof params !== 'string') {
      params = JSON.stringify(params);
    }

    if (/android/i.test(userAgent)) {
      Android.share(params);
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream && window.webkit) {
      window.webkit.messageHandlers.scriptHandler.postMessage(params);
    }
  } catch (error) {
    console.error(error);
  }
}

window.shareResult = (result) => {
  localStorage.setItem('ShareResult', result);
}

window.activateBT = () => {
  try {
    if (/android/i.test(userAgent)) {
      Android.startBluetooth();
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream && window.webkit) {
      window.webkit.messageHandlers.scriptHandler.postMessage('request_bt');
    }
  } catch (error) {
    // console.error(error);
  }
}

window.requestBT = () => {
  try {
    if (/android/i.test(userAgent)) {
      Android.requestBT();
    }
  } catch (error) {
    // console.error(error);
  }
}

window.sendTraceData = () => {
  try {
    if (/android/i.test(userAgent)) {
      Android.getBTDataFromApp();
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream && window.webkit) {
      window.webkit.messageHandlers.scriptHandler.postMessage('get_data');
    }
  } catch (error) {
    // console.error(error);
  }
}

window.stopExposedNotifications = () => {
  try {
    if (/android/i.test(userAgent)) {
      Android.stopExposedNotifications();
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream && window.webkit) {
      window.webkit.messageHandlers.scriptHandler.postMessage('stop_exposed_notifications');
    }
  } catch (error) {
    // console.error(error);
  }
}

window.nativeLogout = () => {
  try {
    if (/android/i.test(userAgent)) {
      Android.logout();
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream && window.webkit) {
      window.webkit.messageHandlers.scriptHandler.postMessage('logout');
    }
  } catch (error) {
    // console.error(error);
  }
}

window.goToNotificationsSettings = () => {
  try {
    if (/android/i.test(userAgent)) {
      Android.openAppSettings();
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream && window.webkit) {
      window.webkit.messageHandlers.scriptHandler.postMessage('openAppSettings');
    }
  } catch (error) {
    // console.error(error);
  }
}

window.getBTStatus = () => {
  try {
    if (/android/i.test(userAgent)) {
      Android.getBTStatus();
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream && window.webkit) {
      window.webkit.messageHandlers.scriptHandler.postMessage('getBTStatus');
    } else if (window.location.hostname === 'localhost') {
      setBTStatus(1);
    }
  } catch (error) {
    // console.error(error);
  }
}

window.setBTStatus = (btStatus) => {
  localStorage.setItem('BTStatus', btStatus);
}

window.readNativeQR = () => {
  try {
    if (/android/i.test(userAgent)) {
      Android.readQR();
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream && window.webkit) {
      window.webkit.messageHandlers.scriptHandler.postMessage('readQR');
    }
  } catch (error) {
    // console.error(error);
  }
}

window.setQRString = (qrString) => {
  localStorage.setItem('QRString', qrString);
}

window.cancelQR = () => {
  localStorage.setItem('QRCanceled', '1');
}

window.getContacts = () => {
  try {
    if (/android/i.test(userAgent)) {
      Android.getContacts();
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream && window.webkit) {
      window.webkit.messageHandlers.scriptHandler.postMessage('getContacts');
    } else if (window.location.hostname === 'localhost') {
      setTimeout(() => {
        setContacts({
          '': 'Arissa Eaton',
          1234567897: 'Claire Barnes',
          1234567896: 'Mac Daniels',
          1234567895: 'Ava Clayton',
          1234567894: 'Gillian Bravo',
          1234567893: 'Malika Talbot',
          1234567892: 'Ronan Tapia',
          1234567891: 'Fynley Gallegos',
          1234567890: 'Simona Jensen',
          1234567889: 'Brooklyn Phelps',
          1234567888: 'Leah Cassidy',
          1234567887: 'Diana Spence',
          1234567886: 'Lois Singh',
          1234567885: 'Derrick Greer',
          1234567884: 'Warwick Simon',
          1234567883: 'Wesley Wilkes',
          1234567882: 'Meg Rosario',
          1234567881: 'Izzy Middleton',
          1234567880: 'Jamel Leblanc',
          1234567879: 'Dorian | Denton',
          1234567878: 'Samiyah "Peacock"',
          1234567877: 'Roshan Andrews',
          1234567876: 'Raphael Kerr',
          1234567875: 'Benedict \n Langley',
          1234567874: 'Abdállah Devlin',
          1234567873: 'Franklyn Bass',
          1234567872: 'Suranne William',
          1234567871: 'Lacy Oneil',
          1234567870: 'Zachariah Marks',
          1234567869: 'Zoha Mosley',
          1234567868: 'Lamar Bowman',
          1234567867: 'Alys Michael',
          1234567866: 'Viaan Portillo',
          1234567865: 'Barney Donnelly',
          1234567864: 'Alys Michael',
          1234567863: 'Magdalena Galloway',
          1234567862: 'Antoinette Wolf',
          1234567861: 'Dana Colon',
          1234567860: 'Alys Michael',
          1234567859: 'Frederick Craft',
        });
      }, 1500);
    } else {
      window.setContactsError();
    }
  } catch (error) {
    // console.error(error);
  }
}

window.setContacts = (contacts) => {
  try {
    if (typeof contacts !== 'string') {
      contacts = btoa(JSON.stringify(contacts));
    }

    localStorage.setItem('USRContacts', contacts);
  } catch (error) {
    window.setContactsError();
    console.error(error);
  }
}

window.setContactsError = () => {
  localStorage.setItem('USRContactsError', '1');
}

window.sendWhatsAppMessage = (text, phone) => {
  try {
    if (/android/i.test(userAgent)) {
      Android.sendWhatsAppMessage(`text=${text},phone=${phone}`);
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream && window.webkit) {
      window.webkit.messageHandlers.scriptHandler.postMessage(`sendWhatsAppMessageid:text=${text},phone=${phone}`);
    }
  } catch (error) {
    // console.error(error);
  }
}

window.sendSMSMessage = (text, phones) => {
  try {
    if (/android/i.test(userAgent)) {
      Android.sendSMSMessage(`text=${text},phones=${phones.join(',')}`);
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream && window.webkit) {
      window.webkit.messageHandlers.scriptHandler.postMessage(`sendSMSMessage:text=${text},phones=${phones.join(',')}`);
    }
  } catch (error) {
    // console.error(error);
  }
}
