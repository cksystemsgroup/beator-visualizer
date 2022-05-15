function Legend() {
  return (
    <>
      <ul className="legend">
        <li className="Bad">Bad, Next</li>
        <li className="Constant">Constant, Input</li>
        <li className="State">State</li>
        <li className="And">And, Not, Equals, Less-than</li>
        <li className="If-then-else">If-then-else</li>
        <li className="Addition">
          Addition, Subtraction, Division, Multiplication, Remainder, Extend
        </li>
        <li className="Read">Read</li>
        <li className="Write">Write</li>
      </ul>
      <svg width="30" height="10" xmlns="http://www.w3.org/2000/svg">
        <line y2="5" x2="29" y1="5" x1="1" />
      </svg>{" "}
      Boolean <br />
      <svg width="30" height="10" xmlns="http://www.w3.org/2000/svg">
        <line y2="5" x2="29" y1="5" x1="1" strokeWidth="1.5" />
      </svg>{" "}
      1 to 7 Bytes <br />
      <svg width="30" height="10" xmlns="http://www.w3.org/2000/svg">
        <line y2="5" x2="29" y1="5" x1="1" strokeWidth="2" />
      </svg>{" "}
      Machine Word <br />
      <svg width="30" height="10" xmlns="http://www.w3.org/2000/svg">
        <line y2="5" x2="29" y1="5" x1="1" strokeWidth="5" />
      </svg>{" "}
      Virtual Memory <br />
    </>
  );
}

export default Legend;
