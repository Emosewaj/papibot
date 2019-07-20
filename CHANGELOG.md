# Changelog papi-3

## July 30, 2019 - Papi 3.7.0
+ Added //uwu, by the pope

## June 24, 2019 - Papi 3.6.1
* Fixed emojis for //sans

## June 24. 2019 - Papi 3.6.0
+ Added //sans, I don't know why, but I did, so here we are now

## May 10, 2019 - Papi 3.5.0
+ Added //repeat, which repeats the previously run command.

## April 25, 2019 - Papi 3.4.1
* Fixed some errors with //steam and improved some stuff, still needs more work, API is very wonky

## April 25, 2019 - Papi 3.4.0
+ Added //steam, look up information on any Steam user, either with their profile URL or their steam64 ID, please report any bugs you find!

## April 9, 2019 - Papi 3.3.3
* Fixed "No such command!" response after sending only the prefix
* Fixed reinitialisation of the help system after reconnecting to Discord API
> *Feels good to clean up some of those older issues finally*

## April 9, 2019 - Papi 3.3.2
* Fixed ancient attempt at logging crashes that just spammed the logs, which by themselves suffice as crash logs

## Feb 9, 2019 - Papi 3.3.1
* Fixed crashing on unavailable video when using //play
* Fixed NaN views and NaN ratings
* Fixed typos in the changelog
Note: Playing files through the music system appears to break the system until the bot re-joins the voice channel. More investigation required.

## Feb 4, 2019 - Papi 3.3.0
+ Implemented //setwelcome
* Fixed a few things with the Database API

## Dec 23, 2018 - Papi 3.2.5
* Switched which function is used to remove null values from moves for better result readability and less confusion

## Dec 23, 2018 - Papi 3.2.4
* Minor design changes to //pokedex
  * Search entries that include spaces now no longer have to see them replaced with a `-` sign
  * Newline characters are now removed from item and Pokémon descriptions
  * Move Power and Accuracy no longer show up as `null` for some moves
* Fixed a case in which the //rule34 command would get stuck on "Taking a look..." when no images were returned by the search query

## Dec 12, 2018 - Papi 3.2.3
* Minor design update to //pokedex

## Dec 12, 2018 - Papi 3.2.2
* Slightly modified error logging for better readability

## Dec 12, 2018 - Papi 3.2.1
* Fixed crash when a Pokémon would have held items

## Dec 12, 2018 - Papi 3.2.0
+ Implemented //pokedex

## Dec 6, 2018 - Papi 3.1.0
+ Implemented //setprefix

## Aug 13, 2018 - Papi 3.0.3
* Removed unnecessary debug log
* Changed how commands are logged
* Fixed invite link not appearing with //invite

## Aug 06, 2018 - Papi 3.0.2
* Fixed a number

## Aug 06, 2018 - Papi 3.0.1
* Removed an old debug message
* Analyzed and adjusted tag limitations for the NSFW commands
+ Added coming online and crash notifications for development purposes

## Jul 18, 2018 - Papi 3.0.0
+ Created a new command handler  
+ Ported 52 commands
- Voice still doesn't work