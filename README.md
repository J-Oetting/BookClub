# BookClub
##### A Discord Bot

## What is it?

Discord is a great place to discuss things among friends. No lets say you have specific friends to you want to discuss a book with as you all read along. I have one such friend, and while Discord did a pretty good job of letting us get our ideas across, I thought there could be a better way of organzing and communicating for our meetings.

BookClub is my solution.

## Features

### 1. Found a book club and add members

Once it is invited to a Discord server, BookClub allows anyone on the server to found a new club and add members.

### 2. Set and check the book the club is currently reading

Members of a club can set the current book the club is reading and anyone on the server can ping the bot the get the current book.

Setting a book to "currently reading" requires both a name and a title. If the user has an ISBN number they can optionally add this as well.

### 3. Set, change and check the next meeting of the club

Users can also set the date of the next club meeting. This can be changed anytime. Anyone on the server can also ping the bot to get the date of the next meeting.

## Plans for the future

While the above is a good starting place for BookClub, I hope to implement a few more key features soon. Here are some of the updates I'm planning:

1. Ability for members to add books to a queue of books to read in the future.
2. Progress of each member on the current book.
3. Integration of Discord's new internal event scheduler for setting meetings.
4. Google Books API for searching books by ISBN.

## Installation

You will need a Discord account and to be part of a server in order to add BookClub.

First login to your Discord account.

Next, navigate to this link: https://discord.com/api/oauth2/authorize?client_id=919963207735590952&permissions=534723947584&scope=bot

You will be prompted to invite BookClub to a server of your choice. 

After selecting the server, accept the permissions BookClub will need.

Congrats! BookClub is now on your server and you can use any of the included commands to manage your club.

You will need to use the /found command first to found the club before you can use its other features. 
