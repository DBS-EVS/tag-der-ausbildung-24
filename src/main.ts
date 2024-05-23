/// <reference types="@workadventure/iframe-api-typings" />

import WAE from "./wa-lib";

let wae = new WAE();

wae.init().then(() => {
    anfangsPopup();
    wae.popUp("locker","lockerPop","An dem Locker hängt ein Notiz.\nMöchtest du sie Lesen?",[{label: "Lesen",className: "primary",callback: (p) => {p.close();wae.popUpNoArea("lockerPop","Map Developed by Leon Prinz\nDanke an Team EVS <3",[wae.buttons.close])}},wae.buttons.close])
});

async function anfangsPopup() {
    var pos = await WA.player.getPosition()
    if(pos.x<1500){
        wae.popUpNoArea("infoPopUp","Willkommen bei Workadveutre!\nBewege dich mit WASD, Pfeiltasten oder Rechtsklick.\nDieses Event wird teilweise Aufgezeichnet",[wae.buttons.close]);
    }
}

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

var btnImageFfm = "https://dbs-evs.github.io/tag-der-ausbildung-24/images/button_bubble_black.png";
var btnImageBln = "https://dbs-evs.github.io/tag-der-ausbildung-24/images/button_bubble_red.png";
var btnImageEf = "https://dbs-evs.github.io/tag-der-ausbildung-24/images/button_bubble_blue.png";

// adding map navigation buttons
WA.ui.actionBar.addButton({
    id: "button_berlin",
    type:"action",
    imageSrc: btnImageBln,
    toolTip: "Berlin"
})

WA.ui.actionBar.addButton({
    id: "button_erfurt",
    type:"action",
    imageSrc: btnImageEf,
    toolTip: "Erfurt"
})

WA.ui.actionBar.addButton({
    id: "button_frankfurt",
    type:"action",
    imageSrc: btnImageFfm,
    toolTip: "Frankfurt"
})

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)
    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
