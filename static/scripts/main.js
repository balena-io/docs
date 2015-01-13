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

        return preparedHtmlEl.html();
      });
    };

    this.getSidebarNavigation = function() {
      return $http.get('/navigation.md').then(function(resp) {
        return marked(resp.data);
      });
    };
  })

  // controllers
  .controller('PageCtrl', function($scope, $sce, pageContent, $timeout, $compile) {
    // hacky way of replacing content
    var pageContentEl = angular.element('.page-content');
    pageContentEl.html(pageContent);
    $compile(pageContentEl.contents())($scope);

    // resize sidebar
    var sidebarEl = angular.element('.sidebar');
    $timeout(function() {
      sidebarEl.css('min-height', angular.element('article').height());
    }, 500);

    $timeout(function() {
      $scope.$emit('page-rendered', pageContent);
      angular.element('.colorbox-img-wrappper').colorbox({
        maxWidth: '95%',
        maxHeight: '95%',
        scalePhotos: !0,
        photo: !0
      });
    });
  })

  // directives
  .directive('colorbox', function() {
    return {
      restrict: 'A',
      link: function(scope, el) {
        el.wrap('<a href="' + el.attr('src') + '" class="colorbox-img-wrappper"></a>');
      }
    }
  })
  .directive('signUp', function($rootScope) {
    return {
      restrict: 'A',
      link: function(scope, el) {
        $rootScope.$on('page-rendered', function(event, content) {
          angular.element('content h1').first().append(el)
        });
      }
    }
  })
  .directive('breadcrumb', function($routeParams, $timeout, $rootScope) {
    return {
      restrict: 'E',
      replace: true,
      template: '<ol class="breadcrumb list-inline"><li>{{ lvlOne }}</li><li class="active">{{ lvlTwo }}</li></ol>',
      link: function(scope, el) {
        $rootScope.$on('active-link-added', function(event, data) {
          scope.lvlOne = data.el.parent().prev().text();
          scope.lvlTwo = data.el.text();
        });
      }
    }
  })
  .directive('navigation', function($sce, $timeout, $routeParams, $rootScope, PageRendererService) {
    return {
      restrict: 'E',
      replace: true,
      template: '<nav id="navigation" ng-bind-html="::navigationContent"></nav>',
      link: function(scope, el) {
        function addActiveClass(activeEl) {
          activeEl.addClass('active');
          $rootScope.$emit('active-link-added', { el: activeEl })
        }

        PageRendererService.getSidebarNavigation().then(function(nav) {
          scope.navigationContent = $sce.trustAsHtml(nav);

          $timeout(function() {
            el.find('a').each(function() {
              // update all links href
              var href = '#' + $(this).attr('href');
              $(this).attr('href', href);

              $(this).click(function() {
                el.find('.active').removeClass('active');
                addActiveClass($(this).parent());
              });
            });

            var activeLink = angular.element('#navigation a[href="#/pages/'+ $routeParams.pageName +'"]').parent()
            addActiveClass(activeLink);
          });
        });
      }
    };
  })
