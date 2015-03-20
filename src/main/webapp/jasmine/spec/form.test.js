describe('form tests', function() {
	var templateHtml;


	beforeEach(module('FormApp'));
	beforeEach(inject(function($templateCache) {
		templateHtml = $templateCache.get('form.html');
		if (!templateHtml) {
			templateHtml = $.ajax('/jetty-guice-jpa/form.html', {
				async : false
			}).responseText;
			$templateCache.put('form.html', templateHtml)
		}
	}));
	describe('form validations', function() {

		var $compile, $rootScope, formElement, httpBackend, view;
		beforeEach(inject(function(_$compile_, _$rootScope_, $injector, $controller, $httpBackend) {
			$compile = _$compile_;
			$rootScope = _$rootScope_;
			$rootScope.isOn = false;
			httpBackend = $httpBackend;

			$controller('FormController', {$scope: $rootScope});

			formElement = angular.element(templateHtml);
			view = $compile(formElement)($rootScope);
			$rootScope.$digest();
		}));

		it('should be in the dom', function() {
			expect(angular.element(templateHtml).find('form').length).toBe(1);
		});

		it('should display message when name input is empty', function() {
			view.find("[name='uName']").trigger('focus');
			view.find("[name='uName']").trigger('blur');
			expect(view.find('#uName-error').hasClass('ng-hide')).toBe(false)
		});

		it('should not display message when name input is empty', function() {
			view.find("[name='uName']").trigger('focus');
			view.find("[name='uName']").val('Benny');
			view.trigger('blur');
			expect(view.find('#uName-error').hasClass('ng-hide')).toBe(true);
		});
	});

});
