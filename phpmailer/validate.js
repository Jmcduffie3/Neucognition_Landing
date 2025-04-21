/* <![CDATA[ */
/// Jquery validate newsletter
jQuery(document).ready(function(){

	$('#newsletter').submit(function(){

		var action = $(this).attr('action');

		$("#message-newsletter").slideUp(750,function() {
		$('#message-newsletter').hide();
		
		$('#submit-newsletter')
			.attr('disabled','disabled');

		$.post(action, {
			email_newsletter: $('#email_newsletter').val()
		},
			function(data){
				document.getElementById('message-newsletter').innerHTML = data;
				$('#message-newsletter').slideDown('slow');
				$('#newsletter .loader').fadeOut('slow',function(){$(this).remove()});
				$('#submit-newsletter').removeAttr('disabled');
				if(data.match('success') != null) $('#newsletter').slideUp('slow');

			}
		);

		});

		return false;

	});

});

// Jquery validate form contact
jQuery(document).ready(function(){

	$('#check_avail').submit(function(){

		var action = $(this).attr('action');

		$("#message-booking").slideUp(750,function() {
		$('#message-booking').hide();

 		$('#submit-check')
			.attr('disabled','disabled');

		$.post(action, {
			dates: $('#dates').val(),
			name: $('#name').val(),
			email: $('#email').val(),
			quantity: $('#quantity').val()
	
		},
			function(data){
				document.getElementById('message-booking').innerHTML = data;
				$('#message-booking').slideDown('slow');
				$('#check_avail .loader').fadeOut('slow',function(){$(this).remove()});
				$('#submit-check').removeAttr('disabled');
				if(data.match('success') != null) $('#check_avail').slideUp('slow');

			}
		);

		});

		return false;

	});
		});
		

// Add this to your validate.js file
jQuery(document).ready(function(){
    // Form validation for Ask form
    $('#newsletter').submit(function(){
        var valid = true;
        
        // Check required fields
        if ($('#name-ask').val().trim() === '') {
            $('#name-ask').addClass('error');
            valid = false;
        } else {
            $('#name-ask').removeClass('error');
        }
        
        if ($('#email-ask').val().trim() === '') {
            $('#email-ask').addClass('error');
            valid = false;
        } else {
            // Simple email validation
            var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            if (!emailReg.test($('#email-ask').val().trim())) {
                $('#email-ask').addClass('error');
                valid = false;
            } else {
                $('#email-ask').removeClass('error');
            }
        }
        
        if ($('#message-ask').val().trim() === '' || $('#message-ask').val().trim().length < 5) {
            $('#message-ask').addClass('error');
            valid = false;
        } else {
            $('#message-ask').removeClass('error');
        }
        
        if (!valid) {
            alert('Please fill out all required fields correctly.');
            return false;
        }
        
        // Continue with AJAX submission if valid
        var action = $(this).attr('action');
        
        $("#message-askus").slideUp(750, function() {
            $('#message-askus').hide();
            $('#submit-ask').attr('disabled', 'disabled');
            
            $.post(action, {
                'name-ask': $('#name-ask').val(),
                'email-ask': $('#email-ask').val(),
                'tel-ask': $('#tel-ask').val(),
                'message-ask': $('#message-ask').val()
            },
            function(data) {
                document.getElementById('message-askus').innerHTML = data;
                $('#message-askus').slideDown('slow');
                $('#submit-ask').removeAttr('disabled');
                if(data.match('success') != null) $('#newsletter').slideUp('slow');
            });
        });
        
        return false;
    });
});

  /* ]]> */