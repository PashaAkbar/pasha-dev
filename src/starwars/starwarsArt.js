import groguPhoto from '../assets/star-wars/grogu-transparent-bg.png';
import mandoPhoto from '../assets/star-wars/mandalorian-grogu-transparent-bg.png';

// Transparent cut-outs used by the particle portraits. The alpha channel is
// the subject mask, so nothing has to be keyed out.
export const GROGU_ART = {
  src: groguPhoto,
  label: 'Grogu',
  step: 6, // px between particles
  darkness: 0.22, // floor so the shadowed side still reads against black
};

export const MANDO_ART = {
  src: mandoPhoto,
  label: 'The Mandalorian carrying Grogu',
  step: 6,
  darkness: 0.24,
  // the cut-out still includes cockpit framing around the characters
  crop: [0.26, 0.0, 0.93, 0.95],
};
