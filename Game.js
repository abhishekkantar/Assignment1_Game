import React, { useContext, useEffect, useRef, useState } from 'react';
import { PersonContext } from './App';

export default function Game() {

    const [matrix, setMatrix] = useState(null);
    let stepsCount = 0, userInput, spritesPosition = [], cellIndexes = [], playerPosition = (Math.floor((Math.random() * matrix)) + "" + Math.floor((Math.random() * matrix))), playerPositionCellId;
    let interval, lastMiddlePos, isMax = false;
    const [spritesPos, setSpritesPos] = useState(null);
    const cellIndexRef = useRef(null);
    const currentPPPos = useRef(null);
    const [currPlayerPosition, setCurrPlayerPosition] = useState(0);

    useEffect(() => {
        //setRows(prompt('Please enter number of row(s)'));
        //setColumns(prompt('Please enter number of column(s)'));
        userInput = prompt('Please enter matrix value( number of row(s) and column(s) )');
        setMatrix(userInput);
        getSpritesPos();
        cellIndexRef.current = randomizeIndexes(cellIndexes);
    }, []);

    const getSpritesPos = () => {
        for (let i = 0; i < userInput; i++) {
            spritesPosition.push(Math.floor((Math.random() * userInput)) + "" + Math.floor((Math.random() * userInput)));
            for (let j = 0; j < userInput; j++) {
                cellIndexes.push(i + "" + j);
            }
        }
        setSpritesPos(spritesPosition);
    }
    const randomizeIndexes = (cellIndexes) => {
        var currentIndex = cellIndexes.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = cellIndexes[currentIndex];
            cellIndexes[currentIndex] = cellIndexes[randomIndex];
            cellIndexes[randomIndex] = temporaryValue;
        }

        return cellIndexes;
    }

    const startPlay = () => {
        spritesPosition= spritesPos;
        interval = setInterval(move, 1000);

    }

    const move = () => {
        if (spritesPosition.length > 0) {
            if (!currentPPPos.current) {
                currentPPPos.current = playerPositionCellId;
            }
            let movedIndex = nextMovement(currentPPPos.current);
            document.getElementById(movedIndex).innerHTML = "PP";
            document.getElementById(currentPPPos.current).innerHTML = "";
            currentPPPos.current = movedIndex;
            stepsCount += 1;
            let pos = document.getElementById(movedIndex).parentNode.rowIndex + "" + document.getElementById(movedIndex).cellIndex;
            const index = spritesPosition.indexOf(pos);
            if (index > -1) {
                spritesPosition.splice(index, 1);
            }

        } else {
            clearInterval(interval);
            alert("Total steps count :: " + stepsCount)
        }
    }

    const nextMovement = (currentPosition) => {
        if (isMax || currentPosition == (matrix * matrix) - 1) {
            isMax = true;
            return currentPosition - 1;
        }
        else if (!isMax) {
            return currentPosition + 1;
        }

    }

    const createTable = () => {
        let table = [], sprites, cellId = 0;
        for (let i = 0; i < matrix; i++) {
            let children = []
            for (let j = 0; j < matrix; j++) {
                let ij = i + "" + j;
                sprites = "";
                if (spritesPos.includes(ij)) {
                    sprites = "SS";
                }
                if (playerPosition == ij) {
                    children.push(<td id={cellId} style={{ border: '3px solid black', width: '30px', height: '30px', color: 'green' }} onClick={startPlay}><b>PP</b></td>);
                    playerPositionCellId = cellId;
                } else {
                    children.push(<td id={cellId} style={{ border: '3px solid black', width: '30px', height: '30px', color: 'green' }}><b>{sprites}</b></td>);
                }

                cellId += 1;
            }
            table.push(<tr>{children}</tr>)
        }
        return table
    }
    if (matrix && spritesPos && spritesPos.length > 0) {
        return (
            <div>
                <table>{createTable()}</table>
            </div>
        );
    }
    return null;
}



