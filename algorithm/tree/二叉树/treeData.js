/*
*              1
*           2    3
*        4     5   6
*            7  8
*           9 10
* */

module.exports = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 4
    }
  },
  right: {
    value: 3,
    left: {
      value: 5,
      left: {
        value: 7,
        left: {value: 9},
        right: {value: 10},
      },
      right: {
        value: 8
      }
    },
    right: {
      value: 6
    }
  }
}

