(function($, Ractive){

function fixOldUrl(url) {
  return url
    .replace('/#/', '/')
    .replace(/^\/pages\//, '/')
    .replace('.md#', '#')
    .replace(/\.md$/, '')
}

// odl URLs compatibility:
if (location.hash && location.hash.substring(0, 2) === '#/') {
  location.href = fixOldUrl(location.hash.substring(1))
}

var UNPIN_OFFSET = 400

// setup sticky header
var stickyHeaderElements = $('.js-sticky-header');
stickyHeaderElements.headroom({
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
    $el
    .wrap('<a href="' + $el.attr('src') + '" class="colorbox-img-wrappper"></a>')
    .parent()
    .colorbox({
      maxWidth: '95%',
      maxHeight: '95%',
      scalePhotos: true,
      photo: true
    })
  })
  return this
}

$.fn.addAnchor = function() {
  this.each(function () {
    var $el = $(this)
    $el.append(' <a class="hash" href="#' + $el.attr('id') + '">#</a>')
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


Ractive.DEBUG = false
Ractive.defaults.delimiters = [ '[[', ']]' ]

Ractive({
  el: '#ract-mobile-top-menu',
  template: '#tpl-mobile-top-menu',
  data: {
    collapsed: true
  }
})

Ractive({
  el: '#ract-mobile-sub-menu',
  template: '#tpl-mobile-sub-menu',
  data: {
    collapsed: true
  }
})

}(window.jQuery, window.Ractive))
