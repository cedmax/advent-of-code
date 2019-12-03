module.exports = {
  R: ({ x, y }, val) => [
    { x, y },
    {
      x: x + val,
      y
    }
  ],
  L: ({ x, y }, val) => [
    { x, y },
    {
      x: x - val,
      y
    }
  ],
  U: ({ x, y }, val) => [
    { x, y },
    {
      x,
      y: y + val
    }
  ],
  D: ({ x, y }, val) => [
    { x, y },
    {
      x,
      y: y - val
    }
  ]
};
