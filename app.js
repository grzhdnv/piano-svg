const whiteKeyWidth = 80;
const pianoHeight = 400;

const naturalNotes = ["C", "D", "E", "F", "G", "A", "B"];
const naturalNotesSharps = ["C", "D", "F", "G", "A"];
const naturalNotesFlats = ["D", "E", "G", "A", "B"];

const range = ["A0", "C8"];

const piano = document.getElementById("piano");

const app = {
  setupPiano() {
    const allNaturalNotes = this.getAllNaturalNotes(range);
    const pianoWidth = allNaturalNotes.length * whiteKeyWidth;

    const SVG = this.createMainSVG(pianoWidth, pianoHeight);
    // Add main SVG to piano div
    piano.appendChild(SVG);

    // Add white keys
    let whiteKeyPosX = 0;
    for (let i = 0; i < allNaturalNotes.length; i++) {
      const whiteKey = this.createKey({
        className: "white-key",
        width: whiteKeyWidth,
        height: pianoHeight,
      });
      whiteKey.setAttribute("x", whiteKeyPosX);
      whiteKey.setAttribute("data-note-name", allNaturalNotes[i]);
      whiteKeyPosX += whiteKeyWidth;
      SVG.appendChild(whiteKey);
    }
    // Add black keys
    let blackKeyPosX = 60;
    allNaturalNotes.forEach((naturalNote, index, array) => {
      const blackKey = this.createKey({
        className: "black-key",
        width: whiteKeyWidth / 2,
        height: pianoHeight / 1.6,
      });
      blackKey.setAttribute("x", blackKeyPosX);

      for (let i = 0; i < naturalNotesSharps.length; i++) {
        let naturalSharpNoteName = naturalNotesSharps[i];
        let naturalFlatNoteName = naturalNotesFlats[i];
        if (naturalSharpNoteName === naturalNote[0]) {
          blackKey.setAttribute(
            "data-sharp-name",
            `${naturalSharpNoteName}#${naturalNote[1]}`
          );
          blackKey.setAttribute(
            "data-flat-name",
            `${naturalFlatNoteName}b${naturalNote[1]}`
          );
          // Add double spacing after D# and A#
          if (naturalSharpNoteName === "D" || naturalSharpNoteName === "A") {
            blackKeyPosX += whiteKeyWidth * 2;
          } else {
            blackKeyPosX += whiteKeyWidth;
          }
          // If last iteration of keys, do not add black key
          if (index !== array.length - 1) {
            SVG.appendChild(blackKey);
          }
        }
      }
    });
  },
  // createOctave(octaveNumber) {
  //   const octave = utils.createSVGElement("g");
  //   octave.classList.add("octave");
  //   octave.setAttribute(
  //     "transform",
  //     `translate(${octaveNumber * octaveWidth}, 0)`
  //   );
  //   return octave;
  // },
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
        naturalNotes.slice(firstNotePosition).forEach((noteName) => {
          allNaturalNotes.push(noteName + octaveNumber);
        });

        // Handle last octave
      } else if (octaveNumber === lastOctaveNumber) {
        naturalNotes.slice(0, lastNotePosition + 1).forEach((noteName) => {
          allNaturalNotes.push(noteName + octaveNumber);
        });
      } else {
        naturalNotes.forEach((noteName) => {
          allNaturalNotes.push(noteName + octaveNumber);
        });
      }
    }
    return allNaturalNotes;
  },
  createMainSVG(pianoWidth, pianoHeight) {
    const svg = utils.createSVGElement("svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("version", "1.1");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    svg.setAttribute("viewBox", `0 0 ${pianoWidth} ${pianoHeight}`);

    return svg;
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
