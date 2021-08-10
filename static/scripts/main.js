var Headroom = require('headroom.js')
var hljs = require('highlight.js/lib/core')
var languages = require('./langs.js')

// Export jQuery
window.jQuery = $

// TODO use import and tree shake instead of whitelisting lang modules
// https://bjacobel.com/2016/12/04/highlight-bundle-size/
languages.forEach(function(langName) {
  const langModule = require('highlight.js/lib/languages/' + langName)
  hljs.registerLanguage(langName, langModule)
})

require('bootstrap')
require('jquery-colorbox')
require('bootstrap-select')

require('bootstrap/dist/css/bootstrap.min.css')
require('jquery-colorbox/example3/colorbox.css')
require('bootstrap-select/dist/css/bootstrap-select.min.css')
require('highlight.js/styles/obsidian.css');
require('../css/main.css')
require('../css/menu-top.css')

hljs.highlightAll()

function fixOldUrl(url) {
  return url
    .replace('/#/', '/')
    .replace(/^\/pages\//, '/')
    .replace('.md#', '#')
    .replace(/\.md$/, '')
}

// old URLs compatibility:
if (location.hash && location.hash.substring(0, 2) === '#/') {
  location.href = fixOldUrl(location.hash.substring(1))
}

var UNPIN_OFFSET = 400

// setup sticky header
var stickyHeaderElements = $('.js-sticky-header')
new Headroom(stickyHeaderElements, {
  offset: UNPIN_OFFSET,
  tolerance: 0
})

var searchbarTop = $('.search-wrapper').offset().top
var prevScrollTop = 0
var $window = $(window)

function handleScrollUp(scrollTop) {
  if (scrollTop > searchbarTop && scrollTop <= UNPIN_OFFSET) {
    stickyHeaderElements.addClass('sticky')
  } else {
    stickyHeaderElements.removeClass('sticky')
  }
}

function handleScrollDown(scrollTop) {
  if (scrollTop >= UNPIN_OFFSET) {
    stickyHeaderElements.removeClass('sticky')
  } else if (scrollTop > searchbarTop) {
    stickyHeaderElements.addClass('sticky')
  }
}

$window.scroll(function() {
  var scrollTop = $window.scrollTop()
  var isScrollUp = scrollTop < prevScrollTop

  if (isScrollUp) {
    handleScrollUp(scrollTop)
  } else {
    handleScrollDown(scrollTop)
  }

  prevScrollTop = scrollTop
})

// enhance content elements

function fixLinksHref(links) {
  links.each(function() {
    var $el = $(this)
    var href = fixOldUrl($el.attr('href'))
    $el.attr('href', href)
  })
}

$.fn.applyColorbox = function() {
  this.each(function () {
    var $el = $(this)
    if (!$el.data("ignore-colorbox")) {
    $el
    .wrap('<a href="' + $el.attr('src') + '" class="colorbox-img-wrappper"></a>')
    .parent()
    .colorbox({
      maxWidth: '95%',
      maxHeight: '95%',
      scalePhotos: true,
      photo: true
    })
    }
  })
  return this
}

$.fn.addAnchor = function() {
  this.each(function () {
    var $el = $(this)
    if ($el.attr('id')) {
      $el.append(' <a class="hash" href="#' + $el.attr('id') + '">#</a>')
    }
  })
  return this
}

$.fn.fixLinks = function() {
  fixLinksHref(this)
  return this
}

var $pageContent = $('.page-content')

$pageContent
  .find('table')
  .addClass('table table-bordered')
$pageContent
  .find('p > strong:first-child:contains("Warning")')
  .parent()
  .wrap('<div class="alert alert-warning"></div>')
$pageContent
  .find('p > strong:first-child:contains("Note")')
  .parent()
  .wrap('<div class="alert alert-note"></div>')
$pageContent
  .find('p > strong:first-child:contains("NOTE")')
  .parent()
  .wrap('<div class="alert alert-note"></div>')
$pageContent
  .find('img')
  .applyColorbox()
$pageContent
  .find('h2,h3,h4,h5,h6')
  .addAnchor()
$pageContent
  .find('a[href^="/"]')
  .fixLinks()

$('.site-navigation')
  .find('a[href^="/"]')
  .fixLinks()

$('.navbar-toggle').click(function() {
  $(this).find('span').toggleClass('active')
  $(this).closest('.navbar').find('.navbar-collapse').toggleClass('collapsed')
})

var reRegExpChar = /[\\^$.*+?()[\]{}|]/g
function escapeRegExp(string) {
  return string.replace(reRegExpChar, '\\$&')
}

var $dynamicSwitch = $('.js-dynamic-switch')

if ($dynamicSwitch.length) {
  var $dynamicSwitchSelects = $dynamicSwitch.find('select')
  var urlTemplate = $dynamicSwitch.data('url-template')

  $dynamicSwitchSelects.selectpicker()

  function getDynamicContext() {
    var result = {}
    $dynamicSwitchSelects.each(function() {
      result[this.getAttribute('name')] = this.value
    })
    return result
  }

  function populateTemplate(arg, context) {
    var key, value, re
    for (key in context) {
      value = context[key]
      re = new RegExp(escapeRegExp(key), 'g')
      arg = arg.replace(re, value)
    }
    return arg
  }

  $dynamicSwitchSelects.on('change', function() {
    location.href = populateTemplate(urlTemplate, getDynamicContext())
  })
}
