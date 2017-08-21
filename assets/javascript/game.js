// RPG Javascript

// Set up objects for each of the characters
	// Image
	// Name
	// Health Points
	// Attack Power
	// Counter Attack Power
	// Chosen as Player
	// Chosen as Enemy

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
		$("#characterChoiceSection").css("display", "none");
		$("#enemyChoiceSection").css("display", "none");
		for (i = 0; i < playerCharArray.length; i++) {
			$("#charName-"+i).html(playerCharArray[i].charName);
			$("#charImage-"+i).attr("src", playerCharArray[i].charImage);
			$("#charHealth-"+i).html(playerCharArray[i].charHealth);
		}
		for (i = 0; i < 3; i++) {
			$("#enemy-"+i).css("display", "none");
		$("#battleDetailsSection").css("display", "none");
		}
	}
	
	function setupEnemies() {
		enemyCharArray = [];
		for (i = 0; i < playerCharArray.length; i++) {
			if (!playerCharArray[i].amIChosen) {
				enemyCharArray.push(playerCharArray[i]);
			}
		}
		displayEnemies();														// run display enemy function
	}
	
	function displayEnemies() {
		$("#enemyList").css("display", "block");
		for (i = 0; i < 3; i++) {
			$("#enemy-"+i).css("display", "none");
		}
		for (i = 0; i < enemyCharArray.length; i++) {
			if (!enemyCharArray[i].amIChosen) {
				$("#enemyName-"+i).html(enemyCharArray[i].charName);
				$("#enemyImage-"+i).attr("src", enemyCharArray[i].charImage);
				$("#enemyHealth-"+i).html(enemyCharArray[i].charHealth);
				$("#enemy-"+i).css("display", "block");
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
		if (inBattle) {
			$("#battleDetailsSection").css("display", "block");
			$("#resetGame").css("display", "none");
			if ((chosenPlayer.charHealth > 0) && (chosenEnemy.charHealth > 0)) {
				$("#playerAttack").html("You attacked " + chosenEnemy.charName + " for " + chosenPlayer.charCurrentAttack + " damage.");
				chosenEnemy.charHealth = chosenEnemy.charHealth - chosenPlayer.charCurrentAttack;
				chosenPlayer.charCurrentAttack = chosenPlayer.charCurrentAttack + chosenPlayer.charBaseAttack;
				$("#enemyChoiceHealth").html(chosenEnemy.charHealth);
				if(chosenEnemy.charHealth > 0) {
					chosenPlayer.charHealth = chosenPlayer.charHealth - chosenEnemy.charBaseAttack;
					$("#enemyAttack").html(chosenEnemy.charName + " attacked you back for " + chosenEnemy.charBaseAttack  + " damage.");
					$("#characterChoiceHealth").html(chosenPlayer.charHealth);
					if(chosenPlayer.charHealth <= 0) {
						$("#playerAttack").html("You have been defeated. . .GAME OVER");
						$("#enemyAttack").html("");
						$("#resetGame").css("display", "block");
					}
				}
					else if(enemyCharArray.length > 0) {
						$("#enemyChoiceSection").css("display", "none");
						$("#playerAttack").html("You have defeated " + chosenEnemy.charName + ".  You can choose to fight another enemy.");
						$("#enemyAttack").html("");
						inBattle = false;
					}
						else {
							$("#playerAttack").html("You won!!! GAME OVER!!!");
							$("#enemyChoiceSection").css("display","none");
							$("#enemyAttack").html("");
							inBattle = false;
							$("#resetGame").css("display", "block");
						}
			}
		}
	});

	$("#resetGame").on("click",function(){
		charObiWan = {
			charName: "Obi-Wan Kenobi",
			charImage: "assets/images/obi-wan.jpg",
			charHealth: 120,
			charBaseAttack: 8,
			charCurrentAttack: 8,
			amIPlayer: false,
			amIEnemy: false,
			amIChosen: false
		};

		charLuke = {
			charName: "Luke Skywalker",
			charImage: "assets/images/luke.jpg",
			charHealth: 100,
			charBaseAttack: 5,
			charCurrentAttack: 5,
			amIPlayer: false,
			amIEnemy: false,
			amIChosen: false
		};

		charPalpatine = {
			charName: "Emperor Palpatine",
			charImage: "assets/images/palpatine.jpg",
			charHealth: 180,
			charBaseAttack: 20,
			charCurrentAttack: 20,
			amIPlayer: false,
			amIEnemy: false,
			amIChosen: false
		};

		charMaul = {
			charName: "Darth Maul",
			charImage: "assets/images/maul.png",
			charHealth: 150,
			charBaseAttack: 25,
			charCurrentAttack: 25,
			amIPlayer: false,
			amIEnemy: false,
			amIChosen: false
		};
		inBattle = false;
		playerCharArray[0] = charObiWan;
		playerCharArray[1] = charLuke;
		playerCharArray[2] = charPalpatine;
		playerCharArray[3] = charMaul;
		$("#characterList").css("display", "block");
		$("#characterChoiceSection").css("display", "none");
		$("#enemyChoiceSection").css("display", "none");
		$("#enemyList").css("display", "none");
		$("#playerAttack").html("");
		$("#enemyAttack").html("");
		$("#resetGame").css("display", "none");
	});



	// Start the game

	setupCharacters();
});