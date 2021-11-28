'use strict'

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
	console.debug('navAllStories', evt)
	hidePageComponents()
	putStoriesOnPage()
}

$body.on('click', '#nav-all', navAllStories)

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
	console.debug('navLoginClick', evt)
	hidePageComponents()
	$loginForm.show()
	$signupForm.show()
}

$navLogin.on('click', navLoginClick)

/** When a user first logins in, update the navbar to reflect that. */
const navSubmitClick = () => {
	hidePageComponents()
	$submitForm.show()
}
$navSubmit.on('click', navSubmitClick)

const navFavClick = () => {
	hidePageComponents()
	putFavoritesOnPage()
}
$navFavorites.on('click', navFavClick)

function updateNavOnLogin() {
	console.debug('updateNavOnLogin')
	$('.main-nav-links').show()
	$navLogin.hide()
	$navLogOut.show()
	$navUserStory.text(`${currentUser.username}`).show()
}
const navStoryClick = () => {
	hidePageComponents()
	putUserStoriesOnPage()
	$ownStories.show()
}
$body.on('click', '#nav-user-story', navStoryClick)
