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
        spritesPosition = spritesPos;
        interval = setInterval(move, 1000);

    }

    const move = () => {
        if (spritesPosition.length > 0) {
            if (!currentPPPos.current) {
                currentPPPos.current = playerPosition;
            }
            let movedIndex = nextMovement([...currentPPPos.current]);
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
        let possibleMoves = [];
        let x1 = parseInt(currentPosition[0]) - 1;
        let x2 = parseInt(currentPosition[0]) + 1;
        let y1 = parseInt(currentPosition[1]) - 1;
        let y2 = parseInt(currentPosition[1]) + 1;
        if (cellIndexRef.current.includes(x1 + currentPosition[1])) {
            possibleMoves.push(x1 + currentPosition[1]);
        }

        if (cellIndexRef.current.includes(x2 + currentPosition[1])) {
            possibleMoves.push(x2 + currentPosition[1]);
        }

        if (cellIndexRef.current.includes(currentPosition[0] + y1)) {
            possibleMoves.push(currentPosition[0] + y1);
        }

        if (cellIndexRef.current.includes(currentPosition[0] + y2)) {
            possibleMoves.push(currentPosition[0] + y2);
        }
        console.log(possibleMoves);
        return possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

    }

    const createTable = () => {
        let table = [], sprites;
        for (let i = 0; i < matrix; i++) {
            let children = []
            for (let j = 0; j < matrix; j++) {
                let ij = i + "" + j;
                sprites = "";
                if (spritesPos.includes(ij)) {
                    sprites = "SS";
                }
                if (playerPosition == ij) {
                    children.push(<td id={ij} style={{ border: '3px solid black', width: '30px', height: '30px', color: 'green' }} onClick={startPlay}><b>PP</b></td>);
                    // playerPositionCellId = cellId;
                } else {
                    children.push(<td id={ij} style={{ border: '3px solid black', width: '30px', height: '30px', color: 'green' }}><b>{sprites}</b></td>);
                }

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



