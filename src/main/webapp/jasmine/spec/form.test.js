describe('form tests', function() {
	var templateHtml;

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
        var $compile, $rootScope, formElement;
        beforeEach(inject(function(_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $rootScope.isOn = false;
            formElement = angular.element(templateHtml);
            var element = $compile(formElement)($rootScope);
            $rootScope.$apply();
        }));
		
		it('should be in the dom', function() {
			expect(angular.element(templateHtml).find('form').length).toBe(1);
		});
		it('should display message when name input is empty', function() {
			console.log($(templateHtml));
			var nameInput = formElement.find("[name='uName']");
			nameInput.trigger('focus');
			nameInput.trigger('blur');
			var errorSpan = formElement.find('#uName-error');
			expect(errorSpan.hasClass('ng-hide')).toBe(false);
		});
		it('should not display message when name input is empty', function() {
			var nameInput = formElement.find("[name='uName']");
			nameInput.val('Benny');
			nameInput.trigger('focus');
			nameInput.trigger('blur');
			var errorSpan = formElement.find('#uName-error');
			expect(errorSpan.hasClass('ng-hide')).toBe(true);
		});
	});
});
