/**
 * Client side validation. Mirrors HTML5 validation API as much as possible.
 *
 * Supported types are:
 * - required
 * - minlength
 * - pattern
 * - min/max number range checking
 *
 * @param  {Object} $         jQuery
 * @return {Class}           Validation
 */
define(['jquery', 'DoughBaseComponent'], function($, DoughBaseComponent) {
  'use strict';

  var defaultConfig = {
    fieldSelector: 'input, textarea, select',
    attributeEmpty: 'data-dough-validation-empty',
    attributeInvalid: 'data-dough-validation-invalid',
    rowInvalidClass: 'is-errored',
    validationSummaryClass: 'validation-summary',
    validationSummaryListAttribute: 'data-dough-validation-summary-list',
    validationSummaryHiddenClass: 'validation-summary--hidden',
    validationSummaryErrorClass: 'validation-summary__error',
    inlineErrorClass: 'js-inline-error'
  },

  uiEvents = {
    'blur input, select, textarea': '_handleBlurEvent',
    'keyup input, textarea': '_handleChangeEvent',
    'change input, select': '_handleChangeEvent',
    'submit': '_handleSubmit'
  },

  /**
   * Call base constructor
   * @constructor
   */
  Validation = function($el, config) {
    this.uiEvents = uiEvents;
    Validation.baseConstructor.apply(this, arguments);
    this.config = $.extend(defaultConfig, this.config);
  };

  DoughBaseComponent.extend(Validation);

  Validation.prototype.init = function() {
    this.ATTRIBUTE_VALIDATORS = {
      'required': '_validateRequired',
      'pattern': '_validatePattern',
      'min': '_validateMin',
      'max': '_validateMax',
      'minlength': '_validateMinLength'
    };

    // If there's server erros on the page, we back off completely
    // There are a number of different types of errors that the server
    // generates, and this file will grow in complexity trying to keep up.
    if (this.$el.find('[' + this.config.validationSummaryListAttribute + ']').find('li').length > 0) {
      this._unbindUiEvents();
      this.enabled = false;
      return this;
    }

    this.$allFieldsOnPage = this.$el.find(this.config.fieldSelector);
    this.errors = [];
    this._prepareMarkup();

    this.enabled = true;

    return this;
  };

  /**
   * Register an error, to be used with both inline and validation summary
   * @param {Object} fieldGroupValidity The validity object generated by _getfieldGroupValidity()
   * @return {Validation}        Class instance
   */
  Validation.prototype.addError = function(fieldGroupValidity) {
    var existingErrorIndex = this._getErrorIndexByName(fieldGroupValidity.name);

    if (existingErrorIndex !== -1) {
      this.errors.splice(existingErrorIndex, 1);
    }

    this.errors.push(fieldGroupValidity);

    this._addAccessibility(fieldGroupValidity.$fieldGroup);
    this._sortErrorsByFieldDisplayOrder().refreshInlineErrors().refreshValidationSummary();

    return this;
  };

  /**
   * Remove an error
   * @param  {Object} fieldGroupValidity Field Validity Object
   * @return {Validation}        Class instance
   */
  Validation.prototype.removeError = function(fieldGroupValidity) {
    var existingErrorIndex = this._getErrorIndexByName(fieldGroupValidity.name);
    if (existingErrorIndex !== -1) {
      this.errors.splice(existingErrorIndex, 1);
    }

    this._removeAccessibility(fieldGroupValidity.$fieldGroup);
    this._sortErrorsByFieldDisplayOrder().refreshInlineErrors().refreshValidationSummary();

    return this;
  };

  /**
   * Refresh all the inline error messages
   * @return {Validation} Class instance
   */
  Validation.prototype.refreshInlineErrors = function() {
    this.$el.find('.form__row').each($.proxy(function(i, o) {
      var $formRow = $(o),
          $errorContainer = $formRow.find('.' + this.config.inlineErrorClass),
          $inputs = $formRow.find(this.config.fieldSelector),
          errorHTML = "",
          rowHasErrors = false,
          groupsDealtWith = [];

      $inputs.each($.proxy(function(_i, _o) {
        var $input = $(_o),
            inputName = $input.attr('name'),
            errorIndex = this._getErrorIndexByName(inputName);

        if (errorIndex > -1 && $.inArray(inputName, groupsDealtWith) === -1) {
          rowHasErrors = true;
          groupsDealtWith.push(inputName);
          errorHTML += '<p id="' + this._getInlineErrorID(inputName) + '" class="' + this.config.validationSummaryErrorClass + '">' + (errorIndex + 1) + '. ' + this.errors[errorIndex].message + '</p>';
        }
      }, this));

      if (rowHasErrors) {
        $formRow.addClass(this.config.rowInvalidClass);
      }
      else {
        $formRow.removeClass(this.config.rowInvalidClass);
      }

      $errorContainer.html(errorHTML);

    }, this));

    return this;
  };

  /**
   * Loop through the errors and build the summary markup
   * @return {Validation} Class instance
   */
  Validation.prototype.refreshValidationSummary = function() {
    var fieldName,
        fieldGroupValidity,
        summaryHTML = '';

    $.each(this.errors, $.proxy(function(errorIndex, fieldGroupValidity) {
      fieldName = fieldGroupValidity.name;
      summaryHTML += '<li class="' + this.config.validationSummaryErrorClass + '"><a href="#error-' + fieldName + '">' + fieldGroupValidity.message + '</a></li>';
    }, this));

    this.$el.find('[' + this.config.validationSummaryListAttribute + ']').html(summaryHTML);

    if (this.errors.length < 1) {
      this._hideValidationSummary();
    }

    return this;
  };

  /**
   * Check a field's validity and update the errors array
   * @param  {jQuery} $field The field to validate
   * @return {Validation}        Class instance
   */
  Validation.prototype.checkfieldGroupValidity = function($field) {
    var $fieldGroup = this._getFieldGroup($field),
        fieldGroupValidity = this._getFieldGroupValidity($fieldGroup);

    if (fieldGroupValidity.hasError) {
      this.addError(fieldGroupValidity);
    }
    else {
      this.removeError(fieldGroupValidity);
    }

    return this;
  };

  /**
   * Prepare the markup for both inline errors and the validation summary
   *
   * This will check to see if there's an inline error block rendered by the server
   * (in case it's picked up errors we don't support)
   *
   * It will also generate a fallback list if the server hasn't been configured.
   *
   * @private
   * @return {[type]} [description]
   */
  Validation.prototype._prepareMarkup = function() {
    var $validationSummary = this.$el.find('.' + this.config.validationSummaryClass);
    if (!$validationSummary.length) {
      this.$el.prepend('<div class="' + this.config.validationSummaryClass + ' ' + this.config.validationSummaryHiddenClass + '">\
          <ol ' + this.config.validationSummaryListAttribute + '></ol>\
        </div>');
    }

    this.$el.find('.form__row').each($.proxy(function(i, o) {
      var $formRow = $(o),
          $existingInlineErrors = $formRow.find('.' + this.config.inlineErrorClass);

      if (!$existingInlineErrors.length) {
        $formRow.prepend($('<div class="' + this.config.inlineErrorClass + '" />'));
      }
    }, this));

    return this;
  };

  /**
   * Generate the ID to be used with the inline error blocks
   * These are used for the validation summary deeplinks, and
   * for the aria-describedby property on the field.
   *
   * @private
   * @param  {String} fieldName The field name
   * @return {String}         The inline error ID
   */
  Validation.prototype._getInlineErrorID = function(fieldName) {
    return 'error-' + fieldName;
  };

  /**
   * Add the accessibility attributes to an invalid field
   * @private
   * @param {jQuery} $fieldGroup jQuery field
   * @return {Validation}  Class instance
   */
  Validation.prototype._addAccessibility = function($fieldGroup) {
    $fieldGroup.each($.proxy(function(i, field) {
      var $field = $(field),
          existingDescribedBy = $field.attr('aria-describedby') || '',
          inlineErrorID = this._getInlineErrorID($field.attr('name'));

      $field.attr('aria-invalid', 'true');

      if ($.inArray(inlineErrorID, existingDescribedBy) === -1) {
        $field.attr('aria-describedby', existingDescribedBy + ' ' + inlineErrorID);
      }
    }, this));

    return this;
  };

  /**
   * Remove aria attributes for a valid field
   * @param  {[type]} $fieldGroup [description]
   * @return {[type]}               [description]
   */
  Validation.prototype._removeAccessibility = function($fieldGroup) {
    $fieldGroup.each($.proxy(function(i, field) {
      var $field = $(field),
          existingDescribedBy = $field.attr('aria-describedby') || '',
          inlineErrorID = this._getInlineErrorID($field.attr('name'));

      $field.removeAttr('aria-invalid');
      $field.attr('aria-describedby', existingDescribedBy.replace(inlineErrorID, ''));
    }, this));

    return this;
  };

  /**
   * Show the validation summary;
   *
   * @private
   * @return {[type]} [description]
   */
  Validation.prototype._showValidationSummary = function() {
    this.$el.find('.' + this.config.validationSummaryClass).removeClass(this.config.validationSummaryHiddenClass);
    return this;
  };

  /**
   * Hide the validation summary;
   *
   * @private
   * @return {[type]} [description]
   */
  Validation.prototype._hideValidationSummary = function() {
    this.$el.find('.' + this.config.validationSummaryClass).addClass(this.config.validationSummaryHiddenClass);
    return this;
  };

  /**
   * Check a field group's validity
   * For required fields, only ONE element in the group needs a value
   *
   * @private
   * @param  {jQuery} $fieldGroup The field group to validate (grouped by 'name' attribute)
   * @return {Object}        A hash containing status and the appropriate error message
   */
  Validation.prototype._getFieldGroupValidity = function($fieldGroup) {
    var $primaryField = $fieldGroup.first(),
        fieldGroupValidity = {
          errors: [],
          isEmpty: true,
          isInvalid: false,
          hasError: false,
          message: '',
          name: $primaryField.attr('name'),
          $fieldGroup: $fieldGroup
        };

    // Populate the field validity with an array of results from the various validators
    $.each(this.ATTRIBUTE_VALIDATORS, $.proxy(function(attributeSelector, handler) {
      $fieldGroup.each($.proxy(function(_fieldIndex, field) {
        var $field = $(field),
            attr = $field.attr(attributeSelector);

        if (attr) {
          fieldGroupValidity.errors.push(this[handler]($field, $field.val(), attr));
        }
      }, this));
    }, this));

    return this._prepareFieldGroupValidity($primaryField, fieldGroupValidity);
  };

  /**
   * Make the fieldValidity object useful by hoisting up
   * various properties from the individual validators
   *
   * @param  {jQuery} $primaryField      The primary field of the group (usually the first)
   * @param  {Object} fieldGroupValidity Validity object including results of the validators
   * @return {Object}                    fieldGroupValidity with normalised states for display
   */
  Validation.prototype._prepareFieldGroupValidity = function($primaryField, fieldGroupValidity) {
    // Hoist up to top level for ease of access
    $.each(fieldGroupValidity.errors, function(i, validatorResults) {
      if (validatorResults.name == "required" && validatorResults.isEmpty !== true) {
        fieldGroupValidity.isEmpty = false;
      }

      if (validatorResults.isInvalid) {
        fieldGroupValidity.isInvalid = true;
      }
    });

    fieldGroupValidity.hasError = fieldGroupValidity.errors.length && (fieldGroupValidity.isEmpty || fieldGroupValidity.isInvalid);

    // Check which message to use, empty should take prescedence
    if (fieldGroupValidity.isInvalid) {
      fieldGroupValidity.message = $primaryField.attr(this.config.attributeInvalid) || $primaryField.attr(this.config.attributeEmpty);
    }

    if (fieldGroupValidity.isEmpty) {
      fieldGroupValidity.message = $primaryField.attr(this.config.attributeEmpty);
    }

    return fieldGroupValidity;
  };


  /**
   * Basic required field validator, for non-empty
   *
   * @private
   * @param  {jQuery} $field   the field being checked
   * @param  {String} value    the field value
   * @param  {String} required Validation parameters
   * @return {Object}          Validity object
   */
  Validation.prototype._validateRequired = function($field, value, required) {
    var validity = { name: 'required' };

    if ($field.is('[type="radio"]') && !$field.prop('checked')) {
      validity.isEmpty = true;
    }
    else {
      if (value == '') {
        validity.isEmpty = true;
      }
    }

    return validity;
  };

  /**
   * Regular expression validator
   *
   * @private
   * @param  {jQuery} $field   the field being checked
   * @param  {String} value    the field value
   * @param  {String} pattern Validation parameters
   * @return {Object}          Validity object
   */
  Validation.prototype._validatePattern = function($field, value, pattern) {
    var validity = { name: 'pattern' };
    if (!value.match(pattern)) {
      validity.isInvalid = true;
    }

    return validity;
  };

  /**
   * Check a number is above the minimum
   *
   * @private
   * @param  {jQuery} $field   the field being checked
   * @param  {String} value    the field value
   * @param  {String} min Validation parameters
   * @return {Object}          Validity object
   */
  Validation.prototype._validateMin = function($field, value, min) {
    var validity = { name: 'min' },
        valueAsNumber = Number(value);

    if (isNaN(valueAsNumber) || valueAsNumber < min) {
      validity.isInvalid = true;
    }

    return validity;
  };

  /**
   * Check a number is below the maximum
   *
   * @private
   * @param  {jQuery} $field   the field being checked
   * @param  {String} value    the field value
   * @param  {String} max Validation parameters
   * @return {Object}          Validity object
   */
  Validation.prototype._validateMax = function($field, value, max) {
    var validity = { name: 'max' },
        valueAsNumber = Number(value);

    if (isNaN(valueAsNumber) || valueAsNumber > max) {
      validity.isInvalid = true;
    }

    return validity;
  };

  /**
   * Ensure a minimum number of characters
   *
   * @private
   * @param  {jQuery} $field   the field being checked
   * @param  {String} value    the field value
   * @param  {String} minlength Validation parameters
   * @return {Object}          Validity object
   */
  Validation.prototype._validateMinLength = function($field, value, minlength) {
    var validity = { name: 'minlength' };
    // Check for more than 0 otherwise we clash with 'isEmpty'
    if (value.length > 0 && value.length < minlength) {
      validity.isInvalid = true;
    }

    return validity;
  };

  /**
   * Get the index in the error array according to the field group name
   *
   * @private
   * @param  {String} fieldName Field name
   * @return {Integer}    Index in errors array
   */
  Validation.prototype._getErrorIndexByName = function(fieldName) {
    var matchedErrorIndex = -1;
    $.each(this.errors, $.proxy(function(index, fieldGroupValidity) {
      var _fieldName = fieldGroupValidity.name;
      if (_fieldName === fieldName) {
        matchedErrorIndex = index;
        return;
      }
    }, this));

    return matchedErrorIndex;
  };

  /**
   * Sort the errors so they are in line with the order the fields are displayed on the page
   * regardless of the order they were 'created'
   *
   * If the user fills in the form bottom-to-top, then the first error will still be the
   * first field on the page.
   *
   * @private
   * @return {Validation} Class Instance
   */
  Validation.prototype._sortErrorsByFieldDisplayOrder = function() {
    var sortedErrors = [],
        groupsDealtWith = [];

    this.$allFieldsOnPage.each($.proxy(function(i, o) {
      var $field = $(o),
          fieldName = $field.attr('name'),
          fieldErrorIndex = this._getErrorIndexByName(fieldName);

      if (fieldErrorIndex !== -1 && $.inArray(fieldName, groupsDealtWith) === -1) {
        sortedErrors.push(this.errors[fieldErrorIndex]);
        groupsDealtWith.push(fieldName);
      }
    }, this));

    this.errors = sortedErrors;
    return this;
  };

  /**
   * Look for all fields with the same name, and validate
   * as a group.
   * Typical use case for this is radio/checkboxes.
   *
   * @param  {jQuery} $field jQuery field
   * @return {jQuery}        jQuery fieldgroup, array of fields with matching name
   */
  Validation.prototype._getFieldGroup = function($field) {
    var $fieldGroup,
        fieldName = $field.attr('name');

    return this.$allFieldsOnPage.filter('[name="' + fieldName + '"]');
  };

  /**
   * Inline errors are shown on input blur
   *
   * @private
   * @param  {Event} e BlurEvent
   * @return {void}
   */
  Validation.prototype._handleBlurEvent = function(e) {
    this.checkfieldGroupValidity($(e.target));
  };

  /**
   * Error messages get corrected as the user types. Only do this if we can see an error exists.
   *
   * @private
   * @param  {Object} e ChangeEvent
   * @return {void}
   */
  Validation.prototype._handleChangeEvent = function(e) {
    var $field = $(e.target);

    if (this._getErrorIndexByName($field.attr('name')) > -1) {
      this.checkfieldGroupValidity($field);
    }
  };

  /**
   * The validation summary is updated on form submit
   *
   * @private
   * @return {void}
   */
  Validation.prototype._handleSubmit = function(e) {
    this.$allFieldsOnPage.each($.proxy(function(i, field) {
      this.checkfieldGroupValidity($(field));
    }, this));

    if (this.errors.length) {
      e.preventDefault();
      this._sortErrorsByFieldDisplayOrder().refreshValidationSummary()._showValidationSummary();
    }
  };


  return Validation;

});
