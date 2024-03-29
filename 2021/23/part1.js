exports.text = `
#############
#...........#
###B#A#A#D###
  #B#C#D#C#
  #########

5A
6A
2D

#############
#AA.......D.#
###B#.#.#.###
  #B#C#D#C#
  #########

5C
6D
2D

#############
#AA...C.....#
###B#.#.#D###
  #B#C#.#D#
  #########

3C
5C
5B
5B
3A
3A
`

exports.movements = [
  {
    from: [5, 2],
    to: [1, 1],
  },
  {
    from: [7, 2],
    to: [2, 1],
  },
  {
    from: [9, 2],
    to: [10, 1],
  },
  {
    from: [9, 3],
    to: [6, 1],
  },
  {
    from: [10, 1],
    to: [9, 3],
  },
  {
    from: [7, 3],
    to: [9, 2],
  },
  {
    from: [6, 1],
    to: [7, 3],
  },
  {
    from: [5, 3],
    to: [7, 2],
  },
  {
    from: [3, 2],
    to: [5, 3],
  },
  {
    from: [3, 3],
    to: [5, 2],
  },
  {
    from: [2, 1],
    to: [3, 3],
  },
  {
    from: [1, 1],
    to: [3, 2],
  },
]
