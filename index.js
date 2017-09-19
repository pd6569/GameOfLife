/**
 * Created by peter on 19/09/2017.
 */

'use strict';

class GameOfLife {


    constructor () {
        console.log("New game of life");

        // Data
        this.seedGeneration = [
            '00**000*',
            '0***00**',
            '*000**0*',
            '0**0****',
            '**0*0*00',
            '*0*0***0',
            '0*******',
            '*0*00**0'
        ];

        // DOM
        this.$grid = $('#grid');

        this.outputGeneration()
    }

    createGeneration(numGenerations){

    }

    outputGeneration(generationArray = this.seedGeneration){
        for (let i = 0; i < generationArray.length ; i++){
            let row = generationArray[i];
            let $row = this.$grid.find(`[data-row='${i+1}']`);
            for (let j = 0; j < row.length ; j++){
                let cell = row[j];
                if (cell == "0") cell = " ";
                $row.append(`<td>${cell}</td>`);
            }
        }
    }
}

window.onload = function() {
    new GameOfLife();
};