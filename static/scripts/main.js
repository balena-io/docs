angular
  .module('resinDocs', [ 'ngRoute' ])

  // config
  .config(function($routeProvider) {
    $routeProvider
      .when('/pages/:pageName', {
        controller: 'PageCtrl',
        template: '<div ng-bind-html="::pageContent"></div>',
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
        return marked(resp.data);
      });
    };
  })

  // controllers
  .controller('PageCtrl', function($scope, $sce, pageContent, $timeout) {
    $scope.pageContent = $sce.trustAsHtml(pageContent);
    $timeout(function() {
      $scope.$emit('page-rendered', pageContent)
    });
  })

  // directives
  .directive('signUp', function($rootScope) {
    return {
      restrict: 'A',
      link: function(scope, el) {
        $rootScope.$on('page-rendered', function(event, content) {
          $('content h1').first().after(el)
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
  .directive('navigation', function($http, $sce, $timeout, $routeParams, $rootScope) {
    return {
      restrict: 'E',
      replace: true,
      template: '<nav id="navigation" ng-bind-html="::navigationContent"></nav>',
      link: function(scope, el) {
        $http.get('/navigation.md').then(function(resp) {
          scope.navigationContent = $sce.trustAsHtml(marked(resp.data));

          $timeout(function() {
            el.find('a').each(function() {
              // update all links href
              var href = '#' + $(this).attr('href');
              $(this).attr('href', href);

              $(this).click(function() {
                el.find('.active').removeClass('active');
                $(this).parent().addClass('active');
                $rootScope.$emit('active-link-added', { el: $(this).parent() })
              });
            });

            var activeLink = $('#navigation a[href="#/pages/'+ $routeParams.pageName +'"]').parent()
            activeLink.addClass('active');
            $rootScope.$emit('active-link-added', { el: activeLink })
          });
        });
      }
    };
  })
