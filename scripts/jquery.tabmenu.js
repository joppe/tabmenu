/*global jQuery*/

(function ($) {
	/**
	 * Get the anchor element of the tab item
	 *
	 * @param {jQuery} $tab
	 * @return {jQuery}
	 */
	function getAnchor($tab) {
		if ($tab.get(0).tagName.toLowerCase() === 'a') {
			return $tab;
		}

		return $tab.find('a');
	}

	/**
	 * Get the target element of the tab item
	 *
	 * @param {jQuery} $tab
	 * @return {jQuery}
	 */
	function getTarget($tab) {
		var $anchor = getAnchor($tab);

		return $($anchor.attr('href'));
	}

	/**
	 * Set a tab active
	 *
	 * @param {jQuery} $anchor
	 * @param {Object} settings
	 */
	function setActive($tab, settings) {
		var $target = getTarget($tab);

		$tab.addClass(settings.tab_active_class);
		$target.addClass(settings.target_active_class);
	}

	/**
	 * Set an item as the active one
	 *
	 * @param {jQuery} $anchor
	 * @param {Object} settings
	 */
	function setInActive($tab, settings) {
		var $target = getTarget($tab);

		$tab.removeClass(settings.tab_active_class);
		$target.removeClass(settings.target_active_class);
	}

	/**
	 * Get the active tab
	 *
	 * @param {jQuery} $container
	 * @param {Object} settings
	 * @return {jQuery}
	 */
	function getActiveTab($container, settings) {
		return $container.find(settings.tab_selector + '.' + settings.tab_active_class);
	}

	/**
	 * Handle a click event
	 *
	 * @param {jQuery} $tab
	 * @param {jQuery} $container
	 * @param {Object} settings
	 */
	function handleClick($tab, $container, settings) {
		var current_active_tab = getActiveTab($container, settings);

		if (current_active_tab.length > 0) {
			setInActive(current_active_tab, settings);
		}

		setActive($tab, settings);
	}

	/**
	 * Create the tabmenu
	 *
	 * @param {jQuery} $container
	 * @param {Object} settings
	 */
	function createTabmenu($container, settings) {
		var hash = window.location.hash,
			active_tab;

		$container.on('click', settings.tab_selector, function (event) {
			event.preventDefault();

			handleClick($(this), $container, settings);
		});

		// check for hash in url
		if (hash.length > 1) {
			active_tab = $container.find('a[href="' + hash + '"]').parent(settings.tab_selector);
		}
		if (typeof active_tab === 'undefined' || active_tab.length === 0) {
			active_tab = getActiveTab($container, settings);
		}
		if (typeof active_tab === 'undefined' || active_tab.length === 0) {
			active_tab = $container.find(settings.tab_default_active);
		}

		active_tab.trigger('click');
	}

	var default_settings = {
		tab_selector: 'li',
		tab_active_class: 'active',
		tab_default_active: 'li:first',
		target_active_class: 'active'
	};

	/**
	 * jQuery tabmenu plugin
	 *
	 * @param {Object} [options]
	 * @return {jQuery}
	 */
	$.fn.tabmenu = function (options) {
		var settings = $.extend({}, default_settings, options);

		return this.each(function () {
			createTabmenu($(this), settings);
		});
	};
}(jQuery));