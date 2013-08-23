var domReady = require('domready')

domReady(function() {
  var widgets = document.getElementsByClassName('rollover')
  for(var i =0 ; i < widgets.length; i++)
    setupWidget(widgets[i])
})

function setupWidget(ele) {
  ele.onclick = showPopupCallback(ele)
}


var _currentPopup = false
function showPopupCallback(ele) {
  return function(e) {
    showPopup(ele, e.clientX, e.clientY)
  }
}

function showPopup(element) {
  hideCurrentPopup()
  var container = document.createElement('div')
  _currentPopup = container
  container.id = 'popup-container'
  var popup = document.createElement('div')
  popup.id = 'popup-content'
  popup.innerHTML = element.childNodes[1].innerHTML
  container.appendChild(popup)
  document.body.appendChild(container)
  document.body.childNodes[0].style.opacity = 0.7
  adjustPopupPosition(popup)
  setTimeout(function() {
    document.onclick = hideCurrentPopup
    window.onscroll = hideCurrentPopup
  }, 100)
}


function adjustPopupPosition(popup) {
  var width = 600
    , windowWidth = window.innerWidth
    , marginHorizontal = (windowWidth - width) / 2
    , height = 600 
    , windowHeight = window.innerHeight
    , marginVertical = (windowHeight - height) / 2 + document.body.scrollTop

  popup.style.left = marginHorizontal + 'px'
  popup.style.top = marginVertical + 'px'
}

function hideCurrentPopup() {
  if(!_currentPopup)
    return
  _currentPopup.remove()
  _currentPopup = null
  document.onclick = null
  window.onscroll = null
  document.body.childNodes[0].style.opacity = 1.0
  return false
}
