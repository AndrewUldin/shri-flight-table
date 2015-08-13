var isWebkit = 'WebkitAppearance' in document.documentElement.style; // webkit detect

// функция пересчитывает высоту фиксированного блока при необходимости
function resize() {
	var head_height = $(".table-body table thead").height();
	$(".table-head").height(head_height + 1); // +1px — бордер
}

// функция определяет нужно фиксировать панель или нет
function fix_panel() {
	var scrollTop = $(isWebkit ? "body": "html").scrollTop();
	var tableTop = $('.table-body').offset().top;

	if (scrollTop >= tableTop) {
		if (!$(".table-head").hasClass('table-head-fixed')) {
			$(".table-head").addClass('table-head-fixed').css({
				top: 0
			});
		}
	} else {
		$(".table-head").removeClass('table-head-fixed').css({
			top: tableTop
		});
	}
}

// функция показывает popup
function show_popup() {
	$(".popup, .overlay").show();
}
// функция скрывает popup
function hide_popup() {
	$(".popup, .overlay").hide();
	$(".popup .content").html("");
}

// функция инициализации. из-за того, что перед таблицей может быть контент — нужно пересчитать top для панели
function init() {
	// первый способ получить данные закомментировать ниже — через get запрос к data.json
	// другой способ получить данные — в index.html подключается data.js, внутри него объект, функция наполняет таблицу
	getData(data);
	fix_panel();
}

// функция берет объект из подключенного файла и наполняет таблицу
function getData(table_items) {
	table_items.items.forEach(function(flight, index) {

		$(".table-body table tbody").append(
			"<tr data-key='"+index+"' data-type='"+flight['type']+"'>"+ // здесь index нужен, чтобы потом получать полные данные о рейсе
				"<td class='a-center'><i class='fa fa-sign-"+flight['type']+"'></i></td>"+
				"<td>"+flight['number']+"</td>"+
				"<td class='full middle small a-center company_icon'><img src='assets/images/"+flight['company_icon']+".gif' alt='"+flight['company']+"' title='"+flight['company']+"'></td>"+
				"<td class='company full'>"+
					"<div class='full'>"+flight['company_alias']+"</div>"+
					"<div class='big'>"+flight['company']+"</div>"+
				"</td>"+
				"<td>"+flight['aircraft']+"</td>"+
				"<td>"+
					"<div class='full big'>"+flight['arrive_airport']+"</div>"+
					"<div class='middle small'>"+flight['arrive_airport_short']+"</div>"+
				"</td>"+
				"<td class='a-center'>"+flight['time']+"</td>"+
				"<td class='status'>"+flight['status']+"</td>"+
				"<td>"+flight['comment']+"</td>"+
			"</tr>"
		);
	});

	// дублируем таблицу, чтобы получить ровные ячейки в шапке
	$(".table-body table").clone().appendTo(".table-head").find("tbody");

	// подгоняем высоту фиксированного блока
	resize();
}

jQuery( document ).ready(function( $ ) {

	init();

/*
	// некое подобие шаблонизатора, чтобы не набивать данные руками, делает get запрос
	// load data in table
	$.ajax({
		url: "data.json",
		type: "get",
		dataType: "json",
		success: function(data) {
			getData(data);
		},
		fail: function() {
			alert('Ошибка получения данных');
		}
	});
	// load data in table
*/



	// вдруг окно стало уже, и нужно пересчитать высоту фиксированного блока (стало 2 строки)
	$(window).on('resize', function(){
		fix_panel();
		resize(); 
	});

	// нужно посмотреть, если отскролили, сделать шапку фиксированной
	$(window).on('scroll', function(){
		fix_panel();
	});

	// событие наведение мыши для подсветки столбцов
	$(".hover_table td").on({
	    mouseenter: function () {
			var index = $(this).index() + 1;
			$(this).closest('table').find("tr td:nth-child("+index+")").addClass("hover");
	    },
	    mouseleave: function () {
			var index = $(this).index() + 1;
			$(this).closest('table').find("tr td:nth-child("+index+")").removeClass("hover");
	    }
	});

	// событие клика по строке, для открытия поп-апа
	$(".hover_table tbody tr").on('click touchstart', function() {
		var id = $(this).data('key');
		var item = data.items[id];
		var template = $(".template").html();

		if (item['arrive_airport_short'] == 'in') {
			item['type'] = 'Прилет';
			item['time_text'] = 'прибытия';
		} else {
			item['type'] = 'Вылет';
			item['time_text'] = 'вылета';
		}

		for (prop in item) {
			template = template.replace(new RegExp("%"+prop+"%",'g'),item[prop]);
		}

		template = template.replace('<!--', '').replace('-->', '');

		var out = "<table>" + template + "</table>";

		$(".popup .content").append(out);
		show_popup();
	});

	$(".overlay, .popup .close").on('click touchstart', function() {
		hide_popup();
	})

	// событие клика по чекбоксу
	$(".choose_type").on('click touchstart', function() {
		var type = $(this).data('type');
		var state = $(this).prop('checked');
		var elements = $("tr[data-type='"+type+"']");
		if (state) {
			elements.removeClass('hidden');
		} else {
			elements.addClass('hidden');
		}
	});

});


