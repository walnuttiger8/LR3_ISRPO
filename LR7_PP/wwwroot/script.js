const createButton = $("#createTobaccoButton");
const tobaccoTable = $("#tobacco-table-body");

const toBase64 = file => new Promise((resolve, reject) => {
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = () => resolve(reader.result.replace('data:', '').replace(/^.+,/, ''));
	reader.onerror = error => reject(error);
});


function GetTobacco() {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: "/api/tobacco",
			method: "get",
			success: function (response) {
				resolve(response)
			},
			failure: function (response) {
				reject(response)
            }
		});
	});
}


function CreateTobaccoRequest(manufacturer, name, price, strength, image) {
	let data = {
		manufacturer: manufacturer,
		name: name,
		price: price,
		strength: strength,
		image: image
	};

	$.ajax({
		url: '/api/tobacco',
		method: 'post',
		dataType: 'JSON',
		contentType: "application/json",
		data: JSON.stringify(data),
		success: function (data) {
			alert(data);
		},
		failure: function (response) {
			console.log(response);
        }
	});
}

function UpdateTobaccoRequest(id, manufacturer, name, price, strength, image) {
	let data = {
		manufacturer: manufacturer,
		name: name,
		price: price,
		strength: strength,
		image: image
	};

	$.ajax({
		url: '/api/tobacco/' + id,
		method: 'put',
		dataType: 'JSON',
		contentType: "application/json",
		data: JSON.stringify(data),
		success: function (data) {
			alert(data);
		},
		failure: function (response) {
			console.log(response);
		}
	});
}

function DeleteTobaccoRequest(id) {
	$.ajax({
		url: '/api/tobacco/' + id,
		method: 'delete',
		dataType: 'JSON',
		contentType: "application/json",
		success: function (data) {
			alert(data);
		},
		failure: function (response) {
			console.log(response);
		}
	});
}

function ClearTobaccoTable() {
	tobaccoTable.empty();
}

function GetTobaccoImageModalButton(tobacco) {
	let modalButton = $("<button/>", {
		class: "btn btn-link",
		'data-bs-toggle': "modal",
		"data-bs-target": "#modal-" + tobacco.id,
		'text': "Изображение",
	});
	return modalButton
}

function GetTobaccoImageModal(tobacco) {
	let modal = $("<div/>", {
		"class": "modal fade",
		"tabindex": -1,
		"id": "modal-" + tobacco.id,
		"aria-hidden": "true"
	});
	let modalDialog = $("<div/>", {
		class: "modal-dialog",
		"role": "dialog"
	});
	let modalContent = $("<div/>", {
		class: "modal-content"
		}).append(
			$("<div/>", {
			class: "modal-header"
			}).append(
				$("<h5/>", {
					class: "modal-title",
					text: tobacco.name,
				}),
				$("<button/>", {
					type: "button",
					class: "btn",
					"data-bs-dismiss": "modal",
					"aria-label": "Close",
				}).append(
					$("<span/>", {
						"aria-hidden": "true",
						text: "X"
					}))),
			$("<div/>", {
				class: "modal-body"
			}).append(GetTobaccoImage(tobacco))
		);


	modal.append(modalDialog.append(modalContent));
	return modal
}

function GetTobaccoImage(tobacco) {
	let image = new Image();
	image.src = "data:image/png;base64," + tobacco.image;
	image.classList.add("img-thumbnail")
	return image;
}

 
function GetTobaccoTableRow(tobacco) {
	let row = $("<tr/>");
	row.append(
		$("<td/>", {
		'scope': 'col',
		text: tobacco.id
		}),
		$("<td/>", {
			'scope': 'col',
			text: tobacco.manufacturer
		}),
		$("<td/>", {
			'scope': 'col',
			text: tobacco.name
		}),
		$("<td/>", {
			'scope': 'col',
			text: tobacco.price
		}),
		$("<td/>", {
			'scope': 'col',
			text: tobacco.strength
		}),
		$("<td/>", {
			'scope': 'col',
		}).append(
			GetTobaccoImageModalButton(tobacco)
		)
	);
	row.append(GetTobaccoImageModal(tobacco));
	return row
}

async function FillTobaccoTable() {
	ClearTobaccoTable();
	let tobaccos = await GetTobacco();
	tobaccos.forEach((tobacco) => {
		tobaccoTable.append(GetTobaccoTableRow(tobacco));
	});
}

function ClearInputs(selector) {
	$("#" + selector + " :input").each(function () {
		$(this).val('');
	});
}

async function CreateTobacco() {
	let manufacturer = $("#createTobaccoManufacturer").val();
	let name = $("#createTobaccoName").val();
	let price = $("#createTobaccoPrice").val();
	let strength = $("#createTobaccoStrength").val();
	let imageFile = $("#createTobaccoImage").prop("files")[0];

	let image = await toBase64(imageFile);

	CreateTobaccoRequest(manufacturer, name, price, strength, image);
}

async function UpdateTobacco() {
	let id = $("#updateTobaccoId").val();
	let manufacturer = $("#createTobaccoManufacturer").val();
	let name = $("#updateTobaccoName").val();
	let price = $("#updateTobaccoPrice").val();
	let strength = $("#updateTobaccoStrength").val();
	let imageFile = $("#updateTobaccoImage").prop("files")[0];

	let image = await toBase64(imageFile);

	await UpdateTobaccoRequest(id, manufacturer, name, price, strength, image);
}


async function DeleteTobacco() {
	let id = $("#deleteTobaccoId").val();

	await DeleteTobaccoRequest(id);
}



$(function () {
	//GetTobacco();
	FillTobaccoTable();
	$("#createTobaccoButton").click((e) => {
		e.preventDefault();
		CreateTobacco();
		FillTobaccoTable();
		ClearInputs("createTobaccoForm");
	});

	$("#updateTobaccoButton").click((e) => {
		e.preventDefault();
		UpdateTobacco();
		FillTobaccoTable();
		ClearInputs("updateTobaccoForm");
	});

	$("#deleteTobaccoButton").click((e) => {
		e.preventDefault();
		DeleteTobacco();
		FillTobaccoTable();
		ClearInputs("deleteTobaccoForm");
	});
});