
'use strict';

(function ($) {

    /**
     *  Variables
     */

    var $document = $(document);
    var $header = $('#header');
    var $splash = $('#splash');

    var $slideInputs = $('.slide-input');
    var $serviceGroups = $('.services');
    var $counters = $('#pricing .counter');


    var Calculator = function () {

        this.service = '';
        this.dogs = 0;
        this.cats = 0;
        this.frequency = 0;
        this.time = 0;

        this.services {

            hangout: {

                minimum: 10,
                 
            }
        }


        this.calculate = function () {

            console.log(this.dogs + this.cats + this.frequency);
            console.log(this.service);
        }
    }

    var calculator = new Calculator();


    /**
     *  Functions
     */

    function checkStickyNav () {
        
        if ($document.scrollTop() >= $splash.height()) {

            $header.addClass('sticky');

        } else {

            $header.removeClass('sticky');
        }
    }


    function checkInputContents (input) {

        input = $(input);

        if (input.val()) {

            input.addClass('filled')
        }
    }


    /**
     *  Watches
     */
    
    $document
        .scroll(function () {

            checkStickyNav();
        });


    $serviceGroups
        .each(function (index, serviceGroup) {

            var $serviceGroup = $(serviceGroup);
            var group = $serviceGroup.attr('group-name');

            $serviceGroup
                .find('.service')
                .each(function (index, service) {

                    var $service = $(service);

                    $service
                        .on('click', function () {

                            $serviceGroup
                                .find('.service .selection-overlay')
                                .removeClass('selected');

                            $service
                                .find('.selection-overlay')
                                .addClass('selected');

                            if (group === 'pricing') {

                                calculator.activity = $service.attr('name');
                                calculator.calculate();
                            }
                        });
                }) 
        });


    $counters
        .each(function (index, counter) {

            var $counter = $(counter);
            var $numbers = $counter.find('ul.count li');

            $numbers
                .on('click', function (event) {

                    var $number = $(event.target);
                    var value = parseInt($number.text());
                    var interval = 19;
                    var width = 5 + (interval*value);
                    var field = $counter.attr('field');

                    $numbers.removeClass('selected');
                    $number.addClass('selected');

                    $counter
                        .find('.fill')
                        .css('width', width+'%');

                    console.log(value);
                    calculator[field] = value;
                    calculator.calculate();
                });
        });
        


    $slideInputs
        .find('input')
        .on('focus', function () {

            var input = $(this);
            input.addClass('filled');
        })
        .on('focusout', function () {

            var input = $(this);

            if (!input.val()) {

                input.removeClass('filled');
            }
        });


})(jQuery);