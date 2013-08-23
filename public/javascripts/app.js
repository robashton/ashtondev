;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"domready":2}],2:[function(require,module,exports){
/*!
  * domready (c) Dustin Diaz 2012 - License MIT
  */
!function (name, definition) {
  if (typeof module != 'undefined') module.exports = definition()
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
  else this[name] = definition()
}('domready', function (ready) {

  var fns = [], fn, f = false
    , doc = document
    , testEl = doc.documentElement
    , hack = testEl.doScroll
    , domContentLoaded = 'DOMContentLoaded'
    , addEventListener = 'addEventListener'
    , onreadystatechange = 'onreadystatechange'
    , readyState = 'readyState'
    , loadedRgx = hack ? /^loaded|^c/ : /^loaded|c/
    , loaded = loadedRgx.test(doc[readyState])

  function flush(f) {
    loaded = 1
    while (f = fns.shift()) f()
  }

  doc[addEventListener] && doc[addEventListener](domContentLoaded, fn = function () {
    doc.removeEventListener(domContentLoaded, fn, f)
    flush()
  }, f)


  hack && doc.attachEvent(onreadystatechange, fn = function () {
    if (/^c/.test(doc[readyState])) {
      doc.detachEvent(onreadystatechange, fn)
      flush()
    }
  })

  return (ready = hack ?
    function (fn) {
      self != top ?
        loaded ? fn() : fns.push(fn) :
        function () {
          try {
            testEl.doScroll('left')
          } catch (e) {
            return setTimeout(function() { ready(fn) }, 50)
          }
          fn()
        }()
    } :
    function (fn) {
      loaded ? fn() : fns.push(fn)
    })
})
},{}]},{},[1])
;