describe('form tests', function() {
	var templateHtml;


	beforeEach(module('FormApp'));
	beforeEach(inject(function($templateCache) {
		templateHtml = $templateCache.get('form.html');
		console.log($templateCache.get('../form.html'));
		if (!templateHtml) {
			templateHtml = $.ajax('/jetty-guice-jpa/form.html', {
				async : false
			}).responseText;
			$templateCache.put('form.html', templateHtml)
		}
	}));
	describe('form validations', function() {

		var $compile, $rootScope, formElement, httpBackend;
		beforeEach(inject(function(_$compile_, _$rootScope_, $injector, $controller, $httpBackend) {
			$compile = _$compile_;
			$rootScope = _$rootScope_;
			$rootScope.isOn = false;
			httpBackend = $httpBackend;

			$controller('FormController', {$scope: $rootScope});

			formElement = angular.element(templateHtml);
			var element = $compile(formElement)($rootScope);
			$rootScope.$apply();
		}));
		
		it('should be in the dom', function() {
			expect(angular.element(templateHtml).find('form').length).toBe(1);
		});

		it('should not display message when name input is empty', function() {
			var nameInput = formElement.find("[name='uName']");
			nameInput.val('Benny');
			nameInput.trigger('focus');
			nameInput.trigger('blur');
			var errorSpan = formElement.find('#uName-error');
			expect(errorSpan.hasClass('ng-hide')).toBe(true);
		});

		it('should test http response', function() {
			httpBackend.expectPOST('/blah').respond('201', 'broom')
			$rootScope.sendRequest();
			httpBackend.flush();
			expect($rootScope.result).toBe('blah');
		});
	});
});
