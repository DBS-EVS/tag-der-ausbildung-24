/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

var btnImageFfm = "https://dbs-evs.github.io/tag-der-ausbildung-24/images/button_bubble_black.png";
var btnImageBln = "https://dbs-evs.github.io/tag-der-ausbildung-24/images/button_bubble_red.png";
var btnImageEf = "https://dbs-evs.github.io/tag-der-ausbildung-24/images/button_bubble_blue.png";

let currentPopup: any = undefined;

let startPopup = "infoPopUp";
let startZone = "startZone";
let startMsg = "Willkommen bei Workadveutre!\nBewege dich mit WASD, Pfeiltasten oder Rechtsklick.\nDieses Event wird teilweise Aufgezeichnet"

let lockerPopup = "lockerPop";
let lockerZone = "locker";
let lockerMsg = "An dem Locker hängt ein Notiz.\nMöchtest du sie Lesen?";

let noteMsg = "Initial map developed by Leon Prinz in 2023\nDanke an Team EVS <3"

let labelRead = "Lesen";
let labelNo = "Nein";
let labelClose = "Schließen";

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

    startingPopup();

    WA.room.area.onLeave(startZone).subscribe(() => {
        closePopUp(currentPopup);
    });

    WA.room.area.onEnter(lockerZone).subscribe(() => {
        currentPopup = WA.ui.openPopup(lockerPopup, lockerMsg,[
            {
                label: labelRead,
                callback: (popup => {
                    popup.close();

                    currentPopup = WA.ui.openPopup(lockerPopup, noteMsg,[
                        {
                            label: labelClose,
                            callback: (popup => {
                                popup.close();
                                currentPopup = undefined;
                            })
                        }
                    ])
                })
            },
            {
                label: labelNo,
                callback: (popup => {
                    popup.close();
                    currentPopup = undefined;
                })
        }]);
    })

    WA.room.area.onLeave(lockerZone).subscribe(() => {
        closePopUp(currentPopup);
    })

}).catch(e => console.error(e));

async function startingPopup() {
    var pos = await WA.player.getPosition()
    if(pos.x<1500){
        currentPopup = WA.ui.openPopup(startPopup, startMsg,[
        {
            label: labelClose,
            callback: (popup => {
            popup.close();
            currentPopup = undefined;             
            })
        }]);
    }
}

function closePopUp(currPopup: any){
    if (currPopup !== undefined) {
        currPopup.close();
        currPopup = undefined;
    }
}

export {};
