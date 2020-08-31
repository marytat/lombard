var getNextSibling = function (elem, selector) {
	var sibling = elem.nextElementSibling;

	if (!selector) return sibling;

	while (sibling) {
		if (sibling.matches(selector)) return sibling;
		sibling = sibling.nextElementSibling
	}
};

window.addEventListener('scroll', function() {
	var headerBottom = document.querySelector('.header-bottom'),
		header = headerBottom.closest('header'),
		headerBottomHeight = headerBottom.offsetHeight,
		headerHeight = header.offsetHeight,
		headerMargin = parseInt(window.getComputedStyle(header).marginBottom),
		nextSection = getNextSibling(header, '.section');

	if (window.scrollY > headerBottomHeight && window.outerWidth > 768) {
        headerBottom.classList.add('is-sticky');
        nextSection.style.marginTop = headerBottomHeight + headerMargin + 'px';
    } else if (window.outerWidth <= 768) {
    	header.classList.add('is-sticky');
        nextSection.style.marginTop = headerHeight + headerMargin + 'px';
    } else {
    	header.classList.remove('is-sticky');
        headerBottom.classList.remove('is-sticky');
        nextSection.style.marginTop = 0;
    }	
});

var acc = document.getElementsByClassName('accordion-item');
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener('click', function() {
    this.classList.toggle('active');
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
      panel.style.marginTop = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
      panel.style.marginTop = '1rem';
    } 
  });
};

var tabs = function() {
	var tabNav = document.querySelectorAll('.tabs-item'),
		tabContent = document.querySelectorAll('.tabs-content-item'),
		tabName;

	tabNav.forEach(function(item) {
		item.addEventListener('click', selectTabNav);
	});

	function selectTabNav() {
		tabNav.forEach(function(item) {
			item.classList.remove('is-active');
		});
		this.classList.add('is-active');
		tabName = this.getAttribute('data-tab-name');
		selectTabContent(tabName);
	};

	function selectTabContent(tabName) {
		tabContent.forEach(function(item) {
			item.classList.contains(tabName) ? item.classList.add('is-active') : item.classList.remove('is-active');
		});
	};
};

tabs();

var htmlElement = document.querySelector('html');
var burger = document.querySelectorAll('.navbar-burger');
var overlay = document.querySelector('.overlay');
var modalBtns = document.querySelectorAll('.modal-call');

burger.forEach(function(btn) {
	btn.onclick = function() {
		var slideMenu = btn.getAttribute('data-target');
		if (btn.classList.contains('is-active')) {
			btn.classList.remove('is-active');
			btn.closest('.header').classList.remove('is-open');
			document.getElementById(slideMenu).classList.remove('is-active');
			htmlElement.classList.remove('is-clipped');
		} else {
			btn.classList.add('is-active');
			btn.closest('.header').classList.add('is-open');
			document.getElementById(slideMenu).classList.add('is-active');
			htmlElement.classList.add('is-clipped');
		};		
	};
});

modalBtns.forEach(function(btn) {
	btn.onclick = function() {
		var modal = btn.getAttribute('data-modal');
		document.getElementById(modal).classList.add('is-active');
		htmlElement.classList.add('is-clipped');
	};
});

var closeBtns = document.querySelectorAll('.modal-card-close');

closeBtns.forEach(function(btn) {
	btn.onclick = function() {
		var modal = btn.closest('.modal'),
			modalForm = modal.querySelector('form'),
			dangerInputs = modal.querySelectorAll('.is-danger');
		modal.classList.remove('is-active');
		htmlElement.classList.remove('is-clipped');
		modalForm.reset();
		dangerInputs.forEach(function(el) {
			el.classList.remove('is-danger');
		});
	};
});

var nextBtns = document.querySelectorAll('.modal-next');

nextBtns.forEach(function(btn) {
	btn.onclick = function() {
		var thisModal = btn.closest('.modal'),
			nextModal = btn.getAttribute('data-modal');
		thisModal.classList.remove('is-active');
		document.getElementById(nextModal).classList.add('is-active');
	};
});

var confirmCity = document.querySelectorAll('.city-confirm');
var headerCity = document.getElementById('header-city');

headerCity.innerHTML = localStorage.getItem('localCity');

confirmCity.forEach(function(btn) {
	btn.onclick = function() {
		var thisModal = btn.closest('.modal'),
			thisCity = document.getElementById('location-city').innerHTML;
		thisModal.classList.remove('is-active');
		headerCity.innerHTML = thisCity;
		localStorage.setItem('localCity', thisCity);
	};
});

var citiesList = document.querySelectorAll('.cities-list');

citiesList.forEach(function(city) {
	city.onclick = function() {
		var thisModal = city.closest('.modal'),
			thisCity = city.getAttribute('data-city'),
			thisInput = thisModal.querySelectorAll('input');
		thisModal.classList.remove('is-active');
		htmlElement.classList.remove('is-clipped');
		headerCity.innerHTML = thisCity;
		localStorage.setItem('localCity', thisCity);
	};
});

window.onclick = function(e) {
	if (e.target.className === 'modal-background') {
		e.target.closest('.modal').classList.remove('is-active');		
		e.target.closest('.modal').querySelector('form').reset();
		e.target.closest('.modal').querySelectorAll('.is-danger').forEach(function(el) {
			el.classList.remove('is-danger');
		});
		htmlElement.classList.remove('is-clipped');
	}
	else if (e.target.className === 'overlay') {
		document.getElementById('slide-menu').classList.remove('is-active');
		document.getElementById('slide-menu').closest('.header').classList.remove('is-open');
		burger[0].classList.remove('is-active');
		htmlElement.classList.remove('is-clipped');
	}
};

var fileInput = document.querySelector('input[type=file]');

if (fileInput) {
	fileInput.onchange = () => {
		if (fileInput.files.length > 0) {
			const fileName = document.querySelector('.file-name');
			fileName.textContent = fileInput.files[0].name;
		}
	};
};


document.querySelectorAll('.file-input').forEach(inputElement => {
	const dropZoneElement = inputElement.closest('.dropzone');

	dropZoneElement.addEventListener('dragover', e => {
		e.preventDefault();
		dropZoneElement.classList.add('dragover');
	});

	['dragleave', 'dragend'].forEach(type => {
		dropZoneElement.addEventListener(type, e => {
			dropZoneElement.classList.remove('dragover');
		});
	});

	dropZoneElement.addEventListener('drop', e => {
		e.preventDefault();
		
		if (e.dataTransfer.files) {
			inputElement.files = e.dataTransfer.files;
			const fileName = dropZoneElement.querySelector('.file-name');
			fileName.textContent = e.dataTransfer.files[0].name;
		}

		dropZoneElement.classList.remove('dragover');
	});
});

var passShowHide = document.querySelectorAll('.btn-show-hide-pw');

passShowHide.forEach(function(ico) {
	ico.onclick = function() {
		var thisControl = ico.closest('.is-password'),
			thisInput = thisControl.querySelector('input'),
			faIco = thisControl.querySelector('.fa');

		thisInput.focus();
		if (thisInput.type === 'password') {
			thisInput.type = 'text';
			faIco.classList.add('fa-eye-slash');
		} else {
			thisInput.type = 'password';
			faIco.classList.remove('fa-eye-slash');
		}
	};
});

ymaps.ready(function(){
    var geolocation = ymaps.geolocation,
    	locationBtn = $('.cities-autodetect');
    $('#location-city').html(geolocation.city);
    
    locationBtn.click(function() {
    	localStorage.setItem('localCity', geolocation.city);
    	$('#header-city').html(geolocation.city);
    	$('#modal-city-select').removeClass('is-active');
    	$('#modal-city-select').find('input').value = ' ';
    	htmlElement.classList.remove('is-clipped');
    });

    if (localStorage.getItem('localCity') == null) {
    	$('#modal-city').addClass('is-active');
    };
});

var forms = document.querySelectorAll('.is-form-validation');
var submitBtns = document.querySelectorAll('[type="submit"]');
var readonlyReset = document.querySelectorAll('.readonly-reset');


readonlyReset.forEach(function(btn) {
	var field = btn.closest('.field'),
		readonlyInput = field.querySelector('[readonly]'),
		fieldText = readonlyInput.value;	

	btn.onclick = function() {
		if (btn.classList.contains('readonly-reset')) {
			btn.classList.remove('readonly-reset');
			readonlyInput.readOnly = false;
			readonlyInput.focus();
			btn.innerText = 'Отменить';
		} else {
			readonlyInput.readOnly = true;
			btn.innerText = 'Изменить';
			readonlyInput.value = fieldText;
			btn.classList.add('readonly-reset');
		}
	};
});

var selectBox = document.querySelectorAll('.select-item-option');

selectBox.forEach(function(box) {
	var select = box.querySelector('select'),
		row = box.closest('.row-of-item'),
		submit = row.querySelector('[type="submit"]');

	select.onchange = function() {
		if (select.value == '') {
	        submit.classList.remove('is-primary');
	        submit.setAttribute('disabled', 'disabled');
	    }
	    else {
	        submit.removeAttribute('disabled');
	        submit.classList.add('is-primary');
	    }
	};	
});

var dateOptions = {
	startDay: 1,
	overlayPlaceholder: 'Введите год',
	overlayButton: 'Выбрать',
	customDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
	customMonths: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
	formatter: (input, date, instance) => {
		const value = date.toLocaleDateString()
		input.value = value // => '1/1/2099'
	}
};

var datePicker = document.querySelectorAll('[data-mask="date"]');

datePicker.forEach(function(input) {
	if (input.classList.contains('is-range-date')) {
		dateOptions.id = 1
		const picker = datepicker(input, dateOptions);
	} else {
		const picker = datepicker(input, dateOptions);
		if (input.classList.contains('is-birthday')) {
			picker.setMax(new Date());
		}
		if (input.classList.contains('is-passport-date')) {
			var date = new Date(),
				passportMinYear = date.getFullYear() - 14,
				passportminDate = new Date(passportMinYear, date.getMonth(), date.getDate());
			picker.setMax(passportminDate);
			picker.navigate(passportminDate);
		}
	}
});

var steps = document.querySelectorAll('.step');

steps.forEach(function(step) {
	var form = step.querySelector('.is-form-validation'),
		buttons = step.querySelectorAll('.button');

	buttons.forEach(function(btn) {
		btn.onclick = function() {
			var nextStep = btn.getAttribute('data-next'),
				previousStep = btn.getAttribute('data-previous');

			if (btn.hasAttribute('data-next')) {
				if (formChecking($(form))) {
					step.classList.add('is-hidden');
					document.getElementById(nextStep).classList.remove('is-hidden');
				}
			}

			if (btn.hasAttribute('data-previous')) {
				step.classList.add('is-hidden');
				document.getElementById(previousStep).classList.remove('is-hidden');
				form.reset();
			}
		}
	});
});




// function checkFormEmpty(form) {
//     var e = 0;
//     for (var i = 0; i < form.length-1; i++) {
//         if (!form[i].value.replace(/^\s+|\s+$/g, '')){
//             form[i].style.border='1px solid red';
//             e = 1;
//             btn.removeAttribute('disabled');
//         }
//     }
//     if(e) {
//         console.log('Заполните все поля');
//         return false;
//     }
// };


// submitBtns.forEach(function(btn) {
// 	var form = btn.closest('.is-form-validation'),
// 		inputs = form.querySelectorAll('.input');
// 	inputs.forEach(function(input) {
// 		input.style.borderColor = '#ff0000';
// 	});
// 	btn.setAttribute('disabled', 'disabled');
// });

forms.forEach(function(form) {    

	form.addEventListener('submit', function (event) {
	    event.preventDefault();
	    if (formChecking($(this))) {

	        var thisForm = $(this),
	            formData = formateFormData($(this));

	        $.ajax({
	            type: 'POST',
	            url: '/ajax/save-lombard-form.php',
	            data: formData,
	            processData: false,
	            contentType: false,
	            success: function (data) {
	                var response = JSON.parse(data);
	                if (response.STATUS == 'OK') {
	                    // $.magnificPopup.open({
	                    //     items: {р
	                    //         src: '<div id="success" class="white-popup centered"><h4>Заявка успешно отпавлена!</h4><p>Спасибо за обращение, мы с вами свяжемся</p></div>',
	                    //         type: 'inline'
	                    //     },
	                    //     callbacks: {
	                    //         open: function() {
	                    //             $.magnificPopup.instance.close = function() {
	                    //                 $('.first-block .calculator').removeClass('mfp-hide');
	                    //                 $(thisForm).trigger('reset');
	                    //                 $.magnificPopup.proto.close.call(this);
	                    //             };
	                    //         }
	                    //     }
	                    // });
	                } else if (response.STATUS == 'ERROR') {
	                    alert(response.MESSAGE);
	                }
	            },
	            error: function () {
	                alert('Не удалось сохранить заявку. Попробуйте позднее.');
	            }
	        });
	    }
	});
});

function formChecking(form, onFocus) {
    onFocus = onFocus || false;

    var noError = true,
        formName = form.attr('name'),
        formSubmit = form.find(':submit');

    form.find('input, select').each(function () {
        var $this = $(this);
        var mask = $this.attr('data-validation');
        var value = $this.val().trim();
        var placeHolder = $this.attr('placeholder');
        var regex;

        if (mask == 'radio') {
            var radioName = $this.attr('name');

            function validateRadio (radios)	{
                for (i = 0; i < radios.length; ++ i)
                {
                    if (radios [i].checked) return true;
                }
                return false;
            }

            function validateForm()	{
                if(validateRadio (document.forms[formName][radioName]))
                {
                    $this.closest('.help').removeClass('is-danger');
                    return true;
                }
                else
                {
                    $this.closest('.help').addClass('is-danger');
                    return false;
                }
            }

            validateForm();
        }

        if (mask == 'text') {
            if ((value.length < 1) || (value == placeHolder)) {

                noError = false;
                $this.addClass('is-danger');
                $this.closest('.control').siblings('.help').addClass('is-danger');
                if (onFocus) {
                    $this.focus();
                    onFocus = false;
                }
            } else {
            	$this.removeClass('is-danger');
                $this.closest('.control').siblings('.help').removeClass('is-danger');
            }
        }

        if (mask == 'email') {
            regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if (!regex.test(value) || value.length === 0) {
                noError = false;
                $this.addClass('is-danger');
                $this.closest('.control').siblings('.help').addClass('is-danger');
                if (onFocus) {
                    $this.focus();
                    onFocus = false;
                }
            } else {
            	$this.removeClass('is-danger');
                $this.closest('.control').siblings('.help').removeClass('is-danger');
            }
        }

        if (mask == 'phone optional') {
            var _errorPhone = false;
            var _values = value.replace(/[^0-9]/gim, '').split('')
            if(_values.length != 11 && _values.length >= 1){
                _errorPhone = true;
            }

            if (_errorPhone) {
                noError = false;
                $this.addClass('is-danger');
                $this.closest('.control').siblings('.help').addClass('is-danger');
                if (onFocus) {
                    $this.focus();
                    onFocus = false;
                }
            } else {
                $this.removeClass('is-danger');
                $this.closest('.control').siblings('.help').removeClass('is-danger');
            }
        }

        if (mask == 'phone required') {
            var _errorPhone = true;
            if (value.length > 6) {
                var _values = value.replace(/[^0-9]/gim, '').split(''),
                    _letter = '',
                    _index = 0;
                _errorPhone = false;
                for (var i in _values) {
                    if (_letter != _values[i]) {
                        _letter = _values[i];

                        _index = 0;
                    } else {
                        _index++;
                    }

                    if (_index == 7) {
                        _errorPhone = true;

                        break;
                    }
                }
                if(_values.length != 11){
                    _errorPhone = true;
                }

            }

            if (_errorPhone) {
                noError = false;
                $this.addClass('is-danger');
                $this.closest('.control').siblings('.help').addClass('is-danger');
                if (onFocus) {
                    $this.focus();
                    onFocus = false;
                }
            } else {
                $this.removeClass('is-danger');
                $this.closest('.control').siblings('.help').removeClass('is-danger');
            }
        }

        if (mask == 'checkbox') {
            if (!$this.is(':checked')) {
                noError = false;
                $this.closest('.control').addClass('is-danger');
            } else {
                $this.closest('.control').removeClass('is-danger');
            }
        }

        if (mask == 'phone') {
            regex = /^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/;
            if (!regex.test(value) || value.length < 6) {
                noError = false;
                $this.addClass('is-danger');
                $this.closest('.control').siblings('.help').addClass('is-danger');
                if (onFocus) {
                    $this.focus();
                    onFocus = false;
                }
            } else {
                $this.removeClass('is-danger');
                $this.closest('.control').siblings('.help').removeClass('is-danger');
            }
        }

        if (mask == 'number') {
            regex = /^[1-9]\d*$/;
            if (!regex.test(value) || value.length === 0) {
                noError = false;
                $this.addClass('is-danger');
                $this.closest('.control').siblings('.help').addClass('is-danger');
                if (onFocus) {
                    $this.focus();
                    onFocus = false;
                }
            } else {
                $this.removeClass('is-danger');
                $this.closest('.control').siblings('.help').removeClass('is-danger');
            }
        }

        if (mask == 'float number') {
            regex = /^(?:[1-9]\d*|0)?(?:\.\d+)?$/;
            if (!regex.test(value) || value.length === 0) {
                noError = false;
                $this.addClass('is-danger');
                $this.closest('.control').siblings('.help').addClass('is-danger');
                if (onFocus) {
                    $this.focus();
                    onFocus = false;
                }
            } else {
                $this.removeClass('is-danger');
                $this.closest('.control').siblings('.help').removeClass('is-danger');
            }
        }

        if (mask == 'date') {
            regex = /^(0[1-9]|1\d|2\d|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$/;
            if (!regex.test(value) || value.length < 6) {
                noError = false;
                $this.addClass('is-danger');
                $this.closest('.control').siblings('.help').addClass('is-danger');
                if (onFocus) {
                    $this.focus();
                    onFocus = false;
                }
            } else {
                $this.removeClass('is-danger');
                $this.closest('.control').siblings('.help').removeClass('is-danger');
            }
        }

        // if (mask == 'date') {
        //     regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
        //     if (!regex.test(value) || value.length === 0) {
        //         noError = false;
        //         $this.addClass('is-danger');
        //         $this.closest('.control').siblings('.help').addClass('is-danger');
        //         if (onFocus) {
        //             $this.focus();
        //             onFocus = false;
        //         }
        //     } else {
        //         $this.removeClass('is-danger');
        //         $this.closest('.control').siblings('.help').removeClass('is-danger');
        //     }
        // }

        //formSubmit.classList('button is-primary');
    });

    return noError;

};

function formateFormData($thisForm) {
    var formData = new FormData();

    $thisForm.find('input[type=hidden]').each(function () {
        if ($(this).val()) {
            formData.append($(this).attr('name'), $(this).val());
        }
    })
    $thisForm.find('input[type=text]').each(function () {
        if ($(this).val()) {
            formData.append($(this).attr('name'), $(this).val());
        }
    });
    $thisForm.find('textarea').each(function () {
        if ($(this).val()) {
            formData.append($(this).attr('name'), $(this).val());
        }
    });
    $thisForm.find('select').each(function () {
        if ($(this).val()) {
            formData.append($(this).attr('name'), $(this).val());
        }
    });
    $thisForm.find('input[type=file]').each(function () {
        var file = this.files[0];
        if (file) {
            formData.append($(this).attr('name'), file, file.name);
        }
    });

    return formData;

};


document.addEventListener('DOMContentLoaded', () => {
  console.log('Hello Bulma!'); 

});

$(function() {
	$('#banner-carousel').slick({
		prevArrow: '<button class="slick-arrow slick-prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42.941 42.941"><defs/><defs><filter id="a" width="42.941" height="42.941" x="0" y="0" filterUnits="userSpaceOnUse"><feOffset dx="1" dy="1"/><feGaussianBlur result="blur" stdDeviation="1.5"/><feFlood flood-opacity=".161"/><feComposite in2="blur" operator="in"/><feComposite in="SourceGraphic"/></filter></defs><g filter="url(#a)"><g fill="rgba(0,0,0,0.3)" data-name="Шеврон П"><path d="M18.704 34.962L5.976 22.234a2.503 2.503 0 010-3.535L18.704 5.97a2.503 2.503 0 013.536 0 2.503 2.503 0 010 3.536L11.634 20.113l-.354.353.354.354L22.24 31.426a2.503 2.503 0 010 3.537 2.503 2.503 0 01-3.536-.001z"/><path fill="#fff" d="M19.058 34.608c.78.78 2.049.78 2.828.001.78-.78.78-2.05 0-2.83L11.28 21.175l-.707-.708.707-.707L21.886 9.153c.78-.78.78-2.05 0-2.83a2.002 2.002 0 00-2.828.002L6.33 19.052c-.78.78-.78 2.049 0 2.828l12.728 12.728m-.708.707L5.623 22.588a3 3 0 010-4.243L18.35 5.617a3 3 0 014.242 4.243L11.987 20.466l10.606 10.607a3 3 0 01-4.243 4.242z"/></g></g></svg></button>',
		nextArrow: '<button class="slick-arrow slick-next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42.941 42.941"><defs/><defs><filter id="a" width="42.941" height="42.941" x="0" y="0" filterUnits="userSpaceOnUse"><feOffset dx="1" dy="1"/><feGaussianBlur result="blur" stdDeviation="1.5"/><feFlood flood-opacity=".161"/><feComposite in2="blur" operator="in"/><feComposite in="SourceGraphic"/></filter></defs><g filter="url(#a)"><g fill="rgba(0,0,0,0.3)" data-name="Шеврон Л"><path d="M22.238 5.97l12.728 12.728c.974.975.974 2.56 0 3.535L22.238 34.961a2.503 2.503 0 01-3.536 0 2.503 2.503 0 010-3.536L29.308 20.82l.354-.353-.354-.354L18.702 9.506a2.503 2.503 0 010-3.536 2.503 2.503 0 013.536 0z"/><path fill="#fff" d="M21.884 6.324a2.002 2.002 0 00-2.828 0c-.78.78-.78 2.048 0 2.828L29.662 19.76l.707.707-.707.707-10.606 10.606c-.78.78-.78 2.05 0 2.83.78.779 2.048.779 2.828-.001L34.612 21.88c.78-.78.78-2.049 0-2.828L21.884 6.324m.707-.707L35.32 18.345a3 3 0 010 4.242L22.591 35.315a3 3 0 11-4.242-4.243l10.606-10.606L18.349 9.86a3 3 0 014.242-4.243z"/></g></g></svg></button>',
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: true,
		fade: true
	});
	$('#feedback-carousel').slick({
		prevArrow: '<button class="slick-arrow slick-prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42.941 42.941"><defs/><defs><filter id="a" width="42.941" height="42.941" x="0" y="0" filterUnits="userSpaceOnUse"><feOffset dx="1" dy="1"/><feGaussianBlur result="blur" stdDeviation="1.5"/><feFlood flood-opacity=".161"/><feComposite in2="blur" operator="in"/><feComposite in="SourceGraphic"/></filter></defs><g filter="url(#a)"><g fill="rgba(0,0,0,0.3)" data-name="Шеврон П"><path d="M18.704 34.962L5.976 22.234a2.503 2.503 0 010-3.535L18.704 5.97a2.503 2.503 0 013.536 0 2.503 2.503 0 010 3.536L11.634 20.113l-.354.353.354.354L22.24 31.426a2.503 2.503 0 010 3.537 2.503 2.503 0 01-3.536-.001z"/><path fill="#fff" d="M19.058 34.608c.78.78 2.049.78 2.828.001.78-.78.78-2.05 0-2.83L11.28 21.175l-.707-.708.707-.707L21.886 9.153c.78-.78.78-2.05 0-2.83a2.002 2.002 0 00-2.828.002L6.33 19.052c-.78.78-.78 2.049 0 2.828l12.728 12.728m-.708.707L5.623 22.588a3 3 0 010-4.243L18.35 5.617a3 3 0 014.242 4.243L11.987 20.466l10.606 10.607a3 3 0 01-4.243 4.242z"/></g></g></svg></button>',
		nextArrow: '<button class="slick-arrow slick-next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42.941 42.941"><defs/><defs><filter id="a" width="42.941" height="42.941" x="0" y="0" filterUnits="userSpaceOnUse"><feOffset dx="1" dy="1"/><feGaussianBlur result="blur" stdDeviation="1.5"/><feFlood flood-opacity=".161"/><feComposite in2="blur" operator="in"/><feComposite in="SourceGraphic"/></filter></defs><g filter="url(#a)"><g fill="rgba(0,0,0,0.3)" data-name="Шеврон Л"><path d="M22.238 5.97l12.728 12.728c.974.975.974 2.56 0 3.535L22.238 34.961a2.503 2.503 0 01-3.536 0 2.503 2.503 0 010-3.536L29.308 20.82l.354-.353-.354-.354L18.702 9.506a2.503 2.503 0 010-3.536 2.503 2.503 0 013.536 0z"/><path fill="#fff" d="M21.884 6.324a2.002 2.002 0 00-2.828 0c-.78.78-.78 2.048 0 2.828L29.662 19.76l.707.707-.707.707-10.606 10.606c-.78.78-.78 2.05 0 2.83.78.779 2.048.779 2.828-.001L34.612 21.88c.78-.78.78-2.049 0-2.828L21.884 6.324m.707-.707L35.32 18.345a3 3 0 010 4.242L22.591 35.315a3 3 0 11-4.242-4.243l10.606-10.606L18.349 9.86a3 3 0 014.242-4.243z"/></g></g></svg></button>',
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 3,
		speed: 800,
		adaptiveHeight: true,
		responsive: [
	    {
	      breakpoint: 768,
	      settings: {
	        dots: false,
	        slidesToShow: 1,
	        slidesToScroll: 1
	      }
	    }
	  ]
	}).on('setPosition', function (event, slick) {
		slick.$slides.css('height', slick.$slideTrack.height() + 'px');
	});

	$('[name="METAL"], [name="metal"]').on('change', function (e) {
        var metalType = $(this).data('metal-type') || $(this).val();
        var $sampleContainers = $(this).parents('form').find('.l-probe__container');
        $sampleContainers.not('[data-metal-reference="' + metalType + '"]').hide();
        $sampleContainers.filter('[data-metal-reference="' + metalType + '"]').show()
            .find('input[type="radio"]')
            .first()
            .trigger('click');
    });

    var cities = [
	    {value: 'Москва', data: '1'},
	    {value: 'Новосибирск', data: '2'},
	    {value: 'Ростов-на-дону', data: '3'},
	    {value: 'Екатеринбург', data: '4'},
	    {value: 'Самара', data: '5'},
	    {value: 'Сочи', data: '6'},
	    {value: 'Санкт-петербург', data: '7'},
	    {value: 'Нижневартовск', data: '8'},
	    {value: 'Тюмень', data: '9'},
	    {value: 'Сургут', data: '10'},
	    {value: 'Жигулевск', data: '11'},
	    {value: 'Хабаровск', data: '12'},
	    {value: 'Иваново', data: '13'},
	    {value: 'Пермь', data: '14'}
	];

    $('.js-cityName').autocomplete({
        autoSelectFirst: false,
        appendTo: '.autocomplete-wrapper',
        //serviceUrl: "/ajax/getCity.php",
        lookup: cities,
        showNoSuggestionNotice: true,
        noSuggestionNotice: "Данного города нет в списке. Пожалуйста, укажите другой город",
        onSelect: function (res) {
            if (res.data) {
                $('.js-cityContainer span').text(res.value);
                localStorage.setItem('localCity', res.value);
                headerCity.innerHTML = res.value;
                $('#modal-city-select').removeClass('is-active');
                $('html').removeClass('is-clipped');
            	$('#modal-city-select').find('input').val('');
            }
        }
    });

 	$('form').find('[data-mask]').each(function(i,thisForm){
        var $thisForm = $(thisForm);
        var thisMask = $thisForm.attr('data-mask');
        var phoneMask = ['+', '7', ' ', '(', /[79]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/];
        var dateMask = [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];
        if (thisMask == "phone") {
            for (var i = 0; i < $thisForm.length; i++) {
                vanillaTextMask.maskInput({
                    inputElement: $thisForm[i],
                    mask: phoneMask,
                    showMask: false
                });
            }
        }
        if (thisMask == 'date') {
        	for (var i = 0; i < $thisForm.length; i++) {
                vanillaTextMask.maskInput({
                    inputElement: $thisForm[i],
                    mask: dateMask,
                    showMask: false
                });
            }
        }
    });
})