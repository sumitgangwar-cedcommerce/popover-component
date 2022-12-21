import React, { useEffect, useRef, useState } from "react";
import * as ReactDOM from "react-dom";

const Popover = ({ data, element, popPos }) => {
  const ele = useRef();
  const card_ref = useRef();
  const [isActive, setIsActive] = useState(false);
  const [pos, setPos] = useState({});
  const [cardHeight, setCardHeight] = useState(0);


  const changePos = () => {
    console.log('calling')
    const position = ele.current.getBoundingClientRect();
      if(popPos[0]!=='a'){
        setPos({
          top:popPos[0] === "t" ? position.top - cardHeight.height : position.bottom,
          left: popPos[1] === "l" ? position.left : position.right-cardHeight.width,
        });
      }
      else {
        const positions = [
          ['b' , 'l'],
          ['b' , 'r'],
          ['t' , 'l'],
          ['t' , 'r'],
        ]
        for(let i=0;i<4;i++){
          if(cantFit(ele.current.getBoundingClientRect() , cardHeight , positions[i])){
            console.log(positions[i])
            setPos({
              top:positions[i][0] === "t" ? position.top - cardHeight.height : position.bottom,
              left: positions[i][1] === "l" ? position.left : position.right-cardHeight.width,
            })
            break;
          }
        }
      }
  };

  const setFunctionOnScroll = () => {
    if (element.current && isActive) {
      element.current.onscroll =  changePos;
      window.onresize =  changePos;
    }
    if (!isActive) element.current.onscroll = null;
  };

  const outsideCall = (e) => {
    if (ele.current && !ele.current.contains(e.target)) {
      if (card_ref && !card_ref.current.contains(e.target)) {
        setIsActive(false);
      }
    }
  };

  const cantFit = (mainEle , cardDimension , point) => {
    if(point[0] === 'b' && point[1] === 'l'){
      if((document.documentElement.clientHeight - mainEle.bottom < cardDimension.height) || (document.documentElement.clientWidth - mainEle.left < cardDimension.width))  return false
      return true;
    }
    else if(point[0] === 'b' && point[1] === 'r'){
      if((document.documentElement.clientHeight - mainEle.bottom < cardDimension.height) || ( mainEle.right < cardDimension.width))  return false
      return true;
    }
    else if(point[0] === 't' && point[1] === 'l'){
      if((mainEle.top < cardDimension.height) || (document.documentElement.clientWidth - mainEle.left < cardDimension.width))  return false
      return true;
    }
    else{
      if((mainEle.top < cardDimension.height) || (mainEle.right < cardDimension.width))  return false
      return true;
    }
  }


  useEffect(() => {
    setFunctionOnScroll();
    if(isActive){
      const c = card_ref?.current?.getBoundingClientRect();
      setCardHeight(c);
    }
  }, [isActive]);

  useEffect(() => {
    changePos();
    setFunctionOnScroll();
  }, [cardHeight]);

  useEffect(() => {
    document.addEventListener("click", outsideCall, true);
    return () => {
      document.removeEventListener("click", outsideCall, true);
    };
  }, []);

  const popoverCard = ReactDOM.createPortal(
    <div style={{ ...pos }} className="popover__card" ref={card_ref}>
      <table>
        <tr>
          <td>Name</td>
          <td>{data.name}</td>
        </tr>
        <tr>
          <td>Age</td>
          <td>{data.age}</td>
        </tr>
        <tr>
          <td>Address</td>
          <td>{data.address}</td>
        </tr>
        <tr>
          <td>Children</td>
          <td>{data.children}</td>
        </tr>
      </table>
    </div>,
    document.getElementById("portal")
  );

  return (
    <div className="popover">
      <button ref={ele} onClick={() => setIsActive((prev) => !prev)}>
        View
      </button>
      {isActive && popoverCard}
    </div>
  );
};

export default Popover;
