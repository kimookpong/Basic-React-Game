import React, { useRef, useState } from "react";
import "./TicTacToe.css";
import circle_icon from "../Assets/mark-o.png";
import cross_icon from "../Assets/mark-x.png";
let data = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let titleRef = useRef(null);
  let boxes0 = useRef(null);
  let boxes1 = useRef(null);
  let boxes2 = useRef(null);
  let boxes3 = useRef(null);
  let boxes4 = useRef(null);
  let boxes5 = useRef(null);
  let boxes6 = useRef(null);
  let boxes7 = useRef(null);
  let boxes8 = useRef(null);
  let box_array = [
    boxes0,
    boxes1,
    boxes2,
    boxes3,
    boxes4,
    boxes5,
    boxes6,
    boxes7,
    boxes8,
  ];
  const toggle = (e, num) => {
    if (lock) {
      return 0;
    }

    if (count % 2 === 0) {
      e.target.innerHTML = `<img src='${cross_icon}'/>`;
      data[num] = "x";
      setCount(++count);
    } else {
      e.target.innerHTML = `<img src='${circle_icon}'/>`;
      data[num] = "o";
      setCount(++count);
    }

    checkWin();
  };

  const checkWin = () => {
    if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
      won(data[0]);
    } else if (data[3] === data[4] && data[4] === data[5] && data[5] !== "") {
      won(data[3]);
    } else if (data[6] === data[7] && data[7] === data[8] && data[8] !== "") {
      won(data[6]);
    } else if (data[0] === data[3] && data[3] === data[6] && data[6] !== "") {
      won(data[0]);
    } else if (data[1] === data[4] && data[4] === data[7] && data[7] !== "") {
      won(data[1]);
    } else if (data[2] === data[5] && data[5] === data[8] && data[8] !== "") {
      won(data[2]);
    } else if (data[0] === data[4] && data[4] === data[8] && data[8] !== "") {
      won(data[0]);
    } else if (data[2] === data[4] && data[4] === data[6] && data[6] !== "") {
      won(data[2]);
    }
  };
  const won = (winner) => {
    setLock(true);
    if (winner === "x") {
      titleRef.current.innerHTML = "X Won!";
    } else if (winner === "o") {
      titleRef.current.innerHTML = "O Won!";
    }
  };

  const reset = () => {
    setLock(false);
    data = ["", "", "", "", "", "", "", "", ""];
    titleRef.current.innerHTML = "Tic Tac Toe Game in <span>React</span>";
    box_array.map((e) => {
      e.current.innerHTML = "";
    });
  };
  return (
    <div className="container">
      <h1 className="title" ref={titleRef}>
        Tic Tac Toe Game in <span>React</span>
      </h1>
      <div className="board">
        <div className="row1">
          <div
            className="boxes"
            ref={boxes0}
            onClick={(e) => {
              toggle(e, 0);
            }}
          ></div>
          <div
            className="boxes"
            ref={boxes1}
            onClick={(e) => {
              toggle(e, 1);
            }}
          ></div>
          <div
            className="boxes"
            ref={boxes2}
            onClick={(e) => {
              toggle(e, 2);
            }}
          ></div>
        </div>
        <div className="row2">
          <div
            className="boxes"
            ref={boxes3}
            onClick={(e) => {
              toggle(e, 3);
            }}
          ></div>
          <div
            className="boxes"
            ref={boxes4}
            onClick={(e) => {
              toggle(e, 4);
            }}
          ></div>
          <div
            className="boxes"
            ref={boxes5}
            onClick={(e) => {
              toggle(e, 5);
            }}
          ></div>
        </div>
        <div className="row3">
          <div
            className="boxes"
            ref={boxes6}
            onClick={(e) => {
              toggle(e, 6);
            }}
          ></div>
          <div
            className="boxes"
            ref={boxes7}
            onClick={(e) => {
              toggle(e, 7);
            }}
          ></div>
          <div
            className="boxes"
            ref={boxes8}
            onClick={(e) => {
              toggle(e, 8);
            }}
          ></div>
        </div>
      </div>
      <button
        className="reset"
        onClick={() => {
          reset();
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;
