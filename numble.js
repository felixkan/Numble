document.addEventListener("DOMContentLoaded", () => {
  // reset the game on browser refresh!
  resetGameState();
  // also in local storage
  let currentWordIndex = 0;
  let guessedWordCount = 0;
  let availableSpace = 1;
  let guessedWords = [[]];
  // store number of tries in each game
  let tries = [];
  let scoreCard = [];	// store the tile colours
  let myChart = null;
    
  const width = 4;

  const words = ['7533', '8158', '3673', '0370', '0838', '4888', '5045', '8211', '3866', '3787', '7647', '8533', '1787', '7515', '0370', '5233', '6566', '8211', '7828', '0750', '0150', '4344', '7838', '4878', '3733', '6181', '0363', '4666', '6556', '4334', '2333', '4422', '0550', '4266', '8363', '1400', '0011', '3511', '6822', '3040', '5465', '2311', '3767', '7888', '6156', '2323', '7808', '3123', '8428', '2355', '5266', '8166', '7655', '2424', '8355', '0303', '2454', '1383', '6606', '0707', '7667', '8555', '1621', '6000', '7333', '6600', '6836', '2342', '0828', '3343', '0711', '4747', '0830', '1444', '8303', '6333', '2422', '4000', '4727', '3166', '2677', '2676', '0188', '1844', '5844', '1300', '1177', '4707', '3383', '7477', '2767', '1757', '7282', '0850', '5535', '4877', '0030', '6866', '3177', '5060', '0377', '8100', '7000', '4122', '4303', '2502', '2677', '8211', '4646', '1311', '4323', '3404', '6011', '1262', '1771', '6844', '5233', '3500', '5325', '1381', '2707', '7777', '1671', '3333', '6366', '3888', '0466', '8308', '1222', '2233', '1333', '6000', '2711', '3188', '4244', '1131', '3577', '6222', '2444', '0377', '0611', '1711', '3444', '7121', '0818', '7411', '3322', '6700', '4727', '0477', '5688', '4822', '0677', '6686', '2656', '4422', '7333', '3155', '7717', '1121', '5404', '1433', '5616', '6848', '2588', '4184', '3283', '2677', '0202', '0100', '6306', '1747', '5245', '2282', '5787', '1571', '8838', '2652', '1388', '1533', '5767', '0800', '5727', '0560', '4344', '2662', '4343', '8268', '2844', '4754', '0101', '2262', '4884', '4222', '7606', '4188', '6100', '1666', '4878', '7627', '4434', '2077', '7066', '6122', '1733', '1828', '3611', '1521', '1858', '1631', '2822', '5333', '2700', '0282', '5135', '4764', '3737', '0580', '2422', '2141', '1831', '2161', '6844', '1101', '5060', '6242', '4204', '5727', '7547', '6707', '5868', '3888', '4808', '1575', '4144', '4344', '1646', '8636', '5755', '0888', '3757', '1677', '5044', '5242', '1277', '4444', '4477', '5555', '5635', '5020', '0366', '1454', '5375', '0353', '6424', '4077', '3848', '2555', '0730', '2808', '6323', '1066', '4354', '8383', '0633', '5464', '6111', '4788', '8738', '2011', '2030', '6866', '6226', '0810', '2722', '5434', '3033', '5212', '1888', '5315', '3655', '1101', '7887', '6036', '3383', '5645', '5715', '7011', '3722', '7455', '3838', '2722', '6855', '5385', '0033', '7311', '5675', '1232', '6766', '4144', '1211', '6101', '7887', '6444', '6133', '3050', '4034', '3044', '0266', '5288', '3400', '5626', '4737', '1522', '3155', '8158', '1800', '3288', '2575', '5744', '0580', '1611', '3283', '4555', '2101', '5252', '2377', '2737', '0282', '3583', '0822', '8333', '1484', '6466', '8478', '4888', '1271', '6232', '6016', '7377', '0200', '5377', '6555', '8133', '3828', '7037', '6806', '0333', '8333', '8733', '0737', '1616', '4804', '3543', '4833', '7007', '4524', '3453', '4344', '3266', '4373', '2482', '4333', '5166', '0888', '8636', '7622', '0440', '8787', '3454', '7047', '1331', '7303', '7000', '0230', '5606', '4877', '8111', '7657', '7000', '2383', '1464', '0733', '4404', '8888', '1400', '0377', '7060', '6121', '8070', '4434', '7585', '4232', '1821', '4141', '6746', '3333', '0313', '1655', '3727', '2855', '6176', '7262', '3020', '7585', '6036', '2353', '8418', '6736', '2525', '5353', '6242', '6576', '7344', '6888', '6455', '8222', '8733', '1261', '3212', '0660', '1011', '6366', '6131', '0244', '4262', '8738', '4504', '0880', '4514', '5600', '0011', '8248', '5625', '7757', '7010', '6122', '6242', '2212', '3655', '2000', '5775', '2200', '6026', '3613', '3171', '4252', '5035', '2566', '0322', '5811', '2363', '5455', '2155', '7747', '1575', '5144', '2144', '0777', '7466', '0555', '8525', '6844', '2862', '4141', '1878', '0717', '4377', '7636', '1011', '7122', '1040', '7166', '7411', '0030', '0030', '5088', '6200', '7837', '8738', '3322', '6722', '0210', '3353', '2152', '0040', '4000', '0250', '7272', '3113', '2044', '5575', '1878', '2600', '3453', '4244', '4084', '0644', '6036', '7767', '7711', '0720', '4424', '5465', '7515', '6454', '7144', '7837', '4188', '0840', '8383', '2404', '2212', '5484', '8068', '3577', '7217', '7307', '6727', '4788', '0000', '6476', '6727', '0600', '4313', '4524', '8848', '4374', '4788', '5155', '4866', '8000', '2868', '4554', '0454', '8568', '0410', '7657', '7833', '0800', '5555', '4404', '1855', '4566', '3644', '7327', '5315', '5200', '7222', '4686', '4474', '4656', '8366', '5544', '7627', '2002', '6303', '4822', '7505', '8020', '6474', '5444', '4866', '5020', '4414', '4377', '0131', '7177', '4323', '7282', '3454', '1171', '3222', '0822', '0055', '8727', '2433', '3833', '2555', '1212', '1841', '2733', '4244', '3222', '7677', '4866', '8866', '8055', '2050', '6000', '7467', '7722', '1411', '5633', '0188', '3313', '8488', '8636', '3611', '6272', '8468', '0780', '7777', '3873', '7422', '3141', '4111', '1666', '2611', '4131', '7287', '0477', '4343', '1515', '4477', '5811', '5500', '7233', '2172', '5262', '5222', '0424', '4324', '8313', '8242', '8248', '0433', '1344', '3363', '7844', '6744', '3777', '6416', '1301', '8611', '5404', '3300', '3626', '3311', '6356', '3755', '1361', '0170', '5616', '5252', '8141', '5777', '6036', '5300', '8458', '6246', '0636', '0530', '8311', '1373', '4633', '0555', '5355', '1851', '5835', '2808', '3123', '2377', '4202', '3585', '0466', '7656', '7188', '4564', '5455', '8414', '4011', '1521', '8711', '8078', '8211', '7747', '0787', '3544', '6525', '8606', '6211', '5045', '0333', '1544', '2545', '1041', '3288', '0868', '8848', '7577', '8888', '7122', '7161', '2848', '2525', '5205', '6016', '0410', '1707', '3262', '0525', '7777', '1788', '0010', '1322', '3600', '7377', '4544', '6878', '7711', '5211', '3144', '7212', '3313', '7808', '2342', '1727', '5105', '0626', '5675', '1488', '1050', '6717', '1333', '7617', '0100', '6606', '0060', '7323', '2142', '7027', '1322', '2411', '0540', '6456', '3242', '1788', '7057', '8313', '2755', '4114', '5711', '3600', '3010', '3868', '7555', '0440', '0242', '4524', '6406', '0130', '1575', '5484', '6066', '3767', '6486', '2252', '3131', '6747', '5644', '7487', '1141', '0200', '3566', '2404', '5111', '7686', '0888', '1131', '2033', '0670', '6133', '0600', '0150', '1828', '1131', '7500', '8718', '3800', '7555', '2636', '6226', '4077', '0888', '8414', '8108', '2200', '1722', '3434', '6576', '0666', '0400', '3848', '6366', '5645', '2352', '7487', '7355', '8066', '8666', '7141', '3177', '5727', '5365', '3700', '7477', '8585', '8248', '5635', '5030', '2434', '6060', '7287', '6256', '2172', '0088', '8444', '8655', '3020', '0580', '1255', '7747', '0570', '5155', '1444', '5488', '0350', '0280', '0430', '0820', '2101', '4858', '4166', '5855', '4577', '2262', '0030', '5544', '5422', '1255', '6436', '6666', '0120', '3511', '2012', '4464', '7727', '7323', '6733', '0880', '6676', '4104', '0121', '3153', '1646', '0630', '1500', '1555', '3613', '0430', '7757', '8535', '5211', '5060', '3545', '7383', '6836', '6386', '8050', '0377', '3053', '8138', '8718', '6077', '4224', '7266', '3808', '1355', '0877', '6454', '4555', '0171', '3303', '8616', '0350', '5735', '3434', '8748', '5877', '6156', '8578', '3377', '0811', '1050', '2666', '7525', '1333', '0707', '0760', '5044', '5625', '2811', '1061', '7111', '2544', '0212', '2577', '7555', '3653', '8303', '7007', '1131', '8378', '4766', '1031', '4700', '7686', '4733', '7787', '7808', '1161', '2702', '4022', '6544', '7877', '4144', '3453', '5100', '6066', '1212', '8708', '1177', '2686', '5611', '0630', '7277', '1701', '7247', '8544', '2633', '8171', '0686', '3543', '6736', '3483', '8558', '7517', '6611', '3323', '2182', '7617', '7707', '6244', '8568', '5717', '3303', '7055', '2512', '8766', '7707', '5685', '1351', '7417', '5345', '4505', '4828', '7474', '7067', '2828', '3252', '1477', '4644', '1422', '1666', '6516', '5101', '5474', '8218', '3877', '1080', '4844', '3333', '1277', '7525', '6272', '7033', '5345', '4434', '7566', '0400', '4111', '5755', '4676', '3173', '4622', '0747', '6303', '0780', '4874'];

  // const words = ["1234", "2233", "5435", "1133", "1233", "5566", "7788", "9900", "2324", "1123", "9976", "5634", "6723",
					// "1234", "2233", "5435", "1133", "1233", "5566", "7788", "9900", "2324", "1123", "9976", "5634", "6723",
					// "1234", "2233", "5435", "1133", "1233", "5566", "7788", "9900", "2324", "1123", "9976", "5634", "6723"];
					
  let currentWord = words[currentWordIndex];

  initLocalStorage();
  initHelpModal();
  initStatsModal();
  createSquares();
  addKeyboardClicks();
  addKeyPress();
  loadLocalStorage();

  function initLocalStorage() {
    const storedCurrentWordIndex =
      window.localStorage.getItem("currentWordIndex");
    if (!storedCurrentWordIndex) {
      window.localStorage.setItem("currentWordIndex", currentWordIndex);
    } else {
      currentWordIndex = Number(storedCurrentWordIndex);
      currentWord = words[currentWordIndex];
    }
	
	console.log(` current word index: ${currentWordIndex}` );
	console.log(` stored current word index: ${storedCurrentWordIndex}` );
	
  }

  function loadLocalStorage() {
    currentWordIndex =
      Number(window.localStorage.getItem("currentWordIndex")) ||
      currentWordIndex;
    guessedWordCount =
      Number(window.localStorage.getItem("guessedWordCount")) ||
      guessedWordCount;
    availableSpace =
      Number(window.localStorage.getItem("availableSpace")) || availableSpace;
    guessedWords =
      JSON.parse(window.localStorage.getItem("guessedWords")) || guessedWords;

    currentWord = words[currentWordIndex];

    const storedBoardContainer = window.localStorage.getItem("boardContainer");
    if (storedBoardContainer) {
      document.getElementById("board-container").innerHTML =
        storedBoardContainer;
    }

    const storedKeyboardContainer =
      window.localStorage.getItem("keyboardContainer");
    if (storedKeyboardContainer) {
      document.getElementById("keyboard-container").innerHTML =
        storedKeyboardContainer;

      addKeyboardClicks();
	  addKeyPress();
    }
	
	console.log(` load current word index: ${currentWordIndex}` );
  }

  function resetGameState() {
    window.localStorage.removeItem("guessedWordCount");
    window.localStorage.removeItem("guessedWords");
    window.localStorage.removeItem("keyboardContainer");
    window.localStorage.removeItem("boardContainer");
    window.localStorage.removeItem("availableSpace");
  }

  function createSquares() {
    const gameBoard = document.getElementById("board");

    for (let i = 0; i < 20; i++) {
      let square = document.createElement("div");
      square.classList.add("animate__animated");
      square.classList.add("square");
      square.setAttribute("id", i + 1);
      gameBoard.appendChild(square);
    }
  }

  function preserveGameState() {
    window.localStorage.setItem("guessedWords", JSON.stringify(guessedWords));

    const keyboardContainer = document.getElementById("keyboard-container");
    window.localStorage.setItem(
      "keyboardContainer",
      keyboardContainer.innerHTML
    );

    const boardContainer = document.getElementById("board-container");
    window.localStorage.setItem("boardContainer", boardContainer.innerHTML);
  }

  function getCurrentWordArr() {
    const numberOfGuessedWords = guessedWords.length;
    return guessedWords[numberOfGuessedWords - 1];
  }

  function updateGuessedLetters(letter) {
    const currentWordArr = getCurrentWordArr();

    if (currentWordArr && currentWordArr.length < 4) {
      currentWordArr.push(letter);

      const availableSpaceEl = document.getElementById(availableSpace);

      availableSpaceEl.textContent = letter;
      availableSpace = availableSpace + 1;
    }
  }

  function updateTotalGames() {
    const totalGames = window.localStorage.getItem("totalGames") || 0;
    window.localStorage.setItem("totalGames", Number(totalGames) + 1);
  }

  function showResult() {
    // const finalResultEl = document.getElementById("final-score");
    // finalResultEl.textContent = "Wordle 1 - You win!";
	
	// toastr.success("Wordle 1 - You win!");

    const totalWins = window.localStorage.getItem("totalWins") || 0;
    window.localStorage.setItem("totalWins", Number(totalWins) + 1);

    const currentStreak = window.localStorage.getItem("currentStreak") || 0;
    window.localStorage.setItem("currentStreak", Number(currentStreak) + 1);
	
	
	const maxStreak = window.localStorage.getItem("maxStreak") || 0;
	
	if (Number(currentStreak) + 1 > Number(maxStreak)){
		window.localStorage.setItem("maxStreak", Number(currentStreak) + 1);
	}

	
  }

  function showLosingResult() {
    // const finalResultEl = document.getElementById("final-score");
    // finalResultEl.textContent = `Wordle 1 - Unsuccessful Today!`;

    window.localStorage.setItem("currentStreak", 0);
  }

  function clearBoard() {
    // for (let i = 0; i < 20; i++) {
      // let square = document.getElementById(i + 1);
      // square.textContent = "";
    // }

    const keys = document.getElementsByClassName("keyboard-button");

    for (var key of keys) {
      key.disabled = true;
    }
  }

  function getIndicesOfLetter(letter, arr) {
    const indices = [];
    let idx = arr.indexOf(letter);
    while (idx != -1) {
      indices.push(idx);
      idx = arr.indexOf(letter, idx + 1);
    }
    return indices;
  }



  function updateWordIndex() {
    console.log({ currentWordIndex });
    window.localStorage.setItem("currentWordIndex", currentWordIndex + 1);
  }



  async function handleSubmitWord() {
    const currentWordArr = getCurrentWordArr();
    const guessedWord = currentWordArr.join("");

    if (guessedWord.length !== 4) {
      return;
    }

    try {
      const firstLetterId = guessedWordCount * 4 + 1;

      localStorage.setItem("availableSpace", availableSpace);

      const interval = 200;
	  
	  // new
	  const lineScore = [];
	  
	  let tileclassdict = {};
	  let keytileclassdict = {};
	  
	  let letterCount = {}; //keep track of letter frequency, ex) KENNY -> {K:1, E:1, N:2, Y: 1}
		for (let i = 0; i < currentWord.length; i++) {
			let target_letter = currentWord[i];

			if (letterCount[target_letter]) {
			   letterCount[target_letter] += 1;
			} 
			else {
			   letterCount[target_letter] = 1;
			}
		}

	  console.log(letterCount);
	  
	  //first iteration, check all the correct ones first
		currentWordArr.forEach((letter, index) => {
		
			if (currentWord[index] == letter) {
				tileclassdict[index] = "correct-letter-in-place";
				keytileclassdict[index] = "correct-letter-in-place";
				lineScore.push("green");
				
				letterCount[letter] -= 1;   //deduct the letter count		
			}		
		});
		
		console.log(letterCount);
		// //go again and mark which ones are present but in wrong position
		currentWordArr.forEach((letter, index) => {
						
				// skip the letter if it has been marked correct
				if (tileclassdict[index]!="correct-letter-in-place") {
					
					// //Is it in the word?         //make sure we don't double count
					if (currentWord.includes(letter) && letterCount[letter] > 0){
						tileclassdict[index] = "correct-letter";
						lineScore.push("yellow");
						
						if (keytileclassdict[index]!="correct-letter-in-place") {
							keytileclassdict[index] = "correct-letter";
						}
						letterCount[letter] -= 1;
						
					} // Not in the word or (was in word but letters all used up to avoid overcount)
					else {
						tileclassdict[index]="incorrect-letter";
						keytileclassdict[index]="incorrect-letter";
						lineScore.push("grey");
					}
				}
			
		});
		
		scoreCard.push(lineScore);
		
		// real action
		currentWordArr.forEach((letter, index) => {
			setTimeout(() => {
			
				const letterId = firstLetterId + index;
				const letterEl = document.getElementById(letterId);
				
				const keyboardEl = document.querySelector(`[data-key=Digit${letter}]`);
				
				letterEl.classList.add("animate__flipInX");
				letterEl.classList.add(tileclassdict[index]);
				keyboardEl.classList.add(keytileclassdict[index]);
				
				if (index === 3) {
					preserveGameState();
				}
			
			}, index * interval);
		});
		

      guessedWordCount += 1;
      window.localStorage.setItem("guessedWordCount", guessedWordCount);

	  		
		if (guessedWords.length === 1 && guessedWord === currentWord) {
			setTimeout(() => {
			  const modal = document.getElementById("win-modal-1");
			  modal.style.display = "block";			
			}, 1200*1);
			
			setTimeout(function(){
				$("#win-modal-1").fadeOut();
			}, 1200*3)
		}

		if (guessedWords.length === 2 && guessedWord === currentWord) {
			setTimeout(() => {
			  const modal = document.getElementById("win-modal-2");
			  modal.style.display = "block";			
			}, 1200*1);
			
			setTimeout(function(){
				$("#win-modal-2").fadeOut();
			}, 1200*3)
		}
		
		if (guessedWords.length === 3 && guessedWord === currentWord) {
			setTimeout(() => {
			  const modal = document.getElementById("win-modal-3");
			  modal.style.display = "block";			
			}, 1200*1);
			
			setTimeout(function(){
				$("#win-modal-3").fadeOut();
			}, 1200*3)
		}
		
		if (guessedWords.length === 4 && guessedWord === currentWord) {
			setTimeout(() => {
			  const modal = document.getElementById("win-modal-4");
			  modal.style.display = "block";			
			}, 1200*1);
			
			setTimeout(function(){
				$("#win-modal-4").fadeOut();
			}, 1200*3)
		}
		
		if (guessedWords.length === 5 && guessedWord === currentWord) {
			setTimeout(() => {
			  const modal = document.getElementById("win-modal-5");
			  modal.style.display = "block";			
			}, 1200*1);
			
			setTimeout(function(){
				$("#win-modal-5").fadeOut();
			}, 1200*3)
		}

		if (guessedWord === currentWord) {
						
			setTimeout(() => {

			  clearBoard();
			  showResult();
			  updateWordIndex();
			  updateTotalGames();
			  resetGameState();	


			  console.log(guessedWords);
			  console.log(guessedWords.length);

			  // store the number of tries
			  tries = JSON.parse(window.localStorage.getItem("tries")) || tries;
			  tries.push(guessedWords.length);
			  window.localStorage.setItem("tries", JSON.stringify(tries));
			  
			  console.log(tries);
			  
			}, 1200*3.5);
			
			
			setTimeout(() => {
				
			  const modal_stats = document.getElementById("stats-modal");
			  updateStatsModal();
			  modal_stats.style.display = "block";
			  
			  // Get the <span> element that closes the modal
				const span_stats = document.getElementById("close-stats");
				// When the user clicks on <span> (x), close the modal
				span_stats.addEventListener("click", function () {
				  modal_stats.style.display = "none";
				});
				// When the user clicks anywhere outside of the modal, close it
				window.addEventListener("click", function (event) {
				  if (event.target == modal_stats) {
					modal_stats.style.display = "none";
				  }
				});
			  		  
			  // return;
			}, 1200*3.5);
			
			// setTimeout(function(){
			setTimeout(() => {			
				$("#stats-modal").fadeOut();
			}, 1200*10)

		    <button id="shareButton">Share</button>

		    <script>
			// Replace this URL with the URL you want to share
			const shareURL = 'https://coolmind.ca/';
		
			// Function to open a share dialog when the button is clicked
			document.getElementById('shareButton').addEventListener('click', () => {
			    if (navigator.share) {
				navigator.share({
				    title: 'Wordle Game',
				    text: 'Can you guess the word?',
				    url: shareURL,
				})
				.then(() => console.log('Shared successfully'))
				.catch((error) => console.error('Error sharing:', error));
			    } else {
				// Fallback for browsers that don't support the Web Share API
				alert('Web Share API is not supported in your browser. You can manually copy the link.');
			    }
			});
		    </script>
			
			return;
			
		}
			
			



      if (guessedWords.length === 5 && guessedWord !== currentWord) {
        setTimeout(() => {
         		  
		  const modal = document.getElementById("lose-modal");
		  document.getElementById("answer").textContent = currentWord;
		  modal.style.display = "block";

          return;
        }, 1200*1);
		
		setTimeout(function(){
			$("#lose-modal").fadeOut();
		}, 1200*7);
		
	    clearBoard();
	    showLosingResult();
	    updateWordIndex();
	    updateTotalGames();
	    resetGameState();
		
      }

      guessedWords.push([]);
    } catch (_error) {
      window.alert("Number is not recognised!");
    }
  }

  function handleDelete() {
    const currentWordArr = getCurrentWordArr();

    if (!currentWordArr.length) {
      return;
    }

    currentWordArr.pop();

    guessedWords[guessedWords.length - 1] = currentWordArr;

    const lastLetterEl = document.getElementById(availableSpace - 1);

    lastLetterEl.innerHTML = "";
    availableSpace = availableSpace - 1;
  }


function addKeyboardClicks() {
    const keys = document.querySelectorAll(".keyboard-row button");
    for (let i = 0; i < keys.length; i++) {
      keys[i].addEventListener("click", ({ target }) => {
        const key = target.getAttribute("data-key");

        if ("Digit0" <= key && key <= "Digit9") {
			updateGuessedLetters(key[5]);  // key[5] is a digit, e.g. key[5]='9' if key="Digit9"
		}
		
		else if (key === "Backspace") {
          handleDelete();
          return;
        }
		
		else if (key === "Enter") {
          handleSubmitWord();
          return;
        }     
      });
    }
  }

// Listen for Key Press
function addKeyPress() {
    document.addEventListener("keyup", (e) => {
        const key = e.code;
		
		if ("Digit0" <= key && key <= "Digit9") {
			updateGuessedLetters(key[5]);  // key[5] is a digit, e.g. key[5]='9' if key="Digit9"
		}
		
		else if (key === "Backspace") {
          handleDelete();
          return;
        }
		
		else if (key === "Enter") {
          handleSubmitWord();
          return;
        }     
        
    });
}




  function initHelpModal() {
    const modal = document.getElementById("help-modal");

    // Get the button that opens the modal
    const btn = document.getElementById("help");

    // Get the <span> element that closes the modal
    const span = document.getElementById("close-help");

    // When the user clicks on the button, open the modal
    btn.addEventListener("click", function () {
      modal.style.display = "block";
    });

    // When the user clicks on <span> (x), close the modal
    span.addEventListener("click", function () {
      modal.style.display = "none";
    });

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener("click", function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    });
  }

  function updateStatsModal() {
	const maxStreak = window.localStorage.getItem("maxStreak");  
    const currentStreak = window.localStorage.getItem("currentStreak");
    const totalWins = window.localStorage.getItem("totalWins");
    const totalGames = window.localStorage.getItem("totalGames");

    document.getElementById("total-played").textContent = totalGames;
    // document.getElementById("total-wins").textContent = totalWins;
    document.getElementById("current-streak").textContent = currentStreak;
	document.getElementById("max-streak").textContent = maxStreak;

    const winPct = Math.round((totalWins / totalGames) * 100) || 0;
    document.getElementById("win-pct").textContent = winPct;
	
	tries = JSON.parse(window.localStorage.getItem("tries")) || tries;
	
		
	console.log(tries);
	
	
	let count = {};
	let color = {};

	const arr = [1, 2, 3, 4, 5];
	for (const element of arr) {
		count[element] = 0;
		color[element] = "#2f4f4f";
	}
	color[tries[tries.length-1]] = "#adff2f";
	
	console.log(tries);

	for (const element of tries) {
		count[element] += 1;
	}
	
	const y_val = [];
	const c_val = [];
	for (const element of arr) {
		y_val.push(count[element]);
		c_val.push(color[element]);
	}
	
	console.log(y_val);
	console.log(c_val);
	
	// const y_val = [count[1], count[2], count[3], count[4], count[5]];
	
      const ctx = document.getElementById("myChart").getContext("2d");
	  
	  if (myChart!=null){
		  myChart.destroy();
	  }
      myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ["1", "2", "3", "4", "5"],
          datasets: [
            {			
			  barPercentage: 0.8,				
              label: "Games Won",
              data: y_val,
			  backgroundColor: c_val
              // backgroundColor: [
				// "#2f4f4f",
				// "#adff2f",   // yellow-green
				// "#2f4f4f",
				// "#2f4f4f",
				// "#2f4f4f"
              // ]
            }
          ]
        },
		
		options: {
			indexAxis: 'y',
			// Elements options apply to all of the options unless overridden in a dataset
			// In this case, we are setting the border of each horizontal bar to be 2px wide
			elements: {
			  bar: {
				borderWidth: 2,
			  }
			}					
		}
		
      });
		
  }

  function initStatsModal() {
    const modal = document.getElementById("stats-modal");

    // Get the button that opens the modal
    const btn = document.getElementById("stats");

    // Get the <span> element that closes the modal
    const span = document.getElementById("close-stats");

    // When the user clicks on the button, open the modal
    btn.addEventListener("click", function () {
      updateStatsModal();
      modal.style.display = "block";
    });

    // When the user clicks on <span> (x), close the modal
    span.addEventListener("click", function () {
      modal.style.display = "none";
    });

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener("click", function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    });
		
  }
});
