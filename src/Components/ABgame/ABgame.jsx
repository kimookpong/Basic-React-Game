import React, { useRef, useState } from "react";
import "./ABgame.css";

let dataKey = [null, null, null, null];

const ABgame = () => {
  const [play, setplay] = useState(0);
  const [win, setWin] = useState(0);

  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [num3, setNum3] = useState("");
  const [num4, setNum4] = useState("");

  const [log, setLog] = useState([]);

  let num0Ref = useRef(null);
  let num1Ref = useRef(null);
  let num2Ref = useRef(null);
  let num3Ref = useRef(null);
  let num4Ref = useRef(null);
  let num5Ref = useRef(null);
  let num6Ref = useRef(null);
  let num7Ref = useRef(null);
  let num8Ref = useRef(null);
  let num9Ref = useRef(null);

  let hint1Ref = useRef(null);
  let hint2Ref = useRef(null);
  let hint3Ref = useRef(null);
  let hint4Ref = useRef(null);

  let logEle = useRef(null);

  const generateUniqueRandomNumbers = () => {
    let numbers = [];
    while (numbers.length < 4) {
      let randomNum = Math.floor(Math.random() * 10); // Change 10 to the maximum range you want
      if (!numbers.includes(randomNum)) {
        numbers.push(randomNum);
      }
    }
    return numbers;
  };

  const checkGuess = (guessArray) => {
    console.log(guessArray, dataKey);
    let ACount = 0;
    let BCount = 0;
    for (let i = 0; i < dataKey.length; i++) {
      if (guessArray[i] === dataKey[i]) {
        ACount++;
      } else if (dataKey.includes(guessArray[i])) {
        BCount++;
      }
    }
    if (ACount === 0) {
      if (BCount === 0) {
        return `-`;
      } else {
        return `${BCount}B`;
      }
    } else {
      if (BCount === 0) {
        return `${ACount}A`;
      } else {
        return `${ACount}A${BCount}B`;
      }
    }
  };

  const startGame = () => {
    const newNumbers = generateUniqueRandomNumbers();
    dataKey = newNumbers;
    setplay(1);
    setLog([]);
  };

  const restartGame = () => {
    if (hint1Ref.current) {
      hint1Ref.current.innerHTML = "";
    }
    if (hint2Ref.current) {
      hint2Ref.current.innerHTML = "";
    }
    if (hint3Ref.current) {
      hint3Ref.current.innerHTML = "";
    }
    if (hint4Ref.current) {
      hint4Ref.current.innerHTML = "";
    }
    if (logEle.current) {
      logEle.current.innerHTML = "";
    }

    const newNumbers = generateUniqueRandomNumbers();
    dataKey = newNumbers;
    setplay(1);
    setWin(0);
    setLog([]);
  };

  const resetValue = (numCur1, numCur2, numCur3, numCur4) => {
    let guessArray = [];
    guessArray.push(numCur1);
    guessArray.push(numCur2);
    guessArray.push(numCur3);
    guessArray.push(numCur4);

    var result = checkGuess(guessArray);

    var currently = {
      num1: numCur1,
      num2: numCur2,
      num3: numCur3,
      num4: numCur4,
      result,
    };
    var logArray = [currently, ...log];
    setLog(logArray);
    setNum1("");
    setNum2("");
    setNum3("");
    setNum4("");

    num0Ref.current.className = "boxes";
    num1Ref.current.className = "boxes";
    num2Ref.current.className = "boxes";
    num3Ref.current.className = "boxes";
    num4Ref.current.className = "boxes";
    num5Ref.current.className = "boxes";
    num6Ref.current.className = "boxes";
    num7Ref.current.className = "boxes";
    num8Ref.current.className = "boxes";
    num9Ref.current.className = "boxes";

    logElement(currently, logArray.length);
    if (result === "4A") {
      setWin(1);
      logEle.current.innerHTML = "";
    }
  };
  const toggle = (e, num) => {
    if (num1 !== num && num2 !== num && num3 !== num && win === 0) {
      if (num === 0) {
        num0Ref.current.className = "boxes lock";
      } else if (num === 1) {
        num1Ref.current.className = "boxes lock";
      } else if (num === 2) {
        num2Ref.current.className = "boxes lock";
      } else if (num === 3) {
        num3Ref.current.className = "boxes lock";
      } else if (num === 4) {
        num4Ref.current.className = "boxes lock";
      } else if (num === 5) {
        num5Ref.current.className = "boxes lock";
      } else if (num === 6) {
        num6Ref.current.className = "boxes lock";
      } else if (num === 7) {
        num7Ref.current.className = "boxes lock";
      } else if (num === 8) {
        num8Ref.current.className = "boxes lock";
      } else if (num === 9) {
        num9Ref.current.className = "boxes lock";
      }

      if (num1 === "") {
        setNum1(num);
      } else if (num2 === "") {
        setNum2(num);
      } else if (num3 === "") {
        setNum3(num);
      } else if (num4 === "") {
        setNum4(num);
        resetValue(num1, num2, num3, num);
      }
    }
  };

  const toggleHintRemove = (e) => {
    e.target.innerHTML = "";
  };

  const toggleHint = (ref, number) => {
    if (ref === 1) {
      hint1Ref.current.innerHTML = number;
    } else if (ref === 2) {
      hint2Ref.current.innerHTML = number;
    } else if (ref === 3) {
      hint3Ref.current.innerHTML = number;
    } else if (ref === 4) {
      hint4Ref.current.innerHTML = number;
    }
  };

  const logElement = (log, round) => {
    const div = document.createElement("div");
    div.className = "log";
    const ansRowDiv = document.createElement("div");
    ansRowDiv.className = "ans-row";
    const logboxTitleDiv = document.createElement("div");
    logboxTitleDiv.className = "logbox-title";
    logboxTitleDiv.textContent = `รอบ ${round}`;
    ansRowDiv.appendChild(logboxTitleDiv);
    for (let i = 1; i <= 4; i++) {
      const logboxDiv = document.createElement("div");
      logboxDiv.className = "logbox";
      logboxDiv.textContent = log[`num${i}`];
      logboxDiv.addEventListener("click", () => toggleHint(i, log[`num${i}`]));
      ansRowDiv.appendChild(logboxDiv);
    }
    div.appendChild(ansRowDiv);
    const resRowDiv = document.createElement("div");
    resRowDiv.className = "res-row";
    const ansboxDiv = document.createElement("div");
    ansboxDiv.className = "ansbox";
    ansboxDiv.textContent = log.result;
    resRowDiv.appendChild(ansboxDiv);
    div.appendChild(resRowDiv);
    const firstChild = logEle.current.firstChild;
    logEle.current.insertBefore(div, firstChild);
  };

  return (
    <div className="container">
      <h1 className="title">
        AB <span>Game</span>
      </h1>
      <h5 className="subtitle">by Hakim Mudor</h5>
      {play === 0 ? (
        <div className="">
          <button onClick={startGame} className="btn cube cube-hover">
            <div className="bg-top">
              <div className="bg-inner"></div>
            </div>
            <div className="bg-right">
              <div className="bg-inner"></div>
            </div>
            <div className="bg">
              <div className="bg-inner"></div>
            </div>
            <div className="text">เริ่มเกม!</div>
          </button>
          <div className="howToPlay">
            <h3>วิธีเล่นเกม AB</h3>
            <div>
              เกม AB เป็นเกมทายผลที่ผู้เล่นพยายามเดาตัวเลข 4 หลัก
              โดยแต่ละหลักไม่ซ้ำกัน
            </div>
            <h3>กฎ</h3>
            <div>
              • เกมประกอบด้วยตัวเลข 4 หลักเป้าหมายซึ่งแต่ละหลักไม่ซ้ำกัน
            </div>
            <div>• ผู้เล่นพยายามทายหมายเลขเป้าหมาย</div>
            <div>
              • สำหรับการเดาแต่ละครั้ง:
              <br />
              หากหลักในการทายตรงกับตัวเลขในหมายเลขเป้าหมายและอยู่ในตำแหน่งเดียวกันจะได้รับคะแนนแสดงเป็น
              A<br />
              หากหลักในการทายตรงกับตัวเลขในหมายเลขเป้าหมายแต่อยู่ใน
              ตำแหน่งอื่นจะได้รับคะแนนซึ่งแสดงเป็น B
            </div>
            <div>
              • ผู้เล่นทายต่อไปจนกว่าจะเดาถูกทั้ง 4 หลักของหมายเลขเป้าหมาย
              โดยจะได้ 4 คะแนนแทน 4A
            </div>
            <h3>ตัวอย่างการเล่นเกม</h3>
            <div>หมายเลขเป้าหมาย: 6937</div>
            <div>เดา: 1234 - ผลลัพธ์: 1B</div>
            <div>เดา: 9876 - ผลลัพธ์: 1A1B</div>
            <div>เดา: 6179 - ผลลัพธ์: 2B</div>
            <div>เดา: 6973 - ผลลัพธ์: 2A2B</div>
            <div>เดา: 6937 - ผลลัพธ์: 4A (ชนะ)</div>
          </div>
        </div>
      ) : (
        <div>
          {win === 1 ? (
            <div className="win-box">
              <div className="win">
                <div class="confetti">
                  <div class="confetti-piece"></div>
                  <div class="confetti-piece"></div>
                  <div class="confetti-piece"></div>
                  <div class="confetti-piece"></div>
                  <div class="confetti-piece"></div>
                  <div class="confetti-piece"></div>
                  <div class="confetti-piece"></div>
                  <div class="confetti-piece"></div>
                  <div class="confetti-piece"></div>
                  <div class="confetti-piece"></div>
                  <div class="confetti-piece"></div>
                  <div class="confetti-piece"></div>
                  <div class="confetti-piece"></div>
                  <div class="confetti-piece"></div>
                  <div class="confetti-piece"></div>
                  <div class="confetti-piece"></div>
                  <div class="confetti-piece"></div>
                  <div class="confetti-piece"></div>
                  <div class="confetti-piece"></div>
                </div>
                <div className="win-text ">
                  <h1>คุณชนะ!</h1>
                  <h4>ใน {log.length} รอบ</h4>
                </div>
              </div>
              <button onClick={restartGame} className="btn cube cube-hover">
                <div className="bg-top">
                  <div className="bg-inner"></div>
                </div>
                <div className="bg-right">
                  <div className="bg-inner"></div>
                </div>
                <div className="bg">
                  <div className="bg-inner"></div>
                </div>
                <div className="text">เริ่มอีกครั้ง!</div>
              </button>
            </div>
          ) : (
            <div>
              <div className="board">
                <div className="row-show">
                  <div className="ans">{num1}</div>
                  <div className="ans">{num2}</div>
                  <div className="ans">{num3}</div>
                  <div className="ans">{num4}</div>
                </div>
                <div className="row-number">
                  <div
                    className="boxes"
                    ref={num0Ref}
                    onClick={(e) => {
                      toggle(e, 0);
                    }}
                  >
                    0
                  </div>
                  <div
                    className="boxes"
                    ref={num1Ref}
                    onClick={(e) => {
                      toggle(e, 1);
                    }}
                  >
                    1
                  </div>
                  <div
                    className="boxes"
                    ref={num2Ref}
                    onClick={(e) => {
                      toggle(e, 2);
                    }}
                  >
                    2
                  </div>
                  <div
                    className="boxes"
                    ref={num3Ref}
                    onClick={(e) => {
                      toggle(e, 3);
                    }}
                  >
                    3
                  </div>
                  <div
                    className="boxes"
                    ref={num4Ref}
                    onClick={(e) => {
                      toggle(e, 4);
                    }}
                  >
                    4
                  </div>
                </div>
                <div className="row-number">
                  <div
                    className="boxes"
                    ref={num5Ref}
                    onClick={(e) => {
                      toggle(e, 5);
                    }}
                  >
                    5
                  </div>
                  <div
                    className="boxes"
                    ref={num6Ref}
                    onClick={(e) => {
                      toggle(e, 6);
                    }}
                  >
                    6
                  </div>
                  <div
                    className="boxes"
                    ref={num7Ref}
                    onClick={(e) => {
                      toggle(e, 7);
                    }}
                  >
                    7
                  </div>
                  <div
                    className="boxes"
                    ref={num8Ref}
                    onClick={(e) => {
                      toggle(e, 8);
                    }}
                  >
                    8
                  </div>
                  <div
                    className="boxes"
                    ref={num9Ref}
                    onClick={(e) => {
                      toggle(e, 9);
                    }}
                  >
                    9
                  </div>
                </div>
              </div>
              <div className="row-log">
                <div class="log">
                  <div class="ans-row">
                    <div class="logbox-title-hint">ทดไว้!</div>
                    <div
                      class="logbox-hint"
                      ref={hint1Ref}
                      onClick={(e) => {
                        toggleHintRemove(e);
                      }}
                    ></div>
                    <div
                      class="logbox-hint"
                      ref={hint2Ref}
                      onClick={(e) => {
                        toggleHintRemove(e);
                      }}
                    ></div>
                    <div
                      class="logbox-hint"
                      ref={hint3Ref}
                      onClick={(e) => {
                        toggleHintRemove(e);
                      }}
                    ></div>
                    <div
                      class="logbox-hint"
                      ref={hint4Ref}
                      onClick={(e) => {
                        toggleHintRemove(e);
                      }}
                    ></div>
                  </div>
                  <div class="res-row-hint">
                    <div class="ansbox-hint"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="row-log-data" ref={logEle}></div>
        </div>
      )}
    </div>
  );
};
export default ABgame;
