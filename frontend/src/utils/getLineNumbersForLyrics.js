const lyrics = `Attouteki ni tasuu no hito ga
Muyami yatara to hayashitateru yo ja
Kekkyoku dare ga warui no ka nante
Shiranu zonzenu mikata nashi

Hito no se ni tatsu se ni tatsu anata no me
Sono me sono me ga kirai
Mata anchi de tsubuyaku higamitachi
Sorya kattemo maketemo itami nashi

Aa nanimo tsukurenai mama
Aa nanimo erarenai mama de
Saa nando mo kurikaese
Sono kachi no nai ai misu yuu

Wahhahhahha
Houfuku zettou mijime na yakara ni tsuba haite
Wahhahhahha
Karuku isshuu awaremi kometa ai no sanka
Ki ni naranai kizuki mo shinai
Waratte shimau ze fukanzentai
Kono imi ga wakaru made wa
Tada shizuka ni waratten da

“kore wo yamero da?
Sou ka wakatta ze shine tte kotta na?”
Jitsu no oya sae mo nakasechatta
Ore no zenbu wo kurai na kokoro shite
Kedo ichiban migi no za egao nashi

Oo beibee
Tada waratte kure
Ita no ue notautsu ore wo
Sou itsuka wa kainarasu
Oodemapige and demon

Wahhahhahha
Emi to shisshou nishi no majo okuru risupekuto
Wahhahhahha
Kachi de jisshou saikai hete no shin no ouja
Konomi janai hanashitakunai
Kurutte mogaita ni san nen go
Jaron nado kakikesu hodo
Hora daremo ga waratten da

Anata ga mite kiita hikari tachi wa ima mo mada
Kokoro wo tsuyoku nigitte kurushimaseru
“warawareru” “warawaseru” no mizo hari otoshite
Kikasete yaru dakara
Kono namae kurai wa oboete kaere

Wahhahhahha
Houfuku zettou mijime na yakara ni tsuba haite
Wahhahhahha
Karuku isshuu awaremi kometa ai no sanka
Wahhahhahha
Namete choudai yotei chouwa nado tsumaran sa
Wahhahhahha
Geretsu joutou kore ga kotae da monku aru ka
Sei ka shi ka noru ka soru ka
Dasanteki jinsei chouhan shoubu
Ori wa sezu nobori tsuzukeru tada
Amazarashi datte hitori naitatte
Debayashi wa natten da`;

function numberLyrics(lyrics) {
  const lines = lyrics.split("\n");
  let lineNumber = 1;

  for (const line of lines) {
    if (line.trim() === "") {
      // Empty line (or line with only whitespace) → log it out as a blank line (no number, no counting)
      console.log("");
    } else {
      // Non-empty line → prefix with the current line number and increment the counter
      console.log(`${lineNumber}. ${line}`);
      lineNumber++;
    }
  }
}

// Call the function with your lyrics
numberLyrics(lyrics);
