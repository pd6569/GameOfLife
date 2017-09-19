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

        this.currentGeneration = this.seedGeneration;
        this.currentGenerationNum = 0;
        this.loopingActive = false;

        // DOM
        this.$generationNum = $('#generationNum');
        this.$grid = $('#grid');
        this.$nextGenBtn = $('#nextGenBtn');
        this.$loopGenerationsBtn = $('#loopGenerations');
        this.$stopLoopBtn = $('#stopLoop');
        this.$resetBtn = $('#reset');

        this.setListeners();
        this.outputGeneration()
    }

    setListeners(){
        this.$nextGenBtn.on('click', () => this.getNextGen());

        this.$loopGenerationsBtn.on('click', () => {
            this.loopingActive = true;
            this.getNextGen()
        });

        this.$stopLoopBtn.on('click', () => this.loopingActive = false);

        this.$resetBtn.on('click', () => this.reset());
    }

    getNextGen(){
        this.currentGenerationNum++;
        let nextGen = [];
        for (let i = 0; i < this.currentGeneration.length ; i++){
            let newRow = [];
            for (let j = 0; j < this.currentGeneration[i].length; j++){
                let numNeighbours = 0;
                let currentCell = this.currentGeneration[i][j];
                let neighbourCell, index, firstCell, lastCell;

                // Check left neighbour
                if (j - 1 >= 0) {
                    index = j - 1;
                    neighbourCell = this.currentGeneration[i][index];
                    if (neighbourCell === "*") numNeighbours++;
                } else {
                    firstCell = true;
                }

                // Check right neighbour
                if (j + 1 <= 7) {
                    index = j + 1;
                    neighbourCell = this.currentGeneration[i][index];
                    if (neighbourCell === "*") numNeighbours++;
                } else {
                    lastCell = true;
                }

                // Check row above
                if (i - 1 >= 0){

                    if (this.currentGeneration[i-1][j] === "*") numNeighbours++; // check cell directly above

                    if (!lastCell) if (this.currentGeneration[i-1][j+1] === "*")numNeighbours++; // check above and right

                    if (!firstCell) if (this.currentGeneration[i-1][j-1] === "*") numNeighbours++; // check above and left
                }

                // Check row below
                if (i + 1 <= 7){

                    if (this.currentGeneration[i+1][j] === "*") numNeighbours++; // check cell directly below

                    if (!lastCell) if (this.currentGeneration[i+1][j+1] === "*")numNeighbours++; // check below and right

                    if (!firstCell) if (this.currentGeneration[i+1][j-1] === "*") numNeighbours++; // check below and left
                }

                /*console.log("Checking row: " + (i+1) + " column: " + (j+1) + " num Neighbours: " + numNeighbours);*/
                if (currentCell === "0"){
                    if (numNeighbours === 3) {
                        newRow[j] = "*";
                    } else {
                        newRow[j] = "0";
                    }
                } else if (currentCell === "*"){
                    if (numNeighbours === 2 || numNeighbours === 3){
                        newRow[j] = "*";
                    } else {
                        newRow[j] = "0";
                    }
                }
            }
            nextGen[i] = newRow;
        }
        /*console.log("Next gen: ", nextGen);*/
        this.currentGeneration = nextGen;
        this.outputGeneration();
        if (this.loopingActive){
            setTimeout(() => this.getNextGen(), 1000);
        }
    }

    outputGeneration(){
        this.$generationNum.text(this.currentGenerationNum);

        // Remove temporary cells
        $('.temp-cell').remove();


        for (let i = 0; i < this.currentGeneration.length ; i++){
            let row = this.currentGeneration[i];
            let $row = this.$grid.find(`[data-row='${i+1}']`);
            for (let j = 0; j < row.length ; j++){
                let cell = row[j];
                if (cell == "0") cell = " ";
                $row.append(`<td class="temp-cell">${cell}</td>`);
            }
        }
    }

    reset(){
        this.currentGeneration = this.seedGeneration;
        this.currentGenerationNum = 0;
        this.outputGeneration();
    }
}

window.onload = function() {
    new GameOfLife();
};