/*global jQuery*/

(function ($) {
	function getTarget($anchor) {
		return $($anchor.attr('href'));
	}

	function setActive($anchor) {
		var target = getTarget($anchor);

		$anchor.addClass('active');
		target.addClass('active');
	}

	function setInActive($anchor) {
		var target = getTarget($anchor);

		$anchor.removeClass('active');
		target.removeClass('active');
	}

	function createTabmenu($container) {
		$container.on('click', 'a', function (event) {
			event.preventDefault();

			setInActive($container.find('.active'));
			setActive($(this));
		});
	}

	$.fn.tabmenu = function () {
		return this.each(function () {
			createTabmenu($(this));
		});
	};
}(jQuery));