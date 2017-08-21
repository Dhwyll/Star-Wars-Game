// RPG Javascript

$(document).ready(function(){

	var charObiWan = {
		charName: "Obi-Wan Kenobi",
		charImage: "assets/images/obi-wan.jpg",
		charHealth: 120,
		charBaseAttack: 8,
		charCurrentAttack: 8,
		amIPlayer: false,
		amIEnemy: false,
		amIChosen: false
	};

	var charLuke = {
		charName: "Luke Skywalker",
		charImage: "assets/images/luke.jpg",
		charHealth: 100,
		charBaseAttack: 5,
		charCurrentAttack: 5,
		amIPlayer: false,
		amIEnemy: false,
		amIChosen: false
	};

	var charPalpatine = {
		charName: "Emperor Palpatine",
		charImage: "assets/images/palpatine.jpg",
		charHealth: 150,
		charBaseAttack: 20,
		charCurrentAttack: 20,
		amIPlayer: false,
		amIEnemy: false,
		amIChosen: false
	};

	var charMaul = {
		charName: "Darth Maul",
		charImage: "assets/images/maul.png",
		charHealth: 180,
		charBaseAttack: 25,
		charCurrentAttack: 25,
		amIPlayer: false,
		amIEnemy: false,
		amIChosen: false
	};

	var playerCharArray = [charObiWan, charLuke, charPalpatine, charMaul];
	var enemyCharArray = [];
	var inBattle = false;
	var chosenPlayer;
	var chosenEnemy;

	function setupCharacters() {
		$("#characterChoiceSection").css("display", "none");					// Hide the character choice section
		$("#enemyChoiceSection").css("display", "none");						// Hide the enemy choice section
		for (i = 0; i < playerCharArray.length; i++) {							// For the length of the player character array
			$("#charName-"+i).html(playerCharArray[i].charName);				// Set the player name
			$("#charImage-"+i).attr("src", playerCharArray[i].charImage);		// Set the player image
			$("#charHealth-"+i).html(playerCharArray[i].charHealth);			// Set the player health
		}
		for (i = 0; i < 3; i++) {												// For the total number of characters
			$("#enemy-"+i).css("display", "none");								// Hide the enemy block
		$("#battleDetailsSection").css("display", "none");						// Hide the Battle Details Section
		}
	}
	
	function setupEnemies() {
		enemyCharArray = [];													// Clear the enemy array
		for (i = 0; i < playerCharArray.length; i++) {							// For the length of the player character array
			if (!playerCharArray[i].amIChosen) {								// If the player character is not chosen
				enemyCharArray.push(playerCharArray[i]);						// Then push that character into the enemy array
			}
		}
		displayEnemies();														// run display enemy function
	}
	
	function displayEnemies() {
		$("#enemyList").css("display", "block");										// Show enemy list
		for (i = 0; i < 3; i++) {														// For all characters
			$("#enemy-"+i).css("display", "none");										// Hide the character
		}
		for (i = 0; i < enemyCharArray.length; i++) {									// For the length of the number of enemies left
			if (!enemyCharArray[i].amIChosen) {											// If the enemy has not been chosen
				$("#enemyName-"+i).html(enemyCharArray[i].charName);					// Set the enemy's name
				$("#enemyImage-"+i).attr("src", enemyCharArray[i].charImage);			// Set the enemy's image
				$("#enemyHealth-"+i).html(enemyCharArray[i].charHealth);				// Set the enemy's health
				$("#enemy-"+i).css("display", "block");									// Show the enemies in the list
			}
		}
	}

	$(".characterID").on("click",function(){								// Choosing a Player Character section
		playerCharArray[this.getAttribute("value")].amIPlayer = true;		// set as the Player Character
		playerCharArray[this.getAttribute("value")].amIChosen = true;		// set as having been chosen for something
		$("#characterChoiceName").html(playerCharArray[this.getAttribute("value")].charName);				// set the player name
		$("#characterChoiceImage").attr("src", playerCharArray[this.getAttribute("value")].charImage);		// set the player image
		$("#characterChoiceHealth").html(playerCharArray[this.getAttribute("value")].charHealth);			// set the player health
		$("#characterChoiceSection").css("display", "block");												// display the chosen player
		$("#characterList").css("display", "none");															// Hide the character list
		chosenPlayer = playerCharArray[this.getAttribute("value")];											// Set the chosenPlayer
		setupEnemies();																						// Set up the enemy list
	});
	
	$(".enemyID").on("click",function(){										// Choosing an Enemy section
		if (!inBattle) {														// If not currently in a battle...
			inBattle = true;													// Say that we are...
			chosenEnemy = enemyCharArray[this.getAttribute("value")];			// Set the chosenEnemy
			enemyCharArray[this.getAttribute("value")].amIEnemy = true;			// set as the Enemy Character...
			enemyCharArray[this.getAttribute("value")].amIChosen = true;		// set as having been chosen for something...
			$("#enemyChoiceName").html(enemyCharArray[this.getAttribute("value")].charName);				// set the enemy name...
			$("#enemyChoiceImage").attr("src", enemyCharArray[this.getAttribute("value")].charImage);		// set the enemy image...
			$("#enemyChoiceHealth").html(enemyCharArray[this.getAttribute("value")].charHealth);			// set the enemy health...
			$("#enemyChoiceSection").css("display", "block");												// display the chosen enemy...
			setupEnemies();																					// and reset the enemy list.
		}
	});
	
	$("#attack").on("click",function(){
		if (inBattle) {																			// If in battle
			$("#battleDetailsSection").css("display", "block");									// Show the Battle Detail Section
			$("#resetGame").css("display", "none");												// Hide the Reset Button
			if ((chosenPlayer.charHealth > 0) && (chosenEnemy.charHealth > 0)) {				// If the player and enemy are still alive
				$("#playerAttack").html("You attacked " + chosenEnemy.charName + " for " + chosenPlayer.charCurrentAttack + " damage.");	// Display player's attack
				chosenEnemy.charHealth = chosenEnemy.charHealth - chosenPlayer.charCurrentAttack;											// Attack enemy
				chosenPlayer.charCurrentAttack = chosenPlayer.charCurrentAttack + chosenPlayer.charBaseAttack;								// Increase player's attack
				$("#enemyChoiceHealth").html(chosenEnemy.charHealth);															// Display enemy's reduced health
				if(chosenEnemy.charHealth > 0) {																				// If enemy is still alive...
					chosenPlayer.charHealth = chosenPlayer.charHealth - chosenEnemy.charBaseAttack;								// Attack player
					$("#enemyAttack").html(chosenEnemy.charName + " attacked you back for " + chosenEnemy.charBaseAttack  + " damage.");	// Display enemy's attack
					$("#characterChoiceHealth").html(chosenPlayer.charHealth);													// Display player's reduced health
					if(chosenPlayer.charHealth <= 0) {																			// If player dead...
						$("#playerAttack").html("You have been defeated. . .GAME OVER");										// Display Game Over
						$("#enemyAttack").html("");																				// Clear enemy attack notice
						$("#resetGame").css("display", "block");																// Display Reset button.
					}
				}
					else if(enemyCharArray.length > 0) {																		// Else if out of enemies
						$("#enemyChoiceSection").css("display", "none");														// Hide chosen enemy
						$("#playerAttack").html("You have defeated " + chosenEnemy.charName + ".  You can choose to fight another enemy.");	// Tell select new enemy
						$("#enemyAttack").html("");																				// Clear enemy attack notice
						inBattle = false;																						// No longer in battle
					}
						else {																									// Else, player won
							$("#playerAttack").html("You won!!! GAME OVER!!!");													// Display Game Won
							$("#enemyChoiceSection").css("display","none");														// Hide enemy choice
							$("#enemyAttack").html("");																			// Clear enemy attack notice
							inBattle = false;																					// No longer in battle
							$("#resetGame").css("display", "block");															// Display Reset Game button
						}
			}
		}
	});

	$("#resetGame").on("click",function(){
		inBattle = false;																				// No longer in battle
		playerCharArray = [charObiWan, charLuke, charPalpatine, charMaul];								// Reset Player Character Array
		$("#characterList").css("display", "block");													// Show Character List
		$("#characterChoiceSection").css("display", "none");											// Hide player choice
		$("#enemyChoiceSection").css("display", "none");												// Hide enemy choice
		$("#enemyList").css("display", "none");															// Hide enemy array
		$("#playerAttack").html("");																	// Clear player attack notice
		$("#enemyAttack").html("");																		// Clear enemy attack notice
		$("#resetGame").css("display", "none");															// Hide Reset Game button
	});



	// Start the game

	setupCharacters();
});