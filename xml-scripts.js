$(document).ready(async function () {
	await $.get('https://smileschool-api.hbtn.info/quotes', function (data, status) {

		for (let i = 0; i < data.length; i++) {
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
			profileImage.src = data[i].pic_url
			profileImage.className = "img rounded-circle"
			profileImage.height = "140"

			let textContainer = document.createElement("div")
			textContainer.className = "col-11 col-md-6 col-lg-8 item-content mt-5 text-white"
			let quoteTitle = document.createElement("h5")
			quoteTitle.textContent = data[i].text
			let personName = document.createElement("p")
			personName.textContent = data[i].name
			let personTitle = document.createElement("p")
			personTitle.textContent = data[i].title

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
	})

	loadCardsVideos("https://smileschool-api.hbtn.info/popular-tutorials", "#carouselVideo")

	loadCardsVideos("https://smileschool-api.hbtn.info/latest-videos", "#latesVideosContainer")

	/* topics */

	await $.get("https://smileschool-api.hbtn.info/courses", function (dat, status) {
		let values = dat.topics
		console.log(values)
		let selectTopic = $("#topicsValues")
		for (let i = 0; i < values.length; i++) {
			let topics = document.createElement("option")
			topics.value = values[i]
			topics.innerText = values[i]
			selectTopic.append(topics)
		}
		$(".loaderTopic").hide()
	})
	/* sort values menu */
	await $.get("https://smileschool-api.hbtn.info/courses", function (dat, status) {
		let values = dat.sorts
		console.log(values)
		let selectSort = $("#sortValues")
		for (let j = 0; j < values.length; j++) {
			let sorts = document.createElement("option")
			console.log(sorts)
			sorts.value = values[j]
			sorts.innerText = values[j].replace("_", " ")
			selectSort.append(sorts)
		}
		$(".loaderSort").hide()

	})


	/* courses */

	loadVideos()

	/* change on topics */

	$('#topicsValues').change(function () {
		console.log($('#topicsValues').val())
		loadVideos("https://smileschool-api.hbtn.info/courses", $('#searchInput').val(), $("#topicsValues").val(), $('#sortValues').val())
	})

	/* change on sort */
	$('#sortValues').change(function () {
		console.log($('#sortValues').val())
		loadVideos("https://smileschool-api.hbtn.info/courses", $('#searchInput').val(), $("#topicsValues").val(), $('#sortValues').val())
	})

	/*change on search */
	$('#searchInput').change(function () {
		$("loader").show()
		console.log($('#searchInput').val())
		loadVideos("https://smileschool-api.hbtn.info/courses", $('#searchInput').val(), $("#topicsValues").val(), $('#sortValues').val())
		$("loader").hide()
	})
})




async function loadCardsVideos(url, idContainer) {
	await $.get(url, function (data, status) {
		console.log(data)
		console.log(status)
		let carouseContainer = $(idContainer)
		for (let i = 0; i < data.length; i++) {


			let cardContainer = document.createElement("div")
			cardContainer.className = "card m-2"
			cardContainer.style = "width: 15rem;"

			/* card elements*/
			/* images */
			let imageVideo = document.createElement("img")
			imageVideo.className = "card-img-top d-block"
			imageVideo.src = data[i].thumb_url

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
			titleVideo.textContent = data[i].title
			let subTitle = document.createElement("p")
			subTitle.className = "card-text"
			subTitle.textContent = data[i]['sub-title']

			cardBodyVideo1.append(titleVideo)
			cardBodyVideo1.append(subTitle)

			/* author image and name */
			let authorVideoImageContainer = document.createElement("span")
			authorVideoImageContainer.className = "d-flex flex-row"
			let authorVideoImage = document.createElement("img")
			authorVideoImage.className = "rounded-circle"
			authorVideoImage.width = "35"
			authorVideoImage.height = "35"
			authorVideoImage.src = data[i].author_pic_url
			let authorVideoName = document.createElement("p")

			authorVideoName.className = "font-weight-bold ml-2 mt-1"
			authorVideoName.textContent = data[i].author

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
			starTime.textContent = data[i].duration

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
	})
}

async function loadVideos(url = "https://smileschool-api.hbtn.info/courses", keyword = "", topic = "All", sort_by = "most_popular") {

	$("#spaceVideos").replaceWith('<div class="spaceVideos" id="spaceVideos"></div >')
	$("#spaceVideos").append('<div class="loader"></div>')

	await $.get(url, {
		q: keyword,
		topic: topic,
		sort: sort_by
	}, function (dat, status) {

		let data = dat.courses

		console.log(data)
		console.log(status)
		let Container = $("#spaceVideos")
		for (let i = 0; i < data.length; i++) {

			let cardContainer = document.createElement("div")
			cardContainer.className = "card border-0 m-1"
			cardContainer.style = "width: 12rem;"

			/* card elements*/
			/* images */
			let imageVideo = document.createElement("img")
			imageVideo.className = "card-img-top d-block"
			imageVideo.src = data[i].thumb_url

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
			titleVideo.textContent = data[i].title
			let subTitle = document.createElement("p")
			subTitle.className = "card-text"
			subTitle.textContent = data[i]['sub-title']

			cardBodyVideo1.append(titleVideo)
			cardBodyVideo1.append(subTitle)

			/* author image and name */
			let authorVideoImageContainer = document.createElement("span")
			authorVideoImageContainer.className = "d-flex flex-row"
			let authorVideoImage = document.createElement("img")
			authorVideoImage.className = "rounded-circle"
			authorVideoImage.width = "35"
			authorVideoImage.height = "35"
			authorVideoImage.src = data[i].author_pic_url
			let authorVideoName = document.createElement("p")

			authorVideoName.className = "font-weight-bold ml-2 mt-1"
			authorVideoName.textContent = data[i].author

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
			starTime.textContent = data[i].duration

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
	})
}