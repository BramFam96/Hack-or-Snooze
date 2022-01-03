'use strict'

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
	console.debug('navAllStories')
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
const navSubmit = () => {
	console.debug('navSubmit')
	hidePageComponents()
	$submitForm.show()
}
$navSubmit.on('click', navSubmit)

const navFav = () => {
	console.debug('navFav')
	hidePageComponents()
	putFavoritesOnPage()
}
$navFavorites.on('click', navFav)

function updateNavOnLogin() {
	console.debug('updateNavOnLogin')
	$navLogin.hide()
	$navFavorites.show()
	$navLogOut.show()
	$navUserStory.text(`${currentUser.username}`)
	$navUserStory.show()
}
function updateNavOnLogout() {
	console.debug('updateNavOnLogout')
	$navLogin.show()
	$navLogOut.hide()
}

const navUserStory = () => {
	console.debug('navUserStory')
	hidePageComponents()
	putUserStoriesOnPage()
	$ownStories.show()
}
$body.on('click', '#nav-user-story', navUserStory)
