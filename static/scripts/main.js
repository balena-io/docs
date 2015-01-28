$(window).scroll(function() {
  var scroll = $(window).scrollTop();
  $('[data-md-sticky-header]').toggleClass('sticky', scroll > 61);
});

function updateLinksHref(links) {
  links.each(function() {
    var href = $(this).attr('href');
    $(this).attr('href', '/#' + href);
  });
}

angular
  .module('resinDocs', [ 'ngRoute', 'ui.bootstrap' ])

  // config
  .config(function($routeProvider) {
    $routeProvider
      .when('/pages/:pageName', {
        controller: 'PageCtrl',
        template: '<div class="page-content"></div>',
        resolve: {
          pageContent: function($route, PageRendererService) {
            return PageRendererService.getPageHtml($route.current.params.pageName);
          }
        }
      })

      .when('/search-results', {
        controller: 'SearchResultsCtrl',
        templateUrl: '/static/templates/search-results.html',
        resolve: {
          idxService: function(LurnService) {
            return LurnService.getInstance();
          }
        }
      })

      .otherwise('/pages/gettingStarted.md');
  })

  // services
  .service('PageRendererService', function($http) {
    this.getPageHtml = function(pageName) {
      return $http.get('/pages/' + pageName).then(function(resp) {
        var preparedHtmlEl = angular.element('<div>' + marked(resp.data) + '</div>');

        // add custom classess/directives
        preparedHtmlEl.find('table').addClass('table table-bordered');
        preparedHtmlEl.find('p > strong:first-child:contains("Warning")').parent().wrap('<alert type="warning"></alert>');
        preparedHtmlEl.find('p > strong:first-child:contains("Note")').parent().wrap('<alert type="note"></alert>');
        preparedHtmlEl.find('p > strong:first-child:contains("NOTE")').parent().wrap('<alert type="note"></alert>');
        preparedHtmlEl.find('img').attr('colorbox', '');
        preparedHtmlEl.find('h2,h3,h4,h5,h6').attr('anchor', '');

        updateLinksHref(preparedHtmlEl.find('a[href^="/pages"]'));

        return preparedHtmlEl.html();
      });
    };

    this.getSidebarNavigation = function() {
      return $http.get('/navigation.md').then(function(resp) {
        return marked(resp.data);
      });
    };
  })
  .service('LurnService', function($http) {
    this.getInstance = function() {
      if (window.idx) {
        return window.idx;
      }

      return $http.get('/lunr_index.json').then(function(resp) {
        var indexDump = angular.fromJson(resp.data);
        return window.idx = lunr.Index.load(indexDump);
      })
    }
  })

  // controllers
  .controller('SearchResultsCtrl', function($scope, $location, idxService, $rootScope) {
    var searchTerm = $location.search().searchTerm;

    var searchResults = idxService.search(searchTerm);

    var processSearch = function() {
      $scope.searchResults = [];
      searchResults.forEach(function(result) {
        var el = angular.element('#navigation a[href$="/pages/' + result.ref + '"]');

        $scope.searchResults.push({
          id: result.ref,
          title: el.text(),
          link: '/#/pages/' + result.ref
        });
      });

      $rootScope.$emit('update-breadcrumb', { lvlOne: 'Search Results', lvlTwo: searchTerm });
    }

    processSearch();
    $rootScope.$on('active-link-added', function() {
      processSearch();
    });

    window.scrollTo(0,0);

  })
  .controller('SearchCtrl', function($scope, $location) {
    $scope.searchTerm = $location.search().searchTerm;

    $scope.search = function() {
      $location.path('/search-results').search({ searchTerm: $scope.searchTerm });
    };
  })
  .controller('PageCtrl', function($scope, $sce, pageContent, $timeout, $compile, $location, LurnService) {
    // hacky way of replacing content
    var pageContentEl = angular.element('.page-content');
    pageContentEl.html(pageContent);
    $compile(pageContentEl.contents())($scope);

    $timeout(function() {
      if (!$location.hash()) {
        window.scrollTo(0,0);
      }

      $scope.$emit('page-rendered', pageContent);
      angular.element('.colorbox-img-wrappper').colorbox({
        maxWidth: '95%',
        maxHeight: '95%',
        scalePhotos: !0,
        photo: !0
      });
    });

    // preload if needed
    LurnService.getInstance();
  })

  // directives
  .directive('anchor', function() {
    return {
      restrict: 'A',
      link: function(scope, el) {
        var url = location.href;
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
        el.wrap('<a href="' + el.attr('src') + '" class="colorbox-img-wrappper"></a>');
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
          scope.lvlOne = data.el.parent().prev().text();
          scope.lvlTwo = data.el.text();
        });

        $rootScope.$on('update-breadcrumb', function(event, data) {
          scope.lvlOne = data.lvlOne;
          scope.lvlTwo = data.lvlTwo;
        });

      }
    }
  })
  .directive('navigation', function($sce, $timeout, $routeParams, $rootScope, PageRendererService) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/static/templates/directives/navigation.html',
      link: function(scope, el) {
        function addActiveClass() {
          var activeEl = angular.element('#navigation a[href="/#/pages/'+ $routeParams.pageName +'"]').parent()
          el.find('.active').removeClass('active');
          activeEl.addClass('active');
          $rootScope.$emit('active-link-added', { el: activeEl })
        }

        $rootScope.$on('page-rendered', function(event, data) {
          addActiveClass();
        });

        PageRendererService.getSidebarNavigation().then(function(nav) {
          scope.navigationContent = $sce.trustAsHtml(nav);

          $timeout(function() {
            // update all links href
            updateLinksHref(el.find('a'));
            addActiveClass();
          });
        });
      }
    };
  })
