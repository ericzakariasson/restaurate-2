const theme = {
  black: '#222',
  main: '#FFD966',
  action: '#6681FF',
  font: {
    serif: 'Spectral, serif',
    text: 'Karmilla, sans-serif',
  },
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.04)',
  danger: '#EA4335',
  transition: 'ease-in-out 0.2s',
  rgba: (color, opacity) => hexToRgbA(theme[color], opacity),
}

export default theme;

function hexToRgbA(hex, opacity) {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + opacity + ')';
  }
  throw new Error('Bad Hex');
}