(function($, angular, lunr){

var UNPIN_OFFSET = 400

var GITHUB_EDIT_PAGE_LINK = 'https://github.com/resin-io/docs/edit/gh-pages'

var MAIN_MENU_LINKS = [
  {
    "title": "What it's for",
    "link": "https://resin.io/usecases"
  },
  {
    "title": "How it works",
    "link": "https://resin.io/how-it-works"
  },
  {
    "title": "Talk",
    "link": "http://talk.resin.io/"
  },
  {
    "title": "Blog",
    "link": "https://resin.io/blog/"
  },
  {
    "title": "Pricing",
    "link": "https://resin.io/pricing/"
  },
  {
    "title": "Team",
    "link": "https://resin.io/team"
  },
  {
    "title": "Contact",
    "link": "https://resin.io/contact"
  }
]

window.onload = function () {
  // fix first page load anchor issue
  var hash = window.location.hash
  var elementId = hash && hash.substring(1).split('#')[1]
  var targetEl = elementId && document.getElementById(elementId)
  if (targetEl) {
    targetEl.scrollIntoView()
  }
  $('[data-md-sticky-header]').headroom({
    offset: UNPIN_OFFSET,
    tolerance: 0
  })
}

(function setupScroll() {
  var searchbarTop
  var stickyHeaderElements
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
    stickyHeaderElements = stickyHeaderElements || $('[data-md-sticky-header]')
    searchbarTop = searchbarTop || $('.search-wrapper').offset().top
    var scrollTop = $window.scrollTop()
    var isScrollUp = scrollTop < prevScrollTop

    if (isScrollUp) {
      handleScrollUp(scrollTop)
    } else {
      handleScrollDown(scrollTop)
    }

    prevScrollTop = scrollTop
  })
}())

function updateLinksHref(links) {
  links.each(function() {
    var href = $(this).attr('href')
    $(this).attr('href', '/#' + href)
  })
}

function updateAnchorHref(links, route) {
  links.each(function() {
    var href = $(this).attr('href')
    $(this).attr('href', '/#/pages/' + route + '/' + href)
  })
}

angular
  .module('resinDocs', [ 'ngRoute', 'ui.bootstrap' ])

  .constant('MAIN_MENU', MAIN_MENU_LINKS)

  .run(function($rootScope, MAIN_MENU) {
    $rootScope.mainMenu = MAIN_MENU
    $rootScope.improveDocsLink = null
  })

  // config
  .config(function($routeProvider) {
    $routeProvider
      .when('/pages/:pageName*', {
        controller: 'PageCtrl',
        template: '<div class="page-content"></div>',
        resolve: {
          pageContent: function($route, PageRendererService) {
            return PageRendererService.getPageHtml($route.current.params.pageName)
          }
        }
      })

      .when('/search-results', {
        controller: 'SearchResultsCtrl',
        templateUrl: '/static/templates/search-results.html',
        resolve: {
          idxService: function(LunrService) {
            return LunrService.getInstance()
          }
        }
      })

      .otherwise('/pages/introduction/introduction.md')
  })

  // services
  .service('PageRendererService', function($http) {
    this.getPageHtml = function(pageName) {
      return $http.get('/pages/' + pageName).then(function(resp) {
        var preparedHtmlEl = angular.element('<div>' + marked(resp.data) + '</div>')

        // add custom classess/directives
        preparedHtmlEl.find('table').addClass('table table-bordered')
        preparedHtmlEl.find('p > strong:first-child:contains("Warning")')
          .parent().wrap('<alert type="warning"></alert>')
        preparedHtmlEl.find('p > strong:first-child:contains("Note")')
          .parent().wrap('<alert type="note"></alert>')
        preparedHtmlEl.find('p > strong:first-child:contains("NOTE")')
          .parent().wrap('<alert type="note"></alert>')
        preparedHtmlEl.find('img').attr('colorbox', '')
        preparedHtmlEl.find('h2,h3,h4,h5,h6').attr('anchor', '')

        updateLinksHref(preparedHtmlEl.find('a[href^="/pages"]'))
        updateAnchorHref(preparedHtmlEl.find('a[href^="#"]'), pageName)

        return preparedHtmlEl.html()
      })
    }

    this.getSidebarNavigation = function() {
      return $http.get('/navigation.md')
      .then(function(resp) {
        return marked(resp.data)
      })
    }
  })

  .service('LunrService', function($http) {
    var cachedIndex = null

    this.getInstance = function() {
      if (cachedIndex) {
        return cachedIndex
      }

      return $http.get('/lunr_index.json')
      .then(function(resp) {
        var indexDump = angular.fromJson(resp.data)
        return cachedIndex = lunr.Index.load(indexDump)
      })
    }
  })

  // controllers
  .controller('SearchResultsCtrl', function($scope, $location, idxService, $rootScope) {
    var searchTerm = $location.search().searchTerm
    var searchResults = idxService.search(searchTerm)

    $rootScope.improveDocsLink = null

    var processSearch = function() {
      $scope.searchResults = []
      searchResults.forEach(function(result) {
        var el = angular.element('.site-navigation a[href$="/pages/' + result.ref + '"]').first()

        $scope.searchResults.push({
          id: result.ref,
          title: el.text(),
          link: '/#/pages/' + result.ref
        })
      })

      $rootScope.$emit('update-breadcrumb', { lvlOne: 'Search Results', lvlTwo: searchTerm })
    }

    processSearch()
    $rootScope.$on('active-link-added', processSearch)

    window.scrollTo(0,0)
  })

  .controller('SearchCtrl', function($scope, $location) {
    $scope.searchTerm = $location.search().searchTerm

    $scope.search = function() {
      $location.path('/search-results').search({ searchTerm: $scope.searchTerm })
    }

    $scope.$on('$routeChangeStart', function(next, current) {
      if (current.controller != 'SearchResultsCtrl') {
        $scope.searchTerm = ''
      }
    })
  })

  .controller('PageCtrl', function($rootScope, $scope, $sce, pageContent, $timeout, $compile, $location, LunrService) {
    // hacky way of replacing content
    var pageContentEl = angular.element('.page-content')
    pageContentEl.html(pageContent)
    $compile(pageContentEl.contents())($scope)

    $rootScope.improveDocsLink = GITHUB_EDIT_PAGE_LINK + $location.path()

    $timeout(function() {
      if (!$location.hash()) {
        window.scrollTo(0,0)
      }

      $scope.$emit('page-rendered', pageContent)
      angular.element('.colorbox-img-wrappper').colorbox({
        maxWidth: '95%',
        maxHeight: '95%',
        scalePhotos: true,
        photo: true
      })
    })

    // preload if needed
    LunrService.getInstance()
  })

  // directives
  .directive('anchor', function() {
    return {
      restrict: 'A',
      link: function(scope, el) {
        var url = location.href
        url = url.replace(/#\w.+/, '')
        url += '#' + el.attr('id')

        el.append(' <a class="hash" href="' + url + '">#</a>')
      }
    }
  })

  .directive('colorbox', function() {
    return {
      restrict: 'A',
      link: function(scope, el) {
        el.wrap('<a href="' + el.attr('src') + '" class="colorbox-img-wrappper"></a>')
      }
    }
  })

  .directive('mobileNav', function($rootScope, $location) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/static/templates/directives/mobile-nav.html',
      link: function(scope, el) {
        scope.subMenuCollapsed = false

        $rootScope.$on('active-link-added', function(event, data) {
          scope.pageTitle = data.el.text()
          angular.element('.navbar-submenu .site-navigation').height(angular.element(window).height() - 190)
        })

        scope.$on('$routeChangeStart', function(next, current) {
          if (current.controller == 'SearchResultsCtrl') {
            scope.pageTitle = 'Search results for "' + $location.search().searchTerm + '"'
          }
          scope.subMenuCollapsed = false
        })
      }
    }
  })

  .directive('breadcrumb', function($routeParams, $timeout, $rootScope) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/static/templates/directives/breadcrumb.html',
      link: function(scope, el) {
        $rootScope.$on('active-link-added', function(event, data) {
          scope.lvlOne = data.el.parent().prev().text()
          scope.lvlTwo = data.el.text()
        })

        $rootScope.$on('update-breadcrumb', function(event, data) {
          scope.lvlOne = data.lvlOne
          scope.lvlTwo = data.lvlTwo
        })

      }
    }
  })

  .directive('navigation', function($sce, $timeout, $routeParams, $rootScope, PageRendererService) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/static/templates/directives/navigation.html',
      link: function(scope, el, attrs) {
        function addActiveClass() {
          var activeEl = angular.element('.site-navigation ul a[href="/#/pages/'+ $routeParams.pageName +'"]').parent()

          el.find('.expand').removeClass('expand')
          activeEl.addClass('active')

          if ($(window).width() >= 767) {
            var expandEl = activeEl.parents('ul')
            expandEl.addClass('expand')
          }

          el.find('.active').removeClass('active')
          $rootScope.$emit('active-link-added', { el: activeEl.first() })
        }

        function expand() {
          child = $(this).child('ul')
          child.addClass('expand')
          $rootScope.$emit('active-link-added', { el: activeEl.first() })
        }

        $rootScope.$on('page-rendered', addActiveClass)

        PageRendererService.getSidebarNavigation().then(function(nav) {
          scope.navigationContent = $sce.trustAsHtml(nav)

          $timeout(function() {
            // update all links href
            updateLinksHref(el.find('a'))
            addActiveClass()
          })
        })
      }
    }
  })

}(window.jQuery, window.angular, window.lunr))
