let numberOfOctaves = 5;
const octaveWidth = 560;
const naturalNotes = ["C", "D", "E", "F", "G", "A", "B"];
const range = ["F3", "A7"];

const pianoSVG = `<svg
  width="100%"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 ${numberOfOctaves * octaveWidth} 400"
  >
    <g id='piano-keyboard'>
    </g>
  </svg>`;

const piano = document.getElementById("piano");
const app = {
  setupPiano() {
    // Add main SVG to piano div
    piano.innerHTML = pianoSVG;
    const pianoKeyboard = document.getElementById("piano-keyboard");

    // Create octaves
    for (let i = 0; i < numberOfOctaves; i++) {
      const octave = this.createOctave(i);

      let whiteKeyXPosition = 0;
      let blackKeyXPosition = 60;

      // Add white keys to octave
      for (let i = 0; i < 7; i++) {
        const whiteKey = this.createKey({
          className: "white-key",
          width: 80,
          height: 400,
        });
        whiteKey.setAttribute("x", whiteKeyXPosition);
        whiteKeyXPosition += 80;
        octave.appendChild(whiteKey);
      }

      // Add black keys to octave
      for (let i = 0; i < 5; i++) {
        const blackKey = this.createKey({
          className: "black-key",
          width: 40,
          height: 250,
        });
        blackKey.setAttribute("x", blackKeyXPosition);

        if (i === 1) {
          blackKeyXPosition += 160;
        } else {
          blackKeyXPosition += 80;
        }
        octave.appendChild(blackKey);
      }

      pianoKeyboard.appendChild(octave);
    }
  },
  createOctave(octaveNumber) {
    const octave = utils.createSVGElement("g");
    octave.classList.add("octave");
    octave.setAttribute(
      "transform",
      `translate(${octaveNumber * octaveWidth}, 0)`
    );
    return octave;
  },
  createKey({ className, width, height }) {
    const key = utils.createSVGElement("rect");
    key.classList.add(className);
    key.setAttribute("width", width);
    key.setAttribute("height", height);
    return key;
  },
  getAllNaturalNotes([firstNote, lastNote]) {
    // Assign octave number, notes and positions to variables
    const firstNoteName = firstNote[0];
    const firstOctaveNumber = parseInt(firstNote[1]);

    const lastNoteName = lastNote[0];
    const lastOctaveNumber = parseInt(lastNote[1]);

    const firstNotePosition = naturalNotes.indexOf(firstNoteName);
    const lastNotePosition = naturalNotes.indexOf(lastNoteName);

    const allNaturalNotes = [];

    for (
      let octaveNumber = firstOctaveNumber;
      octaveNumber <= lastOctaveNumber;
      octaveNumber++
    ) {
      // Handle first octave
      if (octaveNumber === firstOctaveNumber) {
        const firstOctave = naturalNotes
          .slice(firstNotePosition)
          .map((noteName) => {
            return noteName + octaveNumber;
          });
        allNaturalNotes.push(firstOctave);
        // Handle last octave
      } else if (octaveNumber === lastOctaveNumber) {
        const lastOctave = naturalNotes
          .slice(0, lastNotePosition + 1)
          .map((noteName) => {
            return noteName + octaveNumber;
          });
        allNaturalNotes.push(lastOctave);
      } else {
        allNaturalNotes.push(
          naturalNotes.map((noteName) => {
            return noteName + octaveNumber;
          })
        );
      }
    }
    return allNatural;
  },
};

const utils = {
  createSVGElement(el) {
    const element = document.createElementNS("http://www.w3.org/2000/svg", el);
    return element;
  },
};

app.setupPiano();
app.getAllNaturalNotes(range);
