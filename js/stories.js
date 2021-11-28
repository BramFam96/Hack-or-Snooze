'use strict'

// This is the global list of the stories, an instance of StoryList
let storyList
/**HTML Framework */
/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
	storyList = await StoryList.getStories()
	$storiesLoadingMsg.remove()

	putStoriesOnPage()
}
const generateStoryMarkup = (story, deleteBtn = false) => {
	// console.debug("generateStoryMarkup", story);
	const hostName = story.getHostName()
	const starBtn = Boolean(currentUser)

	return $(`
        <li id="${story.storyId}">
          ${starBtn ? makeStarBtn(story, currentUser) : ''}
          <a href="${story.url}" target="a_blank" class="story-link">
            ${story.title}
          </a>
          <small class="story-hostname">(${hostName})</small>
          <small class="story-author">by ${story.author}</small>
          <small class="story-user">posted by ${story.username}</small>
          ${deleteBtn ? makeTrashBtn() : ''}      
          </li>
      `)
}
//Make misc html icons
const makeStarBtn = (story, user) => {
	const isFavorite = user.isFavorite(story)
	const starType = isFavorite ? 'fas' : 'far'
	return `
  <span class='star'><i class='${starType} fa-star'></i></span>
  `
}
const makeTrashBtn = () => {
	return `<span class = 'trash-can'> <i class = 'fas fa-trash-alt'></i></span>`
}

//Update page elements
const handleStorySubmit = async (e) => {
	console.debug('submitNewStory')
	e.preventDefault()

	// grab all info from forms
	const title = $('#title-input').val()
	const url = $('#url-input').val()
	const author = $('#author-input').val()
	console.log(title, url, author)
	const username = currentUser.username
	const storyData = { title, url, author, username }

	const story = await storyList.addStory(currentUser, storyData)

	const $story = generateStoryMarkup(story)
	$allStoriesList.prepend($story)

	// hide the form and reset it

	$submitForm.trigger('reset')
	$submitForm.hide()
	putStoriesOnPage()
}

$submitForm.on('submit', handleStorySubmit)

const putStoriesOnPage = () => {
	// console.debug('putStoriesOnPage')
	$allStoriesList.empty()

	// loop through all of our stories and generate HTML for them
	for (let story of storyList.stories) {
		const $story = generateStoryMarkup(story)
		$allStoriesList.append($story)
	}

	$allStoriesList.show()
}

const putFavoritesOnPage = () => {
	$favoriteStories.empty()
	const { favorites } = currentUser
	if (favorites.length === 0) {
		$favoriteStories.append(`<h1>*Crickets*</h1>
    <h4>(looks like you haven't liked any posts yet)</h4>`)
	} else {
		for (let story of favorites) {
			const $story = generateStoryMarkup(story)
			$favoriteStories.append($story)
		}
	}
	$favoriteStories.show()
}

const putUserStoriesOnPage = () => {
	$ownStories.empty()
	if (currentUser.ownStories.length === 0) {
		$ownStories.append(`<h1>*Crickets*</h1>
      <h4>(looks like you haven't liked any posts yet)</h4>`)
	} else {
		for (let story of currentUser.ownStories) {
			let $story = generateStoryMarkup(story, true)
			$ownStories.append($story)
		}
	}

	$ownStories.show()
}
//Toggle user preference

const toggleFavorite = async (e) => {
	//Get the id of the item we favorite:
	const $star = $(e.target)

	const $refStory = $star.closest('li')
	const storyId = $refStory.attr('id')
	//Get the story that matches this id;
	const story = storyList.stories.find((s) => s.storyId === storyId)
	if ($star.hasClass('fas')) {
		await currentUser.removeFavorite(story)
		$star.closest('i').toggleClass('fas far')
	} else {
		await currentUser.addFavorite(story)
		$star.closest('i').toggleClass('fas far')
	}
}
$storyLists.on('click', '.star', toggleFavorite)

const deleteStory = async (e) => {
	const $targetStory = $(e.target).closest('li')
	const id = $targetStory.attr('id')
	$targetStory.remove()
	await storyList.removeStory(currentUser, id)
	await putUserStoriesOnPage()
}
$ownStories.on('click', '.trash-can', deleteStory)
