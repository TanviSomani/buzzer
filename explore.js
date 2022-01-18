var allData = [];

var toronto = [];
var mcmaster = [];
var york = [];
var western = [];

function loadData() {
	fetch("data.json")
		.then((response) => response.json())
		.then((data) => {
			allData = data;

			for (var i = 0; i < data.length; i++) {
				switch (data[i].university) {
					case "University of Toronto":
						toronto.push(data[i]);
						break;
					case "McMaster University":
						mcmaster.push(data[i]);
						break;
					case "York University":
						york.push(data[i]);
						break;
					case "Western University":
						western.push(data[i]);
						break;
					default:
						"";
				}
			}

			loadHeaders("University of Toronto", "headerToronto");
			loadStudents(toronto, "University of Toronto");
			loadHeaders("McMaster University", "headerMcMaster");
			loadStudents(mcmaster, "McMaster University");
			loadHeaders("York University", "headerYork");
			loadStudents(york, "York University");
			loadHeaders("Western University", "headerWestern");
			loadStudents(western, "Western University");
		});
}

function loadHeaders(university, id) {
	var mainRow = document.createElement("DIV");
	mainRow.classList.add("row", "my-3", "pr-2");

	var firstCol = document.createElement("DIV");
	firstCol.classList.add("col-lg-9", "col-md-8", "col-sm-6", "col-xs-12");

	var uniName = document.createElement("H5");
	uniName.classList.add("ml-3", "mt-2", "text-left");
	uniName.innerHTML = university;

	firstCol.appendChild(uniName);

	var secondCol = document.createElement("DIV");
	secondCol.classList.add("col-lg-3", "col-md-4", "col-sm-6", "col-xs-12");

	for (var i = 0; i < 3; i++) {
		var button = document.createElement("BUTTON");
		button.classList.add(
			"btn",
			"btn-outline-dark",
			"float-right",
			"rounded-circle",
			"mr-2"
		);

		var icon = document.createElement("I");

		switch (i) {
			case 0:
				icon.classList.add("fas", "fa-chevron-right");
				break;
			case 1:
				icon.classList.add("fas", "fa-chevron-left");
				break;
			case 2:
				icon.classList.add("fas", "fa-eye");
				button.addEventListener("click", function () {
					var content = document.getElementById(university);
					if (content.style.display === "none") {
						content.style.display = "block";
					} else {
						content.style.display = "none";
					}
				});
				break;
		}

		button.appendChild(icon);
		secondCol.appendChild(button);
	}

	mainRow.appendChild(firstCol);
	mainRow.appendChild(secondCol);

	document.getElementById(id).append(mainRow);
}

function loadStudents(array, id) {
	var mainRow = document.createElement("DIV");
	mainRow.classList.add("row");

	for (var i = 0; i < array.length; i++) {
		var mainCol = document.createElement("DIV");
		mainCol.classList.add("text-center");

		if (i == 0) {
			mainCol.classList.add("col", "ml-3");
		} else if (i == 3) {
			mainCol.classList.add("col", "mr-2");
		}

		if (i / 3 == 1) {
			mainCol.classList.add("col", "center-block");
		} else {
			mainCol.classList.add("col", "center-block", "myBorderRight");
		}

		var mainDiv = document.createElement("DIV");
		mainDiv.classList.add("mt-4");

		var mainImg = document.createElement("IMG");
		mainImg.classList.add("rounded-circle");
		mainImg.style.width = "100px";
		mainImg.style.height = "100px";
		mainImg.src = array[i].image;

		var mainName = document.createElement("H6");
		mainName.classList.add("text-center", "mt-2");
		mainName.innerHTML = array[i].firstName + " " + array[i].lastName;

		var mainSpan = document.createElement("SPAN");
		mainSpan.classList.add("badge", "badge-pill");

		switch (array[i].major) {
			case "Engineering":
				mainSpan.classList.add("myBadgeEngineering");
				break;

			case "Science":
				mainSpan.classList.add("myBadgeScience");
				break;

			case "Law":
				mainSpan.classList.add("myBadgeLaw");
				break;

			case "Architecture":
				mainSpan.classList.add("myBadgeArchitecture");
				break;
		}

		mainSpan.innerHTML = array[i].major;

		var mainInterest = document.createElement("P");
		mainInterest.classList.add("myInterest");
		mainInterest.innerHTML =
			array[i].mutual_interests + " mutual interests";

		var mainButton = document.createElement("BUTTON");
		mainButton.classList.add("btn", "myBuzzButton", "rounded-lg", "mb-4");

		var mainIcon = document.createElement("I");
		mainIcon.classList.add("fas", "fa-paper-plane", "mr-2");

		var buttonSpan = document.createElement("SPAN");
		buttonSpan.innerHTML = "Buzz";

		mainButton.appendChild(mainIcon);
		mainButton.appendChild(buttonSpan);

		mainDiv.appendChild(mainImg);
		mainDiv.appendChild(mainName);
		mainDiv.appendChild(mainSpan);
		mainDiv.appendChild(mainInterest);
		mainDiv.appendChild(mainButton);

		mainCol.appendChild(mainDiv);

		if (array.length != 4) {
			var subRow = document.createElement("DIV");
			subRow.classList.add("row", "myBorderBottom");
			subRow.appendChild(mainCol);
			document.getElementById(id).appendChild(subRow);
		} else {
			mainRow.appendChild(mainCol);
			document.getElementById(id).appendChild(mainRow);
		}
	}
}

function loadToronto() {
	hideAll();
	document.getElementById("TorontoCard").style.display = "block";
}

function loadMcMaster() {
	hideAll();
	document.getElementById("McMasterCard").style.display = "block";
}

function loadYork() {
	hideAll();
	document.getElementById("YorkCard").style.display = "block";
}

function loadWestern() {
	hideAll();
	document.getElementById("WesternCard").style.display = "block";
}

function hideAll() {
	document.getElementById("TorontoCard").style.display = "none";
	document.getElementById("McMasterCard").style.display = "none";
	document.getElementById("YorkCard").style.display = "none";
	document.getElementById("WesternCard").style.display = "none";
}

function showAll() {
	document.getElementById("TorontoCard").style.display = "block";
	document.getElementById("McMasterCard").style.display = "block";
	document.getElementById("YorkCard").style.display = "block";
	document.getElementById("WesternCard").style.display = "block";
}

function myFunction() {
	var input = document.getElementById("myInput").value.toLowerCase();
	var searchedData = [];

	for (var i = 0; i < allData.length; i++) {
		var name = allData[i].firstName.toLowerCase();
		if (input != "") {
			if (name.includes(input)) {
				searchedData.push(allData[i]);
			}
		}
	}
	if (input.trim().length === 0) {
		document.getElementById("filteredStudents").innerHTML = "";
		showAll();
	}

	if (searchedData.length > 0) {
		hideAll();
		document.getElementById("filteredStudents").style.display = "block";
		loadStudents(searchedData, "filteredStudents");
	}
}
