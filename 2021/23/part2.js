exports.text = `
#############
#...........#
###B#A#A#D###
  #D#C#B#A#
  #D#B#A#C#
  #B#C#D#C#
  #########

5A
5A
5B
8A

#############
#AA.......BA#
###B#.#.#D###
  #D#C#.#A#
  #D#B#.#C#
  #B#C#D#C#
  #########

7D
8C
6B
9C

#############
#AA.D...B.BA#
###B#.#.#D###
  #D#.#.#A#
  #D#.#C#C#
  #B#.#C#C#
  #########

7B
8B
4D

#############
#AA.D.D....A#
###B#.#.#.###
  #D#.#.#A#
  #D#B#C#C#
  #B#B#C#C#
  #########

3A
7C
7C

#############
#AA.D.D...AA#
###B#.#C#.###
  #D#.#C#.#
  #D#B#C#.#
  #B#B#C#.#
  #########

7D
8D
5B

#############
#AA.......AA#
###.#.#C#.###
  #D#B#C#.#
  #D#B#C#D#
  #B#B#C#D#
  #########

10D
10D
7B

#############
#AA.......AA#
###.#B#C#D###
  #.#B#C#D#
  #.#B#C#D#
  #.#B#C#D#
  #########

5A
5A
9A
9A
`

exports.movements = [
  {
    from: [5, 2],
    to: [1, 1],
  },
  {
    from: [7, 2],
    to: [11, 1],
  },
  {
    from: [7, 3],
    to: [10, 1],
  },
  {
    from: [7, 4],
    to: [2, 1],
  },
  {
    from: [7, 5],
    to: [4, 1],
  },
  {
    from: [5, 3],
    to: [7, 5],
  },
  {
    from: [5, 4],
    to: [8, 1],
  },
  {
    from: [5, 5],
    to: [7, 4],
  },
  {
    from: [8, 1],
    to: [5, 5],
  },
  {
    from: [10, 1],
    to: [5, 4],
  },
  {
    from: [9, 2],
    to: [6, 1],
  },
  {
    from: [9, 3],
    to: [10, 1],
  },
  {
    from: [9, 4],
    to: [7, 3],
  },
  {
    from: [9, 5],
    to: [7, 2],
  },
  {
    from: [6, 1],
    to: [9, 5],
  },
  {
    from: [4, 1],
    to: [9, 4],
  },
  {
    from: [3, 2],
    to: [5, 3],
  },
  {
    from: [3, 3],
    to: [9, 3],
  },
  {
    from: [3, 4],
    to: [9, 2],
  },
  {
    from: [3, 5],
    to: [5, 2],
  },
  {
    from: [2, 1],
    to: [3, 5],
  },
  {
    from: [1, 1],
    to: [3, 4],
  },
  {
    from: [10, 1],
    to: [3, 3],
  },
  {
    from: [11, 1],
    to: [3, 2],
  },
]