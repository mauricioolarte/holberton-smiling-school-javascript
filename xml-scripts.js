$(document).ready(async function () {

	await $.ajax({
		type: "GET",
		dataType: "xml",
		url: "https://smileschool-api.hbtn.info/xml/quotes",
		success: function (xml) {
			for (let i = 0; i < $(xml).find("quote").length; i++) {
				let carouseContainer = $("#carouselContainer")
				let cardItemActive = document.createElement("div")
				cardItemActive.className = "carousel-item active"
				let cardItem = document.createElement("div")
				cardItem.className = "carousel-item"
				let cardContainer = document.createElement("div")
				cardContainer.className = "row flex-wrap justify-content-center mb-5"
				let imageContainer = document.createElement("div")
				imageContainer.className = "col col-sm-4 col-md-2 mt-5 d-flex justify-content-center"
				let profileImage = document.createElement("img")
				profileImage.src = $(xml).find("quote")[i].childNodes[0].textContent
				profileImage.className = "img rounded-circle"
				profileImage.height = "140"

				let textContainer = document.createElement("div")
				textContainer.className = "col-11 col-md-6 col-lg-8 item-content mt-5 text-white"
				let quoteTitle = document.createElement("h5")
				quoteTitle.textContent = $(xml).find("quote")[i].childNodes[3].textContent
				let personName = document.createElement("p")
				personName.textContent = $(xml).find("quote")[i].childNodes[1].textContent
				let personTitle = document.createElement("p")
				personTitle.textContent = $(xml).find("quote")[i].childNodes[2].textContent

				textContainer.append(quoteTitle)
				textContainer.append(personName)
				textContainer.append(personTitle)

				imageContainer.append(profileImage)
				cardContainer.append(imageContainer)
				cardContainer.append(textContainer)
				if (i == 0) {
					cardItemActive.append(cardContainer)
					carouseContainer.append(cardItemActive)
				} else {
					cardItem.append(cardContainer)
					carouseContainer.append(cardItem)
				}
			}
			$(".loader").hide()
		}
	});

	loadCardsVideos("https://smileschool-api.hbtn.info/popular-tutorials", "#carouselVideo")

	loadCardsVideos("https://smileschool-api.hbtn.info/latest-videos", "#latesVideosContainer")

	// /* topics */
	await $.ajax({
		type: "GET",
		dataType: "xml",
		url: "https://smileschool-api.hbtn.info/xml/courses",
		success: function (xml) {
			console.log($(xml).find("result")[0].childNodes)
			let selectTopic = $("#topicsValues")
			for (let i = 0; i < $(xml).find("result")[0].childNodes[0].childNodes.length; i++) {
				let topics = document.createElement("option")
				topics.value = $(xml).find("result")[0].childNodes[0].childNodes[i].textContent
				topics.innerText = $(xml).find("result")[0].childNodes[0].childNodes[i].textContent
				selectTopic.append(topics)
			}
			$(".loaderTopic").hide()


		}
	})

	// /* sort values menu */

	await $.ajax({
		type: "GET",
		dataType: "xml",
		url: "https://smileschool-api.hbtn.info/xml/courses",
		success: function (xml) {
			console.log($(xml).find("result")[0].childNodes)
			let selectSort = $("#sortValues")
			for (let i = 0; i < $(xml).find("result")[0].childNodes[2].childNodes.length; i++) {
				let sorts = document.createElement("option")
				sorts.value = $(xml).find("result")[0].childNodes[2].childNodes[i].textContent
				sorts.innerText = $(xml).find("result")[0].childNodes[2].childNodes[i].textContent.replace("_", " ")
				selectSort.append(sorts)
			}
			$(".loaderTopic").hide()


		}
	})

	// /* courses */

	loadVideos()

	/* change on topics */

	$('#topicsValues').change(function () {
		console.log($('#topicsValues').val())
		loadVideos("https://smileschool-api.hbtn.info/xml/courses", $('#searchInput').val(), $("#topicsValues").val(), $('#sortValues').val())
	})

	/* change on sort */
	$('#sortValues').change(function () {
		console.log($('#sortValues').val())
		loadVideos("https://smileschool-api.hbtn.info/xml/courses", $('#searchInput').val(), $("#topicsValues").val(), $('#sortValues').val())
	})

	/*change on search */
	$('#searchInput').change(function () {
		$("loader").show()
		console.log($('#searchInput').val())
		loadVideos("https://smileschool-api.hbtn.info/xml/courses", $('#searchInput').val(), $("#topicsValues").val(), $('#sortValues').val())
		$("loader").hide()
	})
})




async function loadCardsVideos(url, idContainer) {

	await $.ajax({
		type: "GET",
		dataType: "xml",
		url: url,
		success: function (xml) {
			let carouseContainer = $(idContainer)
			for (let i = 0; i < $(xml).find("video").length; i++) {
				let cardContainer = document.createElement("div")
				cardContainer.className = "card m-2"
				cardContainer.style = "width: 15rem;"

				/* card elements*/
				/* images */
				let imageVideo = document.createElement("img")
				imageVideo.className = "card-img-top d-block"
				imageVideo.src = $(xml).find("video").childNodes[2].textContent

				let imagePlayIcon = document.createElement("img")
				imagePlayIcon.className = "position-absolute"
				imagePlayIcon.src = "images/play.png"
				imagePlayIcon.width = "60"

				/* card body video*/

				let cardBodyVideo = document.createElement("div")
				cardBodyVideo.className = "card-body mx-0 px-0"

				let cardBodyVideo1 = document.createElement("div")

				let titleVideo = document.createElement("h5")
				titleVideo.className = "font-weight-bold"
				titleVideo.textContent = $(xml).find("video").childNodes[0].textContent
				let subTitle = document.createElement("p")
				subTitle.className = "card-text"
				subTitle.textContent = $(xml).find("video").childNodes[1].textContent

				cardBodyVideo1.append(titleVideo)
				cardBodyVideo1.append(subTitle)

				/* author image and name */
				let authorVideoImageContainer = document.createElement("span")
				authorVideoImageContainer.className = "d-flex flex-row"
				let authorVideoImage = document.createElement("img")
				authorVideoImage.className = "rounded-circle"
				authorVideoImage.width = "35"
				authorVideoImage.height = "35"
				authorVideoImage.src = $(xml).find("video").childNodes[4].textContent
				let authorVideoName = document.createElement("p")

				authorVideoName.className = "font-weight-bold ml-2 mt-1"
				authorVideoName.textContent = $(xml).find("video").childNodes[3].textContent
				cardBodyVideo1.append(authorVideoImageContainer)

				authorVideoImageContainer.append(authorVideoImage)
				authorVideoImageContainer.append(authorVideoName)

				/* starts */
				let starsTimeContainer = document.createElement("span")
				starsTimeContainer.className = "d-flex flex-row justify-content-between"
				let starsContainer = document.createElement("span")
				let starImage1 = document.createElement("img")
				starImage1.src = "images/star_on.png"
				starImage1.width = "15"
				starImage1.className = "star-1"
				let starImage2 = document.createElement("img")
				starImage2.src = "images/star_on.png"
				starImage2.width = "15"
				starImage2.className = "star-2"
				let starImage3 = document.createElement("img")
				starImage3.src = "images/star_on.png"
				starImage3.width = "15"
				starImage3.className = "star-3"
				let starImage4 = document.createElement("img")
				starImage4.src = "images/star_on.png"
				starImage4.width = "15"
				starImage4.className = "star-4"
				let starImage5 = document.createElement("img")
				starImage5.src = "images/star_on.png"
				starImage5.width = "15"
				starImage5.className = "star-5"

				let starTime = document.createElement("p")
				starTime.className = "profile-video p-0 m-0"
				starTime.textContent = $(xml).find("video").childNodes[5].textContent

				starsContainer.append(starImage1)
				starsContainer.append(starImage2)
				starsContainer.append(starImage3)
				starsContainer.append(starImage4)
				starsContainer.append(starImage5)

				starsTimeContainer.append(starsContainer)
				starsTimeContainer.append(starTime)

				cardBodyVideo.append(cardBodyVideo1)
				cardBodyVideo.append(starsTimeContainer)

				cardContainer.append(imageVideo)
				cardContainer.append(imagePlayIcon)
				cardContainer.append(cardBodyVideo)

				carouseContainer.append(cardContainer)
			}
			$("#spinerLastVideos").hide()
		}

	})
}

async function loadVideos(url = "https://smileschool-api.hbtn.info/xml/courses", keyword = "", topic = "All", sort_by = "most_popular") {

	$("#spaceVideos").replaceWith('<div class="spaceVideos" id="spaceVideos"></div >')
	$("#spaceVideos").append('<div class="loader"></div>')

	await $.ajax({
		type: "GET",
		dataType: "xml",
		data: {
			q: keyword,
			topic: topic,
			sort: sort_by
		},
		url: url,
		success: function (xml) {
			let courses = $(xml).find("result")[0].childNodes[5]
			let Container = $("#spaceVideos")
			for (let i = 0; i < courses.childNodes.length; i++) {

				let cardContainer = document.createElement("div")
				cardContainer.className = "card border-0 m-1"
				cardContainer.style = "width: 12rem;"

				/* card elements*/
				/* images */
				let imageVideo = document.createElement("img")
				imageVideo.className = "card-img-top d-block"
				imageVideo.src = courses.childNodes[i].childNodes[2].textContent

				let imagePlayIcon = document.createElement("img")
				imagePlayIcon.className = "position-absolute"
				imagePlayIcon.src = "images/play.png"
				imagePlayIcon.width = "60"

				/* card body video*/

				let cardBodyVideo = document.createElement("div")
				cardBodyVideo.className = "card-body mx-0 px-0"

				let cardBodyVideo1 = document.createElement("div")

				let titleVideo = document.createElement("h5")
				titleVideo.className = "font-weight-bold"
				titleVideo.textContent = courses.childNodes[i].childNodes[0].textContent
				let subTitle = document.createElement("p")
				subTitle.className = "card-text"
				subTitle.textContent = courses.childNodes[i].childNodes[1].textContent

				cardBodyVideo1.append(titleVideo)
				cardBodyVideo1.append(subTitle)

				/* author image and name */
				let authorVideoImageContainer = document.createElement("span")
				authorVideoImageContainer.className = "d-flex flex-row"
				let authorVideoImage = document.createElement("img")
				authorVideoImage.className = "rounded-circle"
				authorVideoImage.width = "35"
				authorVideoImage.height = "35"
				authorVideoImage.src = courses.childNodes[i].childNodes[4].textContent
				let authorVideoName = document.createElement("p")

				authorVideoName.className = "font-weight-bold ml-2 mt-1"
				authorVideoName.textContent = courses.childNodes[i].childNodes[3].textContent

				cardBodyVideo1.append(authorVideoImageContainer)

				authorVideoImageContainer.append(authorVideoImage)
				authorVideoImageContainer.append(authorVideoName)

				/* starts */
				let starsTimeContainer = document.createElement("span")
				starsTimeContainer.className = "d-flex flex-row justify-content-between"
				let starsContainer = document.createElement("span")
				let starImage1 = document.createElement("img")
				starImage1.src = "images/star_on.png"
				starImage1.width = "15"
				starImage1.className = "star-1"
				let starImage2 = document.createElement("img")
				starImage2.src = "images/star_on.png"
				starImage2.width = "15"
				starImage2.className = "star-2"
				let starImage3 = document.createElement("img")
				starImage3.src = "images/star_on.png"
				starImage3.width = "15"
				starImage3.className = "star-3"
				let starImage4 = document.createElement("img")
				starImage4.src = "images/star_on.png"
				starImage4.width = "15"
				starImage4.className = "star-4"
				let starImage5 = document.createElement("img")
				starImage5.src = "images/star_on.png"
				starImage5.width = "15"
				starImage5.className = "star-5"

				let starTime = document.createElement("p")
				starTime.className = "profile-video p-0 m-0"
				starTime.textContent = courses.childNodes[i].childNodes[5].textContent

				starsContainer.append(starImage1)
				starsContainer.append(starImage2)
				starsContainer.append(starImage3)
				starsContainer.append(starImage4)
				starsContainer.append(starImage5)

				starsTimeContainer.append(starsContainer)
				starsTimeContainer.append(starTime)

				cardBodyVideo.append(cardBodyVideo1)
				cardBodyVideo.append(starsTimeContainer)

				cardContainer.append(imageVideo)
				cardContainer.append(imagePlayIcon)
				cardContainer.append(cardBodyVideo)

				Container.append(cardContainer)
				$(".loader").hide()
			}
		}
	})

}