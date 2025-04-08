
(function ($) {

	"use strict";

	// Preload
	$(window).on('load', function () { // makes sure the whole site is loaded
		$('[data-loader="circle-side"]').fadeOut(); // will first fade out the loading animation
		$('#preloader').addClass('loaded');
	})

	// Count down
	setInterval(function() {
		var target = new Date("July 15 2023 13:30:00 GMT+0100"); //replace with YOUR DATE
		var now = new Date();
		var difference = Math.floor((target.getTime() - now.getTime()) / 1000);

		var seconds = fixIntegers(difference % 60);
		difference = Math.floor(difference / 60);

		var minutes = fixIntegers(difference % 60);
		difference = Math.floor(difference / 60);

		var hours = fixIntegers(difference % 24);
		difference = Math.floor(difference / 24);

		var days = difference;
	
		$(".countdown #seconds").html(seconds);
		$(".countdown #minutes").html(minutes);
		$(".countdown #hours").html(hours);
		$(".countdown #days").html(days);

		
	}, 1000); 
	function fixIntegers(integer) {
		if (integer < 0)
			integer = 0;
		if (integer < 10)
			return "0" + integer;
		return "" + integer;
	}

	//Datepicker
	$('input[name="dates"]').daterangepicker({
		  autoUpdateInput: false,
		  minDate:new Date(),
		  locale: {
			  cancelLabel: 'Clear'
		  }
	  });
	  $('input[name="dates"]').on('apply.daterangepicker', function(ev, picker) {
		  $(this).val(picker.startDate.format('MM-DD-YY') + '  >  ' + picker.endDate.format('MM-DD-YY'));
	  });
	  $('input[name="dates"]').on('cancel.daterangepicker', function(ev, picker) {
		  $(this).val('');
	  });

	// Date picker single + translation French + european date format
	$('.datepicker_translation').daterangepicker({
        autoUpdateInput: false,
        minDate: new Date(),
        showCustomRangeLabel: false,
         locale: {
         	separator:' > ',
         	direction: 'ltr',
	        format: 'DD/MM/YY',
	        applyLabel: 'Valider',
	        cancelLabel: 'Annuler',
	        fromLabel: 'De',
	        toLabel: 'à',
	        daysOfWeek: [
	            'Dim',
	            'Lun',
	            'Mar',
	            'Mer',
	            'Jeu',
	            'Ven',
	            'Sam'
	        ],
	        monthNames: [
	            'Janvier',
	            'Février',
	            'Mars',
	            'Avril',
	            'Mai',
	            'Juin',
	            'Juillet',
	            'Août',
	            'Septembre',
	            'Octobre',
	            'Novembre',
	            'Décembre'
	        ]
	    }
	     });
	    $('.datepicker_translation').on('apply.daterangepicker', function(ev, picker) {
		  $(this).val(picker.startDate.format('DD-MM-YY') + '  >  ' + picker.endDate.format('DD-MM-YY'));
	  });
	  $('.datepicker_translation').on('cancel.daterangepicker', function(ev, picker) {
		  $(this).val('');
	  });

		// Carousel items 1
		$('.carousel_item_1').owlCarousel({
		    center: true,
		    items:1,
		    loop:false,
		    autoplay:false,
		    addClassActive: true,
		    margin:0,
		    autoplayTimeout:3000,
			autoplayHoverPause:true,
		    responsive:{
		    	0:{
		            dots:true
		        },
		        991:{
		            dots:true
		        }
		    }
		});

		// Modals
		$('#modal-offers-open').on('click', function(e) {
			var mod = $('#main'),
				modal = $('#modal-offers');
				mod.animate({ opacity: 0 }, 400, function(){
				$('html,body').scrollTop(0);
				modal.addClass('modal-active').fadeIn(400);
			});
			e.preventDefault();

			$('.modal-close, .modal-close-2').on('click', function(e) {
				modal.removeClass('modal-active').fadeOut(400, function(){
					mod.animate({ opacity: 1 }, 400);
				});
				e.preventDefault();
			});
		});
		
		$('#modal-notified-open').on('click', function(e) {
			var mod = $('#main'),
				modal = $('#modal-notified');
				mod.animate({ opacity: 0 }, 400, function(){
				$('html,body').scrollTop(0);
				modal.addClass('modal-active').fadeIn(400);
			});
			e.preventDefault();

			$('.modal-close').on('click', function(e) {
				modal.removeClass('modal-active').fadeOut(400, function(){
					mod.animate({ opacity: 1 }, 400);
				});
				e.preventDefault();
			});
		});

		$('#modal-contacts-open').on('click', function(e) {
			var mod = $('#main'),
				modal = $('#modal-contacts');
				mod.animate({ opacity: 0 }, 400, function(){
				$('html,body').scrollTop(0);
				modal.addClass('modal-active').fadeIn(400);
			});
			e.preventDefault();

			$('.modal-close').on('click', function(e) {
				modal.removeClass('modal-active').fadeOut(400, function(){
					mod.animate({ opacity: 1 }, 400);
				});
				e.preventDefault();
			});
			
		});

		
})(window.jQuery); 

// Quantity input  
    // This button will increment the value
    $('.qtyplus').on('click', function(e){
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('name');
        // Get its current value
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        // If is not undefined
        if (!isNaN(currentVal)) {
            // Increment
            $('input[name='+fieldName+']').val(currentVal + 1);
        } else {
            // Otherwise put a 0 there
            $('input[name='+fieldName+']').val(1);
        }
    });
    // This button will decrement the value till 0
    $(".qtyminus").on('click',function(e) {
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('name');
        // Get its current value
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        // If it isn't undefined or its greater than 0
        if (!isNaN(currentVal) && currentVal > 0) {
            // Decrement one
            $('input[name='+fieldName+']').val(currentVal - 1);
        } else {
            // Otherwise put a 0 there
            $('input[name='+fieldName+']').val(0);
        }
    });
